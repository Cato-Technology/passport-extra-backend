// controllers/meetingController.ts
import { Request, Response } from 'express';
import { Meeting } from '../models/Meeting';
import { UserPayload } from '../../../types/express/types';
import moment from 'moment';

export const scheduleMeeting = async (req: Request, res: Response) => {
    try {
        const { userId, adminId } = req.user as UserPayload;
        const { description, date, start, end } = req.body;
        const newMeeting = new Meeting({ adminId, userId, description, date: new Date(date), start: new Date(start), end: new Date(end) });
        await newMeeting.save();
        res.status(201).json(newMeeting);
    } catch (error) {
        res.status(500).json({ message: 'Error scheduling meeting', error });
    }
};

export const getMeetings = async (req: Request, res: Response) => {
    try {
      const { userId, adminId, role } = req.user as UserPayload;
      const { month, year } = req.params;

      console.log(`Received month: ${month}, year: ${year}`);


        if (!month || !year) {
            return res.status(400).json({ message: 'Month and year are required' });
        }

        const startDate = moment(`${year}-${month}-01`).startOf('month').toDate();
        const endDate = moment(startDate).endOf('month').toDate();

        let query = {};
    
        if (role === 'admin') {
            query = { adminId, date: { $gte: startDate, $lte: endDate } };
        } else {
            query = { userId, date: { $gte: startDate, $lte: endDate } };
        }
    
        const meetings = await Meeting.find(query);
        res.status(200).json(meetings);
        } catch (error) {
        res.status(500).json({ message: 'Error fetching meetings', error });
        }
  };
