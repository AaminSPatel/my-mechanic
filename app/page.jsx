import HomeContent from './home-content/PageContent';
import { services } from '@/data/services';
import { testimonials } from '@/data/testimonials';
import { localBusinessSchema } from '@/schema/localBusinessSchema';
import { serviceSchema } from '@/schema/serviceSchema';
import { faqSchema } from '@/schema/faqSchema';
import { reviewSchema } from '@/schema/reviewSchema';
import { SITE_URL, COMPANY, getCanonicalUrl } from '@/lib/constants';

export const metadata = {
  title: 'MyMechanic24 | Doorstep Car Repair & Washing in Indore | Nayta Mundla Garage',
  description:
    'MyMechanic24 delivers expert doorstep car repair, computerized diagnostics, and high-pressure snow foam wash at home across Indore. Central garage located on Nayta Mundla Main Road, serving Palda, Tejaji Nagar, Udhyog Nagar, and all Indore sectors.',
  keywords: [
    'MyMechanic24',
    'car repair indore',
    'doorstep car wash indore',
    'car repair nayta mundla',
    'car mechanic palda indore',
    'car service tejaji nagar indore',
    'car wash at home indore',
    'mobile mechanic indore',
    'car battery jumpstart indore',
    'auto garage nayta mundla road indore',
    'doorstep car detailing indore',
  ],
  alternates: {
    canonical: getCanonicalUrl('/'),
  },
  openGraph: {
    title: 'MyMechanic24 | Doorstep Car Service, Repair & Washing in Indore',
    description:
      'Expert doorstep mechanics, genuine OEM parts, transparent pricing, and car washing at home. Garage on Nayta Mundla Main Road, serving Palda, Tejaji Nagar, and across Indore.',
    url: SITE_URL,
    siteName: COMPANY.legalName,
    images: [
      {
        url: `${SITE_URL}/mechanic_inspecting_a_car.jpeg`,
        width: 1200,
        height: 630,
        alt: 'MyMechanic24 Doorstep Car Repair and Washing Indore',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyMechanic24 - Doorstep Car Repair & Washing in Indore',
    description:
      'Expert auto repair and doorstep car wash services in Indore. Workshop on Nayta Mundla Main Road, serving Palda & Tejaji Nagar.',
    images: [`${SITE_URL}/mechanic_inspecting_a_car.jpeg`],
  },
};

export const revalidate = 3600;

export default function HomePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      localBusinessSchema,
      serviceSchema,
      faqSchema,
      reviewSchema,
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen max-w-screen overflow-hidden">
        <HomeContent services={services} testimonials={testimonials} />
      </main>
    </>
  );
}