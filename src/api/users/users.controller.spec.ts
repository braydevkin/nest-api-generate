import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersModule } from './users.module';
import { MongooseModule } from '@/mongoose/mongoose.module';
import { PaginationDTO } from '@/shared/dto';
import { ListUsers } from './dto/list-users.dto';

describe('UsersController', () => {
    let usersController: UsersController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [MongooseModule, UsersModule],
        }).compile();

        usersController = app.get<UsersController>(UsersController);
    });

    describe('root', () => {
        it('should be defined', () => {
            expect(usersController).toBeDefined();
        });
    });
    describe('getAll', () => {
        it('return should be instance of ListUsers', () => {
            expect(usersController.getAll(new PaginationDTO())).resolves.toBeInstanceOf(ListUsers);
        });
        it('results shoud be less than limit + 1', () => {
            const limit = 2;
            const pagination = new PaginationDTO();
            pagination.limit = limit;

            usersController.getAll(pagination).then((result) => {
                expect(result.results.length).toBeLessThan(limit + 1);
            });
        });

        it('output pagination should have the same skip value', () => {
            const limit = 2;
            const skip = 1;

            const pagination = new PaginationDTO();
            pagination.limit = limit;
            pagination.skip = skip;

            usersController.getAll(pagination).then((result) => {
                expect(result.pagination.skip).toBe(pagination.skip);
            });
        });

        it('output pagination should have the same limit value', () => {
            const limit = 2;
            const skip = 1;

            const pagination = new PaginationDTO();
            pagination.limit = limit;
            pagination.skip = skip;

            usersController.getAll(pagination).then((result) => {
                expect(result.pagination.limit).toBe(pagination.limit);
            });
        });

        it('output pagination total should be positive', () => {
            const pagination = new PaginationDTO();

            usersController.getAll(pagination).then((result) => {
                expect(result.pagination.total).toBeGreaterThanOrEqual(0);
            });
        });
    });
});
