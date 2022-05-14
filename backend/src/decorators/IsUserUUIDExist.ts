import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import { findOneByUUID } from '../user/user.service'

@ValidatorConstraint({ async: true })
export class IsUserUUIDExistConstraint implements ValidatorConstraintInterface {
    async validate(uuid: string, args: ValidationArguments) {
        const user = await findOneByUUID(uuid);
        return Boolean(user);
    }

    public defaultMessage(args: ValidationArguments) {
        return `there is no such user as`;
    }
}

export function IsUserUUIDExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUserUUIDExistConstraint,
        });
    };
}
