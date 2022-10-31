export class NotificationBuilder {
    message: string = '';

    addText(component: string): NotificationBuilder {
        this.message += component;
        return this;
    }

    addBold(component: string): NotificationBuilder {
        this.message += `**${component}**`;
        return this;
    }

    addLongDate(component: string): NotificationBuilder {
        this.message += `<t:${component}:F>`;
        return this;
    }

    addSinceTime(component: string): NotificationBuilder {
        this.message += `<t:${component}:R>`;
        return this;
    }

    addTimeChange(oldTime: string, newTime: string): NotificationBuilder {
        this.message += `<t:${oldTime}:R> ➝ <t:${newTime}:R>`;
        return this;
    }

    addRoomChange(oldRoom: string, newRoom: string): NotificationBuilder {
        this.message += `${oldRoom} ➝ **${newRoom}**`;
        return this;
    }

    addNameChange(oldName: string, newName: string): NotificationBuilder {
        this.message += `${oldName} ➝ **${newName}**`;
        return this;
    }

    addNewLine(amount: number = 1): NotificationBuilder {
        this.message += '\n'.repeat(amount);
        return this;
    }

    build(): string {
        return this.message;
    }
}