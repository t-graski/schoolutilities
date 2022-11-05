import { EmbedBuilder } from 'discord.js'
import { Color } from './color';

export class SUEmbedBuilder {
    private embed = new EmbedBuilder();

    constructor(title: string) {
        this.embed.setTitle(title).setFooter({ text: "SchoolUtilities © 2022" }).setTimestamp();
    }

    setDescription(description: string): SUEmbedBuilder {
        this.embed.setDescription(description);
        return this;
    }

    setColor(color: Color): SUEmbedBuilder {
        this.embed.setColor(color);
        return this;
    }

    setURL(url: string): SUEmbedBuilder {
        this.embed.setURL(url);
        return this;
    }

    addField(name: string, value: string, inline: boolean): SUEmbedBuilder {
        this.embed.addFields({ name, value, inline });
        return this;
    }

    addFields(fields: { name: string, value: string, inline: boolean }[]): SUEmbedBuilder {
        this.embed.addFields(fields);
        return this;
    }

    setThumbnail(url: string): SUEmbedBuilder {
        this.embed.setThumbnail(url);
        return this;
    }

    build(): EmbedBuilder {
        return this.embed;
    }

}