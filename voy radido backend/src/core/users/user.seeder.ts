import { PaymentType } from './enums/payment-type.enum';
import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { Role } from 'src/core/users/enums/role.enum';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/core/users/users.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserSeeder {
  constructor(@InjectModel(User.name) private user: Model<UserDocument>) {}

  @Command({
    command: 'create:user',
    describe: 'create a user',
    autoExit: true,
  })
  async create() {
    const user = await this.user.create({
      name: 'administrador',
      role: Role.ADMIN,
      email: 'admin@hellomundochile.com',
      password: 'voyrapido1234',
      verified: true,
      phone: '000',
      withdrawalAddress: '000',
      storeName: 'admin',
      paymentType: PaymentType.MONTHLY,
    });
    console.log(user);
  }
}
