import jwt from 'jsonwebtoken';

export const getToken = async (req, res, next) => {
  const token = jwt.sign({ user_id: req.body.user_id }, process.env.TOKEN_KEY, {
    expiresIn: '40m',
  });

  res.status(200).cookie('token', token, { httpOnly: true }).json({
    success: true,
    token,
  });
};

export const confirmToken = async (req, res, next) => {
  const token = req.headers.token || req.cookies.token;
  res.status(200).json({
    success: true,
    token,
  });
};
