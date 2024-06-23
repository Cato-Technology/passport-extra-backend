import express from 'express';
import notificationRoutes from './routes/notificationRoutes';

const notificationApp = express.Router();
notificationApp.use(express.json());
notificationApp.use(notificationRoutes); // Register notification routes at root level
export default notificationApp;
