import { notFound } from 'next/navigation';
import { blogs } from '@/data/blogs';
import BlogPostContent from './BlogPostContent';
import { SITE_URL, COMPANY, getCanonicalUrl } from '@/lib/constants';

// ================= STATIC PARAMS =================
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
    return { title: `Blog Not Found | ${COMPANY.name}` };
  }

  return {
    title: `${blog.title} | ${COMPANY.name}`,
    description: blog.excerpt,
    keywords: [
      `car ${blog.category.toLowerCase()}`,
      'auto repair tips',
      'car maintenance Indore',
      blog.category,
      ...blog.title.split(' ').filter((w) => w.length > 3),
    ],
    alternates: {
      canonical: getCanonicalUrl(`/blogs/${slug}`),
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: 'article',
      url: `${SITE_URL}/blogs/${slug}`,
      publishedTime: blog.date,
      authors: [COMPANY.legalName],
      section: blog.category,
      images: [
        {
          url: blog.image.startsWith('http') ? blog.image : `${SITE_URL}${blog.image}`,
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
      images: [blog.image.startsWith('http') ? blog.image : `${SITE_URL}${blog.image}`],
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

  // Related Posts filter logic (Server side)
  const relatedPosts = blogs
    .filter((b) => b.slug !== slug)
    .slice(0, 3);

  const blogImageUrl = blog.image.startsWith('http')
    ? blog.image
    : `${SITE_URL}${blog.image}`;

  // Schema: Article (BlogPosting)
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': blog.title,
    'description': blog.excerpt,
    'image': [blogImageUrl],
    'datePublished': blog.date,
    'dateModified': blog.date,
    'author': {
      '@type': 'Organization',
      'name': COMPANY.legalName,
      'url': SITE_URL,
    },
    'publisher': {
      '@type': 'AutoRepair',
      'name': COMPANY.legalName,
      'url': SITE_URL,
      'logo': {
        '@type': 'ImageObject',
        'url': `${SITE_URL}/logo.jpeg`,
      },
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blogs/${blog.slug}`,
    },
  };

  // Schema: BreadcrumbList
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': SITE_URL },
      { '@type': 'ListItem', 'position': 2, 'name': 'Blogs', 'item': `${SITE_URL}/blogs` },
      { '@type': 'ListItem', 'position': 3, 'name': blog.title },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <BlogPostContent blog={blog} relatedPosts={relatedPosts} />
    </>
  );
}