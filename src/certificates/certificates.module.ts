import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Certificate } from './entities/certificate.entity';
import { CertificatesService } from './certificates.service';
import { CertificatesController } from './certificates.controller';
import { CERTIFICATE_REPOSITORY } from './repositories/certificates-repository.token';
import { CertificateRepositoryImpl } from './repositories/certificates.repository';

@Module({
  imports: [SequelizeModule.forFeature([Certificate])],
  controllers: [CertificatesController],
  providers: [
    CertificatesService,
    {
      provide: CERTIFICATE_REPOSITORY,
      useClass: CertificateRepositoryImpl,
    },
  ],
  exports: [CertificatesService],
})
export class CertificatesModule {}
