import fs from 'fs';
import { SitemapStream, streamToPromise } from 'sitemap';

const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about-us', changefreq: 'monthly', priority: 0.7 },
  { url: '/contact-us', changefreq: 'monthly', priority: 0.7 },
];

const stream = new SitemapStream({ hostname: 'https://alltiv.ai' });
const writeStream = fs.createWriteStream('./public/sitemap.xml');
stream.pipe(writeStream);

links.forEach(link => stream.write(link));
stream.end();

await streamToPromise(stream);
console.log('✅ Sitemap written to public/sitemap.xml');
