import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = userDto.name;
    user.username = userDto.username;
    user.password = userDto.password;
    user.refreshToken = userDto.refreshToken;
    return this.userRepository.save(user);
  }

  async findOne(condition: any): Promise<User> {
    return this.userRepository.findOne(condition);
  }



  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: any): Promise<User> {
    return this.findOne(id);
  }

  async findByUsername(username: any): Promise<User> {
    return this.findOne({username});
  }

  async update(id: any, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne(id);
    this.userRepository.merge(user, updateUserDto);
    return this.userRepository.save(user);
  }

  // async update(
  //   id: string,
  //   updateUserDto: UpdateUserDto,
  // ): Promise<UserDocument> {
  //   return this.userModel
  //     .findByIdAndUpdate(id, updateUserDto, { new: true })
  //     .exec();
  // }


  async remove(id: any): Promise<User> {
    const user = await this.userRepository.findOne(id);
    return this.userRepository.remove(user);
  }
}
