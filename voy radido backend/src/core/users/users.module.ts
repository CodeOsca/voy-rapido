import { ChangePaymentTypeToDailyConstraint } from './validators/change-payment-type-to-daily.validator';
import { UpdatedDataConstraint } from './validators/update-data.validator';
import { CommentsController } from './comments.controller';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users.schema';
import { UserSeeder } from './user.seeder';
import { MulterModule } from '@nestjs/platform-express';
import { onlyImage } from '../photos/validators/only-image.validator';
import { diskStorage } from 'multer';
import { setFileName } from '../photos/helpers/filename.helper';
import { ExistsEmailConstraint } from './validators/exists-email.validator';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MulterModule.register({
      fileFilter: onlyImage,
      storage: diskStorage({ filename: setFileName, destination: 'uploads' }),
    }),
  ],
  controllers: [UsersController, CommentsController],
  providers: [
    UsersService,
    UserSeeder,
    ExistsEmailConstraint,
    UpdatedDataConstraint,
    ChangePaymentTypeToDailyConstraint,
  ],
  exports: [UsersService],
})
export class UsersModule {}
