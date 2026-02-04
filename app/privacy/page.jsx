import PrivacyContent from './privacy-content/PageContent';

export const metadata = {
  title: 'Privacy Policy | Data Protection - MyMechanic Auto Care',
  description: 'Learn how MyMechanic Auto Care protects your personal data and vehicle information. We value your privacy and transparency.',
  alternates: {
    canonical: 'https://my-mechanic-iota.vercel.app/privacy',
  },
};

export const revalidate = 86400;

export default function PrivacyPage() {
  return (
    <>
      <main className="min-h-screen">
        <PrivacyContent />
      </main>
    </>
  );
}