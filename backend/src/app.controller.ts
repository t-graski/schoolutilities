import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, RmqRecord, RmqRecordBuilder } from '@nestjs/microservices';

@Controller('api')
export class AppController {
  constructor(@Inject('HELLO_SERVICE') private readonly client: ClientProxy) { }

  @Get()
  async getHello() {
    const message = {
      id: 1
    };
    const record = new RmqRecordBuilder(message).build();

    this.client.emit('message_printed', record);
    return 'Hello world printed!';
  }
}

