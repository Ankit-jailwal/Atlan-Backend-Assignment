import express from 'express';
import App from './helper/ExpressApp';

const StartServer = async () => {
    
    const app = express();
    await App(app);
    const port = 8001
    app.listen(port, () => {console.log("Gsheet running on port 8001")})
}

StartServer()