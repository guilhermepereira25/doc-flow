import { FileHandle, writeFile, open } from 'node:fs/promises';
import * as path from 'path';

export abstract class CronService {
  protected logFile: FileHandle;

  constructor(protected cronName: string) {
    this.cronName = cronName;
  }

  private getFileName(cronJobName: string): string {
    return (
      new Date().toISOString().replace(/:/g, '-') +
      '-' +
      this.cronName +
      cronJobName +
      '.log'
    );
  }

  protected async initLogFile(cronJobName: string): Promise<void> {
    const fileName = this.getFileName(cronJobName);
    this.logFile = await open(
      path.resolve(__dirname, '../../', 'log/cron/', fileName),
      'a',
    );
  }

  protected async writeLog(message: string): Promise<void> {
    if (!this.logFile) {
      throw new Error('Log file not initialized');
    }
    await writeFile(
      this.logFile,
      `${new Date().toISOString()} - ${message}\n`,
      'utf-8',
    );
  }

  protected async closeLogFile(): Promise<void> {
    if (!this.logFile) {
      throw new Error('Log file not initialized');
    }
    await this.logFile?.close();
  }
}
