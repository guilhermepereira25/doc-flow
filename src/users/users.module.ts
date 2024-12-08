import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRepositoryImpl } from './repositories/user.repository';
import { USER_REPOSITORY } from './repositories/user-repository.token';
@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
