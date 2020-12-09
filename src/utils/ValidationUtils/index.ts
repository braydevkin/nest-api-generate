import { transformAndValidate } from 'class-transformer-validator';
import { ValidationPipe } from '@nestjs/common';
import { ClassType } from 'class-transformer/ClassTransformer';

// eslint-disable-next-line @typescript-eslint/ban-types
export async function validateOrThrowException<T extends object>(
    classType: ClassType<T>,
    jsonString: string,
): Promise<void> {
    await transformAndValidate(classType, jsonString)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            throw new ValidationPipe().createExceptionFactory()(err);
        });
}

export function optionalStringToBoolean(value?: string): boolean {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return undefined;
}

export function optionalStringToDate(value?: string): Date {
    try {
        const date = new Date(value);
        return date;
    } catch (e) {
        console.log(e);
        return undefined;
    }
}

export function isInvalidString(str?: string): boolean {
    return !str || /^\s*$/.test(str) || str.length === 0;
}
