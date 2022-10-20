import { createError } from '../error.js';
import { db, SQL } from '../db.js';

const fails = {
  name: ['The name must be at least 2 characters.'],
  email: ['The email must be a valid email address.'],
  phone: ['The phone field is required.'],
  position_id: ['The position id must be an integer.'],
  photo: ['The photo may not be greater than 5 Mbytes.', 'Image is invalid.'],
  count: ['The count must be an integer.'],
  page: ['The page must be at least 1.'],
};

export const createUser = async (req, res, next) => {
  const { name, email, phone, position_id, image } = req.body;

  if (!(name && email && phone && position_id && image && req.file))
    return next(createError(422, 'Validation failed', fails));

  try {
    const client = await db.connect();
    const {
      rows: [user],
    } = await client.query(SQL.CREATE_USER, [
      name,
      email,
      phone,
      position_id,
      image,
    ]);
    res.status(200).json({
      success: true,
      user_id: user.id,
      message: 'New user successfully registered',
    });
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  const page = Number(req.query.page);
  const count = Number(req.query.count);
  let offset = Number(req.query.offset);
  // const { page = 1, count = 6 } = req.query;
  // let { offset } = req.query;

  if (page < 1 || !page)
    return next(createError(422, 'Validation failed', fails.page));

  if (count < 1 || count > 100 || !count)
    return next(createError(422, 'Validation failed', fails.count));

  if (!offset && offset !== 0) {
    offset = (page - 1) * count;
  }

  try {
    const client = await db.connect();
    const { rows } = await client.query(SQL.SELECT_BY_OFFSET_AND_LIMIT, [
      offset,
      count,
    ]);
    res.status(200).json({ users: rows });
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const client = await db.connect();
    // const { rows } = await client.query(SQL.SELECT_BY_ID);
    const { rows } = await client.query(SQL.SELECT_BY_ID, [req.params.id]);
    res.status(200).json({
      user: rows[0],
    });
  } catch (err) {
    next(err);
  }
};
