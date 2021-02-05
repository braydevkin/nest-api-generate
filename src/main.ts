import 'reflect-metadata';
import { APP_PORT, CORS_WHITE_LIST, APP_HOST } from '@config/Constants';
import * as admin from 'firebase-admin';
import { FirebaseAdminConfig } from './config';

admin.initializeApp(FirebaseAdminConfig);

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import { AppModule } from '@/app.module';

import { ValidationPipe, NestApplicationOptions } from '@nestjs/common';
import { Logger } from '@shared/logger/Logger';
import * as bodyParser from 'body-parser';
import { verifyConstants } from './utils/EnvUtils';

const logger = new Logger();

async function bootstrap() {
    const appOptions: NestApplicationOptions = {
        cors: false,
    };

    const app = await NestFactory.create(AppModule, appOptions);

    app.useLogger(logger);

    const options = new DocumentBuilder()
        .setTitle('Nest API Generate')
        .setDescription('API built with Nest')
        .setVersion('0.0.1')
        .addServer('http://localhost:3333')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, options);
    fs.writeFileSync('./swagger-docs.json', JSON.stringify(document));
    SwaggerModule.setup('/docs', app, document);
    SwaggerModule.setup('/', app, document);

    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
        }),
    );
    // app.useGlobalGuards(new RolesGuard(new Reflector()))
    app.enableCors({
        origin: function (origin, callback) {
            if (!origin) {
                callback(null, true);
                return;
            }
            if (CORS_WHITE_LIST.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                logger.warn(`CORS: Blocking from origin ${origin}`, 'MAIN');
                callback(null, false);
            }
        },
    });

    app.use('/payments/webhooks', bodyParser.raw({ type: '*/*' }));

    await app.listen(APP_PORT);

    console.log(`Server running on the port ${APP_PORT}`);
    console.log(`The documentation is acessible in ${APP_HOST}/docs`);
    console.log(`CORS configurado para aceitar requisições de: `);
    CORS_WHITE_LIST.forEach((origin) => {
        console.log(`- ${origin}`);
    });
}

verifyConstants()
    .then(() => {
        bootstrap();
    })
    .catch((err) => {
        console.error('Erro ao efetuar verificações!');
        throw err;
    });
