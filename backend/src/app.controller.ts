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
    const record = new RmqRecordBuilder(message)
      .setOptions({
        headers: {
          ["x-delayed-type"]: "direct",
          ["x-delay"]: "10000"
        },
      }).build();

    this.client.emit('message_printed', record);
    return 'Hello world printed!';
  }
}

