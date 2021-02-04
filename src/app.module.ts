import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Modules from '@api/modules';

import { LoggerModule } from '@shared/logger/logger.module';

import { AuthModule } from '@shared/auth/auth.module';
import { DatabaseModule } from '@database/database.module';
import { PaginationMiddleware } from '@shared/pagination/middlewares/pagination.middleware';

@Module({
    imports: [ConfigModule.forRoot(), DatabaseModule, AuthModule, LoggerModule, ...Modules],
    providers: [AuthModule],

    controllers: [],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(PaginationMiddleware).forRoutes({ path: '*', method: RequestMethod.GET });
    }
}
