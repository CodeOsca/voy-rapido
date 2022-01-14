import { PreEvent } from './models/pre-event.mode';
import { PostEvent } from './models/post-event.model';
import { Global, Module } from '@nestjs/common';
import { MongoHooksEventService } from './mongo-hooks-event.service';

@Global()
@Module({
  providers: [MongoHooksEventService, PostEvent, PreEvent],
  exports: [MongoHooksEventService],
})
export class MongoHooksEventModule {}
