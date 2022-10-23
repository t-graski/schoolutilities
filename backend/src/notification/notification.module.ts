import { BullModule } from '@nestjs/bull/dist/bull.module';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationProcessor } from './notification.processor';
import { NotificationService } from './notification.service';

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
  providers: [NotificationService, NotificationProcessor]
})
export class NotificationModule { }
