import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Modules from '@api/modules';

import { LoggerModule } from '@shared/logger/logger.module';

import { AuthModule } from '@shared/auth/auth.module';
import { PaginationMiddleware } from '@shared/middlewares/pagination.middleware';
import { JwtStrategy } from '@shared/auth/jwt/jwt.strategy';
import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin';
import { FirebaseAdminConfig } from '@config';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        DatabaseModule,
        AuthModule,
        LoggerModule,
        FirebaseAdminModule.forRootAsync({
            useFactory: () => FirebaseAdminConfig,
        }),
        ...Modules,
    ],
    providers: [AuthModule, JwtStrategy],

    controllers: [],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(PaginationMiddleware).forRoutes({ path: '*', method: RequestMethod.GET });
    }
}
