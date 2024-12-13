import { Inject, Injectable } from '@nestjs/common';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { CertificateRepository } from './repositories/certificates.repository.interface';
import { CERTIFICATE_REPOSITORY } from './repositories/certificates-repository.token';
//import { Certificate } from './entities/certificate.entity';

@Injectable()
export class CertificatesService {
  constructor(
    @Inject(CERTIFICATE_REPOSITORY)
    private readonly certificadoRepository: CertificateRepository,
  ) {}

  async create(createCertificateDto: CreateCertificateDto) {
    const certificadoAlreadyExists =
      await this.certificadoRepository.findByFileId(
        createCertificateDto.fileId,
      );

    if (certificadoAlreadyExists) {
      return null;
    }
    const certificado =
      await this.certificadoRepository.create(createCertificateDto);
    return certificado;
  }

  async findAll() {
    return await this.certificadoRepository.findAll();
  }

  async findOne(id: string) {
    return await this.certificadoRepository.findOne(id);
  }

  async findByPk(id: string) {
    return await this.certificadoRepository.findOne(id);
  }

  async update(id: string, updateCertificateDto: UpdateCertificateDto) {
    const certificadoAlreadyExists = await this.findByPk(id);

    if (certificadoAlreadyExists) {
      return null;
    }
    const certificado = await this.certificadoRepository.update(
      id,
      updateCertificateDto,
    );
    return certificado;
  }

  async remove(id: string) {
    const certificadoAlreadyExists = await this.findByPk(id);

    if (certificadoAlreadyExists) {
      return null;
    }
    const certificado = await this.certificadoRepository.remove(id);
    return certificado;
  }
}
