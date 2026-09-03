import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SiteProvider } from "@/context/SiteContext";
import FloatingContactBar from "@/components/FloatingContactBar";
import OwnerInvoiceTrigger from "@/components/OwnerInvoiceTrigger";
import Script from "next/script";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://mymechanic24.vercel.app').trim().replace(/\/$/, '');

export const metadata = {
  title: 'MyMechanic24 | Doorstep Car Repair & Washing in Indore | Nayta Mundla Garage',
  description: 'Expert auto repair and doorstep car wash services across Indore. Central workshop on Nayta Mundla Main Road, serving Palda, Tejaji Nagar, Udhyog Nagar, and nearby areas.',
  keywords: 'car repair indore, doorstep car wash indore, car mechanic nayta mundla, car service palda, car repair tejaji nagar, mobile car mechanic indore, MyMechanic24',
  authors: [{ name: 'MyMechanic24 Auto Care' }],
  creator: 'MyMechanic24 Auto Care',
  publisher: 'MyMechanic24 Auto Care',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'MyMechanic24 | Doorstep Car Service & Repair in Indore',
    description: 'Expert mechanics, genuine parts, transparent pricing, and convenient doorstep services across Indore. Garage on Nayta Mundla Main Road.',
    url: siteUrl,
    siteName: 'MyMechanic24 Auto Care',
    images: [
      {
        url: `${siteUrl}/mechanic_inspecting_a_car.jpeg`,
        width: 1200,
        height: 630,
        alt: 'MyMechanic24 Doorstep Car Service in Indore',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyMechanic24 - Doorstep Car Repair & Washing in Indore',
    description: 'Expert auto repair and doorstep car wash services in Indore. Workshop on Nayta Mundla Main Road, serving Palda & Tejaji Nagar.',
    images: [`${siteUrl}/mechanic_inspecting_a_car.jpeg`],
    creator: '@mymechaniccare',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  verification: {
    google: 'R2HVQ0_1nYn3cEX5xUHw0Do28y7c5VKvNp944ihSpfI',
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": ["AutoRepair", "LocalBusiness"],
  "name": "MyMechanic24",
  "alternateName": "MyMechanic24 Auto Care Indore",
  "image": `${siteUrl}/mymechanic_garage_indore.jpeg`,
  "@id": `${siteUrl}/#autorepair`,
  "url": siteUrl,
  "telephone": "+91-9977823169",
  "priceRange": "₹₹",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Nayta Mundla Main Road, Near Palda & Tejaji Nagar",
    "addressLocality": "Indore",
    "addressRegion": "Madhya Pradesh",
    "postalCode": "452020",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 22.6890,
    "longitude": 75.8838
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "08:00",
      "closes": "20:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "08:00",
      "closes": "14:00"
    }
  ],
  "areaServed": [
    "Indore",
    "Nayta Mundla",
    "Palda",
    "Tejaji Nagar",
    "Udhyog Nagar",
    "Nemawar Road",
    "RTO Road",
    "Bhawarkua"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Doorstep Car Repair & Washing Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Doorstep High-Pressure Car Foam Wash"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Doorstep Car Repair and Diagnostics"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Dead Battery Jumpstart & On-Site Replacement"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Periodic Engine Oil & Filter Service at Home"
        }
      }
    ]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="antialiased overflow-x-hidden w-screen">
        <SiteProvider>
          <Header />
          {children}
          <Footer />
          <FloatingContactBar />
          {/* Secret 3-Tap Trigger at Bottom-Right for Website Owner to open /invoice */}
          <OwnerInvoiceTrigger />
        </SiteProvider>

        {/* Counter.dev analytics */}
        <Script 
          src="https://cdn.counter.dev/script.js" 
          data-id="f7f1820c-0edc-4ef0-8dd4-1745e73e696f" 
          data-utcoffset="6"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
