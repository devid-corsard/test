import express from 'express';
import dotenv from 'dotenv';
import tokenRoutes from './routes/tokenRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import photoRoutes from './routes/photoRoutes.js';
import positionsRoutes from './routes/positionsRoutes.js';
import cookieParser from 'cookie-parser';

import pg from 'pg';

dotenv.config();

const port = process.env.PORT;

const { Pool } = pg;

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});
// const client = await pool.connect();
// const { rows } = await client.query(SQL.GET_ALL);

export const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/api/v1/token', tokenRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/positions', positionsRoutes);
app.use('/photo', photoRoutes);
app.use((err, res, req, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  const fails = err.fails || undefined;
  req.status(status).json({
    succsess: false,
    status,
    message,
    fails,
  });
});

app.listen(port, () => {
  // connect();
  console.log('Connected to server');
});
