import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { env } from '../config';
import { UserPayload } from '../../../types/express/types';


export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) return res.sendStatus(401);

    const jwtSecret = env.JWT_SECRET;
    if (!jwtSecret) {
        console.error('JWT_SECRET is not defined');
        return res.sendStatus(500);
    }

    jwt.verify(token, jwtSecret, (err: VerifyErrors | null, user: any) => {
        if (err) return res.sendStatus(403);
        req.user = user as UserPayload;
        next();
    });
};
