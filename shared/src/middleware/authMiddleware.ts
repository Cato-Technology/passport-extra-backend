import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { env } from '../config';
import { UserPayload } from '../../../types/express/types';
import  User  from '../models/User'


export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    //console.log('Auth Header:', authHeader);
    //console.log('token:', token);
    if (token == null) return res.sendStatus(401);

    const jwtSecret = env.JWT_SECRET;
    if (!jwtSecret) {
        console.error('JWT_SECRET is not defined');
        return res.sendStatus(500);
    }

    jwt.verify(token, jwtSecret, async (err: VerifyErrors | null, user: any) => {
        if (err) return res.sendStatus(403);
        const userPayload = user as UserPayload;
        req.user = user as UserPayload;
        // Fetch adminId for non-admin users
            const adminRecord = await User.findOne({ role: 'admin' });
            if (!adminRecord) {
                return res.status(404).json({ message: 'Admin user not found' });
            }
            userPayload.adminId = adminRecord._id;
        next();
    });
};
