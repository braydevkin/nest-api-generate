import { Query } from 'mongoose';
import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';

export function OnlyNotDeleted(query: Query<any>): void {
    const { isDeleted } = query.getQuery();
    if (isDeleted === undefined) {
        query.where({
            $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }],
        });
    }
}
export function fromDateToDateFilter(fromDate?: any, toDate?: any) {
    const createdAt = {
        $gte: startOfDay(fromDate),
        $lte: endOfDay(toDate),
    };
    return {createdAt}
}

