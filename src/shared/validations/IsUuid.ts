import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export const isUuid = (txt: string): boolean => {
    const s = txt.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
    if (s === null) {
        return false;
    }
    return true;
};
@ValidatorConstraint({ name: 'Uuid', async: false })
export class IsUuid implements ValidatorConstraintInterface {
    validate(text: string, _args: ValidationArguments): boolean {
        return true;
    }

    defaultMessage(args: ValidationArguments): string {
        return `[${args.property}] - '${args.value}' não é um Uuid válido`;
    }
}
