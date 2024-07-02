// models/Meeting.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IMeeting extends Document {
    adminId: string;
    userId: string;
    description: string;
    date: Date;
    start: Date;
    end: Date;
}

const MeetingSchema: Schema = new Schema({
    adminId: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
});

const Meeting = mongoose.model<IMeeting>('Meeting', MeetingSchema);

export { Meeting, IMeeting };
