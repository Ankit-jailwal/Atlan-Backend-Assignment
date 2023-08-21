import amqp from 'amqplib';
import { GSheetController } from '../controller/GSheetController';

export const consumerQueue = async () => {

    const queueName = 'googlesheet';
    const maxRetries = 10;
    let retries = 0;

    const connectAndConsume = async () => {
        try {
            const connection = await amqp.connect('amqp://rabbitmq');
            const channel = await connection.createChannel();

            await channel.assertQueue(queueName, { durable: false });

            console.log(`Waiting for form submission in ${queueName}.`);

            channel.consume(queueName, async (form) => {
                if (form) {
                    const receivedForm = form.content.toString(); // Convert buffer to string
                    // const parsedForm = JSON.parse(receivedForm);
                    // console.log("Data here!!!!")
                    // console.log(parsedForm)
                    await GSheetController(receivedForm)
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

