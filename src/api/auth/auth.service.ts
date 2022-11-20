import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../common/schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { IAuthPayload, IAuthResponse } from './auth.interfaces';
import { AuthDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    protected readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: AuthDto): Promise<IAuthResponse> {
    // Get user
    const user = await this.userModel.findOne({
      email,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // Check password
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new NotAcceptableException('Password invalid');
    }
    const payload: IAuthPayload = {
      email: user.email,
      sub: user._id.toString(),
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
