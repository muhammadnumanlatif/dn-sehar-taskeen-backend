export const dynamic = 'force-static';

export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin', '/api/'],
            },
            {
                userAgent: 'GPTBot',
                allow: '/',
            },
            {
                userAgent: 'facebookexternalhit',
                allow: '/',
            }
        ],
        sitemap: 'https://drsehartaskeen.online/sitemap.xml',
    };
}
