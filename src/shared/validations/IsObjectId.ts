import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Types } from 'mongoose';

@ValidatorConstraint({ name: 'ObjectId', async: false })
export class IsObjectId implements ValidatorConstraintInterface {
    validate(text: string, args: ValidationArguments): boolean {
        return Types.ObjectId.isValid(text) && new Types.ObjectId(text).toString() === text;
    }

    defaultMessage(args: ValidationArguments): string {
        return `[${args.property}] - '${args.value}' não é um Id do MongoDB válido`;
    }
}
