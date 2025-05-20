import { Types } from 'mongoose';
import { EventType } from '../enum/event.enum';

export interface IEvent {
  _id: Types.ObjectId;
  title: string;
  description: string;
  isActive: boolean;
  type: EventType;
  value: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
