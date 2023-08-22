require('dotenv').config();

export const twilioController = async (message : string) =>{
    try {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;

        const fromPhoneNumber = process.env.TWILIO_NUMBER;
        const toPhoneNumber = '+918708917205'

        const client = require('twilio')(accountSid, authToken);
        client.messages
          .create({
             body: message,
             from: fromPhoneNumber,
             to: toPhoneNumber
           })
          .then(console.log("Message sent!"));

    } catch(error) {
        console.error(error);
        console.log('An error occurred while sending message to ${toPhoneNumber}');
    }
};

