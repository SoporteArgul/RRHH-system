import multer from 'multer';
import { uuid } from 'uuidv4';
import path from 'path';
import { Storage } from '@google-cloud/storage';




const upload = multer({
  storage:multer.memoryStorage(),
  limits:{
    fileSize:5*1024*1024,
    files:1,
      
  }
})


export default upload

