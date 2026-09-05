import HomeContent from './home-content/PageContent';
import { services } from '@/data/services';
import { testimonials } from '@/data/testimonials';
import { localBusinessSchema } from '@/schema/localBusinessSchema';
import { serviceSchema } from '@/schema/serviceSchema';
import { faqSchema } from '@/schema/faqSchema';
import { reviewSchema } from '@/schema/reviewSchema';
import { SITE_URL, COMPANY, getCanonicalUrl } from '@/lib/constants';

export const metadata = {
  title: 'Doorstep Car Repair & Washing in Indore | MyMechanic24',
  description:
    'Expert doorstep car repair & foam wash at home in Indore. Certified mechanics, genuine OEM parts & fast 30-min arrival in Nayta Mundla & Palda. Book now!',
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
    title: 'Doorstep Car Repair & Washing in Indore | MyMechanic24',
    description:
      'Certified doorstep mechanics, genuine OEM parts & foam car wash at home across Indore. Central workshop at Nayta Mundla Road. Call +91 99778 23169.',
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
    title: 'Doorstep Car Repair & Washing in Indore | MyMechanic24',
    description:
      'Fast doorstep car repair, computerized diagnostics & car wash in Indore. 30-min arrival across Nayta Mundla, Palda & Tejaji Nagar. Book today!',
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