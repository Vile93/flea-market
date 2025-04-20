import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean {
        const requiredClassRoles = this.reflector.get<string[]>('roles', context.getClass());
        const requiredMethodRoles = this.reflector.get<string[]>('roles', context.getHandler());
        const req: Request = context.switchToHttp().getRequest();
        if (requiredClassRoles && requiredClassRoles.includes(req.user?.payload?.role)) {
            return true;
        }
        if (requiredMethodRoles && requiredMethodRoles.includes(req.user?.payload?.role)) {
            return true;
        }
        return false;
    }
}
