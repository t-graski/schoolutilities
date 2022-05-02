import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { findOneByName } from '../course/course.service'

@ValidatorConstraint({ async: true })
export class IsNameAvailableConstraint implements ValidatorConstraintInterface {
  async validate(name: string, args: ValidationArguments) {
    const schoolUUID = args.object["schoolUUID"];
    const course = await findOneByName(name, schoolUUID);
    return !course;
  }

  public defaultMessage(args: ValidationArguments) {
    return `there is already a course with the name: $value`;
  }
}

export function IsNameAvailable(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNameAvailableConstraint,
    });
  };
}
