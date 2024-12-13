import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { Certificate } from './entities/certificate.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @ApiOperation({ summary: 'Create a certificate' })
  @ApiResponse({
    status: 201,
    description: 'The record created',
    type: Certificate,
  })
  @Post()
  async create(
    @Res() res: Response,
    @Body() createCertificateDto: CreateCertificateDto,
  ) {
    try {
      const certificado =
        await this.certificatesService.create(createCertificateDto);
      if (!certificado) {
        return res.status(409).json({ message: 'Certificate already exists' });
      }
      return res.status(201).json(certificado);
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @ApiOperation({ summary: 'Return all certificates' })
  @ApiResponse({
    status: 200,
    description: 'Return all certificates',
    schema: {
      example: {
        certificates: [
          {
            id: '550e8400-e29b-41d4-a716-446655440000',
            file_id: '550e8400-e29b-41d4-a716-446655440001',
            user_id: '550e8400-e29b-41d4-a716-446655440002',
            event_id: '550e8400-e29b-41d4-a716-446655440003',
          },
          {
            id: '550e8400-e29b-41d4-a716-446655440004',
            file_id: '550e8400-e29b-41d4-a716-446655440005',
            user_id: '550e8400-e29b-41d4-a716-446655440006',
            event_id: '550e8400-e29b-41d4-a716-446655440007',
          },
        ],
      },
    },
  })
  @Get()
  async findAll(@Res() res: Response) {
    try {
      const certificados = await this.certificatesService.findAll();
      if (!certificados) {
        return res.status(404).json({ message: 'Certificates not found' });
      }
      return res.status(200).json({ certificados });
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @ApiOperation({ summary: 'Return a Certificate' })
  @ApiResponse({
    status: 200,
    description: 'Return a certificate',
    type: Certificate,
  })
  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    try {
      const certificado = await this.certificatesService.findOne(id);
      if (!certificado) {
        return res.status(404).json({ message: 'Certificate not found' });
      }
      return res.status(200).json(certificado);
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateCertificateDto: UpdateCertificateDto,
  ) {
    try {
      const certificado = await this.certificatesService.update(
        id,
        updateCertificateDto,
      );
      if (!certificado) {
        return res.status(404).json({ message: 'Certificate not found' });
      }
      return res.status(200).json(certificado);
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id') id: string) {
    try {
      const certificado = await this.certificatesService.remove(id);
      if (!certificado) {
        return res.status(404).json({ message: 'Certificate not found' });
      }
      return res.status(200).json(certificado);
    } catch (err) {
      if (process.env.APP_ENV === 'development') {
        console.error(err);
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
