import axios from 'axios';
import * as cheerio from 'cheerio';

export interface NewsItem {
    title: string;
    link: string;
}

export async function getCs2News(pages = 2): Promise<NewsItem[]> {
    const news: NewsItem[] = [];
  
    for (let page = 1; page <= pages; page++) {
      const url = `https://www.cybersport.ru/tags/cs2?page=${page}`;
      const res = await axios.get(url);
      const $ = cheerio.load(res.data);
  
      $('article').each((_, el) => {
        const a = $(el).find('a').first();
        const title = a.text().trim();
        const href = a.attr('href');
  
        if (title && href && href.startsWith('/tags/cs2')) {
          news.push({
            title,
            link: `https://www.cybersport.ru${href}`,
          });
        }
      });
    }
  
    return news;
}

