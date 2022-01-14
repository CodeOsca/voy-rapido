import { CommuneDto, CommuneDocument, Commune } from './communes.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class CommunesService {
  constructor(@InjectModel(Commune.name) private commune: Model<CommuneDocument>) {}

  create(commune: Partial<Commune>) {
    return this.commune.create(commune);
  }

  findAll(field: Partial<CommuneDto> = {}) {
    return this.commune.find(field);
  }

  findOne(field: Partial<CommuneDto>) {
    return this.commune.findOne(field);
  }

  updateOne(_id: Types.ObjectId, commune: Partial<CommuneDto>) {
    return this.commune.updateOne({ _id }, commune);
  }

  updateMany(_ids: Types.ObjectId[], commune: Partial<CommuneDto>) {
    return this.commune.updateMany({ _id: { $in: _ids } }, commune);
  }

  removeOne(_id: Types.ObjectId) {
    return this.commune.deleteMany({ _id });
  }

  removeMany(_ids: Types.ObjectId[]) {
    return this.commune.deleteMany({ _id: { $in: _ids } });
  }
}
