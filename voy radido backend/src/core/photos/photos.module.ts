import { setFileName } from './helpers/filename.helper';
import { diskStorage } from 'multer';
import { onlyImage } from './validators/only-image.validator';
import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { Photo, PhotoSchema } from './photo.schema';

@Module({
  providers: [PhotosService],
  controllers: [PhotosController],
  imports: [
    MongooseModule.forFeature([{ name: Photo.name, schema: PhotoSchema }]),
    MulterModule.register({
      fileFilter: onlyImage,
      storage: diskStorage({ filename: setFileName, destination: 'uploads' }),
    }),
  ],
})
export class PhotosModule {}
