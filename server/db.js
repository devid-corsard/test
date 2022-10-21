import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const SQL = {
  CREATE_USER: `
    INSERT INTO users(name, email, phone, position_id, photo, registration_timestamp) 
    VALUES($1, $2, $3, $4, $5, NOW())
    RETURNING *
  `,

  SELECT_BY_OFFSET_AND_LIMIT: `
    SELECT * FROM users
    OFFSET $1 LIMIT $2
  `,

  SELECT_BY_ID: `
    SELECT *
    FROM users
    LEFT JOIN positions
    ON positions.position_id = users.position_id
    WHERE id = $1
  `,

  SELECT_POSITIONS: `SELECT * FROM positions`,

  GET_USERS_AMOUNT: `
    SELECT amount
    FROM counter
    WHERE name = 'total_users'
  `,

  INC_USERS_AMOUNT: `
    UPDATE counter
    SET amount = amount + 1
    WHERE name = 'total_users'
  `,

  SET_USER_AMOUNT_ZERO: `
    UPDATE counter
    SET amount = 0
    WHERE name = 'total_users'
  `,

  DELETE_ALL_USERS: `
    DELETE FROM users
    WHERE id>0
  `,
};
