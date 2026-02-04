import AboutContent from './about-content/PageContent';
import { team } from '@/data/team';

// ================= CONFIGURATION =================
const SITE_DOMAIN = process.env.NEXT_PUBLIC_SITE_URL; 
// =============================================

export const metadata = {
  title: 'About MyMechanic | Best Car Workshop in Indore Since 2010',
  description: 'Rated #1 Car Repair Center in Indore. We specialize in engine diagnostics, denting-painting, and luxury car care in Vijay Nagar & Bhawarkua.',
  keywords: ['car mechanic indore', 'best car workshop vijay nagar', 'car repair history indore', 'authorized service center indore', 'auto care team'],
  openGraph: {
    title: 'About MyMechanic | Trusted Auto Experts in Indore',
    description: 'Meet the team behind Indore\'s most trusted car workshop. Professional care for Maruti, Hyundai, Tata, and Luxury cars.',
    url: `${SITE_DOMAIN}/about`, // Variable used here
    siteName: 'MyMechanic Auto Care',
    images: [
      {
        url: '/about-workshop.jpg',
        width: 1200,
        height: 630,
        alt: 'MyMechanic Car Workshop Team Indore',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: `${SITE_DOMAIN}/about`, // Variable used here
  },
};

export const revalidate = 3600;

export default function AboutPage() {
  // ================= LOCAL BUSINESS SCHEMA =================
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "MyMechanic Auto Care",
    "image": `${SITE_DOMAIN}/logo.jpeg`, // Variable used here
    "description": "Premium car repair and detailing service in Indore specializing in all major brands.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Plot No. 45, Scheme 54, Near Vijay Nagar Square",
      "addressLocality": "Indore",
      "addressRegion": "Madhya Pradesh",
      "postalCode": "452010",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "22.7196",
      "longitude": "75.8577"
    },
    "url": `${SITE_DOMAIN}/about`, // Variable used here
    "telephone": "+919977823169",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "20:00"
      }
    ],
    "priceRange": "₹₹"
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