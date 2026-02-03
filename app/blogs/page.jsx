import BlogsContent from './blogs-content/PageContent';
import { blogs } from '@/data/blogs';

export const metadata = {
  title: 'Blog - Car Care Tips & Maintenance Guide - ProDrive Auto Care',
  description: 'Expert tips on car maintenance, repair, and safety. Learn how to keep your vehicle in top condition.',
};

export const revalidate = 3600;

export default function BlogsPage() {
  return (
    <>
      <main className="min-h-screen">
        <BlogsContent blogs={blogs} />
      </main>
    </>
  );
}
