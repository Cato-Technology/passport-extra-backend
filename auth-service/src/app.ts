import express from 'express';
import authRoutes from './routes/auth';

const authApp = express();
authApp.use(express.json());
authApp.use(authRoutes); // Ensure auth routes are registered
export default authApp;
