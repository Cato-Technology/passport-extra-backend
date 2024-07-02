import mongoose, { Document, Schema } from 'mongoose';

interface IFormField {
  name: string;
  type: string;
  label: string;
  required: boolean;
  options?: string[];
}

interface IFormFieldDocument extends IFormField, Document {}

interface IForm extends Document {
  title: string;
  description: string;
  fields: IFormFieldDocument[];
  createdBy: mongoose.Types.ObjectId;
}

const FormFieldSchema = new Schema<IFormFieldDocument>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  label: { type: String, required: true },
  required: { type: Boolean, required: true },
  options: [String],
});

const FormSchema = new Schema<IForm>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  fields: { type: [FormFieldSchema], required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Form = mongoose.model<IForm>('Form', FormSchema);

export default Form;
