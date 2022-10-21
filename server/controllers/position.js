import { createError } from '../error.js';
import { pool, SQL } from '../db.js';

export const getPositions = async (req, res, next) => {
  try {
    const client = await pool.connect();
    const { rows } = await client.query(SQL.SELECT_POSITIONS);
    client.release();

    if (!rows.length) return next(createError(422, 'Positions not found'));
    res
      .status(200)
      .json({
        success: true,
        positions: rows.map((p) => ({ id: p.position_id, name: p.position })),
      });
  } catch (err) {
    next(err);
  }
};
