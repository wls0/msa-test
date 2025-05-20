import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { Types } from 'mongoose';

// MongoDB ObjectId 유효성 검사 데코레이터
export function IsMongoIdObject(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: any) {
    registerDecorator({
      name: 'IsMongoIdObject',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (Array.isArray(value)) {
            try {
              value.map((el) => {
                return new Types.ObjectId(el);
              });
              return true;
            } catch (err) {
              return false;
            }
          }
          return Types.ObjectId.isValid(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid MongoDB ObjectId`;
        },
      },
    });
  };
}

// MongoDB ObjectId 변환 데코레이터
export function SafeMongoIdTransform() {
  return Transform(({ value }) => {
    if (Array.isArray(value)) {
      try {
        return value.map((el) => {
          return new Types.ObjectId(el);
        });
      } catch (err) {
        throw new BadRequestException('Invalid MongoDB ObjectId format');
      }
    }
    if (Types.ObjectId.isValid(value) && new Types.ObjectId(value).toString() === value) {
      return new Types.ObjectId(value);
    }
    throw new BadRequestException('Invalid MongoDB ObjectId format');
  });
}

// 변환 및 유효성 검사 결합 데코레이터
export function MongoId(validationOptions?: ValidationOptions) {
  return function (target: any, key: string | symbol) {
    SafeMongoIdTransform()(target, key);
    IsMongoIdObject(validationOptions)(target, key);
  };
}
