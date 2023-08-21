import amqp from 'amqplib';

export const consumerQueue = async () => {

    const queueName = 'googlesheet';
    const maxRetries = 10;
    let retries = 0;

    const connectAndConsume = async () => {
        try {
            const connection = await amqp.connect('amqp://rabbitmq');
            const channel = await connection.createChannel();

            await channel.assertQueue(queueName, { durable: false });

            console.log(`Waiting for messages in ${queueName}. To exit press CTRL+C`);

            channel.consume(queueName, (message) => {
                if (message) {
                    console.log(`Received: ${message.content.toString()}`);
                }
            }, { noAck: true });
        } catch (error) {
            console.error('Error consuming RabbitMQ messages:', error);
            if (retries < maxRetries) {
                console.log('Retrying in 5 seconds...');
                retries++;
                setTimeout(connectAndConsume, 5000);
            } else {
                console.log(`Max retries reached. Could not establish connection.`);
            }
        }
    };

    connectAndConsume();
}

