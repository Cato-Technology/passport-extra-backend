import express from 'express';
import userRoutes from './routes/userRoutes';

const userApp = express.Router();
userApp.use(express.json());
userApp.use(userRoutes); // Register user routes at root level
export default userApp;
