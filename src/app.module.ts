import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from './events/events.module';
import { RolesModule } from './roles/roles.module';
import { FilesModule } from './files/files.module';
import { CertificatesModule } from './certificates/certificates.module';
import { PresencesModule } from './presences/presences.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSGRES_HOST,
      port: parseInt(process.env.POSGRES_PORT || '5432'),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    }),
    UsersModule,
    ProfileModule,
    EventsModule,
    RolesModule,
    FilesModule,
    CertificatesModule,
    PresencesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
