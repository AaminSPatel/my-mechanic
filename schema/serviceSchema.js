export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Car Repair and Maintenance Service",
  "provider": {
    "@type": "AutoRepair",
    "name": "Best Car Repair Service in Indore"
  },
  "areaServed": {
    "@type": "City",
    "name": "Indore"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Car Repair Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Car Servicing in Indore"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Engine Repair in Indore"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AC Repair for Cars in Indore"
        }
      }
    ]
  }
};
