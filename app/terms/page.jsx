import TermsContent from './terms-content/PageContent';
import { COMPANY, getCanonicalUrl } from '@/lib/constants';

export const metadata = {
  title: 'Terms & Conditions | Service Warranty Policy - MyMechanic24 Indore',
  description:
    'Review our transparent service agreement, spare parts warranty guidelines, digital billing policies, and customer guarantees for car repairs and doorstep washing at MyMechanic24 Auto Care Indore.',
  keywords: [
    'car repair warranty policy indore',
    'service agreement MyMechanic24',
    'oem parts warranty policy',
    'doorstep car repair terms indore',
  ],
  alternates: {
    canonical: getCanonicalUrl('/terms'),
  },
};

export const revalidate = 86400;

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <TermsContent />
    </main>
  );
}