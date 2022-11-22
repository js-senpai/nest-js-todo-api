import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserRole } from '../../common/schema/user.schema';
import { Model } from 'mongoose';
import { UserDto, UserPasswordDto } from './users.dto';
import * as bcrypt from 'bcrypt';
import { IResponseOk } from '../../common/interface/common.interface';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create({ email, password, avatar }: UserDto): Promise<IResponseOk> {
    // Check if user is existed
    const checkExistedUser = await this.userModel
      .findOne({ email })
      .select('_id');
    if (checkExistedUser) {
      throw new ForbiddenException(
        `User with email ${email} has already exist`,
      );
    }
    // Hash password
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    // Create user
    await this.userModel.create({
      email,
      avatar,
      password: hashedPassword,
    });
    return {
      ok: 'User has successfully registered',
    };
  }

  async delete({
    id,
    user,
  }: { id: string } & { user: UserDocument }): Promise<IResponseOk> {
    // Check if user is existed
    const findUser = await this.userModel.findById(id).select('_id');
    if (!findUser) {
      throw new NotFoundException('User not found');
    }
    // Check if user doesnt delete another user
    if (findUser.email !== user.email) {
      throw new ForbiddenException('You cant delete this user');
    }
    await this.userModel.deleteOne({
      _id: id,
    });
    return {
      ok: 'User has successfully deleted',
    };
  }

  async updatePassword({
    password,
    id,
    user,
  }: UserPasswordDto & { user: UserDocument }): Promise<IResponseOk> {
    // Find user by id
    const findUser = await this.userModel
      .findById(id)
      .select(['role', 'email']);
    if (!findUser) {
      throw new NotFoundException('User not found');
    }
    // Check if found user is admin and id doesn't equal id of user in session
    if (findUser.role === UserRole.admin && findUser.email !== user.email) {
      throw new ForbiddenException('You cant change password for this user');
    }
    // Hash password
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    // Update user
    await this.userModel.updateOne(
      {
        _id: id,
      },
      {
        password: hashedPassword,
      },
    );
    return {
      ok: 'Password has successfully updated',
    };
  }
}
