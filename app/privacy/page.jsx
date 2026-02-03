import PrivacyContent from './privacy-content/PageContent';

export const metadata = {
  title: 'Privacy Policy - ProDrive Auto Care',
  description: 'Privacy policy for ProDrive Auto Care. Learn how we protect your personal information.',
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
