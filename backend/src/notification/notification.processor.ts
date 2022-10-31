import { Process, Processor } from "@nestjs/bull";
import { Inject, Logger } from "@nestjs/common";
import { ClientProxy, RmqRecordBuilder } from "@nestjs/microservices";

@Processor('notification')
export class NotificationProcessor {
    constructor(@Inject('HELLO_SERVICE') private readonly client: ClientProxy) { }

    @Process('notification')
    async handleNotification(job: any) {
        const record = new RmqRecordBuilder(job.data).build();
        this.client.emit('exam_created', record);
    }
}