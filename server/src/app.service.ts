import { Injectable, Logger } from '@nestjs/common';

let count = 0;

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  ping(gameVersion: string | null): string {
    const str = `Hello ${++count}!`;
    this.logger.log(`${str} Game Version: ${gameVersion}`);
    return str;
  }
}
