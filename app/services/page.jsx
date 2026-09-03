import ServicesContent from './services-content/PageContent';
import { services } from '@/data/services';
import { SITE_URL, COMPANY, getCanonicalUrl } from '@/lib/constants';

export const metadata = {
  title: 'Car Repair Services & Doorstep Washing Rates in Indore | MyMechanic24',
  description:
    'Transparent auto repair packages starting @ ₹199 across Indore. Professional doorstep car foam wash, synthetic engine oil change, AC gas refill, computerized OBD-II diagnostics, and battery replacement by MyMechanic24.',
  keywords: [
    'car repair services indore',
    'doorstep car wash indore',
    'car service charges indore',
    'engine oil change price indore',
    'car ac repair nayta mundla',
    'car dry cleaning palda indore',
    'mobile car mechanic tejaji nagar',
    'obd2 diagnostic scan indore',
    'car battery replacement at home indore',
  ],
  alternates: {
    canonical: getCanonicalUrl('/services'),
  },
  openGraph: {
    title: 'Car Repair & Doorstep Wash Menu & Rates | MyMechanic24 Indore',
    description:
      'Full spectrum automotive repair and detailing services: Doorstep high-pressure foam wash, periodic maintenance, computerized diagnostics, and major workshop overhauls in Indore.',
    url: `${SITE_URL}/services`,
    siteName: COMPANY.legalName,
    images: [
      {
        url: `${SITE_URL}/car_washing_indore_mymechanic.jpeg`,
        width: 1200,
        height: 630,
        alt: 'MyMechanic24 Car Services and Doorstep Care in Indore',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyMechanic24 - Car Repair & Washing Rates Indore',
    description:
      'Transparent car repair packages, doorstep high-pressure foam washing, and computerized diagnostics across Indore.',
    images: [`${SITE_URL}/car_washing_indore_mymechanic.jpeg`],
  },
};

export const revalidate = 3600;

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <ServicesContent services={services} />
    </main>
  );
}