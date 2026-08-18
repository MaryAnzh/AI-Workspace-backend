import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from '../../models';

export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): RequestWithUser['user'] => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    return request.user;
  },
);
