import { notFound } from 'next/navigation';
import { blogs } from '@/data/blogs';
import BlogPostContent from './BlogPostContent'; // Client component import

// ================= STATIC PARAMS (Build Time Optimization) =================
export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

// ================= SEO METADATA =================
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return { title: 'Blog Not Found | MyMechanic Auto Care' };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL; // Apna domain yahan dalein

  return {
    title: `${blog.title} | MyMechanic Auto Care`,
    description: blog.excerpt,
    keywords: [
      `car ${blog.category.toLowerCase()}`, 
      'auto repair tips', 
      'car maintenance Indore', 
      blog.category,
      ...blog.title.split(' ')
    ],
    alternates: {
      canonical: `${siteUrl}/blog/${slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: 'article',
      url: `${siteUrl}/blog/${slug}`,
      publishedTime: blog.date,
      authors: ['MyMechanic Auto Care'],
      section: blog.category,
      images: [
        {
          url: blog.image,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt,
      images: [blog.image],
    },
  };
}

// ================= SERVER PAGE =================
export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  const siteUrl = ' https://mymechanic24.vercel.app';

  // Related Posts filter logic (Server side)
  const relatedPosts = blogs
    .filter((b) => b.category === blog.category && b.slug !== slug)
    .slice(0, 3);

  // Schema: Article (BlogPosting)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.excerpt,
    "image": [`${siteUrl}${blog.image}`],
    "datePublished": blog.date,
    "dateModified": blog.date,
    "author": {
      "@type": "Organization",
      "name": "MyMechanic Auto Care",
      "url": siteUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "MyMechanic Auto Care",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.jpeg`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${blog.slug}`
    }
  };

  // Schema: BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": siteUrl },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${siteUrl}/blog` },
      { "@type": "ListItem", "position": 3, "name": blog.title }
    ]
  };

  return (
    <>
      {/* Inject Schemas directly into HEAD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Pass data to Client Component */}
      <BlogPostContent blog={blog} relatedPosts={relatedPosts} />
    </>
  );
}