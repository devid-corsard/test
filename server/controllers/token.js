import jwt from 'jsonwebtoken';

export const getToken = async (req, res, next) => {
  const token = jwt.sign({ foo: 'bar' }, process.env.TOKEN_KEY, {
    expiresIn: '40m',
  });

  res.status(200).json({
    success: true,
    token,
  });
};
