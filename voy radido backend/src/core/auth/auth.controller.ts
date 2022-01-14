import { EventEmitter2 } from 'eventemitter2';
import { CurrentUser } from './interfaces/current-user.interface';
import { UsersService } from './../users/users.service';
import { Controller, Post, UseGuards, Request, Get, Body, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SkipAuth } from './decorators/is-public.decorator';
import { Role } from 'src/core/users/enums/role.enum';
import { Roles } from './decorators/roles.decorator';
import { User } from 'src/shared/decorators/user.decorator';
import { JwtService } from '@nestjs/jwt';
import { ForgotPasswordDto, LoginDto, NewPasswordDto, RegisterDto, TokenDto, VerifyAccountDto } from './dto';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private eventEmitter: EventEmitter2,
  ) {}

  @SkipAuth()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @SkipAuth()
  @Post('register')
  async create(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    this.eventEmitter.emit('user.register', user);
    return 'Correo de verificación enviado exitosamente';
  }

  @Roles(Role.ADMIN, Role.CUSTOMER)
  @Get('profile')
  async getProfile(@User() { _id }: CurrentUser) {
    const user = await this.usersService.findOne({ _id }).populate('commune');
    return user;
  }

  @Roles(Role.ADMIN)
  @Post('verify-account')
  async verifyAccount(@Body() { _id, verified }: VerifyAccountDto) {
    await this.usersService.updateOne(_id, { verified });
    const user = await this.usersService.findOne({ _id });
    if (!verified) await this.usersService.removeOne(_id);
    verified ? this.eventEmitter.emit('user.accepted', user) : this.eventEmitter.emit('user.rejected', user);
    return 'Respuesta enviada exitosamente';
  }

  @SkipAuth()
  @Post('forgot-password')
  async recoverPassword(@Body() { email }: ForgotPasswordDto) {
    const user = await this.usersService.findOne({ email });
    const { token } = this.authService.generateForgotPasswordToken(user._id);
    this.eventEmitter.emit('user.forgot', user, token);
    return 'Correo enviado exitosamente';
  }

  @SkipAuth()
  @Post('new-password/:token')
  async newPassword(@Param() { token }: TokenDto, @Body() { password }: NewPasswordDto) {
    const { _id } = <CurrentUser>this.jwtService.decode(token);
    await this.usersService.updateOne(_id, { password });
    return 'Contraseña actualizada';
  }
}
