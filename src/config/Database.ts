import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USERNAME } from '../config/Constants';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import path from 'path';

export const DatabaseConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    entities: [path.resolve(__dirname, '../database/entity/*{.ts,.js}')],
    migrations: [path.resolve(__dirname, '../database/migration/*{.ts,.js}')],
    subscribers: [path.resolve(__dirname, '../database/subscriber/*{.ts,.js}')],
    cli: {
        migrationsDir: 'src/database/migration',
    },
    synchronize: false,
};

export default DatabaseConfig;
