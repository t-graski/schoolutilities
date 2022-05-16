import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { findOneByUUID } from '../SchoolAdmin/schoolAdmin.service';

@ValidatorConstraint({ async: true })
export class IsSchoolExistConstraint implements ValidatorConstraintInterface {
  async validate(uuid: string, args: ValidationArguments) {
    const school = await findOneByUUID(uuid);
    return Boolean(school);
  }

  public defaultMessage(args: ValidationArguments) {
    return `there is no school with the uuid: $value`;
  }
}

export function IsSchoolExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsSchoolExistConstraint,
    });
  };
}
