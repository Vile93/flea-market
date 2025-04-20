import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/role.guard';

export const Roles = (...roles: Role[]) =>
    applyDecorators(SetMetadata('roles', roles), UseGuards(JwtAuthGuard, RolesGuard));
