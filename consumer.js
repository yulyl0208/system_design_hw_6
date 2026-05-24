const amqp = require('amqplib');

async function consumeEvents() {

    try {

        const connection = await amqp.connect(
            'amqp://admin:admin@localhost'
        );

        const channel = await connection.createChannel();

        const exchange = 'fitness.events';

        const queue = 'statistics.queue';

        await channel.assertExchange(exchange, 'topic', {
            durable: true
        });

        await channel.assertQueue(queue, {
            durable: true
        });

        await channel.bindQueue(
            queue,
            exchange,
            'workout.completed'
        );

        console.log('Waiting for events...');

        channel.consume(queue, (message) => {

            if (message) {

                const event = JSON.parse(
                    message.content.toString()
                );

                console.log('Received event:');
                console.log(event);

                channel.ack(message);
            }

        });

    } catch (error) {

        console.error(error);

    }
}

consumeEvents();
