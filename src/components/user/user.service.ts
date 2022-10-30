import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { hashSync, genSaltSync, compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
    private jwtService: JwtService,
  ) {}

  async create(data: any): Promise<User> {
    return this.userRepository.save(data);
  }

  async findOne(condition: any): Promise<User> {
    return this.userRepository.findOne(condition);
  }

  async update(id: any, data: any): Promise<User> {
    await this.userRepository.update(id, data);
    return this.userRepository.findOne(id);
  }

  async logout(res) {
    res.clearCookie('jwt');
    return {
      message: 'Logout success',
    };
  }

  async resetPassword(body, response) {
    const { email, password } = body;
    const user = await this.findOne({ email });

    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    const hashedPassword = await hashSync(password, genSaltSync(10));

    const updatedUser = await this.update(user._id, {
      password: hashedPassword,
    });

    const jwt = await this.jwtService.signAsync({ id: updatedUser._id });

    response.cookie('jwt', jwt, { httpOnly: true });

    return {
      message: 'Reset password success',
    };
  }

  async getUser(request) {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new UnauthorizedException();
      }
      const user_data = await this.findOne(data.id);
      delete user_data.password;
      return user_data;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async login(body, response) {
    const { email, password } = body;
    const user = await this.findOne({ email });

    if (!user) {
      throw new BadRequestException('invalid credentials');
    }
    if (!(await compareSync(password, user.password))) {
      throw new BadRequestException('invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({ id: user._id });

    response.cookie('jwt', jwt, { httpOnly: true });

    return {
      message: 'Login success',
    };
  }

  async register(body) {
    const { email, password } = body;
    const user = await this.findOne({ email });

    if (user) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await hashSync(password, genSaltSync(10));

    const newUser = await this.create({
      ...body,
      password: hashedPassword,
    });

    // const jwt = await this.jwtService.signAsync({ id: newUser._id });
    delete newUser.password;
    return {
      message: 'Register success',
      newUser,
      // data: {
      //   jwt,
      // },
    };
  }

  async refreshToken(request, response) {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new UnauthorizedException();
      }
      const user = await this.findOne(data.id);
      const jwt = await this.jwtService.signAsync({ id: user._id });
      response.cookie('jwt', jwt, { httpOnly: true });
      return {
        message: 'Refresh token success',
      };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
