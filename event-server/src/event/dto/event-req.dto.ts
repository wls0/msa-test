import { Types } from 'mongoose';
import { EventType } from '../enum/event.enum';
import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { MongoId } from '../../common/decorators/mongo-objectid.decorator';

export class CreateEventReqDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  isActive: boolean;

  @IsEnum(EventType)
  @IsNotEmpty()
  type: EventType;

  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @IsDateString()
  @IsNotEmpty()
  endDate: Date;
}

export class GetEventReqDto {
  @IsNotEmpty()
  @MongoId()
  eventId: Types.ObjectId;
}
