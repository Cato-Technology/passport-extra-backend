// form-service/app.ts
import express from 'express';
import formRoutes from './routes/formRoutes';

const formApp = express();

formApp.use(express.json());

formApp.use(formRoutes);


export default formApp;
