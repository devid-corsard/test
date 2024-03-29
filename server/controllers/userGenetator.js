import axios from 'axios';
import { pool, SQL } from '../db.js';
import { createError } from '../error.js';

let allowGenerate = true;
const TIMEOUT_GENERATE = 10_000;

export const generateUsers = async (req, res, next) => {
  if (!allowGenerate) {
    res.status(200).json({
      message: `You can generate only once a ${TIMEOUT_GENERATE / 1000}s`,
    });
    return;
  }
  const link =
    'https://randomuser.me/api/?inc=name,email,registered,picture&results=45&noinfo';
  try {
    const { data } = await axios.get(link);
    const usersArr = data.results.map((u) => [
      u.name.first + u.name.last,
      u.email,
      '+380' + Math.floor(100_000_000 + Math.random() * 900_000_000),
      Math.ceil(Math.random() * 4),
      u.picture.medium,
    ]);

    const client = await pool.connect();

    await Promise.all(
      usersArr.map(
        (user) => (
          client.query(SQL.CREATE_USER, user),
          client.query(SQL.INC_USERS_AMOUNT)
        )
      )
    );

    client.release();

    allowGenerate = false;
    setTimeout(() => {
      allowGenerate = true;
    }, TIMEOUT_GENERATE);

    res.status(200).json({ message: 'Added 45 users to DB!' });
  } catch (err) {
    console.error('Failed to generate users:', err);
    next(err);
  }
};

export const deleteAllUsers = async (req, res, next) => {
  try {
    const client = await pool.connect();

    await client.query(SQL.DELETE_ALL_USERS);
    await client.query(SQL.SET_USER_AMOUNT_ZERO);

    client.release();

    res.status(200).json({ message: 'Database cleared!' });
  } catch (err) {
    console.error('Failed to delete all users:', err);
    next(err);
  }
};
