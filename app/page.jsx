import HomeContent from './home-content/PageContent';
import { services } from '@/data/services';
import { testimonials } from '@/data/testimonials';
import { localBusinessSchema } from '@/schema/localBusinessSchema';
import { serviceSchema } from '@/schema/serviceSchema';
import { faqSchema } from '@/schema/faqSchema';
import { reviewSchema } from '@/schema/reviewSchema';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://mymechanic24.vercel.app').trim().replace(/\/$/, '');

export const metadata = {
  title: 'MyMechanic24 | Doorstep Car Repair & Washing in Indore | Nayta Mundla Garage',
  description: 'MyMechanic24 delivers expert doorstep car repair, computerized diagnostics, and high-pressure car wash at home across Indore. Central garage located on Nayta Mundla Main Road, serving Palda, Tejaji Nagar, Udhyog Nagar, and nearby areas.',
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
    canonical: siteUrl,
  },
  openGraph: {
    title: 'MyMechanic24 | Doorstep Car Service, Repair & Washing in Indore',
    description: 'Expert doorstep mechanics, genuine parts, transparent pricing, and car washing at home. Garage on Nayta Mundla Main Road, serving Palda, Tejaji Nagar, and across Indore.',
    url: siteUrl,
    siteName: 'MyMechanic24 Auto Care',
    images: [
      {
        url: '/mechanic_inspecting_a_car.jpeg',
        width: 1200,
        height: 630,
        alt: 'MyMechanic24 Doorstep Car Repair and Washing Indore',
      },
    ],
    locale: 'en_IN',
    type: 'website',
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