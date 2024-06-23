import { Request, Response } from 'express';
import User from '../../../shared/src/models/User';
import { UserPayload } from '../../../types/express/types'; 

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        if (!req.user || !(req.user as UserPayload).userId) { // Use type assertion to ensure correct type
            return res.status(401).send('Unauthorized');
          }
          const userId = (req.user as UserPayload).userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
