import multer from 'multer';
import { uuid } from 'uuidv4';
import path from 'path';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads');
    },
    filename: function(req, file, cb) {
      cb(null, uuid()+path.extname(file.originalname));
    }
  });
const upload =multer({ storage: storage });
export default upload

