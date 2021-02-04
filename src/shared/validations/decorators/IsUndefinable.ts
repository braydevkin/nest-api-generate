import { ValidateIf, ValidationOptions } from 'class-validator';

/**
 * Skips validation if the target is undefined
 *
 * @example
 * ```typescript
 * class TestModel {
 *     @IsUndefinable({ always: true })
 *     big?: string;
 * }
 * ```
 */
export function IsUndefinable(options?: ValidationOptions): PropertyDecorator {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function IsUndefinableDecorator(prototype: object, propertyKey: string | symbol): void {
        ValidateIf((obj): boolean => undefined !== obj[propertyKey], options)(prototype, propertyKey);
    };
}
