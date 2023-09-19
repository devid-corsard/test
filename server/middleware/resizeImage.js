import path from 'path';
import sharp from 'sharp';
import tinify from 'tinify';

tinify.key = process.env.TINIFY_KEY;

export const resizeImage = async (req, _res, next) => {
  try {
    const file = req.file;
    if (!file) return next();

    const fileName = `tiny${Date.now().toString(32)}.jpeg`;
    // await sharp(req.file?.buffer)
    //   .resize(70, 70)
    //   .toFormat('jpeg')
    //   // .jpeg({ quality: 90 })
    //   .toFile(path.resolve('../storage', fileName));
    const cropped = await sharp(req.file?.buffer).resize(70, 70).toBuffer();

    await tinify
      .fromBuffer(cropped)
      .convert({ type: 'image/jpeg' })
      .toFile(path.resolve('../storage', fileName));

    req.body.image = process.env.SERVER_URL + '/photo/' + fileName;

    next();
  } catch (err) {
    console.error('Failed to resize image:', err);
    next(err);
  }
};
