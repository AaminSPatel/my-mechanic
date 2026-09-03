import AboutContent from './about-content/PageContent';
import { team } from '@/data/team';
import { SITE_URL, COMPANY, getCanonicalUrl } from '@/lib/constants';

export const metadata = {
  title: 'About MyMechanic24 | Trusted Car Workshop & Doorstep Auto Care in Indore',
  description:
    'Learn about MyMechanic24 — Indore\'s trusted auto repair workshop and doorstep car care specialist. Central garage on Nayta Mundla Main Road, serving Palda, Tejaji Nagar, Vijay Nagar, and across Indore with 100% genuine OEM parts and transparent pricing.',
  keywords: [
    'about MyMechanic24',
    'car mechanic indore',
    'car workshop nayta mundla indore',
    'auto repair palda indore',
    'doorstep car mechanic indore',
    'best car garage tejaji nagar',
    'trusted car repair indore',
    'certified mechanics indore',
  ],
  alternates: {
    canonical: getCanonicalUrl('/about'),
  },
  openGraph: {
    title: 'About MyMechanic24 | Indore\'s Premier Car Repair & Doorstep Service',
    description:
      'Meet the certified team behind MyMechanic24. Central workshop on Nayta Mundla Main Road, offering on-site car diagnostics, periodic maintenance, and snow foam washing across Indore.',
    url: `${SITE_URL}/about`,
    siteName: COMPANY.legalName,
    images: [
      {
        url: `${SITE_URL}/mymechanic_garage_indore.jpeg`,
        width: 1200,
        height: 630,
        alt: 'MyMechanic24 Central Auto Repair Workshop Indore',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About MyMechanic24 - Car Repair Workshop Indore',
    description:
      'Indore\'s trusted car workshop on Nayta Mundla Main Road and doorstep auto service specialist. Certified mechanics and genuine parts.',
    images: [`${SITE_URL}/mymechanic_garage_indore.jpeg`],
  },
};

export const revalidate = 3600;

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['AutoRepair', 'LocalBusiness'],
    '@id': `${SITE_URL}/about/#autorepair`,
    'name': COMPANY.name,
    'alternateName': [COMPANY.legalName, 'MyMechanic24 Indore'],
    'image': `${SITE_URL}/mymechanic_garage_indore.jpeg`,
    'description':
      'Certified auto repair center and doorstep mobile car service provider in Indore. Specializing in computer diagnostics, periodic maintenance, mechanical repairs, brake overhauls, and foam washing.',
    'url': `${SITE_URL}/about`,
    'telephone': COMPANY.phone,
    'email': COMPANY.email,
    'priceRange': '₹₹',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': COMPANY.address,
      'addressLocality': COMPANY.locality,
      'addressRegion': COMPANY.region,
      'postalCode': COMPANY.postalCode,
      'addressCountry': COMPANY.country,
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': COMPANY.geo.latitude,
      'longitude': COMPANY.geo.longitude,
    },
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'opens': '08:00',
        'closes': '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': 'Sunday',
        'opens': '08:00',
        'closes': '14:00',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-background text-foreground">
        <AboutContent team={team} />
      </main>
    </>
  );
}