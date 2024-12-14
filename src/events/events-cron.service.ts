import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EventsService } from './events.service';
import { FileHandle, open, writeFile } from 'node:fs/promises';
import * as path from 'path';

@Injectable()
export class EventCronService {
  constructor(private readonly eventService: EventsService) {}

  //TODO: implementar class abstract para reutilizar o código de inicialização do arquivo de log
  private async initLogFile(cronName: string): Promise<FileHandle> {
    const fileName =
      new Date().toISOString().replace(/:/g, '-') + '-' + cronName + '.log';
    const logFile: FileHandle = await open(
      path.resolve(__dirname, '../../', 'log/cron/', fileName),
      'a',
    );
    return logFile;
  }

  private async writeLog(logFile: FileHandle, message: string): Promise<void> {
    await writeFile(
      logFile,
      `${new Date().toISOString()} - ${message}\n`,
      'utf-8',
    );
  }

  // Executa a cada 10 minutos
  @Cron('0 */10 * * * *')
  async handleUpcomingToCheckIfEventsHasStarted() {
    const logFile: FileHandle = await this.initLogFile(
      'handleUpcomingToCheckIfEventsHasStarted',
    );

    await this.writeLog(
      logFile,
      'Iniciando a verificação de eventos pendentes.',
    );

    try {
      //TODO: not load all events in memory, try to use a cursor
      const pendingEvents = await this.eventService.getStartedEvents();
      if (pendingEvents.length === 0) {
        await this.writeLog(logFile, 'Nenhum evento pendente.');
        return;
      }
      for (const event of pendingEvents) {
        await this.eventService.startEvent(event.id);
        await this.writeLog(
          logFile,
          `Evento ${event.name} iniciado com sucesso.`,
        );
      }
    } catch (err) {
      await this.writeLog(logFile, `Erro ao iniciar eventos: ${err.message}`);
    }

    await this.writeLog(
      logFile,
      'Verificação de eventos pendentes finalizada.',
    );

    logFile.close();
  }

  async handleStartedToCheckIfEventsHasEnded() {
    const logFile: FileHandle = await this.initLogFile(
      'handleStartedToCheckIfEventsHasEnded',
    );

    await this.writeLog(
      logFile,
      'Iniciando a verificação de eventos iniciados.',
    );

    try {
      //TODO: not load all events in memory, try to use a cursor
      const startedEvents = await this.eventService.getStartedEvents();
      if (startedEvents.length === 0) {
        await this.writeLog(logFile, 'Nenhum evento iniciado.');
        return;
      }
      for (const event of startedEvents) {
        await this.eventService.endEvent(event.id);
        await this.writeLog(
          logFile,
          `Evento ${event.name} finalizado com sucesso.`,
        );
      }
    } catch (err) {
      await this.writeLog(logFile, `Erro ao finalizar eventos: ${err.message}`);
    }
  }
}
