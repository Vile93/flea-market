import { Module } from '@nestjs/common';

@Module({
    exports: [PrismaModule],
    providers: [PrismaModule],
})
export class PrismaModule {}
