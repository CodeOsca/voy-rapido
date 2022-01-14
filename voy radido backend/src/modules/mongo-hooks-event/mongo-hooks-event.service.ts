import { PreEvent } from './models/pre-event.mode';
import { PostEvent } from './models/post-event.model';
import { Injectable } from '@nestjs/common';

import { Document, Schema } from 'mongoose';

@Injectable()
export class MongoHooksEventService {
  constructor(private postEvent: PostEvent, private preEvent: PreEvent) {}

  public forSchema<T extends Document>(modelName: string, schema: Schema<T>) {
    this.postEvent.register<T>(modelName, schema);
    this.preEvent.register<T>(modelName, schema);
    return schema;
  }
}
