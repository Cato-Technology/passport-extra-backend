// form-service/app.ts
import express from 'express';
import availabilityRoutes from './routes/availabilityRoutes';
import meetingRoutes from './routes/meetingRoutes';


const calenderApp = express();

calenderApp.use(express.json());

calenderApp.use(availabilityRoutes);

calenderApp.use(meetingRoutes);

export default calenderApp;
