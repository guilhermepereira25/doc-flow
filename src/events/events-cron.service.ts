import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EventsService } from './events.service';
import { CronService } from 'src/common/cron-service';

@Injectable()
export class EventCronService extends CronService {
  constructor(private readonly eventService: EventsService) {
    super('EventCronService');
  }

  // Executa a cada 5 minutos
  @Cron('0 */5 * * * *')
  async handleUpcomingToCheckIfEventsHasStarted() {
    const logFile = await this.initLogFile(
      'handleUpcomingToCheckIfEventsHasStarted',
    );

    await this.writeLog(
      logFile,
      'Iniciando a verificação de eventos pendentes.',
    );

    try {
      const pendingEvents = await this.eventService.getUpcomingEvents();
      if (pendingEvents.length === 0) {
        await this.writeLog(logFile, 'Nenhum evento pendente.');
        return;
      }

      await Promise.all(
        pendingEvents.map(async (event) => {
          await this.eventService.startEvent(event.id);
          await this.writeLog(
            logFile,
            `Evento ${event.name} iniciado com sucesso.`,
          );
        }),
      );
    } catch (err) {
      await this.writeLog(logFile, `Erro ao iniciar eventos: ${err.message}`);
    } finally {
      await this.writeLog(
        logFile,
        'Verificação de eventos pendentes finalizada.',
      );
      await logFile?.close();
    }
  }

  @Cron('0 */5 * * * *')
  async handleStartedToCheckIfEventsHasEnded() {
    const fileHandler = await this.initLogFile(
      'handleStartedToCheckIfEventsHasEnded',
    );

    await this.writeLog(
      fileHandler,
      'Iniciando a verificação de eventos iniciados.',
    );

    try {
      const eventsToEnded = await this.eventService.getEndedEvents();
      if (eventsToEnded.length === 0) {
        await this.writeLog(fileHandler, 'Nenhum evento iniciado.');
        return;
      }
      await Promise.all(
        eventsToEnded.map(async (event) => {
          await this.eventService.endEvent(event.id);
          await this.writeLog(
            fileHandler,
            `Evento ${event.name} finalizado com sucesso.`,
          );
        }),
      );
    } catch (err) {
      await this.writeLog(
        fileHandler,
        `Erro ao finalizar eventos: ${err.message}`,
      );
    } finally {
      await this.writeLog(
        fileHandler,
        'Verificação de eventos iniciados finalizada.',
      );
      await fileHandler?.close();
    }
  }
}
