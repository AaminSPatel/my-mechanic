'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

export default function BlogsContent({ blogs }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...new Set(blogs.map((blog) => blog.category))];
  const filteredBlogs =
    selectedCategory === 'all' ? blogs : blogs.filter((blog) => blog.category === selectedCategory);

  return (
    <div className="space-y-20 pb-20">
      {/* Page Header */}
      <PageHeader
        title="Car Care Blog"
        description="Expert tips, maintenance guides, and industry insights to keep your vehicle running smoothly."
        image="/washing-car.jpeg"
      />

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-semibold transition-colors capitalize ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground hover:bg-muted'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <article
              key={blog.id}
              className="group bg-card rounded-xl border border-border overflow-hidden hover:border-primary hover:shadow-lg transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={blog.image || "/placeholder.svg"}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-primary uppercase">{blog.category}</span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4">{blog.excerpt}</p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 pb-4 border-b border-border">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(blog.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {blog.readTime}
                  </div>
                </div>

                <Link
                  href="#"
                  className="text-primary hover:text-red-700 font-semibold text-sm flex items-center gap-1 transition-colors"
                >
                  Read Article
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No articles found in this category.</p>
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="bg-secondary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter for the latest car care tips and maintenance guides.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
