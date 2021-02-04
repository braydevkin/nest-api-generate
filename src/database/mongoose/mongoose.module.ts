import { MONGOOSE_CONNECTION_STRING } from '@/config/Constants';
import { Module } from '@nestjs/common';
import { MongooseModule as NestMongooseModule } from '@nestjs/mongoose';

// https://docs.nestjs.com/techniques/database
@Module({
    imports: [
        NestMongooseModule.forRoot(MONGOOSE_CONNECTION_STRING, {
            useCreateIndex: true,
            useFindAndModify: false,
        }),
    ],
})
export class MongooseModule {}
