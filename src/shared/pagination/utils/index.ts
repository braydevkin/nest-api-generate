import { PaginationInfos } from '../types';
import { GetPagination } from '../types/GetPagination';

export const getPagination = ({ skip, limit, total }: GetPagination): PaginationInfos => {
    let pages = 0;

    if (total && limit > 0) {
        pages = Math.ceil(total / limit);
    }

    return {
        skip,
        limit,
        total,
        pages,
    };
};
