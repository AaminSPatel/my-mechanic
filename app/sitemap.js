export default function sitemap() {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://mymechanic24.vercel.app').trim().replace(/\/$/, '');

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    // Blog posts
    {
      url: `${baseUrl}/blogs/synthetic-vs-mineral-oil-change-interval-guide`,
      lastModified: new Date('2024-02-01'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blogs/car-brake-failure-warning-signs`,
      lastModified: new Date('2024-01-25'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blogs/how-to-increase-car-tyre-life-mileage`,
      lastModified: new Date('2024-01-20'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blogs/doorstep-car-wash-subscription-indore-guide`,
      lastModified: new Date('2024-01-15'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blogs/car-engine-overheating-symptoms-solutions-indore`,
      lastModified: new Date('2024-01-10'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blogs/car-ac-cooling-problems-gas-refill-cost-indore`,
      lastModified: new Date('2024-01-05'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];
}
