import {connect} from 'amqplib/callback_api.js';
import consola from "consola";

connect('amqp://localhost', (_, connection) => {
    connection.createChannel((_, channel) => {
        const queue = 'task_queue';

        // This makes sure the queue is declared before attempting to consume from it
        channel.assertQueue(queue, {
            durable: true
        });
        channel.prefetch(1);
        consola.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, (msg) => {
            if (msg) {
                const secs = msg.content.toString().split('.').length - 1;

                consola.log(" [x] Received %s", msg.content.toString());
                setTimeout(() => {
                    consola.success(" [x] Done");
                    channel.ack(msg);
                }, secs * 1000);
            }
        }, {
            // automatic acknowledgment mode,
            // see /docs/confirms for details
            noAck: false
        });
    });
});