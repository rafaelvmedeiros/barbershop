import { extname, resolve } from 'path';
import multer from 'multer';
import crypto from 'crypto';

const MIME_TYPE_MAP = {
  'image/jpeg': 'jpeg',
  'image/png': 'png',
  'image/bmp': 'bmp',
};

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        if (typeof MIME_TYPE_MAP[file.mimetype] === 'undefined') {
          const error = new Error(`Invalid Mime Type: ${file.mimetype}`);
          return cb(error, 'public/tmp');
        }

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
