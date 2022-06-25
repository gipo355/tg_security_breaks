'use strict';

import 'dotenv-defaults/config';
import { Telegraf, Telegram } from 'telegraf';

const bot = new Telegraf(process.env.TG_KEY as string);
const telegram = new Telegram(process.env.TG_KEY as string);

const chatId = ''

// bot.start((ctx) => ctx.reply('Welcome'));
bot.start((ctx) => {
    ctx.reply(`Hello  ${ctx.from.first_name}${ctx.from.last_name}!`);
});
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));

// ! LAUNCH AND END GRACEFULLY ON NODE STOP
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
