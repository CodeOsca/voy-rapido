import { Dispatch, DispatchesDocument, DispatchDto } from './dispatches.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Status } from './enums/status.enum';
import { DateString } from 'src/shared/services/date/date-string.service';

@Injectable()
export class DispatchesService {
  constructor(@InjectModel(Dispatch.name) private dispatches: Model<DispatchesDocument>) {}

  findAll(field: Partial<DispatchDto> = {}) {
    return this.dispatches.find(field);
  }

  findOne(field: Partial<DispatchDto>) {
    return this.dispatches.findOne(field);
  }

  findByStatus(status: Status[]) {
    return this.dispatches.find({ status: { $in: status } });
  }

  findByProduct(productID: Types.ObjectId) {
    return this.dispatches.findOne({ products: { $in: [productID] } });
  }

  findByUserAndStatus(userID: Types.ObjectId, status: Status[]) {
    return this.dispatches.find({ user: userID, status: { $in: status } });
  }

  findAllPendingToWithdraw() {
    return this.dispatches.find({
      retirementDate: new DateString().date,
      $or: [{ status: Status.PAID }, { status: Status.SUBSCRIPTION }],
    });
  }

  create(dispatch: Partial<Dispatch>) {
    return this.dispatches.create(dispatch);
  }

  async updateOne(_id: Types.ObjectId, dispatchDto: Partial<DispatchDto>) {
    let dispatch = await this.findOne({ _id });
    Object.assign(dispatch, dispatchDto);
    return dispatch.save();
  }

  async removeOne(_id: Types.ObjectId) {
    const dispatch = await this.findOne({ _id });
    return dispatch.remove();
  }
}
