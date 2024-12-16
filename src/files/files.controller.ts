import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { FilesService } from './files.service';
//import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from './multer-config';
import { Request } from 'express';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as mime from 'mime-types';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { File } from './entities/file.entity';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiOperation({ summary: 'Create a file' })
  @ApiResponse({
    status: 201,
    description: 'The record created',
    type: File,
  })
  @Post()
  @UseInterceptors(FileInterceptor('arquivo', multerConfig))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const fileRequest = await this.filesService.create(file, req);
      if (!fileRequest) {
        return res.status(404).json({ message: 'File not found' });
      }
      return res.status(201).json(fileRequest);
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @ApiOperation({ summary: 'Return all files' })
  @ApiResponse({
    status: 200,
    description: 'Return all files',
    schema: {
      example: {
        certificates: [
          {
            id: '550e8400-e29b-41d4-a716-446655440000',
            name: 'nomeArq.jpeg',
            type: 'image/jpeg',
            url: '../fileStorage',
            user_id: '550e8400-e29b-41d4-a716-446655440002',
            event_id: '550e8400-e29b-41d4-a716-446655440003',
          },
          {
            id: '550e8400-e29b-41d4-a716-446655440000',
            name: 'nomeArq.jpeg',
            type: 'image/jpeg',
            url: '../fileStorage',
            user_id: '550e8400-e29b-41d4-a716-446655440002',
            event_id: '550e8400-e29b-41d4-a716-446655440003',
          },
        ],
      },
    },
  })
  @ApiOperation({ summary: 'Return a File' })
  @ApiResponse({
    status: 200,
    description: 'Return a file',
    type: File,
  })
  @Get()
  async findAll(@Res() res: Response) {
    try {
      const files = await this.filesService.findAll();
      if (!files) {
        return res.status(404).json({ message: 'Files not found' });
      }
      return res.status(200).json({ files });
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    try {
      const file = await this.filesService.findOne(id);
      if (!file) {
        return res.status(404).json({ message: 'file not found' });
      }
      return res.status(200).json(file);
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Get(':filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.join(__dirname, 'fileStorage', filename);
    const fileExists = fs.existsSync(filePath);

    if (!fileExists) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'File not found' });
    }
    const mimeType = mime.lookup(filename) || 'application/octet-stream';
    const file = fs.createReadStream(filePath);
    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    file.pipe(res);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(id, updateFileDto);
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id') id: string) {
    try {
      const file = await this.filesService.remove(id);
      if (!file) {
        return res.status(404).json({ message: 'file not found' });
      }
      return res.status(200).json(file);
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
