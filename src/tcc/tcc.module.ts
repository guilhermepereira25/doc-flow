import { Module } from '@nestjs/common';
import { TccService } from './tcc.service';
import { TccController } from './tcc.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tcc } from './entities/tcc.entity';

@Module({
  imports: [SequelizeModule.forFeature([Tcc])],
  controllers: [TccController],
  providers: [TccService],
})
export class TccModule {}
