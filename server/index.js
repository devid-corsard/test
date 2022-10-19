import express from 'express';
import dotenv from 'dotenv';
import tokenRoutes from './routes/tokenRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import positionsRoutes from './routes/positionsRoutes.js';

dotenv.config();

const port = process.env.PORT;

export const app = express();

app.use(express.json());

app.use('/api/v1/token', tokenRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/positions', positionsRoutes);
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
