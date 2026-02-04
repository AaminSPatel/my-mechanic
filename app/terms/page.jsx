import TermsContent from './terms-content/PageContent';

export const metadata = {
  title: 'Terms & Conditions | Service Warranty Policy - MyMechanic',
  description: 'Read our service agreement, warranty policy on spare parts, and payment terms for car repairs at MyMechanic Auto Care Indore.',
  keywords: ['car repair warranty policy', 'service agreement indore', 'mymechanic terms'],
  alternates: {
    canonical: 'https://my-mechanic-iota.vercel.app/terms',
  },
};

export const revalidate = 86400;

export default function TermsPage() {
  return (
    <>
      <main className="min-h-screen">
        <TermsContent />
      </main>
    </>
  );
}