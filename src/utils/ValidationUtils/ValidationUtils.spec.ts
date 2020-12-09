import { optionalStringToBoolean, optionalStringToDate } from './index';

describe('ValidationUtils', () => {
    describe('optionalStringToBoolean', () => {
        it('Deve ser true', async () => {
            expect(optionalStringToBoolean('true')).toBe(true);
        });

        it('Deve ser false', async () => {
            expect(optionalStringToBoolean('false')).toBe(false);
        });

        it('String não booleana deve ser undefined', async () => {
            expect(optionalStringToBoolean('asdasdadad')).toBe(undefined);
        });
    });

    describe('optionalStringToDate', () => {
        it('Deve ser Date', async () => {
            const date = new Date();
            const after = optionalStringToDate(date.toString());
            expect(after.toString()).toEqual(date.toString());
        });
    });
});
