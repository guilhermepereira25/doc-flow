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
import { CreateFileResponseDto } from './dto/create-file-response.dto';
import { GetFileStatusResponseDto } from './dto/get-file-status-response.dto';
import { GetAllFilesResponseDto } from './dto/get-all-files-response.dto';
import { GetFileResponseDto } from './dto/get-file-response.dto';
import { DownloadFileResponseDto } from './dto/download-file-response.dto';
import { ApiResponse as ApiResponseInstance } from '../lib/api-response';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiOperation({ summary: 'Create a file register in database' })
  @ApiResponse({
    status: 201,
    description: 'The record created',
    type: CreateFileResponseDto,
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
      return res.status(201).json(
        new ApiResponseInstance({
          status: 201,
          success: true,
          data: {
            file,
            message: 'File created successfully, you are able to upload it now',
          },
          error: null,
        }),
      );
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      if (err instanceof ConflictException) {
        return res.status(409).json(
          new ApiResponseInstance({
            status: 409,
            success: false,
            data: null,
            error: err.message,
          }),
        );
      }
      return res.status(500).json(
        new ApiResponseInstance({
          status: 500,
          success: false,
          data: null,
          error: 'Internal server error',
        }),
      );
    }
  }

  @ApiOperation({ summary: 'Get the status of a file' })
  @ApiResponse({
    status: 200,
    description: 'Return the status of a file',
    type: GetFileStatusResponseDto,
  })
  @Get('status/:id')
  async getStatus(@Param('id') id: string, @Res() res: Response) {
    try {
      const file = await this.filesService.findOne(id);
      if (!file) {
        return res.status(404).json(
          new ApiResponseInstance({
            status: 404,
            success: false,
            data: null,
            error: 'File not found',
          }),
        );
      }
      return res.status(200).json(
        new ApiResponseInstance({
          status: 200,
          success: true,
          data: {
            file: {
              id: file.id,
              status: file.status,
            },
          },
          error: null,
        }),
      );
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      return res.status(500).json(
        new ApiResponseInstance({
          status: 500,
          success: false,
          data: null,
          error: 'Internal server error',
        }),
      );
    }
  }

  @Post('upload/:id')
  @ApiOperation({
    summary: 'Queue file to save on disk',
  })
  @ApiResponse({
    status: 202,
    type: DownloadFileResponseDto,
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
        return res.status(400).json(
          new ApiResponseInstance({
            status: 400,
            success: false,
            data: null,
            error: 'File not found',
          }),
        );
      }
      if (!isNaN(Number(id)) || id.length !== 36) {
        return res.status(400).json(
          new ApiResponseInstance({
            status: 400,
            success: false,
            data: null,
            error: 'Invalid id',
          }),
        );
      }
      await this.filesService.upload(file, id);
      return res.status(202).json(
        new ApiResponseInstance({
          status: 202,
          success: true,
          data: {
            message: 'File enqueued to be processed',
          },
          error: null,
        }),
      );
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      if (err instanceof ConflictException) {
        return res.status(409).json(
          new ApiResponseInstance({
            status: 409,
            success: false,
            data: null,
            error: err.message,
          }),
        );
      }
      return res.status(500).json(
        new ApiResponseInstance({
          status: 500,
          success: false,
          data: null,
          error: 'Internal server error',
        }),
      );
    }
  }

  @ApiOperation({ summary: 'Return all files' })
  @ApiResponse({
    status: 200,
    description: 'Return all files',
    type: GetAllFilesResponseDto,
  })
  @Get()
  async findAll(@Res() res: Response) {
    try {
      const files = await this.filesService.findAll();
      if (!files) {
        return res.status(404).json(
          new ApiResponseInstance({
            status: 404,
            success: false,
            data: null,
            error: 'Files not found',
          }),
        );
      }
      return res.status(200).json(
        new ApiResponseInstance({
          status: 200,
          success: true,
          data: { files },
          error: null,
        }),
      );
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      return res.status(500).json(
        new ApiResponseInstance({
          status: 500,
          success: false,
          data: null,
          error: 'Internal server error',
        }),
      );
    }
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Return a file',
    type: GetFileResponseDto,
  })
  async findOne(@Res() res: Response, @Param('id') id: string) {
    try {
      const file = await this.filesService.findOne(id);
      if (!file) {
        return res.status(404).json(
          new ApiResponseInstance({
            status: 404,
            success: false,
            data: null,
            error: 'file not found',
          }),
        );
      }
      return res.status(200).json(
        new ApiResponseInstance({
          status: 200,
          success: true,
          data: file,
          error: null,
        }),
      );
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      return res.status(500).json(
        new ApiResponseInstance({
          status: 500,
          success: false,
          data: null,
          error: 'Internal server error',
        }),
      );
    }
  }

  @ApiOperation({ summary: 'Download a file' })
  @ApiResponse({
    status: 200,
    description: 'Return the file',
    type: DownloadFileResponseDto,
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
          res.status(500).json(
            new ApiResponseInstance({
              status: 500,
              success: false,
              data: null,
              error: 'Internal server error',
            }),
          );
        }
      });
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      return res.status(500).json(
        new ApiResponseInstance({
          status: 500,
          success: false,
          data: null,
          error: 'Internal server error',
        }),
      );
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
      return res.status(200).json(
        new ApiResponseInstance({
          status: 200,
          success: true,
          data: {
            message: 'File deleted successfully',
          },
          error: null,
        }),
      );
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      return res.status(500).json(
        new ApiResponseInstance({
          status: 500,
          success: false,
          data: null,
          error: 'Internal server error',
        }),
      );
    }
  }
}
