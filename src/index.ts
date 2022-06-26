'use strict';

import 'dotenv-defaults/config';
import { scheduleJob, RecurrenceRule } from 'node-schedule';
import { Telegraf, Telegram } from 'telegraf';
import sendTurns, { initializeDb } from './app';

const port = Number(process.env.PORT);
const URL = process.env.URL;

const options: Partial<Options<Context<Update>>> = {
    webHook: {
        port: port,
    },
};
const bot = new Telegraf(process.env.TG_KEY as string, options);
const telegram = new Telegram(process.env.TG_KEY as string);
const chatID = process.env.CHAT_ID as string;

// BOT
bot.start((ctx) => {
    ctx.reply(`Hello  ${ctx.from.first_name}${ctx.from.last_name}!`);
});

bot.help((ctx) => {
    ctx.reply('restartDB, start');
});

bot.hears('restartDB', (ctx) => {
    initializeDb();
    ctx.reply('DB restarted');
});

// const tryDate = new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' });
// console.log(tryDate);

// RECURRENT RULE - SCHEDULED
const rule = new RecurrenceRule();
rule.hour = 7;
// rule.minute = 44;
rule.tz = `CET`;

const job = scheduleJob(rule, function () {
    // console.log('Today is recognized by Rebecca Black!');
    // telegram.sendMessage(chatID, `${new Date().toLocaleTimeString()}`);
    telegram.sendMessage(chatID, sendTurns());
});

// function getDate() {
//     const date = new Date();
//     const str = date.toLocaleTimeString('it-IT');
//     return str;
// }

const job2 = scheduleJob('*/10 * * * * *', function () {
    // console.log('Today is recognized by Rebecca Black!');
    // console.log(tryDate);
    // telegram.sendMessage(chatID, `${new Date().toLocaleTimeString()}`);
    telegram.sendMessage(chatID, sendTurns());
});

// ! LAUNCH AND END GRACEFULLY ON NODE STOP
// bot.launch();
bot.launch({
    webhook: {
        domain: URL,
        port: port,
    },
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
