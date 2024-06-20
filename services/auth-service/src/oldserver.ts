import express from 'express';
import mongoose, {ConnectOptions} from 'mongoose';
import { env } from './config';
import authRoutes from './routes/auth';

const app = express();
const PORT = env.PORT || 3000;
const MONGODB_URI = env.MONGODB_URI || 'mongodb://localhost:27017/passportextra';

app.use(express.json());
console.log(env);
// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}as ConnectOptions)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
