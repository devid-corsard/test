import express from 'express';
import dotenv from 'dotenv';
import tokenRoutes from './routes/tokenRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import photoRoutes from './routes/photoRoutes.js';
import generatorRoutes from './routes/generatorRoutes.js';
import positionsRoutes from './routes/positionsRoutes.js';
import cookieParser from 'cookie-parser';
import pg from 'pg';
import path from 'path';

dotenv.config();

const port = process.env.PORT;

const { Pool } = pg;

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.resolve('../client/build')));

app.get(['/', '/:path'], (_req, res) => {
  res.sendFile(path.resolve('../client/build/index.html'));
});

app.use('/api/v1/token', tokenRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/positions', positionsRoutes);
app.use('/api/v1/generate', generatorRoutes);
app.use('/photo', photoRoutes);
app.use((err, _res, req, _next) => {
  if (err.message === 'File too large') {
    req.status(422).json({
      succsess: false,
      status: 422,
      message: 'Validation failed',
      fails: {
        photo: 'The photo may not be greater than 5 Mbytes.',
      },
    });
  } else if (err.custom) {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    const fails = err.fails || undefined;
    req.status(status).json({
      succsess: false,
      status,
      message,
      fails,
    });
  } else {
    console.error('Unhandled, unpredicted, unexpected error:', err);
    req.status(500).json({
      succsess: false,
      status: 500,
      message: 'Something went wrong',
    });
  }
});

app.listen(port, () => {
  console.log('Connected to server on port: ' + port);
});
