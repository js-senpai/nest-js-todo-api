import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum UserRole {
  user = 'user',
  admin = 'admin',
}

export type UserDocument = User & Document & { _id: string };

@Schema({
  collection: 'user',
  versionKey: false,
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class User {
  @Prop({ unique: true, required: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: true, type: String })
  avatar: string;

  @Prop({
    required: true,
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.user,
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
