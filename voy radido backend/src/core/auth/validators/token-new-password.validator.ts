import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isValidToken', async: true })
@Injectable()
export class IsValidTokenConstraint implements ValidatorConstraintInterface {
  constructor(private jwtService: JwtService) {}

  async validate(value: string) {
    try {
      this.jwtService.verify(value);
      return true;
    } catch (error) {
      throw new UnauthorizedException('No autorizado');
    }
  }
}
