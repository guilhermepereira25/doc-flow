import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Event } from './entities/event.entity';
import { EventRepositoryImpl } from './repositories/event.repository';
@Module({
  imports: [SequelizeModule.forFeature([Event])],
  controllers: [
    EventsController, 
  ],
  providers: [
    EventsService,
    {
      provide: 'IEventRepository',
      useClass: EventRepositoryImpl,
    }
  ],
  exports: [EventsService],
})
export class EventsModule {}
