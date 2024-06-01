// src/controllers/auth.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt, {Secret} from 'jsonwebtoken';
import User from '../models/User';
import { env } from '../config';
// Check if JWT_SECRET environment variable is defined
console.log(env.JWT_SECRET);
console.log(env);

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not defined');
  }

export const register = async (req: Request, res: Response) => {
    try {
      // Extract data from request body
      const { username, email, phone_number, password } = req.body;
  
      // Check if user already exists
      let user = await User.findOne({ email });
      let user_name = await User.findOne({ username });
      let phone_no = await User.findOne({phone_number});
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      if (user_name) {
        return res.status(400).json({ message: 'User already exists' });
      }

      if (phone_no) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user
      user = new User({
        username,
        email,
        phone_number,
        password: hashedPassword,
      });
  
      // Save user to database
      await user.save();
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, env.JWT_SECRET as Secret, { expiresIn: '1h' });
  
      // Send response with token
      res.status(201).json({ token });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

  export const login = async (req: Request, res: Response) => {
    try {
      // Extract data from request body
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, env.JWT_SECRET as Secret, { expiresIn: '1h' });
  
      // Send response with token
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
