const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://mymechanic24.vercel.app').trim().replace(/\/$/, '');

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${siteUrl}/#service`,
  "name": "MyMechanic24 Doorstep Car Repair & Washing",
  "serviceType": "Doorstep Car Repair and Mobile Car Wash Service",
  "provider": {
    "@type": "AutoRepair",
    "@id": `${siteUrl}/#autorepair`,
    "name": "MyMechanic24",
    "telephone": "+91-9977823169",
    "url": siteUrl,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Nayta Mundla Main Road, Near Palda & Tejaji Nagar",
      "addressLocality": "Indore",
      "addressRegion": "Madhya Pradesh",
      "postalCode": "452020",
      "addressCountry": "IN"
    }
  },
  "areaServed": [
    { "@type": "City", "name": "Indore" },
    { "@type": "AdministrativeArea", "name": "Nayta Mundla, Indore" },
    { "@type": "AdministrativeArea", "name": "Palda, Indore" },
    { "@type": "AdministrativeArea", "name": "Tejaji Nagar, Indore" },
    { "@type": "AdministrativeArea", "name": "Udhyog Nagar, Indore" },
    { "@type": "AdministrativeArea", "name": "Nemawar Road, Indore" },
    { "@type": "AdministrativeArea", "name": "Bhawarkua, Indore" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Doorstep Car Care & Workshop Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Doorstep High-Pressure Car Foam Wash",
          "description": "Scratch-free snow foam wash, interior vacuuming, and tyre dressing at your home or society parking in Indore.",
          "price": "199",
          "priceCurrency": "INR"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Doorstep Car Repair & Inspection",
          "description": "Brake pad replacement, coolant leakage, suspension inspection, and mechanical fixes at your doorstep.",
          "priceCurrency": "INR"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "OBD-II Computerized Engine Diagnostics",
          "description": "On-site scanning for check-engine lights, sensor telemetry, and electrical faults at your location.",
          "priceCurrency": "INR"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Dead Battery Jumpstart & On-Site Replacement",
          "description": "30-45 minute emergency arrival with digital tester and official Amaron/Exide battery replacement.",
          "priceCurrency": "INR"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "At-Home Periodic Oil & Filter Service",
          "description": "Synthetic engine oil change, OEM oil filter replacement, and fluid top-up in front of you.",
          "priceCurrency": "INR"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Major Workshop Repair & Overhaul",
          "description": "Clutch overhaul, gearbox repair, engine overhaul, and heated spray-booth denting & painting at Nayta Mundla Main Road garage.",
          "priceCurrency": "INR"
        }
      }
    ]
  }
};
