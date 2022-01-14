import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventRecorder } from './event-recorder.model';
import { Document, MongooseDocumentMiddleware, Schema } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PreEvent implements EventRecorder {
  private middlewares: MongooseDocumentMiddleware[] = ['save', 'validate', 'updateOne', 'remove', 'deleteOne'];
  constructor(private readonly eventEmitter: EventEmitter2) {}

  register<T extends Document>(modelName: string, schema: Schema<T>) {
    const eventEmitter = this.eventEmitter;
    for (const middleware of this.middlewares) {
      schema.pre(middleware, async function (next) {
        const eventName = modelName + '.pre.' + middleware;
        await eventEmitter.emitAsync(eventName, this);
        next();
      });
    }
  }
}
