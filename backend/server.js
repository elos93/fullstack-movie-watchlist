import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import movieRoutes from './routes/movies.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
let mongoConnectionPromise = null;

async function connectToMongoDB() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!mongoConnectionPromise) {
    mongoConnectionPromise = mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000
    }).catch((error) => {
      mongoConnectionPromise = null;
      throw error;
    });
  }

  await mongoConnectionPromise;
}

app.use(cors());
app.options('*', cors());
app.use(express.json());

app.use('/movies', async (req, res, next) => {
  if (req.path === '/generate') {
    return next();
  }

  try {
    await connectToMongoDB();
    next();
  } catch (error) {
    res.status(500).json({ message: 'MongoDB connection error' });
  }
});

app.use('/movies', movieRoutes);

if (!process.env.VERCEL) {
  connectToMongoDB()
    .then(() => {
      app.listen(PORT);
    })
    .catch((error) => {
      console.error('MongoDB connection error:', error.message);
    });
}

export default app;
