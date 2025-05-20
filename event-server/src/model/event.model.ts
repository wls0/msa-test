import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { IEvent } from '../event/interface/event.interface';
import { EventType } from '../event/enum/event.enum';

const options: SchemaOptions = {
  timestamps: true,
  collection: 'event',
  versionKey: false,
};

@Schema(options)
export class Event implements IEvent {
  _id: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
  })
  description: string;

  @Prop({
    type: Boolean,
    default: false,
    required: true,
  })
  isActive: boolean;

  @Prop({
    type: String,
    required: true,
    enum: Object.values(EventType),
  })
  type: EventType;

  @Prop({
    type: Number,
    required: true,
  })
  value: number;

  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({ type: Date, required: true })
  endDate: Date;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}
export type EventDocumentType = HydratedDocument<Event>;
export const EventSchema = SchemaFactory.createForClass(Event);
