import { PhotoRemover } from './model/remover.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Photo, PhotoDocument } from './photo.schema';

@Injectable()
export class PhotosService {
  constructor(@InjectModel(Photo.name) private photo: Model<PhotoDocument>) {}
  fidAll() {
    return this.photo.find();
  }

  insertMany(names: Partial<Photo[]>) {
    return this.photo.insertMany(names);
  }

  async removeOne(_id: Types.ObjectId) {
    const { name } = await this.photo.findOne({ _id });
    new PhotoRemover(name).remove();
    return this.photo.deleteOne({ _id });
  }
}
