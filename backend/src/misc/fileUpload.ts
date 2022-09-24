import { extname } from 'path';
import { RETURN_DATA, ID_STARTERS } from '../misc/parameterConstants';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const fileFilter = async (req, file, callback) => {
  const { elementUUID } = req.body;

  const elementId = await getElementIdByUUID(elementUUID);
  let fileExtensions = await getAllowedExtensions(elementId);
  fileExtensions = fileExtensions.replace(/\s/g, '');
  const fileExtensionsArray = fileExtensions.split(',');

  const allowedExtensions = fileExtensionsArray
    .map((ext) => `\.(${ext.toLowerCase()})$`)
    .join('|');

  if (!file.originalname.match(allowedExtensions)) {
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

  callback(
    null,
    `${ID_STARTERS.FILES}${uuid}${fileExtName}`,
    (req.fileName = file.filename),
  );
};

async function getElementIdByUUID(uuid: string) {
  const element = await prisma.courseElements.findFirst({
    where: {
      courseElementUUID: uuid,
    },
  });
  return element.courseElementId;
}

async function getAllowedExtensions(elementId: number) {
  const extensions = await prisma.courseFileSubmissionSettings.findFirst({
    where: {
      courseFileSubmissionElementId: elementId,
    },
    select: {
      courseFileSubmissionAllowedFileTypes: true,
    },
  });
  console.log(elementId);
  return extensions.courseFileSubmissionAllowedFileTypes;
}
