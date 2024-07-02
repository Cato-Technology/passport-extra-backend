// controllers/availabilityController.ts
import { Request, Response } from 'express';
import { Availability } from '../models/Availability';
import { UserPayload } from '../../../types/express/types';
import moment from 'moment'; 

export const getAdminAvailability = async (req: Request, res: Response) => {
    try {
        
          const Id = (req.user as UserPayload).userId;
          const { month, year } = req.params;

          // Validate month and year
          if (!month || !year) {
              return res.status(400).json({ message: 'Month and year are required' });
          }
  
          // Parse month and year
          const startOfMonth = moment(`${year}-${month}-01`).startOf('month').toDate();
          const endOfMonth = moment(`${year}-${month}-01`).endOf('month').toDate();
  
          // Find availability for the given month
          const availability = await Availability.find({
            date: {
                $gte: startOfMonth,
                $lte: endOfMonth
            }
        });
  
          res.status(200).json(availability);
      } catch (error) {
          res.status(500).json({ message: 'Error fetching availability', error });
      }
};

// New setAdminAvailability function
export const setAdminAvailability = async (req: Request, res: Response) => {
    try {
        const { availability } = req.body;

        if ((req.user as UserPayload).role !== 'admin') { // Use type assertion to ensure correct type
            return res.status(403).json({ message: 'Forbidden: Admins only' });
          }

          const adminId = (req.user as UserPayload).userId;

        // Validate input
        if (!availability || !Array.isArray(availability)) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        // Set availability for each day
        for (const dayAvailability of availability) {
            const { day, startTime, endTime, isAvailable } = dayAvailability;

            // Create a date object for the availability date without time
            const startOfMonth = moment().startOf('month');
            const endOfMonth = moment().endOf('month');

            // Loop through the month to find all specified days
            let currentDate = startOfMonth.clone();
            while (currentDate <= endOfMonth) {
                if (currentDate.format('dddd') === day) {
                    const date = currentDate.toDate();
                    const start = moment(date).set({ hour: startTime.split(':')[0], minute: startTime.split(':')[1], second: startTime.split(':')[2] }).toDate();
                    const end = moment(date).set({ hour: endTime.split(':')[0], minute: endTime.split(':')[1], second: endTime.split(':')[2] }).toDate();

                    console.log(`Setting availability for ${currentDate.format('YYYY-MM-DD')} - Start: ${start}, End: ${end}, Available: ${isAvailable}`);

                    const result = await Availability.updateOne(
                        { adminId, date: date },
                        { $set: { availableSlots: isAvailable ? [{ start, end }] : [] } },
                        { upsert: true }
                    );

                    console.log('MongoDB Update Result:', result);

                    const updatedRecord = await Availability.findOne({ adminId, date: date });
                    console.log(`Updated Record: ${JSON.stringify(updatedRecord)}`);
                }
                currentDate.add(1, 'day');
            }
        }

        res.status(200).json({ message: 'Availability updated successfully' });
    } catch (error) {
        console.error('Error setting availability:', error);
        res.status(500).json({ message: 'Error setting availability', error });
    }
};
