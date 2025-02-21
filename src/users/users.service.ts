import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository.interface';
import { USER_REPOSITORY } from './repositories/user-repository.token';
import { ProfileService } from '../profile/profile.service';
import { ServiceLayerDto } from 'src/lib/dto/service-layer.dto';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepository,
    private readonly profileService: ProfileService,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<ServiceLayerDto<{ user: User }>> {
    const profile = await this.profileService.findOne(createUserDto.profileId);
    if (!profile) {
      throw new Error('Profile not found');
    }

    const user = await this.userRepository.create(createUserDto, profile.id);
    return new ServiceLayerDto<{ user: User }>({ user }, true);
  }

  async findAll(
    limit: number,
    offset: number,
  ): Promise<ServiceLayerDto<{ users: User[] }>> {
    const users = await this.userRepository.findAll(limit, offset);
    return new ServiceLayerDto<{ users: User[] }>(
      { users },
      users.length > 0 ? true : false,
    );
  }

  async findOne(id: string): Promise<ServiceLayerDto<{ user: User }>> {
    const user = await this.userRepository.findByPk(id);
    return new ServiceLayerDto<{ user: User }>({ user }, user ? true : false);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const [number, user] = await this.userRepository.update(id, updateUserDto);
    if (number === 0) {
      throw new Error('User not found');
    }
    return user[0];
  }

  async remove(id: string) {
    return await this.userRepository.remove(id);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }
}
