import { BullModule } from '@nestjs/bull/dist/bull.module';
import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationProcessor } from './notification.processor';
import { NotificationService } from './notification.service';
const dotenv = require('dotenv');
dotenv.config();

@Global()
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'notification'
    }),
    ClientsModule.register([
      {
        name: 'HELLO_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_URL],
          queue: 'user_messages',
          noAck: false,
        },
      },
    ]),
  ],
  providers: [NotificationService, NotificationProcessor],
  exports: [BullModule.registerQueue({
    name: 'notification'
  })]
})
export class NotificationModule { }