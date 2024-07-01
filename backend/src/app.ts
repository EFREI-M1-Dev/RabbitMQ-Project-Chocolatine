import { Server } from 'socket.io';
import http from 'http';
import amqp from 'amqplib/callback_api.js';
import { v4 as uuidv4 } from 'uuid';
import consola from 'consola';

const PORT = process.env.PORT || 5000;
const EXCHANGE_APP = 'exchange_app';
const activeConsumers = new Map<string, string>();
const userQueues = new Map<string, string>(); // Map pour stocker les noms des queues par userId

const server = http.createServer();
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

const connectToRabbitMQ = () => {
    amqp.connect('amqp://localhost', (error0, connection) => {
        if (error0) {
            throw error0;
        }

        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }

            channel.assertExchange(EXCHANGE_APP, 'fanout', { durable: true });

            io.on('connection', (socket) => {
                consola.info('Client connected');

                let userId = socket.handshake.query.userId as string;
                if (!userId) {
                    userId = uuidv4();
                    socket.emit('user id', userId);
                }

                // Vérifier si la queue existe déjà pour cet utilisateur
                let userQueue = userQueues.get(userId);
                if (!userQueue) {
                    userQueue = `queue_${userId}`;
                    userQueues.set(userId, userQueue); // Stocker le nom de la queue pour cet utilisateur
                    channel.assertQueue(userQueue, { durable: true });
                    channel.bindQueue(userQueue, EXCHANGE_APP, '');
                }

                channel.consume(
                    userQueue,
                    (message) => {
                        if (!message || message.content.toString().trim() === '') return;
                        const msgContent = message.content.toString();
                        consola.info(`Consumed message from RabbitMQ: ${msgContent}`);
                        socket.emit('chat message', msgContent);
                    },
                    { noAck: true },
                    (error2, ok) => {
                        if (error2) {
                            throw error2;
                        }
                        if (ok) {
                            const consumerTag = ok.consumerTag;
                            activeConsumers.set(userId, consumerTag); // Stockage du consumerTag
                        }
                    }
                );

                socket.on('chat message', (msg) => {
                    consola.info(`Received message from client: ${msg}`);
                    channel.publish(EXCHANGE_APP, '', Buffer.from(msg), { persistent: true });
                    consola.info(`Sent message to RabbitMQ: ${msg}`);
                });

                socket.on('disconnect', () => {
                    consola.info('Client disconnected');
                    const consumerTag = activeConsumers.get(userId);
                    if (consumerTag) {
                        channel.cancel(consumerTag, (error3) => {
                            if (error3) {
                                throw error3;
                            }
                            activeConsumers.delete(userId);
                        });
                    }
                });
            });

            consola.success('Connected to RabbitMQ');
        });
    });
};

connectToRabbitMQ();

server.listen(PORT, () => {
    consola.success(`Server started on port ${PORT}`);
});
