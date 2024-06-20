import { Request } from 'express';
import { UserPayload } from '../../shared/src/middleware/authMiddleware';

interface UserPayload {
    userId: string;
    // Add other properties as needed
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}
