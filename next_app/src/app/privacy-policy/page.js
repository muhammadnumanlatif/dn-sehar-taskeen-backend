import PrivacyContent from '../../views/PrivacyPolicy';

export const metadata = {
    title: 'Privacy Policy | Dr. Sehar Taskeen',
    description: 'Privacy policy and data protection guidelines for Dr. Sehar Taskeen\'s clinical nutrition services.',
    openGraph: {
        title: 'Privacy Policy | Dr. Sehar Taskeen',
        type: 'website',
    },
    alternates: {
        canonical: 'https://drsehartaskeen.online/privacy-policy'
    },
    robots: {
        index: true,
        follow: true,
    }
};

export default function PrivacyPolicyPage() {
    return <PrivacyContent />;
}
