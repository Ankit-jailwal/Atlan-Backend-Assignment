import amqp from 'amqplib';

export const GSheetQueue = async (form: any) => {
    try {
        const connection = await amqp.connect('amqp://rabbitmq');
        const channel = await connection.createChannel();

        const queueName = 'googlesheet';

        await channel.assertQueue(queueName, { durable: false });
        const stringForm = JSON.stringify(form)
        channel.sendToQueue(queueName, Buffer.from(stringForm));

        console.log(`Sent: ${form}`);

        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.error(error);
        console.log('An error occurred while inserting form into the queue');
    }
};
