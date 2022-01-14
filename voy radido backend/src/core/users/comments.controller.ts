import { CurrentUser } from './../auth/interfaces/current-user.interface';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/core/auth/decorators/roles.decorator';
import { Role } from './enums/role.enum';
import { SkipAuth } from 'src/core/auth/decorators/is-public.decorator';
import { User } from 'src/shared/decorators/user.decorator';
import { SetCommentDto, ToggleCommentDto } from './dto';

@ApiBearerAuth()
@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly usersService: UsersService) {}

  @SkipAuth()
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @SkipAuth()
  @Get('visibles')
  findAllVisible() {
    return this.usersService.findAll({ 'comment.visible': true });
  }

  @Roles(Role.ADMIN, Role.CUSTOMER)
  @Post()
  async set(@Body() comment: SetCommentDto, @User() { _id }: CurrentUser) {
    comment['visible'] = false;
    await this.usersService.updateOne(_id, { comment });
    return 'Comentario actualizado';
  }

  @Roles(Role.ADMIN)
  @Post('visible')
  async toogleVisibility(@Body() { visible, _id }: ToggleCommentDto) {
    const { comment } = await this.usersService.findOne({ _id });
    comment.visible = visible;
    await this.usersService.updateOne(_id, { comment });
    return 'Comentario actualizado';
  }
}
