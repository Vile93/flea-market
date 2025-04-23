import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENV } from 'src/common/types/env.enum';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService);
    app.setGlobalPrefix(`/api/v1`);
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    app.use(cookieParser());
    await app.listen(config.getOrThrow(ENV.PORT));
}

bootstrap();
