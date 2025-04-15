import { Bot } from 'grammy';
import dotenv from 'dotenv';
dotenv.config();

const bot = new Bot(process.env.BOT_TOKEN!);

bot.command('start', ctx => {
    ctx.reply('Hi');
});

bot.command('ping', ctx => {
    ctx.reply('ping');
});

bot.start();
