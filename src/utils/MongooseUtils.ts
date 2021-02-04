import { Types } from 'mongoose';
import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';
[];
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function fromDateToDateFilter(fromDate?: any, toDate?: any) {
    return { $gte: startOfDay(fromDate), $lte: endOfDay(toDate) };
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function fromDateFilter(fromDate?: any) {
    return { $gte: startOfDay(fromDate) };
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function toDateFilter(toDate?: any) {
    return { $lte: endOfDay(toDate) };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function fromPriceToPriceFilter(fromPrice?: number, toPrice?: number) {
    return { $gte: fromPrice ? fromPrice : 0, $lte: toPrice ? toPrice : 10000000 };
}

export function isValidMongooseId(id: string): boolean {
    return Types.ObjectId.isValid(id) && new Types.ObjectId(id).toString() === id;
}

export const toMongooseId = (s?: string | number): Types.ObjectId => {
    if (!s) return;
    return Types.ObjectId(s);
};
