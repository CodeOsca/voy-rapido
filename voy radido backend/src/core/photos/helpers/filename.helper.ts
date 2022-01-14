import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

export const setFileName = (req, file, callback) => {
  const fileExtName = extname(file.originalname);
  callback(null, uuidv4() + fileExtName);
};
