import jwt from 'jsonwebtoken';

export const getToken = async (req, res, next) => {
  const token = jwt.sign(
    { uuid: Date.now().toString(32) },
    process.env.TOKEN_KEY,
    { expiresIn: '40m' }
  );

  res.status(200).cookie('token', token, { httpOnly: true }).json({
    success: true,
    token,
  });
};

export const confirmToken = async (req, res, next) => {
  const token = req.cookies.token || req.headers.token;
  res.status(200).json({
    success: true,
    token,
  });
};
