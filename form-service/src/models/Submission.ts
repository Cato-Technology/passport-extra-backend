import mongoose, { Document, Schema } from 'mongoose';

interface ISubmission extends Document {
  form: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  responses: { [key: string]: any };
}

const SubmissionSchema = new Schema<ISubmission>({
  form: { type: Schema.Types.ObjectId, ref: 'Form', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  responses: { type: Map, of: Schema.Types.Mixed, required: true },
}, { timestamps: true });

const Submission = mongoose.model<ISubmission>('Submission', SubmissionSchema);

export default Submission;
