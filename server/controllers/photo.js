import path from 'path';

export const getPhoto = async (req, res, next) => {
  const filePath = path.resolve('../storage', req.params.id);
  res.sendFile(filePath);
};
