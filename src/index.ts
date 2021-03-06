'use strict';

import 'dotenv-defaults/config';
import { scheduleJob } from 'node-schedule';
import { Telegraf, Telegram } from 'telegraf';
import sendTurns from './app';

const chatID = process.env.CHAT_ID as string;
const chatIDDev = process.env.CHAT_ID_DEV as string;

const bot = new Telegraf(process.env.TG_KEY as string);
const telegram = new Telegram(process.env.TG_KEY as string);

// dev start
// const startTime = new Date('2022-06-01T00:00:00.000+02:00').getTime();

const startTime = new Date('2022-07-01T00:00:00.000+02:00').getTime();
const endTime = new Date('2022-09-01T00:00:00.000+02:00').getTime();

// TODO fix rule, startTime, chatid and starting DB + start dyno / dyno is gmt+0
const job3 = scheduleJob(
    {
        start: startTime, // milliseconds
        end: endTime, // milliseconds
        rule: '00 00 05 * * *',

        // dev cron
        // rule: '*/30 * * * * *',
        // rule: '00 25 05 * * *',
        // rule: '*/2 * * * *',
    },
    () => {
        telegram.sendMessage(chatID, sendTurns());
        telegram.sendMessage(chatIDDev, sendTurns());
    }
);

console.log('ciao');

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
