'use strict';

import 'dotenv-defaults/config';
import { scheduleJob, RecurrenceRule } from 'node-schedule';
import { Telegraf, Telegram } from 'telegraf';
import sendTurns, { initializeDb } from './app';

const port = Number(process.env.PORT);
const URL = process.env.URL;
const chatID = process.env.CHAT_ID as string;

const bot = new Telegraf(process.env.TG_KEY as string);
const telegram = new Telegram(process.env.TG_KEY as string);

const startTime = new Date('2022-06-26T21:25:00.000+02:00').getTime();
const endTime = new Date('2022-07-01T00:00:00.000+02:00').getTime();

const job3 = scheduleJob(
    {
        start: startTime,
        end: endTime,
        rule: '05 * * * * *',
    },
    () => {
        telegram.sendMessage(chatID, sendTurns());
    }
);

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
