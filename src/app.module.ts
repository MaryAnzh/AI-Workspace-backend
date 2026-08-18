import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { PrismaModule } from './prismaService/prisma.module';
import { ThrottlerModule } from '@nestjs/throttler';
import * as C from './constants';

@Module({
  imports: [
    HealthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    ThrottlerModule.forRoot([
      {
        name: C.SHORT_THROTTLER,
        ttl: 60000,
        limit: 1,
      },
      {
        name: C.MEDIUM_THROTTLER,
        ttl: 60000,
        limit: 10,
      },
      {
        name: C.LONG_THROTTLER,
        ttl: 60000,
        limit: 100,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
