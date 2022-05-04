import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import { findOneByUUID } from '../course/course.service'

@ValidatorConstraint({ async: true })
export class IsArrayUniqueConstraint implements ValidatorConstraintInterface {
    async validate(array, args: ValidationArguments) {
        const unique = [...new Set(array)];
        return unique.length === array.length;
    }

    public defaultMessage(args: ValidationArguments) {
        return `there must not be duplicate values in: ${args.property}`;
    }
}

export function IsArrayUnique(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsArrayUniqueConstraint,
        });
    };
}
