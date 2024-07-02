import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { Secret } from 'jsonwebtoken';
import User from '../../../shared/src/models/User';
import { env } from '../config';
import mongoose from 'mongoose';

console.log(env)

if (!env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not defined');
}

const checkMongooseConnection = () => {
    if (mongoose.connection.readyState !== 1) {
        console.error('Mongoose connection is not properly initialized.');
        return false;
    }
    return true;
};

export const register = async (req: Request, res: Response) => {
    try {
        if (!checkMongooseConnection()) {
            return res.status(500).json({ message: 'Database connection not initialized' });
        }

        const { username, email, firstName, lastName, middleName, phoneNumber, password } = req.body;

        let user = await User.findOne({ email });
        let user_name = await User.findOne({ username });
        let phone_no = await User.findOne({ phoneNumber });

        if (user || user_name || phone_no) {
            console.log('User already exists:', { email, username, phoneNumber });
            
            const existingUsers = [];
            if (user) existingUsers.push({ field: 'email', details: user });
            if (user_name) existingUsers.push({ field: 'username', details: user_name });
            if (phone_no) existingUsers.push({ field: 'phoneNumber', details: phone_no });
        
            return res.status(400).json({ 
                message: 'User already exists', 
                existingUsers: existingUsers.map(({ field, details }) => ({
                    field,
                    userDetails: {
                        _id: details._id,
                        username: details.username,
                        email: details.email,
                        firstName: details.firstName,
                        lastName: details.lastName,
                        middleName: details.middleName,
                        phoneNumber: details.phoneNumber,
                        role: details.role
                    }
                }))
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({
            username,
            email,
            firstName,
            lastName,
            middleName,
            phoneNumber,
            role: 'user',
            password: hashedPassword,
        });

        await user.save();

        const token = jwt.sign({ userId: user._id }, env.JWT_SECRET as Secret, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        if (!checkMongooseConnection()) {
            return res.status(500).json({ message: 'Database connection not initialized' });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ 
            userId: user._id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                middleName: user.middleName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
        }, env.JWT_SECRET as Secret, { expiresIn: '1h' });
        
        console.log('login success')

        res.status(200).json({
            token,
            user: {
                userId: user._id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                middleName: user.middleName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
            },
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
