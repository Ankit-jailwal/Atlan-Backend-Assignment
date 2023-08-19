import express from 'express';
import App from './services/ExpressApp';
import {sequelize} from './services/Database';

const StartServer = async () => {
    const app = express();

    try {
        await sequelize.sync({ alter: true });
        console.log('Models synchronized with database.');
    } catch (error) {
        console.error('Error synchronizing models with database:', error);
        return;
    }

    await App(app);
    const port = process.env.PORT || 8081;
    app.listen(port, () => {
        console.log(`Atlan running on port ${port}`);
    });
};

StartServer();
