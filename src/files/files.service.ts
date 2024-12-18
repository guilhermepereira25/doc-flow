import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileRepository } from './repository/files.repository.interface';
import { FILE_REPOSITORY } from './repository/files-repository.token';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { FileToUpload } from './file-to-upload';
import { unlink } from 'node:fs/promises';
import { FileStatus } from './enum/file-status.enum';

@Injectable()
export class FilesService {
  private readonly logger = new Logger(FilesService.name);

  constructor(
    @Inject(FILE_REPOSITORY)
    private readonly fileRepository: FileRepository,
    @InjectQueue('file') private readonly fileQueue: Queue,
  ) {}

  async create(createFileDto: CreateFileDto, userId: string) {
    const fileExistsWithTypeForUserAndEvent =
      await this.fileRepository.findByUserIdAndEventIdAndType(
        userId,
        createFileDto.eventId,
        createFileDto.type,
      );
    if (fileExistsWithTypeForUserAndEvent.length > 0) {
      this.logger.error(
        `File already exists for user ${userId} and event ${createFileDto.eventId}`,
      );
      throw new BadRequestException('File already exists');
    }
    return await this.fileRepository.create(createFileDto, userId);
  }

  async findAll() {
    return await this.fileRepository.findAll();
  }

  async findOne(id: string) {
    return await this.fileRepository.findOne(id);
  }

  async findByPk(id: string) {
    return await this.fileRepository.findOne(id);
  }

  async findByUserId(id: string) {
    return await this.fileRepository.findByUserId(id);
  }

  async findByEventId(id: string) {
    return await this.fileRepository.findByEventId(id);
  }

  async update(id: string, updateFileDto: UpdateFileDto) {
    const file = await this.fileRepository.update(id, updateFileDto);
    return file;
  }

  async remove(id: string): Promise<void> {
    const fileData = await this.fileRepository.findOne(id);
    if (!fileData) {
      throw new Error('File not found');
    }
    await unlink(fileData.path);
    await this.fileRepository.remove(id);
  }

  async upload(file: Express.Multer.File, fileId: string): Promise<void> {
    const fileData = await this.fileRepository.findOne(fileId);
    if (!fileData) {
      throw new Error('File not found');
    }
    if (fileData.status !== FileStatus.STATUS_WAITING) {
      this.logger.error(
        `File status is ${fileData.status}, resource already exists or is being processed`,
      );
      throw new ConflictException(
        'Resource already exists or is being processed',
      );
    }
    const fileToUploadData: FileToUpload = {
      fileId: fileData.id,
      buffer: file.buffer.toString('base64'),
      filename: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    };
    await this.enqueueFileToSaveOnDisk(fileToUploadData);
  }

  private async enqueueFileToSaveOnDisk(file: FileToUpload): Promise<void> {
    await this.fileQueue.add('processFile', file);
  }
}
