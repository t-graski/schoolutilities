import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import { findOneByUUID } from '../course/course.service'

@ValidatorConstraint({ async: true })
export class IsCourseExistConstraint implements ValidatorConstraintInterface {
    async validate(uuid: string, args: ValidationArguments) {
        const course = await findOneByUUID(uuid);
        return Boolean(course);
    }

    public defaultMessage(args: ValidationArguments) {
        return `there is no course with the uuid: $value`;
    }
}

export function IsCourseExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsCourseExistConstraint,
        });
    };
}
