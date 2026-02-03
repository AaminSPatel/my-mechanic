import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingContactBar from '@/components/FloatingContactBar';
import TermsContent from './terms-content/PageContent';

export const metadata = {
  title: 'Terms & Conditions - ProDrive Auto Care',
  description: 'Terms and conditions for using ProDrive Auto Care services.',
};

export const revalidate = 86400; // Revalidate daily

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <TermsContent />
      </main>
      <Footer />
      <FloatingContactBar />
    </>
  );
}
