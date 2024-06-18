import amqp from 'amqplib/callback_api';
import consola from "consola";

const EXCHANGE_NAME = 'logs';
const RABBITMQ_USER = 'choco';
const RABBITMQ_PASS = 'choco';
const RABBITMQ_HOST = 'localhost';

amqp.connect(`amqp://${RABBITMQ_USER}:${RABBITMQ_PASS}@${RABBITMQ_HOST}`, (error0, connection) => {
    if (error0) {
        throw error0;
    }
    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }

        channel.assertExchange(EXCHANGE_NAME, 'fanout', { durable: false });

        channel.assertQueue('', { exclusive: true }, (error2, q) => {
            if (error2) {
                throw error2;
            }
            consola.info(` [*] Waiting for messages in ${q.queue}. To exit press CTRL+C`);

            channel.bindQueue(q.queue, EXCHANGE_NAME, '');

            channel.consume(q.queue, (msg) => {
                if (msg) {
                    if (msg.content) {
                        consola.success(` [x] Received ${msg.content.toString()}`);
                    }
                }
            }, { noAck: true });
        });
    });
});
