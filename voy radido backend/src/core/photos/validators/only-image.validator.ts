import { HttpException, HttpStatus } from '@nestjs/common';

export const onlyImage = (req, file, cb) => {
  const { mimetype } = file;
  const isValid = /image/.test(mimetype);
  if (!isValid) {
    return cb(
      new HttpException('Solo se permiten imágenes!', HttpStatus.BAD_REQUEST),
      false,
    );
  }
  cb(null, true);
};
