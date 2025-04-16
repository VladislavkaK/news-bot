import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
    connectionString: process.env.POSTGRES_URI,
});

export async function initDb() {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS cs2_news (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        link TEXT UNIQUE NOT NULL,
        is_published BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW()
      );
  
      CREATE TABLE IF NOT EXISTS chats (
        id SERIAL PRIMARY KEY,
        chat_id BIGINT UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
}

export async function saveNewsIfNew(news: { title: string; link: string }) {
    try {
        await pool.query(
            'INSERT INTO cs2_news (title, link) VALUES ($1, $2)',
            [news.title, news.link]
        );

        return true;
    } catch(err: any) {
        if (err.code === '23505') return false; // duplicate

        throw err;
    }
}

export async function registerChat(chatId: number) {
    try {
        await pool.query('INSERT INTO chats (chat_id) VALUES ($1)', [chatId]);
        console.log(`✅ A new chatId has been registered: ${chatId}`);
    } catch(err: any) {
        if (err.code === '23505') return; // already exist

        throw err;
    }
}

export async function getAllChatIds(): Promise<number[]> {
    const res = await pool.query('SELECT chat_id FROM chats');

    return res.rows.map(row => row.chat_id);
}

export async function markNewsAsPublished(id: number) {
    await pool.query('UPDATE cs2_news SET is_published = TRUE WHERE id = $1', [id]);
}

export async function getUnpublishedNews(): Promise<{ id: number; title: string; link: string }[]> {
    const res = await pool.query(`
        SELECT id, title, link
        FROM cs2_news
        WHERE is_published = FALSE
        ORDER BY created_at ASC
        LIMIT 1
    `);

    return res.rows;
}
