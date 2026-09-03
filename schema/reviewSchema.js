const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://mymechanic24.vercel.app').trim().replace(/\/$/, '');

export const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "@id": `${siteUrl}/#autorepair`,
  "name": "MyMechanic24",
  "url": siteUrl,
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "215",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Rameshwar Prasad Sharma"
      },
      "datePublished": "2024-02-18",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Senior citizen hu, Indore ke traffic me gaadi chala kar garage me ghanto wait karna mere liye bohot mushkil tha. Palda me mere ghar par hi mechanic aaya aur mere samne synthetic engine oil aur filter change kiya. Brakes bhi check kiye. Bhai bohot respectful aur imandar hain!"
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Jagdish Chandra Verma"
      },
      "datePublished": "2024-02-12",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Subah Tejaji Nagar me gaadi start hi nahi ho rahi thi, battery dead ho gayi. MyMechanic24 par call kiya to Nayta Mundla se 25 minute me mechanic ghar pahunch gaya. Digital meter se check karke nayi Amaron battery on the spot laga di warranty card ke sath. Zabardast service!"
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Omprakash Agrawal"
      },
      "datePublished": "2024-02-05",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Nayta Mundla main road par inki workshop hai, wahan car le gaya tha AC cooling problem ke liye. Pehle laptop se OBD scanning ki, fir genuine gas refill ki. Dusre garage wale 8-10 hazar ka kharcha bata rahe the, inhone bilkul sahi rate me ice-cold cooling kar di."
    }
  ]
};
