import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserRepository } from './user.repository.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Profile } from 'src/profile/entities/profile.entity';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto, profileId: string): Promise<User> {
    const newUser = await this.userModel.create(
      {
        ...createUserDto,
        profile_id: profileId,
      },
      {
        include: [
          {
            model: Profile,
            attributes: ['id', 'name'],
            include: [
              {
                model: Role,
                attributes: ['id', 'name'],
              },
            ],
          },
        ],
      },
    );
    return newUser;
  }

  async findAll(page: number): Promise<User[]> {
    return this.userModel.scope('excludePassword').findAll({
      limit: 10,
      offset: (page - 1) * 10,
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<string> {
    // Implement update logic here
    return `This action updates a #${id} user`;
  }

  async remove(id: string): Promise<number> {
    return await this.userModel.destroy({
      where: {
        id,
      },
    });
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({
      where: {
        username,
      },
      include: [
        {
          model: Profile,
          attributes: ['id', 'name'],
          include: [
            {
              model: Role,
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    });
    if (!user) {
      return null;
    }
    return user;
  }

  async findByPk(id: string): Promise<User> {
    return this.userModel.scope('excludePassword').findByPk(id);
  }
}
