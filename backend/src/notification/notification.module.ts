import { BullModule } from '@nestjs/bull/dist/bull.module';
import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationProcessor } from './notification.processor';
import { NotificationService } from './notification.service';

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
          urls: [
            'amqp://guest:guest@localhost:5672/',
          ],
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
