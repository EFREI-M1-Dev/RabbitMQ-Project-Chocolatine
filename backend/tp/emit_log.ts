#!/usr/bin/env node

import {connect} from 'amqplib/callback_api.js';
import consola from "consola";

connect('amqp://localhost', (_, connection) => {
    connection.createChannel((_, channel) => {
        const exchange = 'logs';
        const msg = process.argv.slice(2).join(' ') || 'Hello World!';

        channel.assertExchange(exchange, 'fanout', {
            durable: false
        });
        channel.publish(exchange, '', Buffer.from(msg));
        consola.log(" [x] Sent %s", msg);
    });

    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 500);
});