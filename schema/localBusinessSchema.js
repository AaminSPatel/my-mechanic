const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://mymechanic24.vercel.app').trim().replace(/\/$/, '');

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["AutoRepair", "LocalBusiness"],
  "@id": `${siteUrl}/#autorepair`,
  "name": "MyMechanic24",
  "alternateName": ["MyMechanic24 Auto Care", "MyMechanic24 Indore"],
  "description": "Professional doorstep car repair, computerized OBD-II diagnostics, and home high-pressure car foam washing in Indore. Central workshop located on Nayta Mundla Main Road, serving Palda, Tejaji Nagar, Udhyog Nagar, and nearby areas.",
  "url": siteUrl,
  "logo": `${siteUrl}/logo.jpeg`,
  "image": [
    `${siteUrl}/mechanic_inspecting_a_car.jpeg`,
    `${siteUrl}/mymechanic_garage_indore.jpeg`,
    `${siteUrl}/mymechanic_3.png`
  ],
  "telephone": "+91-9977823169",
  "email": "mymechanic.in@gmail.com",
  "priceRange": "₹₹",
  "currenciesAccepted": "INR",
  "paymentAccepted": "Cash, Credit Card, Debit Card, UPI",
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
    "latitude": 22.689041,
    "longitude": 75.884656
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
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
    {
      "@type": "City",
      "name": "Indore"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Nayta Mundla, Indore"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Palda, Indore"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Tejaji Nagar, Indore"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Udhyog Nagar, Indore"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Nemawar Road, Indore"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Bhawarkua, Indore"
    }
  ],
  "sameAs": [
    "https://maps.app.goo.gl/DeuQikRWUgCjJkTU6?g_st=ipc"
  ],
  "hasMap": "https://maps.app.goo.gl/DeuQikRWUgCjJkTU6?g_st=ipc"
};
