import cron from 'node-cron';
import { Bot } from 'grammy';

import { getCs2News } from './parser';
import { markNewsAsPublished, getAllChatIds, getUnpublishedNews, saveNewsIfNew } from './db';

export function startNewsCron(bot: Bot) {
    // every 3 hours
    cron.schedule('0 */3 * * *', async () => {
        console.log('[CRON] Checking CS2 news ...');

        const freshNews = await getCs2News();

        for (const item of freshNews) {
            await saveNewsIfNew(item);
        }
        
        const chatIds = await getAllChatIds();

        if (chatIds.length === 0) return;

        const newsToPost = await getUnpublishedNews();

        if (newsToPost.length === 0) return;

        const { id, title, link } = newsToPost[0];

        for (const chatId of chatIds) {
            await bot.api.sendMessage(
              chatId,
              `<b>${title}</b>\n<a href="${link}">Read on cybersport.ru</a>`,
              { parse_mode: 'HTML' }
            );
        }

        await markNewsAsPublished(id);
    });
}
