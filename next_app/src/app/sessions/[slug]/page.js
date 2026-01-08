import { sessions } from '../../../data';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    return sessions.map((session) => ({
        slug: session.slug,
    }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const session = sessions.find((s) => s.slug === slug);

    if (!session) {
        return {
            title: 'Session Not Found',
        };
    }

    return {
        title: `${session.title} Booking | Dr. Sehar Taskeen`,
        description: session.description,
        alternates: {
            canonical: `https://drsehartaskeen.online/sessions/${slug}`
        }
    };
}

export default async function SessionPage({ params }) {
    const { slug } = await params;
    const session = sessions.find((s) => s.slug === slug);

    if (!session) {
        notFound();
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">

                    <h1 className="mb-3">{session.title}</h1>
                    <p className="lead mb-4">{session.description}</p>

                    <div className="card mb-4 shadow-sm border-0">
                        <div className="card-body p-4">
                            <div className="text-center mb-4">
                                <span className="fs-1 fw-bold text-success">{session.price}</span>
                            </div>

                            <h3>Included Features</h3>
                            <ul className="list-group list-group-flush mb-4">
                                {session.features.map((item, index) => (
                                    <li key={index} className="list-group-item bg-transparent px-0 border-bottom">
                                        ✓ {item}
                                    </li>
                                ))}
                            </ul>

                            <Link href="/quote" className="btn btn-success btn-lg w-100">Schedule Now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
