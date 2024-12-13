import { Certificate } from '../entities/certificate.entity';
import { CreateCertificateDto } from '../dto/create-certificate.dto';
import { UpdateCertificateDto } from '../dto/update-certificate.dto';

export interface CertificateRepository {
  create(createCertificateDto: CreateCertificateDto): Promise<Certificate>;
  findAll(): Promise<Certificate[]>;
  findOne(id: string): Promise<Certificate>;
  update(id: string, updateProfileDto: UpdateCertificateDto): Promise<string>;
  remove(id: string): Promise<number>;
  findByPk(id: string): Promise<Certificate>;
  findByFileId(id: string): Promise<Certificate>;
}
