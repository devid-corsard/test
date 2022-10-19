import { createError } from '../error.js';

const fails = {
  name: ['The name must be at least 2 characters.'],
  email: ['The email must be a valid email address.'],
  phone: ['The phone field is required.'],
  position_id: ['The position id must be an integer.'],
  photo: ['The photo may not be greater than 5 Mbytes.', 'Image is invalid.'],
};

export const createUser = async (req, res, next) => {
  if (
    !(
      req.body.name &&
      req.body.email &&
      req.body.phone &&
      req.body.position_id &&
      req.file
    )
  )
    return next(createError(422, 'Validation failed', fails));
  try {
    console.log(req.body, req.file);
    res.status(200).json({
      success: true,
      user_id: 23,
      message: 'New user successfully registered',
    });
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  res.status(200).json({ users: [1, 2, 3, 4, 5] });
};

export const getUserById = async (req, res, next) => {
  res.status(200).json({
    user: {
      id: 1,
      name: 'Superstar',
      email: 'Superstar@gmail.com',
      phone: '+380957398462',
      position: 'Security',
      position_id: 2,
      photo:
        'https://frontend-test-assignment-api.abz.agency/images/users/5b9626f0157d224.jpeg',
    },
  });
};
