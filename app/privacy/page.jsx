import PrivacyContent from './privacy-content/PageContent';
import { COMPANY, getCanonicalUrl } from '@/lib/constants';

export const metadata = {
  title: 'Privacy Policy | Data Protection - MyMechanic24 Auto Care Indore',
  description:
    'Learn how MyMechanic24 Auto Care protects customer data, vehicle service history, and contact details. We maintain strict confidentiality and transparency across all doorstep and garage services in Indore.',
  alternates: {
    canonical: getCanonicalUrl('/privacy'),
  },
};

export const revalidate = 86400;

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <PrivacyContent />
    </main>
  );
}