import { Request, Response } from 'express';
import Notification from '../models/Notification';
import { UserPayload } from '../../../types/express/types';

export const getNotifications = async (req: Request, res: Response) => {
    try {
        if (!req.user || !(req.user as UserPayload).userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const userId = (req.user as UserPayload).userId;
        const notifications = await Notification.find({ userId });
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};