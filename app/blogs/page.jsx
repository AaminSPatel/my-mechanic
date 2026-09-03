import BlogsContent from './blogs-content/PageContent';
import { blogs } from '@/data/blogs';
import { SITE_URL, COMPANY, getCanonicalUrl } from '@/lib/constants';

// ================= SEO METADATA =================
export const metadata = {
  title: 'Car Maintenance & Auto Repair Blog | Expert Tips by MyMechanic24 Indore',
  description:
    'Essential car maintenance guides, DIY auto care tips, and diagnostic advice tailored for Indian road conditions and Indore traffic. Learn how to increase fuel mileage, fix AC cooling issues, prevent brake failures, and prolong battery life.',
  keywords: [
    'car maintenance blog',
    'auto repair tips indore',
    'car mechanic advice indore',
    'increase car mileage guide',
    'car ac cooling problems',
    'car brake failure signs',
    'synthetic oil change interval',
    'car battery maintenance winter',
    'doorstep car care tips',
  ],
  alternates: {
    canonical: getCanonicalUrl('/blogs'),
  },
  openGraph: {
    title: 'Car Care & Auto Maintenance Blog | MyMechanic24 Indore',
    description:
      'Expert advice, diagnostic guides, and cost-saving maintenance tips from certified master mechanics at MyMechanic24 Indore.',
    url: `${SITE_URL}/blogs`,
    siteName: COMPANY.legalName,
    images: [
      {
        url: `${SITE_URL}/oil-change.jpeg`,
        width: 1200,
        height: 630,
        alt: 'MyMechanic24 Car Maintenance and Auto Repair Blog',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyMechanic24 Car Care & Repair Blog',
    description:
      'Expert diagnostic guides, mileage improvement hacks, and maintenance advice from Indore auto specialists.',
    images: [`${SITE_URL}/oil-change.jpeg`],
  },
};

export const revalidate = 3600;

export default function BlogsPage() {
  // ================= STRUCTURED DATA (JSON-LD) =================
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': 'Car Care & Automotive Repair Blog - MyMechanic24',
    'description':
      'Comprehensive collection of expert automotive guides, diagnostic advice, and DIY maintenance tips for Indian car owners.',
    'url': `${SITE_URL}/blogs`,
    'publisher': {
      '@type': 'AutoRepair',
      'name': COMPANY.legalName,
      'url': SITE_URL,
      'logo': `${SITE_URL}/logo.jpeg`,
    },
    'mainEntity': {
      '@type': 'ItemList',
      'itemListElement': blogs.map((blog, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'url': `${SITE_URL}/blogs/${blog.slug}`,
        'name': blog.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-background text-foreground">
        <BlogsContent blogs={blogs} />
      </main>
    </>
  );
}