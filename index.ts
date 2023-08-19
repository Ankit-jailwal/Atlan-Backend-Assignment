import express from 'express';
import App from './services/ExpressApp';
import { database } from './services/Database';

const StartServer = async () => {
    
    const app = express();

    // Database connection
    try {
        await database.sequelize.sync({ alter: true });
        console.log('Models synchronized with database.');
    } catch (error) {
        console.error('Error synchronizing models with database:', error);
        return;
    }

    // Express App
    await App(app);
    const port = 8000;
    app.listen(port, () => {
        console.log(`Atlan running on port ${port}`);
    });
};

StartServer();
