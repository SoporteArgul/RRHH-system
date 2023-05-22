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


const maxSize=3*1024 *1024
const upload =multer({ 
    storage: storage,
    // fileFilter(req, file, cb) {
    //     if(file.mimetype=="image/png" || file.mimetype=="image/jpg" || file.mimetype=="image/jpeg")cb(null,true)
    //     else cb(null,true)
    //     return cb(new Error('Only .png, .jpg and .jpeg formate allowed!'));
    // },
    limits:{fileSize:maxSize}

   })



export default upload

