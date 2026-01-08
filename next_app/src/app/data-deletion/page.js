import DataDeletionContent from '../../pages/DataDeletion';

export const metadata = {
    title: 'Data Deletion Instructions | Dr. Sehar Taskeen',
    description: 'Learn how to request the deletion of your personal data from Dr. Sehar Taskeen\'s platform.',
    openGraph: {
        title: 'Data Deletion Instructions | Dr. Sehar Taskeen',
        type: 'website',
    },
    robots: { index: true, follow: true }
};

export default function DataDeletionPage() {
    return <DataDeletionContent />;
}
