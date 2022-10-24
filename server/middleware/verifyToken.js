import jwt from 'jsonwebtoken';
import { createError } from '../error.js';
import { pool, SQL } from '../db.js';

export const verifyToken = async (req, res, next) => {
  const token = req.headers.token || req.cookies.token;
  if (!token) return next(createError(401, 'You are not authenticated'));

  try {
    const client = await pool.connect();
    const { rows } = await client.query(SQL.CHECK_TOKEN_AND_DELETE, [token]);
    client.release();
    if (!rows.length) return next(createError(403, 'Token is not valid'));
  } catch (err) {
    next(err);
  }

  jwt.verify(token, process.env.TOKEN_KEY, (err, decode) => {
    if (err) return next(createError(403, 'Token is not valid'));
    next();
  });
};
