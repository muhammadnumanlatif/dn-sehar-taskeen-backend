import { services } from '../../../data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SchemaOrg from '../../../components/SchemaOrg';

export async function generateStaticParams() {
    return services.map((service) => ({
        slug: service.slug,
    }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const service = services.find((s) => s.slug === slug);

    if (!service) {
        return {
            title: 'Service Not Found',
        };
    }

    return {
        title: `${service.title} - Clinical Nutrition Services | Dr. Sehar Taskeen`,
        description: service.description,
        alternates: {
            canonical: `https://drsehartaskeen.online/services/${slug}`
        }
    };
}

export default async function ServicePage({ params }) {
    const { slug } = await params;
    const service = services.find((s) => s.slug === slug);

    if (!service) {
        notFound();
    }

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": service.title,
        "provider": {
            "@type": "Physician",
            "name": "Dr. Sehar Taskeen",
            "url": "https://drsehartaskeen.online",
            "image": "https://drsehartaskeen.online/images/dr-sehar.png"
        },
        "description": service.description,
        "areaServed": "Global"
    };

    const faqSchema = service.faqs ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": service.faqs.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.a
            }
        }))
    } : null;

    return (
        <div className="container py-5">
            <SchemaOrg schema={[serviceSchema, faqSchema].filter(Boolean)} />
            <div className="row justify-content-center">
                <div className="col-lg-10">

                    {/* HERO SECTION */}
                    <div className="text-center mb-5 pb-4 border-bottom">
                        <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1rem' }}>{service.icon}</span>
                        <h1 className="display-4 fw-bold mb-3">{service.hero_title || service.title}</h1>
                        <p className="lead text-muted" style={{ maxWidth: '700px', margin: '0 auto' }}>{service.description}</p>
                    </div>

                    <div className="row g-5">
                        <div className="col-lg-8">
                            {/* PROBLEM SECTION */}
                            {service.problem && (
                                <section className="mb-5">
                                    <h2 className="h3 mb-3 text-secondary">{service.problem.heading}</h2>
                                    <p className="fs-5">{service.problem.content}</p>
                                </section>
                            )}

                            {/* APPROACH SECTION */}
                            {service.approach && (
                                <section className="mb-5 bg-light p-4 rounded-3">
                                    <h2 className="h3 mb-4">{service.approach.heading}</h2>
                                    <div className="d-grid gap-4">
                                        {service.approach.points.map((point, i) => (
                                            <div key={i} className="d-flex">
                                                <div className="me-3 mt-1">
                                                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                                                        {i + 1}
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="h5 mb-1">{point.title}</h4>
                                                    <p className="mb-0 text-muted">{point.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* CONDITIONS TREATED */}
                            <section className="mb-5">
                                <h3 className="h4 mb-4">Conditions We Treat</h3>
                                <div className="row g-3">
                                    {service.details.map((item, index) => (
                                        <div key={index} className="col-md-6">
                                            <div className="d-flex align-items-center p-3 border rounded h-100">
                                                <span className="me-2 text-success fs-5">✓</span>
                                                <span className="fw-medium">{item}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* FAQs */}
                            {service.faqs && (
                                <section className="mb-5">
                                    <h3 className="h4 mb-4">Frequently Asked Questions</h3>
                                    <div className="accordion" id="faqAccordion">
                                        {service.faqs.map((faq, i) => (
                                            <div className="card mb-3 border-0 shadow-sm" key={i}>
                                                <div className="card-body">
                                                    <h5 className="card-title h6 text-primary">{faq.q}</h5>
                                                    <p className="card-text small text-muted mb-0">{faq.a}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                            {/* INTERNAL LINKING: LOCATIONS */}
                            <section className="mb-5 p-4 rounded-3 border bg-white">
                                <h3 className="h5 mb-3">Serving Clients Internationally & Locally:</h3>
                                <p className="small text-muted mb-3">Dr. Sehar Taskeen provides specialized {service.title} clinical services in the following regions and worldwide via telehealth:</p>
                                <div className="d-flex flex-wrap gap-2">
                                    {['lahore', 'karachi', 'rawalpindi', 'faisalabad', 'multan', 'peshawar', 'quetta', 'dubai'].map(city => (
                                        <Link key={city} href={`/locations/${city === 'dubai' ? 'uae' : 'pakistan'}/${city}`} className="btn btn-outline-secondary btn-sm text-capitalize">
                                            {city}
                                        </Link>
                                    ))}
                                    <Link href="/sitemap-catalog" className="text-decoration-none small d-block w-100 mt-2 text-success fw-bold">View all 60+ clinics & locations →</Link>
                                </div>
                            </section>
                        </div>

                        {/* SIDEBAR CTA */}
                        <div className="col-lg-4">
                            <div className="card border-0 shadow-sm p-4 sticky-top" style={{ top: '100px', zIndex: 1 }}>
                                <h3 className="h4 mb-3">Ready to Start?</h3>
                                <p className="mb-4 text-muted">Book your initial consultation to discuss your specific needs and build a personalized roadmap.</p>
                                <Link href="/quote" className="btn btn-primary btn-lg w-100 mb-3">Book Consultation</Link>
                                <div className="text-center small text-muted">
                                    <p className="mb-1">✓ Evidence-Based</p>
                                    <p className="mb-1">✓ Personalized Plan</p>
                                    <p className="mb-0">✓ Ongoing Support</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
