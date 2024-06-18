import amqp from 'amqplib/callback_api';
import consola from "consola";

const EXCHANGE_NAME = 'logs';
const MESSAGE = 'Hello World!';
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
        channel.publish(EXCHANGE_NAME, '', Buffer.from(MESSAGE));
        consola.log(` [x] Sent ${MESSAGE}`);
    });

    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 500);
});
