import multer from 'multer';
import path from 'path';

const root = path.resolve();

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${root}/../storage/`);
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    const filename = `${Date.now().toString(32)}.${ext}`;
    req.body.image = process.env.SERVER_URL + '/photo/' + filename;
    cb(null, filename);
  },
});

const multerFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image')) {
    return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'));
  }

  cb(null, true);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 1024 * 1024 * 5, files: 1 },
});

export const uploadImageDisk = upload.single('photo');
