import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventRecorder } from './event-recorder.model';
import { Document, MongooseDocumentMiddleware, Schema } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostEvent implements EventRecorder {
  private middlewares: MongooseDocumentMiddleware[] = ['save', 'validate', 'updateOne', 'deleteOne', 'remove'];
  constructor(private readonly eventEmitter: EventEmitter2) {}

  register<T extends Document>(modelName: string, schema: Schema<T>) {
    for (const middleware of this.middlewares) {
      schema.post(middleware, async (doc) => {
        const eventName = modelName + '.post.' + middleware;
        await this.eventEmitter.emitAsync(eventName, doc);
      });
    }
  }
}
