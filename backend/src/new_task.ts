#!/usr/bin/env node

import { connect } from 'amqplib/callback_api.js';
import consola from "consola";

connect('amqp://localhost', function(_, connection) {
    connection.createChannel(function(_, channel) {
        const queue = 'task_queue';
        const msg = process.argv.slice(2).join(' ') || "Hello World!";

        channel.assertQueue(queue, {
            durable: true
        });
        channel.sendToQueue(queue, Buffer.from(msg), {
            persistent: true
        });
        consola.log(" [x] Sent '%s'", msg);
    });
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});