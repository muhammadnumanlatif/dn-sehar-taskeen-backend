import { courses, services, sessions, locations } from '../data';

export const dynamic = 'force-static';

export default async function sitemap() {
    const baseUrl = 'https://drsehartaskeen.online';

    // Static pages
    const staticPages = [
        '',
        '/about',
        '/courses',
        '/services',
        '/sessions',
        '/quote',
        '/privacy-policy',
        '/terms',
        '/data-deletion',
        '/sitemap-catalog'
    ].map(route => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic Services
    const servicePages = services.map(s => ({
        url: `${baseUrl}/services/${s.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
    }));

    // Dynamic Courses
    const coursePages = courses.map(c => ({
        url: `${baseUrl}/courses/${c.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.85,
    }));

    // Dynamic Sessions
    const sessionPages = sessions.map(s => ({
        url: `${baseUrl}/sessions/${s.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    // Dynamic Locations (Countries & Cities)
    const locationPages = [];
    locations.forEach(loc => {
        // Country page
        locationPages.push({
            url: `${baseUrl}/locations/${loc.country}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        });

        // City pages
        loc.cities.forEach(city => {
            locationPages.push({
                url: `${baseUrl}/locations/${loc.country}/${city.slug}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.5,
            });
        });
    });

    return [
        ...staticPages,
        ...servicePages,
        ...coursePages,
        ...sessionPages,
        ...locationPages,
    ];
}
