import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from '@config';

// https://docs.nestjs.com/techniques/database
@Module({
    imports: [TypeOrmModule.forRoot(DatabaseConfig)],
})
export class DatabaseModule {}
