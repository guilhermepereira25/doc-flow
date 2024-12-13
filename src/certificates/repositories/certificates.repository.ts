import { Injectable } from '@nestjs/common';
import { CertificateRepository } from './certificates.repository.interface';
import { InjectModel } from '@nestjs/sequelize';
import { Certificate } from '../entities/certificate.entity';
import { CreateCertificateDto } from '../dto/create-certificate.dto';

@Injectable()
export class CertificateRepositoryImpl implements CertificateRepository {
  constructor(
    @InjectModel(Certificate)
    private certificateModel: typeof Certificate,
  ) {}

  async create(
    createCertificateDto: CreateCertificateDto,
  ): Promise<Certificate> {
    return await this.certificateModel.create({
      ...createCertificateDto,
      file_id: createCertificateDto.fileId,
      user_id: createCertificateDto.userId,
      event_id: createCertificateDto.eventId,
    });
  }

  async findAll(): Promise<Certificate[]> {
    return await this.certificateModel.findAll();
  }

  async findOne(id: string): Promise<Certificate> {
    return await this.certificateModel.findByPk(id);
  }

  async update(
    id: string,
    updateProfileDto: CreateCertificateDto,
  ): Promise<string> {
    await this.certificateModel.update(updateProfileDto, {
      where: {
        id,
      },
    });
    return 'Profile updated successfully';
  }

  async remove(id: string): Promise<number> {
    const deletedProfile = await this.certificateModel.destroy({
      where: {
        id,
      },
    });
    return deletedProfile;
  }

  async findByPk(id: string): Promise<Certificate> {
    return await this.certificateModel.findByPk(id);
  }

  async findByFileId(id: string): Promise<Certificate> {
    return await this.certificateModel.findOne({
      where: {
        file_id: id,
      },
    });
  }
}
