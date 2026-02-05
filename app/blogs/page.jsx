import BlogsContent from './blogs-content/PageContent';
import { blogs } from '@/data/blogs';

// ================= SEO METADATA =================
export const metadata = {
  title: 'Car Maintenance Blog | Expert Auto Repair Tips & Guides',
  description: 'Discover essential car care tips, DIY maintenance guides, and expert auto repair advice. Learn how to increase mileage, fix common engine issues, and keep your vehicle in top condition on Indian roads.',
  keywords: ['car maintenance tips', 'auto repair guide', 'increase car mileage', 'car ac service tips', 'DIY car care India', 'mechanic advice indore'],
  openGraph: {
    title: 'Car Maintenance Blog | Expert Auto Repair Tips',
    description: 'Read expert guides on keeping your car running like new.',
    type: 'website',
  },
};

export const revalidate = 3600;

export default function BlogsPage() {
  // ================= STRUCTURED DATA (JSON-LD) =================
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Car Care & Maintenance Blog",
    "description": "A collection of expert articles regarding car repair, maintenance, and automotive tips.",
    "url": " https://mymechanic24.vercel.app/blog",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": blogs.map((blog, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": ` https://mymechanic24.vercel.app/blog/${blog.slug || blog.id}`,
        "name": blog.title
      }))
    }
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