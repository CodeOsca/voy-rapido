import { CurrentUser } from './../../core/auth/interfaces/current-user.interface';
import { NotificationsService } from './services/notifications.service';
import { Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/core/auth/decorators/roles.decorator';
import { Role } from 'src/core/users/enums/role.enum';
import { User } from 'src/shared/decorators/user.decorator';

@Roles(Role.ADMIN, Role.CUSTOMER)
@ApiBearerAuth()
@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsServices: NotificationsService) {}

  @Get()
  findAll(@User() { _id }: CurrentUser) {
    return this.notificationsServices.findAll({ user: _id });
  }

  @Post('change-visibility')
  async changeVisibility() {
    await this.notificationsServices.changeVisibilityToView();
    return 'Notificaciones actualizadas';
  }
}
