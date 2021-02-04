import { Module } from '@nestjs/common';
import { MongooseModule } from './mongoose/mongoose.module';

// https://docs.nestjs.com/techniques/database
@Module({
    imports: [MongooseModule],
})
export class DatabaseModule {}
