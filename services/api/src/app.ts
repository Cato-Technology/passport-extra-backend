import express from 'express';
import apiRoutes from './routes';

const apiGatewayApp = express.Router();
apiGatewayApp.use(express.json());
apiGatewayApp.use(apiRoutes); // Register API routes at root level
export default apiGatewayApp;