import { Types } from 'mongoose';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    request.user._id = Types.ObjectId(request.user._id);
    return request.user;
  },
);
