import { createError } from '../error.js';
import { pool, SQL } from '../db.js';
import fails from '../fails.js';

// const fails = {
//   name: ['The name must be at least 2 characters.'],
//   email: ['The email must be a valid email address.'],
//   phone: ['The phone field is required.'],
//   position_id: ['The position id must be an integer.'],
//   photo: ['The photo may not be greater than 5 Mbytes.', 'Image is invalid.'],
//   count: ['The count must be an integer.'],
//   page: ['The page must be at least 1.'],
// };

export const createUser = async (req, res, next) => {
  const { name, email, phone, position_id, image } = req.body;

  try {
    const client = await pool.connect();
    const {
      rows: [user],
    } = await client.query(SQL.CREATE_USER, [
      name,
      email,
      phone,
      position_id,
      image,
    ]);
    await client.query(SQL.INC_USERS_AMOUNT);
    client.release();

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

  if (page < 1 || !page)
    return next(createError(422, 'Validation failed', fails.page));

  if (count < 1 || count > 100 || !count)
    return next(createError(422, 'Validation failed', fails.count));

  if (!offset && offset !== 0) {
    offset = (page - 1) * count;
  }

  try {
    const client = await pool.connect();
    const dbCount = await client.query(SQL.GET_USERS_AMOUNT);

    const total_users = dbCount.rows[0].amount;
    const total_pages = Math.ceil(total_users / count);

    if (page > total_pages) return next(createError(404, 'Page not found'));

    const { rows } = await client.query(SQL.SELECT_BY_OFFSET_AND_LIMIT, [
      offset,
      count,
    ]);
    client.release();

    const next_url =
      page < total_pages
        ? process.env.SERVER_URL +
          `/api/v1/users?page=${page + 1}&count=${count}`
        : null;

    const prev_url =
      page > 1
        ? process.env.SERVER_URL +
          `/api/v1/users?page=${page - 1}&count=${count}`
        : null;

    const data = {
      success: true,
      page,
      total_pages,
      total_users,
      count,
      links: {
        next_url,
        prev_url,
      },
      users: rows,
    };

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  if (!Number(req.params.id))
    return next(
      createError(400, 'Validation failed', { user_id: fails.user_id[0] })
    );

  try {
    const client = await pool.connect();
    const { rows } = await client.query(SQL.SELECT_BY_ID, [req.params.id]);
    client.release();

    if (!rows.length) {
      return next(
        createError(
          404,
          'The user with the requested identifier does not exist',
          { user_id: fails.user_id[1] }
        )
      );
    }

    res.status(200).json({
      user: rows[0],
    });
  } catch (err) {
    next(err);
  }
};
