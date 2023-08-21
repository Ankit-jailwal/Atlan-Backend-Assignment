import express from 'express';
import App from './helper/ExpressApp';
import { consumerQueue } from './helper/consumerQueue';

const StartServer = async () => {
    const app = express();
    await App(app);

    const port = 8001;
    const host = '0.0.0.0';

    await consumerQueue()
    app.listen(port, host, () => {
        console.log("Gsheet running on port 8001");
    });


}

StartServer();
