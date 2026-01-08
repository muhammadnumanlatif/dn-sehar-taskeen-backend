import { locations } from '../../../data';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    return locations.map((loc) => ({
        country: loc.country,
    }));
}

export async function generateMetadata({ params }) {
    const { country } = await params;
    const location = locations.find((l) => l.country === country);

    if (!location) {
        return { title: 'Location Not Found' };
    }

    const countryName = location.country.charAt(0).toUpperCase() + location.country.slice(1);

    return {
        title: `Best Clinical Nutritionist in ${countryName} | Dr. Sehar Taskeen`,
        description: `Expert nutritional care available in ${countryName}. Personalized protocols for PCOS, Gut Health, and more. Book your consultation today.`,
        alternates: {
            canonical: `https://drsehartaskeen.online/locations/${country}`
        }
    };
}

export default async function CountryPage({ params }) {
    const { country } = await params;
    const location = locations.find((l) => l.country === country);

    if (!location) {
        notFound();
    }

    const countryName = location.country.charAt(0).toUpperCase() + location.country.slice(1);

    return (
        <div className="container py-5">

            <h1 className="mb-4">Clinical Nutrition Services in {countryName}</h1>
            <p className="lead mb-5">
                Dr. Sehar Taskeen provides world-class clinical nutrition services to clients across {countryName}.
                Whether you are in {location.cities.map(c => c.name).join(', ')}, or anywhere else in the region,
                our online consultations bring expert care directly to you.
            </p>

            <h2 className="mb-4">Locations We Serve in {countryName}</h2>
            <div className="row g-4 mb-5">
                {location.cities.map((city, index) => (
                    <div key={index} className="col-md-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h3 className="card-title h5">{city.name}</h3>
                                <p className="card-text text-muted"> Specialized nutrition support in {city.name}.</p>
                                <Link href={`/locations/${country}/${city.slug}`} className="btn btn-outline-primary btn-sm stretched-link">
                                    View Services in {city.name}
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-light p-5 rounded-3 text-center">
                <h2>Ready to Transform Your Health?</h2>
                <p className="mb-4">Book your consultation today and join thousands of satisfied clients in {countryName}.</p>
                <Link href="/quote" className="btn btn-primary btn-lg">Schedule Appointment</Link>
            </div>
        </div>
    );
}
