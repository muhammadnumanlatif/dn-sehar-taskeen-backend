import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { Providers } from '../components/Providers';
import SchemaOrg from '../components/SchemaOrg';
import UIWrapper from '../components/UIWrapper';

const siteConfig = {
    url: 'https://drsehartaskeen.online',
    name: 'Dr. Sehar Taskeen',
    title: 'Dr. Sehar Taskeen | PCOS & Clinical Nutrition Expert',
    description: 'Expert clinical nutritionist specializing in PCOS reversal, gut health, and metabolic wellness with 10,000+ success stories worldwide.',
};

export const metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: siteConfig.title,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: ['PCOS Expert', 'Clinical Nutritionist', 'Gut Health Specialist', 'Dietitian Pakistan', 'Hormonal Balance'],
    alternates: {
        canonical: './',
    },
    openGraph: {
        title: siteConfig.title,
        description: siteConfig.description,
        url: siteConfig.url,
        siteName: siteConfig.name,
        images: [
            {
                url: '/images/og-image.png',
                width: 1200,
                height: 630,
                alt: siteConfig.title,
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: siteConfig.title,
        description: siteConfig.description,
        images: ['/images/og-image.png'],
    },
    manifest: '/manifest.json',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function RootLayout({ children }) {
    const orgSchema = {
        "@context": "https://schema.org",
        "@type": "MedicalOrganization",
        "name": "Dr. Sehar Taskeen - Optimum Nutrafit Academy",
        "url": siteConfig.url,
        "logo": `${siteConfig.url}/images/logo.png`,
        "description": siteConfig.description,
        "medicalSpecialty": ["DietNutrition", "Endocrinology"],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+92-300-1234567",
            "contactType": "customer service",
            "availableLanguage": ["en", "ur"]
        },
        "sameAs": [
            "https://www.instagram.com/drsehartaskeen",
            "https://www.linkedin.com/in/drsehartaskeen",
            "https://www.facebook.com/drsehartaskeen"
        ]
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": siteConfig.name,
        "url": siteConfig.url,
        "potentialAction": {
            "@type": "SearchAction",
            "target": `${siteConfig.url}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning>
                <Providers>
                    <SchemaOrg schema={[orgSchema, websiteSchema]} />
                    <UIWrapper>
                        {children}
                    </UIWrapper>
                </Providers>
            </body>
        </html>
    );
}
