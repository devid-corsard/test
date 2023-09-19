import jwt from 'jsonwebtoken';
import { pool, SQL } from '../db.js';

export const getToken = async (_req, res, next) => {
  const token = jwt.sign(
    { token_id: Date.now().toString(32) },
    process.env.TOKEN_KEY,
    {
      expiresIn: '40m',
    }
  );

  try {
    const client = await pool.connect();
    const { rows } = await client.query(SQL.NEW_TOKEN, [token]);
    client.release();
  } catch (err) {
    console.error('Failed to set token:', err);
    next(err);
  }

  res.status(200).cookie('token', token, { httpOnly: true }).json({
    success: true,
    token,
  });
};

export const confirmToken = async (req, res, _next) => {
  const token = req.headers.token || req.cookies.token;
  res.status(200).json({
    success: true,
    token,
  });
};
