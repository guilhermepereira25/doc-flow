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
  Res,
  Req,
  ConflictException,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { File } from './entities/file.entity';
import { CreateFileDto } from './dto/create-file.dto';
import { memoryStorage } from 'multer';
import { UserRequest } from 'src';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiOperation({ summary: 'Create a file register in database' })
  @ApiResponse({
    status: 201,
    description: 'The record created',
    type: File,
  })
  @Post()
  async create(
    @Req() req: UserRequest,
    @Body() fileCreateDto: CreateFileDto,
    @Res() res: Response,
  ) {
    try {
      const userId: string = req.user?.sub;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const file: File = await this.filesService.create(fileCreateDto, userId);
      return res.status(201).json({
        file,
        message: 'File created successfully, you are able to upload it now',
      });
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      if (err instanceof ConflictException) {
        return res.status(409).json({ message: err.message });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @ApiOperation({ summary: 'Get the status of a file' })
  @ApiResponse({
    status: 200,
    description: 'Return the status of a file',
    schema: {
      example: {
        file: {
          id: '550e8400-e29b-41d4-a716-446655440000',
          status: 'pending',
        },
      },
    },
  })
  @Get('status/:id')
  async getStatus(@Param('id') id: string, @Res() res: Response) {
    try {
      const file = await this.filesService.findOne(id);
      if (!file) {
        return res.status(404).json({ message: 'File not found' });
      }
      return res.status(200).json({
        file: {
          id: file.id,
          status: file.status,
        },
      });
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Post('upload/:id')
  @ApiOperation({
    summary: 'Queue file to save on disk',
  })
  @ApiResponse({
    status: 202,
    schema: {
      example: {
        message: 'File enqueued to be processed',
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(pdf|doc|docx)$/)) {
          return cb(new Error('File is not an document'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    try {
      if (!file) {
        return res.status(400).json({ message: 'File not found' });
      }
      if (!isNaN(Number(id)) || id.length !== 36) {
        return res.status(400).json({ message: 'Invalid id' });
      }
      await this.filesService.upload(file, id);
      return res.status(202).json({ message: 'File enqueued to be processed' });
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      if (err instanceof ConflictException) {
        return res.status(409).json({ message: err.message });
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
        files: [
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

  @ApiOperation({ summary: 'Download a file' })
  @ApiResponse({
    status: 200,
    description: 'Return the file',
  })
  @Get('download/:id')
  async getFile(@Param('id') id: string, @Res() res: Response) {
    try {
      const filePath = await this.filesService.getFilePath(id);
      res.download(filePath, (err) => {
        if (err) {
          if (process.env.APP_ENV === 'development') {
            console.error(err);
          }
          res.status(500).json({ message: 'Internal server error' });
        }
      });
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(id, updateFileDto);
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id') id: string) {
    try {
      await this.filesService.remove(id);
      return res.status(200).json({
        message: 'File deleted successfully',
      });
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
