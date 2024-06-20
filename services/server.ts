import express from 'express';
import connectToDatabase from './database';
import { env } from './config';
import authApp from './auth-service/src/app';
import userApp from './user-service/src/app';
import notificationApp from './notification-service/src/app';
import apiGatewayApp from './api/src/app';
import { authenticateToken } from './shared/src/middleware/authMiddleware';

const app = express();
const PORT = env.PORT || 5000;

app.use(express.json());

const startServer = async () => {
    try {
        await connectToDatabase();
        
        // Ensure all service routes are set up after DB connection
        app.use('/api/auth', authApp);
        app.use('/api/users', authenticateToken, userApp);
        app.use('/api/notifications', authenticateToken, notificationApp);
        //app.use('/api', authenticateToken, apiGatewayApp);

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
    }
};

startServer();
