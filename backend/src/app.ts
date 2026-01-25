import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { toNodeHandler } from 'better-auth/node';

import { auth } from './lib/auth';
import errorHandler from './utils/errorHandler';
import dreamRouter from './routes/dream.route';

const app = express();

if (!process.env.FRONTEND_URL)
  throw new Error('FRONTEND_URL required in the .env');

// Cors Configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);

// Authentication Route Handler
app.all('/api/auth/{*any}', toNodeHandler(auth));

// Middlewares
app.use(express.json());

// Routes
app.use('/api/dream/', dreamRouter);

// Error Handler
app.use(errorHandler);

export default app;
