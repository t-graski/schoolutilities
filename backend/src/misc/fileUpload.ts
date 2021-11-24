import { extname } from 'path';
import { RETURN_DATA, ID_STARTERS } from '../misc/parameterConstants';
import { v4 as uuidv4 } from 'uuid';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(
      null,
      false,
      (req.fileValidationError = RETURN_DATA.INVALID_FILE),
    );
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const uuid = uuidv4();
  const fileExtName = extname(file.originalname);
  callback(null, `${ID_STARTERS.FILES}${uuid}${fileExtName}`);
};
