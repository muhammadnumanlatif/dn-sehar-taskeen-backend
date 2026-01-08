import { locations } from '../../../../data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SchemaOrg from '../../../../components/SchemaOrg';

export async function generateStaticParams() {
    const params = [];
    locations.forEach((loc) => {
        loc.cities.forEach((city) => {
            params.push({
                country: loc.country,
                city: city.slug,
            });
        });
    });
    return params;
}

export async function generateMetadata({ params }) {
    const { country, city: citySlug } = await params;
    const location = locations.find((l) => l.country === country);

    if (!location) return { title: 'Not Found' };

    const city = location.cities.find(c => c.slug === citySlug);
    if (!city) return { title: 'Not Found' };

    return {
        title: `Best Nutritionist in ${city.name}, ${location.country.charAt(0).toUpperCase() + location.country.slice(1)} | Dr. Sehar Taskeen`,
        description: `Leading clinical nutritionist serving ${city.name}. Specializing in PCOS, Weight Loss, and Gut Health. Book your consultation in ${city.name} today.`,
        alternates: {
            canonical: `https://drsehartaskeen.online/locations/${country}/${citySlug}`
        }
    };
}

export default async function CityPage({ params }) {
    const { country, city: citySlug } = await params;
    const location = locations.find((l) => l.country === country);

    if (!location) notFound();

    const city = location.cities.find(c => c.slug === citySlug);
    if (!city) notFound();

    const countryName = location.country.charAt(0).toUpperCase() + location.country.slice(1);

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": `Dr. Sehar Taskeen ${city.name} Clinic`,
        "image": "https://drsehartaskeen.online/images/dr-sehar.png",
        "url": `https://drsehartaskeen.online/locations/${country}/${citySlug}`,
        "telephone": "+92-300-1234567",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": city.address || "DHA Phase 5",
            "addressLocality": city.name,
            "addressRegion": city.province || countryName,
            "addressCountry": location.country.toUpperCase()
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "31.5204",
            "longitude": "74.3587"
        },
        "priceRange": "$$",
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                "opens": "10:00",
                "closes": "20:00"
            }
        ]
    };

    return (
        <div className="container py-5">
            <SchemaOrg schema={localBusinessSchema} />

            <div className="row align-items-center mb-5">
                <div className="col-lg-8">
                    <h1 className="display-4 fw-bold mb-3">Expert Clinical Nutritionist in {city.name}</h1>
                    <p className="lead text-muted mb-4">
                        {city.desc || `Transform your health with Dr. Sehar Taskeen, a trusted name in ${city.name} for evidence-based nutritional therapy.`}
                    </p>
                    {city.local_focus && (
                        <div className="alert alert-light border-start border-4 border-success shadow-sm">
                            <strong>Local Focus:</strong> {city.local_focus}
                        </div>
                    )}
                </div>
                <div className="col-lg-4 text-center">
                    <div className="card shadow border-0 p-4">
                        <div className="card-body">
                            <h5 className="card-title fw-bold mb-3">Serving {city.name}</h5>
                            <p className="small text-muted mb-4">
                                {city.address ? `Clinic Location: ${city.address}` : `Online consultations available directly from the comfort of your home in ${city.name}.`}
                            </p>
                            <Link href="/quote" className="btn btn-success btn-lg w-100">Book Consultation</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-5">
                <div className="col-12">
                    <div className="p-4 bg-white border rounded shadow-sm">
                        <h2 className="h3 mb-3">Why Choosing an Expert Clinical Nutritionist in {city.name} Matters</h2>
                        <p>
                            In {city.name}, where lifestyle-related health challenges like PCOS, insulin resistance, and metabolic disorders are rising, generic diet plans often fail. Dr. Sehar Taskeen provides <strong>evidence-based Clinical Medical Nutrition Therapy (MNT)</strong> tailored specifically to the environmental and dietary factors prevalent in {city.name}.
                        </p>
                        <p>
                            By combining global clinical standards with a deep understanding of local food habits in {city.province || countryName}, we ensure that your health transformation is both scientific and sustainable.
                        </p>
                    </div>
                </div>
            </div>

            <div className="row mb-5 g-4 text-center">
                <div className="col-md-4">
                    <div className="p-4 border rounded-3 h-100 bg-white shadow-sm">
                        <span style={{ fontSize: '2rem' }}>📍</span>
                        <h4 className="mt-3">Local Expertise</h4>
                        <p className="text-muted">Understanding the specific dietary challenges and lifestyle factors of {city.name}.</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-4 border rounded-3 h-100 bg-white shadow-sm">
                        <span style={{ fontSize: '2rem' }}>🌍</span>
                        <h4 className="mt-3">Global Standards</h4>
                        <p className="text-muted">International clinical protocols (Academy of Nutrition and Dietetics) applied to your local context.</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-4 border rounded-3 h-100 bg-white shadow-sm">
                        <span style={{ fontSize: '2rem' }}>🤝</span>
                        <h4 className="mt-3">Personalized Care</h4>
                        <p className="text-muted">One-on-one attention ensuring your plan fits your life in {city.name}, not the other way around.</p>
                    </div>
                </div>
            </div>

            <div className="bg-primary text-white p-5 rounded-3 text-center mb-5" style={{ background: 'linear-gradient(135deg, #198754 0%, #20c997 100%)' }}>
                <h2 className="mb-3">Start Your Journey in {city.name}</h2>
                <p className="mb-4 lead">Join hundreds of successful clients who have reversed their symptoms naturally.</p>
                <Link href="/quote" className="btn btn-light btn-lg px-5 fw-bold text-success">Get Your Protocol</Link>
            </div>

            <section className="mt-5 p-4 bg-light rounded shadow-sm">
                <h3 className="h4 mb-4 border-bottom pb-2">Top Clinical Services in {city.name}</h3>
                <div className="row g-3">
                    <div className="col-md-4">
                        <Link href="/services/pcos" className="text-decoration-none p-3 border rounded d-block bg-white hover-shadow">
                            <span className="h6 d-block mb-1 text-primary">PCOS Reversal</span>
                            <span className="small text-muted">Specialized metabolic care in {city.name}.</span>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link href="/services/gut-health" className="text-decoration-none p-3 border rounded d-block bg-white hover-shadow">
                            <span className="h6 d-block mb-1 text-primary">Gut Health</span>
                            <span className="small text-muted">Restore your microbiome today.</span>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link href="/services/metabolic-wellness" className="text-decoration-none p-3 border rounded d-block bg-white hover-shadow">
                            <span className="h6 d-block mb-1 text-primary">Metabolic Wellness</span>
                            <span className="small text-muted">Scientific weight management solutions.</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
