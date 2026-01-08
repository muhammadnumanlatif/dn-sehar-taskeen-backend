import { courses } from '../../../data';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    return courses.map((course) => ({
        slug: course.slug,
    }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const course = courses.find((c) => c.slug === slug);

    if (!course) {
        return {
            title: 'Course Not Found',
        };
    }

    return {
        title: `${course.title} | Dr. Sehar Taskeen`,
        description: course.description,
        alternates: {
            canonical: `https://drsehartaskeen.online/courses/${slug}`
        }
    };
}

export default async function CoursePage({ params }) {
    const { slug } = await params;
    const course = courses.find((c) => c.slug === slug);

    if (!course) {
        notFound();
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">

                    <h1 className="mb-3">{course.title}</h1>
                    <p className="lead mb-4">{course.description}</p>

                    <div className="card mb-4 shadow-sm border-0">
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <span className="badge bg-primary fs-6">{course.duration}</span>
                                <span className="fs-2 fw-bold text-success">{course.price}</span>
                            </div>

                            <h3>Curriculum</h3>
                            <ul className="list-group list-group-flush mb-4">
                                {course.curriculum.map((item, index) => (
                                    <li key={index} className="list-group-item bg-transparent px-0 border-bottom">
                                        ✓ {item}
                                    </li>
                                ))}
                            </ul>

                            <Link href="/quote" className="btn btn-success btn-lg w-100">Enroll Now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
