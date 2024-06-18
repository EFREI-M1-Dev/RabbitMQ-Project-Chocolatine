#!/usr/bin/env node

import {connect} from 'amqplib/callback_api.js';
import consola from "consola";

connect('amqp://localhost', (_, connection) => {
    connection.createChannel((_, channel) => {
        const exchange = 'logs';

        channel.assertExchange(exchange, 'fanout', {
            durable: false
        });

        channel.assertQueue('', {
            exclusive: true
        }, (_, q) => {
            consola.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            channel.bindQueue(q.queue, exchange, '');

            channel.consume(q.queue, (msg) => {
                if (msg) {
                    if(msg.content) {
                        consola.log(" [x] %s", msg.content.toString());
                    }
                }
            }, {
                noAck: false
            });
        });
    });
});