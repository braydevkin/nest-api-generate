import { JSONObject } from '@/shared/models/JSONObject';
import { addYears, subYears } from 'date-fns';
import { Between, FindOperator } from 'typeorm';

export const AfterDate = (date: Date): FindOperator<Date> => Between(date, addYears(date, 100));
export const BeforeDate = (date: Date): FindOperator<Date> => Between(subYears(date, 100), date);
export const BetweenDates = (startDate: Date, endDate: Date): FindOperator<Date> => Between(startDate, endDate);

export const getDateFilters = (startDate?: Date, endDate?: Date): FindOperator<Date | void> => {
    if (startDate && endDate) {
        return BetweenDates(startDate, endDate);
    }

    if (startDate) {
        return AfterDate(startDate);
    }

    if (endDate) {
        return BeforeDate(endDate);
    }
};

export const handleDateValidFilters = (filters: JSONObject): JSONObject => {
    const dateFilter = getDateFilters(filters.startDate, filters.endDate);

    if (dateFilter) {
        filters.createdAt = dateFilter;
    }
    delete filters.startDate;
    delete filters.endDate;

    return filters;
};
