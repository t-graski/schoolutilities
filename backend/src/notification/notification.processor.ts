import { Process, Processor } from "@nestjs/bull";
import { Inject, Logger } from "@nestjs/common";
import { ClientProxy, RmqRecordBuilder } from "@nestjs/microservices";

@Processor('notification')
export class NotificationProcessor {
    constructor(@Inject('HELLO_SERVICE') private readonly client: ClientProxy) { }

    private readonly logger = new Logger(NotificationProcessor.name);

    @Process('notification')
    async handleNotification(job: any) {
        const record = new RmqRecordBuilder(job.data).build();

        console.log('job received', new Date().toLocaleTimeString());
        this.client.emit('exam_created', record);
    }
}