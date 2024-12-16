import { File } from '../entities/file.entity';
import { CreateFileDto } from '../dto/create-file.dto';
import { UpdateFileDto } from '../dto/update-file.dto';

export interface FileRepository {
  create(createFileDto: CreateFileDto): Promise<File>;
  findAll(): Promise<File[]>;
  findOne(id: string): Promise<File>;
  update(id: string, updateFileDto: UpdateFileDto): Promise<string>;
  remove(id: string): Promise<number>;
  findByPk(id: string): Promise<File>;
  findByUserId(id: string): Promise<File[]>;
  findByEventId(id: string): Promise<File[]>;
}
