import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/ping')
  ping(@Body('gameVersion') gameVersion: string | null): { message: string } {
    return { message: this.appService.ping(gameVersion) };
  }
}
