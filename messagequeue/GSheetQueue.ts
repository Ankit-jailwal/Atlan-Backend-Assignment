import amqp from 'amqplib'

export const GSheetQueue = async (form: any) => {
    try {
        // const connection = await amqp.connect('amqp://localhost:5672'); 
        // const channel = await connection.createChannel();
        // const queueName = 'googlesheet';
        // await channel.assertQueue(queueName);
        // await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(form)));

        console.log('Form sent to queue');
    } catch(error) {
        console.error(error);
        console.log('An error occured while inserting form into the queue')
    }  
}