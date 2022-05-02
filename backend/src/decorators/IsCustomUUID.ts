import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsCustomUUIDConstraint implements ValidatorConstraintInterface {
  validate(uuid: string, args: ValidationArguments) {
    if (typeof uuid !== 'string') return null;
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return regex.test(uuid.substring(1));
  }

  public defaultMessage(args: ValidationArguments) {
    const value = args.value instanceof Array ? args.value[0] : args.value;
    return `${value} is not a valid uuid with the version 4`;
  }
}

export function IsCustomUUID(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCustomUUIDConstraint,
    });
  };
}
