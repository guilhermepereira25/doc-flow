import { Inject, Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileRepository } from './repository/files.repository.interface';
import { Request } from 'express';
import { FILE_REPOSITORY } from './repository/files-repository.token';
import { FileType } from './files.enum';

@Injectable()
export class FilesService {
  constructor(
    @Inject(FILE_REPOSITORY)
    private readonly fileRepository: FileRepository,
  ) {}

  async create(file: Express.Multer.File, req: Request) {
    const arquivo = new CreateFileDto();
    arquivo.name = file.filename;

    if (file.mimetype == 'application/pdf') {
      if (arquivo.name.toLowerCase().includes('certificado')) {
        arquivo.type = FileType.CERTIFICATE;
      } else {
        arquivo.type = FileType.PDF;
      }
    }
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
      arquivo.type = FileType.IMAGE;
    }
    if (
      file.mimetype == 'application/msword' ||
      file.mimetype ==
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.mimetype == 'application/vnd.ms-excel' ||
      file.mimetype == 'text/plain' ||
      file.mimetype == 'text/csv' ||
      file.mimetype == 'application/zip' ||
      file.mimetype == 'application/x-rar-compressed'
    ) {
      arquivo.type = FileType.DOCUMENT;
    }
    if (file.mimetype == 'video/mp4' || file.mimetype == 'video/x-msvideo') {
      arquivo.type = FileType.VIDEO;
    }

    arquivo.url = `${req.protocol}://${req.get('host')}/files/${file.filename}`;
    if (!req.body.userId || !req.body.userId) {
      return null;
    }
    arquivo.userId = req.body.userId;
    arquivo.eventId = req.body.eventId;

    return await this.fileRepository.create(arquivo);
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
    const fileAlreadyExists = await this.findByPk(id);

    if (fileAlreadyExists) {
      return null;
    }
    const file = await this.fileRepository.update(id, updateFileDto);
    return file;
  }

  async remove(id: string) {
    const fileAlreadyExists = await this.findByPk(id);

    if (fileAlreadyExists) {
      return null;
    }
    const file = await this.fileRepository.remove(id);
    return file;
  }
}
