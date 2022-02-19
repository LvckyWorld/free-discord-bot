import * as Discord from 'discord.js';
import * as embedHandler from '../util/embedHandler';
import * as os from 'os';
import { processStartTime } from '../index';
import * as moment from 'moment';

export async function execute(message: Discord.Message, bot: Discord.Client) {
    if (message.author.id === ('447285957004099584' || '466986428107063306')) {

        const usedMemory = (Math.round(process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100;
        const totalMemory = (Math.round(os.totalmem() / 1024 / 1024) * 100) / 100;

        const endTime = moment(new Date().getTime());
        const duration = moment.duration(endTime.diff(processStartTime));
        message.channel.send({embeds: [embedHandler.standardEmbed("🔥 Status 🔥", `Memory used: ${usedMemory} / ${totalMemory} MB\nProcess: ${ Math.round(duration.asDays()) }d ${ Math.round(duration.asHours()) }h ${ Math.round(duration.asMinutes())}m ${ Math.round(duration.asSeconds())}s`, 'RANDOM', message)]});
    }
}
