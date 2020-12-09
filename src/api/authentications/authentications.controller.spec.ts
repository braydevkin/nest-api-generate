import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationsController } from './authentications.controller';
import { AuthenticationsModule } from './authentications.module';
import { MongooseModule } from '@mongoose/mongoose.module';

describe('AuthenticationsController', () => {
    let authenticationsController: AuthenticationsController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [MongooseModule, AuthenticationsModule],
        }).compile();

        authenticationsController = app.get<AuthenticationsController>(AuthenticationsController);
    });

    describe('root', () => {
        it('should be defined', () => {
            expect(authenticationsController).toBeDefined();
        });
    });
});
