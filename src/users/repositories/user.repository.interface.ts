import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export interface UserRepository {
  create(createUserDto: CreateUserDto): Promise<User>;
  findAll(page: number): Promise<User[]>;
  findOne(id: string): Promise<User>;
  update(id: string, updateUserDto: UpdateUserDto): Promise<string>;
  remove(id: string): Promise<number>;
  findByUsername(username: string): Promise<User>;
  findByPk(id: string): Promise<User>;
}
