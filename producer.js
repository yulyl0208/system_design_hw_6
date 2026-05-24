const amqp = require('amqplib');
const { v4: uuidv4 } = require('uuid');

async function publishEvent() {

    try {

        const connection = await amqp.connect(
            'amqp://admin:admin@localhost'
        );

        const channel = await connection.createChannel();

        const exchange = 'fitness.events';

        await channel.assertExchange(exchange, 'topic', {
            durable: true
        });

        const event = {
            eventId: uuidv4(),

            eventType: 'WorkoutCompletedEvent',

            timestamp: new Date().toISOString(),

            payload: {
                workoutId: 100,
                userId: 1,
                durationMinutes: 60,
                caloriesBurned: 500
            }
        };

        channel.publish(
            exchange,
            'workout.completed',
            Buffer.from(JSON.stringify(event)),
            {
                persistent: true
            }
        );

        console.log('Event published:');
        console.log(event);

        setTimeout(() => {
            connection.close();
        }, 500);

    } catch (error) {

        console.error(error);

    }
}

publishEvent();
