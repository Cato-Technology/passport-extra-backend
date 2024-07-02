// form-service/controllers/formController.ts
import { Request, Response } from 'express';
import Form from '../models/Form';
import Submission from '../models/Submission';
import { UserPayload } from '../../../types/express/types';

// Create a new form
export const createForm = async (req: Request, res: Response) => {
  try {
    console.log('User:', req.user);
    if (!req.user || !(req.user as UserPayload).userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const { title, description, fields } = req.body;
    const createdBy = (req.user as UserPayload).userId;  // Assuming userId is set in req.user by your auth middleware
    const newForm = new Form({ title, description, fields, createdBy });
    await newForm.save();
    res.status(201).json(newForm);
  } catch (error) {
    res.status(500).json({ message: 'Error creating form', error });
  }
};

// Retrieve all forms by a single user
export const getForms = async (req: Request, res: Response) => {
  try {
    const forms = await Form.find({ createdBy: (req.user as UserPayload).userId });  // Fetch forms created by the logged-in user
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving forms', error });
  }
};

// Retrieve all forms 
export const getAllForms = async (req: Request, res: Response) => {
    try {
      const forms = await Form.find();
      res.status(200).json(forms);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving forms', error });
    }
  };

// Retrieve a single form by ID
export const getFormById = async (req: Request, res: Response) => {
  try {
    const form = await Form.findById({ _id: req.params.id, createdBy: (req.user as UserPayload).userId });
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving form', error });
  }
};

// Submit a filled form
export const submitForm = async (req: Request, res: Response) => {
    try {
        const { formId, responses } = req.body;
        const userId = (req.user as UserPayload).userId; // assuming req.user contains the authenticated user's info

        const submission = new Submission({ form: formId, user: userId, responses });
        await submission.save();

        res.status(201).json(submission);
    } catch (error) {
        res.status(500).json({ message: 'Error submitting form', error });
    }
};
