import { BelongsToMeConstraint } from './validators/belongs-to-me.validator';
import { Module } from '@nestjs/common';
import { UsersModule } from 'src/core/users/users.module';
import { IsUniqueConstraint } from './validators/is-unique.validator';
import { ExistsConstraint } from './validators/exists.validator';

@Module({
  providers: [IsUniqueConstraint, ExistsConstraint, BelongsToMeConstraint],
  imports: [UsersModule],
})
export class SharedModule {}
