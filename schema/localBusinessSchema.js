export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "AutoRepair"],
  "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/#autorepair`,
  "name": "Best Car Repair Service in Indore",
  "url": process.env.NEXT_PUBLIC_SITE_URL,
  "logo": `${process.env.NEXT_PUBLIC_SITE_URL}/logo.jpeg`,
  "image": [
    `${process.env.NEXT_PUBLIC_SITE_URL}/car-repair.jpeg`
  ],
  "telephone": "+91-9977823169",
  "priceRange": "₹199-₹1999",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Vijay Nagar",
    "addressLocality": "Indore",
    "addressRegion": "MP",
    "postalCode": "452010",
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
      "opens": "09:00",
      "closes": "20:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "09:00",
      "closes": "14:00"
    }
  ],
  "areaServed": {
    "@type": "City",
    "name": "Indore"
  },
  "sameAs": [
    "https://www.google.com/maps/place/Indore"
  ]
};
