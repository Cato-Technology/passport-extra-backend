// models/Availability.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IAvailability extends Document {
    adminId: string;
    date: Date;
    availableSlots: { start: Date; end: Date }[];
}

const AvailabilitySchema: Schema = new Schema({
    adminId: { type: String, required: true },
    date: { type: Date, required: true },
    availableSlots: [{ start: Date, end: Date }],
});

const Availability = mongoose.model<IAvailability>('Availability', AvailabilitySchema);

export { Availability, IAvailability };
