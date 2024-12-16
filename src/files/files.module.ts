import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { File } from './entities/file.entity';
import { FILE_REPOSITORY } from './repository/files-repository.token';
import { FileRepositoryImpl } from './repository/files.repository';

@Module({
  imports: [SequelizeModule.forFeature([File])],
  controllers: [FilesController],
  providers: [
    FilesService,
    {
      provide: FILE_REPOSITORY,
      useClass: FileRepositoryImpl,
    },
  ],
  exports: [FilesService],
})
export class FilesModule {}
