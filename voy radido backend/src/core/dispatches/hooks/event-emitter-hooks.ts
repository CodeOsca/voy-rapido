import { DispatchDto } from '../dispatches.schema';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventEmitterHooksRecorder {
  constructor(private eventEmitter: EventEmitter2) {}

  @OnEvent('Dispatch.pre.save')
  async retirementDate(dispatch: DispatchDto) {
    if (!dispatch['isNew'] && dispatch['isModified']('retirementDate')) {
      this.eventEmitter.emit('dispatch.reschedule.retirement-date', dispatch);
    }
  }
}
