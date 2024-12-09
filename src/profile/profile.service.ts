import { Inject, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileRepository } from './repositories/profile.repository.interface';
import { PROFILE_REPOSITORY } from './repositories/profile-repository.token';
@Injectable()
export class ProfileService {
  constructor(
    @Inject(PROFILE_REPOSITORY)
    private readonly profileRepository: ProfileRepository,
  ) {}

  async create(createProfileDto: CreateProfileDto) {
    const profileAlreadyExists = await this.profileRepository.findByProfileName(
      createProfileDto.name,
    );
    if (profileAlreadyExists) {
      return null;
    }
    const profile = await this.profileRepository.create(createProfileDto);
    return profile;
  }

  async findAll() {
    return await this.profileRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }
  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
