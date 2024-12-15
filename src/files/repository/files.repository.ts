import { Injectable } from '@nestjs/common';
import { FileRepository } from './files.repository.interface';
import { InjectModel } from '@nestjs/sequelize';
import { File } from '../entities/file.entity';
import { CreateFileDto } from '../dto/create-file.dto';

@Injectable()
export class FileRepositoryImpl implements FileRepository {
  constructor(
    @InjectModel(File)
    private fileModel: typeof File,
  ) {}

  async create(createFileDto: CreateFileDto): Promise<File> {
    return await this.fileModel.create({
      ...createFileDto,
      user_id: createFileDto.userId,
      event_id: createFileDto.eventId,
    });
  }

  async findAll(): Promise<File[]> {
    return await this.fileModel.findAll();
  }

  async findOne(id: string): Promise<File> {
    return await this.fileModel.findByPk(id);
  }

  async update(id: string, updateFileDto: CreateFileDto): Promise<string> {
    await this.fileModel.update(updateFileDto, {
      where: {
        id,
      },
    });
    return 'File updated successfully';
  }

  async remove(id: string): Promise<number> {
    const deletedProfile = await this.fileModel.destroy({
      where: {
        id,
      },
    });
    return deletedProfile;
  }

  async findByPk(id: string): Promise<File> {
    return await this.fileModel.findByPk(id);
  }

  async findByUserId(id: string): Promise<File[]> {
    return await this.fileModel.findAll({
      where: {
        user_id: id,
      },
    });
  }
  async findByEventId(id: string): Promise<File[]> {
    return await this.fileModel.findAll({
      where: {
        event_id: id,
      },
    });
  }
}