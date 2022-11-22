import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';

export type TodoDocument = Todo & Document & { _id: string };

@Schema({
  collection: 'Todo',
  versionKey: false,
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class Todo {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: Date })
  endDate: Date;

  @Prop({ type: Boolean, default: false })
  done: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
