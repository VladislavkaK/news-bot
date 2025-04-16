import { Bot } from 'grammy';
import dotenv from 'dotenv';

import { registerChat, initDb, pool } from './db';
import { startNewsCron } from './cron';

dotenv.config();

const bot = new Bot(process.env.BOT_TOKEN!);

bot.command('start', async (ctx) => {
    await registerChat(ctx.chat.id);
    await ctx.reply('I publish CS2 news from cybersport.ru');
});

bot.command('clear', async (ctx) => {
    await pool.query('TRUNCATE cs2_news, chats RESTART IDENTITY');
    await ctx.reply('🗑 All data has been cleared.');
});

bot.on('message', async (ctx) => {
    await registerChat(ctx.chat.id);
});

initDb();
startNewsCron(bot);
bot.start();
