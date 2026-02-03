export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "AutoRepair"],
  "@id": "https://yourdomain.com/#autorepair",
  "name": "Best Car Repair Service in Indore",
  "url": "https://yourdomain.com",
  "logo": "https://yourdomain.com/logo.png",
  "image": [
    "https://yourdomain.com/car-repair-service-indore.jpg"
  ],
  "telephone": "+91-8966925396",
  "priceRange": "₹₹",
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
