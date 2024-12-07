import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository.interface';
import { USER_REPOSITORY } from './repositories/user-repository.token';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.create(createUserDto);
  }

  async findAll(page: number) {
    return await this.userRepository.findAll(page);
  }

  async findOne(id: string) {
    return this.userRepository.findByPk(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.remove(id);
  }

  async findByUsername(username: string) {
    return await this.userRepository.findByUsername(username);
  }
}
