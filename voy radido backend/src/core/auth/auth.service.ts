import { CurrentUser } from './interfaces/current-user.interface';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/core/users/users.schema';
import { UsersService } from 'src/core/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validate(email, password): Promise<any> {
    const user = await this.usersService.findOne({ email });

    if (!user) {
      return { user: null, message: 'El usuario no existe' };
    }

    if (!user.status) {
      return { user: null, message: 'Su cuenta esta deshabilitada' };
    }

    if (!user.verified) {
      return { user: null, message: 'Su cuenta no está verificada' };
    }

    if (!(await user['verifyPassword'](password))) {
      return { user: null, message: 'La contraseña es incorrecta' };
    }

    const { _id, role }: CurrentUser = user;
    return {
      user: { _id, role },
    };
  }

  async login(payload: Partial<User>) {
    return {
      token: this.jwtService.sign(payload),
      message: 'Logeado correctamente',
    };
  }

  register(user: Partial<User>) {
    return this.usersService.create(user);
  }

  generateForgotPasswordToken(_id: string) {
    return {
      token: this.jwtService.sign({ _id }, { expiresIn: '15m' }),
    };
  }
}
