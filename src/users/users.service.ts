import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository.interface';
import { USER_REPOSITORY } from './repositories/user-repository.token';
import { ProfileService } from '../profile/profile.service';
import { Profile as ProfileEnum } from 'src/profile/enum/profile.enum';
import { Profile as ProfileModel } from 'src/profile/entities/profile.entity';
@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepository,
    private readonly profileService: ProfileService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    let profile: ProfileModel | null;
    if (!createUserDto.profileId) {
      profile = await this.profileService.findByProfileName(ProfileEnum.User);
      if (!profile) {
        throw new Error('Profile not found');
      }
      createUserDto.profileId = profile.id;
    } else {
      profile = await this.profileService.findOne(createUserDto.profileId);
      if (!profile) {
        throw new Error('Profile not found');
      }
    }
    return await this.userRepository.create(createUserDto, profile.id);
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
