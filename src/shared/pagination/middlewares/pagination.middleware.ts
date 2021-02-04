/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class PaginationMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        req.query.limit = Math.abs(+req.query.limit || 10);
        req.query.skip = Math.abs(+req.query.skip || 0);
        next();
    }
}
