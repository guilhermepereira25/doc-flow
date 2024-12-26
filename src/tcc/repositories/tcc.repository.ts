import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TccRepository } from './tcc.repository.interface';
import { CreateTccDto } from '../dto/create-tcc.dto';
import { UpdateTccDto } from '../dto/update-tcc.dto';
import { Tcc } from '../entities/tcc.entity';

@Injectable()
export class TccRepositoryImpl implements TccRepository {
  constructor(
    @InjectModel(Tcc)
    private tccModel: typeof Tcc,
  ) {}

  async create(createTccDto: CreateTccDto): Promise<Tcc> {
    return await this.tccModel.create({
      ...createTccDto,
    });
  }

  async findAll(): Promise<Tcc[]> {
    return await this.tccModel.findAll();
  }

  async findOne(id: string): Promise<Tcc> {
    const tcc = await this.tccModel.findByPk(id);
    if (!tcc) {
      throw new Error('Tcc not found');
    }
    return tcc;
  }

  async update(id: string, updateTccDto: UpdateTccDto): Promise<string> {
    // Implement update logic here
    return `This action updates a #${id} tcc`;
  }

  async remove(id: string): Promise<number> {
    return await this.tccModel.destroy({ where: { id } });
  }

  async findByPk(id: string): Promise<Tcc> {
    return await this.tccModel.findByPk(id);
  }
}
