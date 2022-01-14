import { Types } from 'mongoose';
import { DispatchesService } from './../../../../core/dispatches/dispatches.service';
import { Injectable } from '@nestjs/common';
import { Calculator } from 'src/shared/interface/calculator.interface';

@Injectable()
export class DispatchesCalculator implements Calculator<Types.ObjectId[]> {
  constructor(private dispatchesService: DispatchesService) {}

  async calculate(dispatches_id: Types.ObjectId[]): Promise<number> {
    let total = 0;
    for (const _id of dispatches_id) {
      const dispatch = await this.dispatchesService.findOne({ _id });
      total += dispatch.amount;
    }
    return total;
  }
}
