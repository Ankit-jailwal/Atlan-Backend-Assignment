import amqp from 'amqplib';

export const GSheetQueue = async () => {
    try {
        const connection = await amqp.connect('amqp://rabbitmq');
        const channel = await connection.createChannel();

        const queueName = 'googlesheet';
        const message = 'Message from node 1';

        await channel.assertQueue(queueName, { durable: false });
        channel.sendToQueue(queueName, Buffer.from(message));

        console.log(`Sent: ${message}`);

        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.error(error);
        console.log('An error occurred while inserting form into the queue');
    }
};
