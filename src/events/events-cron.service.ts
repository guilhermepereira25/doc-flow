import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EventsService } from './events.service';
import { CronService } from 'src/common/cron-service';

@Injectable()
export class EventCronService extends CronService {
  constructor(private readonly eventService: EventsService) {
    super('EventCronService');
  }

  // Executa a cada 10 minutos
  @Cron('0 */10 * * * *')
  async handleUpcomingToCheckIfEventsHasStarted() {
    await this.initLogFile('handleUpcomingToCheckIfEventsHasStarted');

    await this.writeLog('Iniciando a verificação de eventos pendentes.');

    try {
      const pendingEvents = await this.eventService.getUpcomingEvents();
      if (pendingEvents.length === 0) {
        await this.writeLog('Nenhum evento pendente.');
        return;
      }
      for (const event of pendingEvents) {
        await this.eventService.startEvent(event.id);
        await this.writeLog(`Evento ${event.name} iniciado com sucesso.`);
      }
    } catch (err) {
      await this.writeLog(`Erro ao iniciar eventos: ${err.message}`);
    } finally {
      await this.writeLog('Verificação de eventos pendentes finalizada.');
    }
  }

  @Cron('0 */10 * * * *')
  async handleStartedToCheckIfEventsHasEnded() {
    await this.initLogFile('handleStartedToCheckIfEventsHasEnded');

    await this.writeLog('Iniciando a verificação de eventos iniciados.');

    try {
      const eventsToEnded = await this.eventService.getEndedEvents();
      if (eventsToEnded.length === 0) {
        await this.writeLog('Nenhum evento iniciado.');
        return;
      }
      for (const event of eventsToEnded) {
        await this.eventService.endEvent(event.id);
        await this.writeLog(`Evento ${event.name} finalizado com sucesso.`);
      }
    } catch (err) {
      await this.writeLog(`Erro ao finalizar eventos: ${err.message}`);
    } finally {
      await this.writeLog('Verificação de eventos iniciados finalizada.');
    }
  }
}
