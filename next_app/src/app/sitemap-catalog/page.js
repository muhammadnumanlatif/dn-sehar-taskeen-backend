import { courses, services, sessions, locations } from '../../data';
import Link from 'next/link';

export const metadata = {
    title: 'Site Directory | Dr. Sehar Taskeen',
    description: 'Complete list of all services, courses, and regional locations served by Dr. Sehar Taskeen worldwide.',
};

export default function SitemapCatalog() {
    return (
        <main className="container py-5">
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold mb-3">Site Directory</h1>
                <p className="lead text-muted">Explore all our clinical services, professional courses, and regional clinics.</p>
            </div>

            <div className="row g-5">
                {/* Main Pages */}
                <div className="col-12">
                    <div className="card border-0 shadow-sm p-4 h-100">
                        <h2 className="h4 mb-4 border-bottom pb-2">Main Navigation</h2>
                        <div className="row g-3">
                            {['Home', 'About', 'Services', 'Courses', 'Sessions', 'Quote', 'Privacy Policy', 'Terms of Service', 'Data Deletion'].map((page) => (
                                <div key={page} className="col-md-3">
                                    <Link href={`/${page.toLowerCase().replace(/ /g, '-') === 'home' ? '' : page.toLowerCase().replace(/ /g, '-')}`} className="text-decoration-none text-primary fw-medium">
                                        • {page}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Services Section */}
                <div className="col-lg-6">
                    <div className="card border-0 shadow-sm p-4 h-100">
                        <h2 className="h4 mb-4 border-bottom pb-2">Clinical Services</h2>
                        <ul className="list-unstyled row g-3">
                            {services.map(s => (
                                <li key={s.id} className="col-md-6">
                                    <Link href={`/services/${s.slug}`} className="text-decoration-none text-dark">
                                        {s.icon} {s.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Courses Section */}
                <div className="col-lg-6">
                    <div className="card border-0 shadow-sm p-4 h-100">
                        <h2 className="h4 mb-4 border-bottom pb-2">Professional Academy</h2>
                        <ul className="list-unstyled row g-3">
                            {courses.map(c => (
                                <li key={c.id} className="col-md-6">
                                    <Link href={`/courses/${c.slug}`} className="text-decoration-none text-dark">
                                        🎓 {c.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Regional Locations Section */}
                <div className="col-12">
                    <div className="card border-0 shadow-sm p-4">
                        <h2 className="h4 mb-4 border-bottom pb-2">Regional Clinics & Locations (Pakistan)</h2>

                        {/* Grouping by Province for better presentation */}
                        {['Punjab', 'Sindh', 'KP', 'Balochistan', 'AJK', 'GB'].map(province => {
                            const cities = locations.find(l => l.country === 'pakistan').cities.filter(c => c.province && c.province.includes(province));
                            if (cities.length === 0) return null;

                            return (
                                <div key={province} className="mb-4">
                                    <h3 className="h6 text-uppercase text-success fw-bold mb-3">{province}</h3>
                                    <div className="row g-2">
                                        {cities.map(city => (
                                            <div key={city.slug} className="col-6 col-md-4 col-lg-3">
                                                <Link href={`/locations/pakistan/${city.slug}`} className="text-decoration-none text-muted small sitemap-link" style={{ transition: '0.2s' }}>
                                                    • {city.name}
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* International Section */}
                <div className="col-12">
                    <div className="card border-0 shadow-sm p-4">
                        <h2 className="h4 mb-4 border-bottom pb-2">International & Global</h2>
                        <div className="row g-3">
                            <div className="col-md-4">
                                <h3 className="h6 text-success fw-bold text-uppercase mb-2">United Arab Emirates</h3>
                                {locations.find(l => l.country === 'uae').cities.map(city => (
                                    <div key={city.slug}>
                                        <Link href={`/locations/uae/${city.slug}`} className="text-decoration-none text-muted small">• {city.name}</Link>
                                    </div>
                                ))}
                            </div>
                            <div className="col-md-4">
                                <h3 className="h6 text-success fw-bold text-uppercase mb-2">Global Presence</h3>
                                <Link href="/locations/global" className="text-decoration-none text-muted small">• Online (Worldwide Consultations)</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
