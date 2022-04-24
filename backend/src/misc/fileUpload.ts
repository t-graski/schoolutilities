import { extname } from 'path';
import { RETURN_DATA, ID_STARTERS } from '../misc/parameterConstants';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const fileFilter = async (req, file, callback) => {
  const { elementUUID } = req.body;

  console.log(elementUUID);

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
    (req.originalName = file.filename),
  );
};

async function getElementIdByUUID(uuid: string) {
  const element = await prisma.courseElements.findFirst({
    where: {
      elementUUID: uuid,
    },
  });
  return element.elementId;
}

async function getAllowedExtensions(elementId: number) {
  const extensions = await prisma.fileSubmissionSettings.findFirst({
    where: {
      courseElementId: elementId,
    },
    select: {
      allowedFileTypes: true,
    },
  });
  console.log(elementId);
  return extensions.allowedFileTypes;
}
