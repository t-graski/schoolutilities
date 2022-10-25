export class TimeTableNotificationBuilder {
    notification: string;

    constructor() {
        this.notification = "";
    }

    addMessage(message: string) {
        this.notification += message;
        return this;
    }

    addExam(examName: string) {
        this.notification += examName;
        return this;
    }

    addExamLink(examLink: string) {
        this.notification += examLink;
        return this;
    }

    build() {
        return `${this.notification}`;
    }
} 
