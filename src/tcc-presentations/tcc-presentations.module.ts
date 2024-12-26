import { Module } from '@nestjs/common';
import { TccPresentationsService } from './tcc-presentations.service';
import { TccPresentationsController } from './tcc-presentations.controller';

@Module({
  controllers: [TccPresentationsController],
  providers: [TccPresentationsService],
})
export class TccPresentationsModule {}
