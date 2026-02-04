"use client";

import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import {
  Calendar,
  Clock,
  Tag,
  ArrowLeft,
  Phone,
  ShieldCheck,
  User,
  Facebook,
  Twitter,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useSiteContext } from "@/context/SiteContext";

export default function BlogPostContent({ blog, relatedPosts }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL; // Same domain
  const { company } = useSiteContext();

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Breadcrumb Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b border-border/50">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/blogs" className="hover:text-primary transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="text-primary font-medium truncate max-w-[200px]">
            {blog.title}
          </span>
        </div>
      </section>

      {/* Page Header */}
      <PageHeader
        title={blog.title}
        description={''}
        image={blog.image}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content Area (8 Cols) */}
        <article className="lg:col-span-8">
          <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
            {/* Meta Data Bar */}
            <div className="p-6 border-b border-border flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-primary" />
                  {new Date(blog.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-primary" />
                  {blog.readTime}
                </div>
                <div className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-primary" />
                  <span className="capitalize">{blog.category}</span>
                </div>
              </div>

              {/* Social Share */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase text-muted-foreground">
                  Share:
                </span>
                <div className="flex gap-2">
                  <a
                    href={`https://wa.me/?text=${blog.title} - ${siteUrl}/blog/${blog.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[#25D366] transition-colors"
                  >
                    <FaWhatsapp size={16} />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${blog.title}&url=${siteUrl}/blog/${blog.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-blue-400 transition-colors"
                  >
                    <Twitter size={16} />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${siteUrl}/blog/${blog.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-blue-600 transition-colors"
                  >
                    <Facebook size={16} />
                  </a>
                </div>
              </div>
            </div>

            {/* Rich Text Content */}
            <div className="p-6 lg:p-10">
              <div
                className="prose prose-lg prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>

            {/* Author Bio */}
            <div className="p-6 bg-secondary/20 border-t border-border mt-8 flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary border border-primary/20 flex-shrink-0">
                <User size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground uppercase tracking-widest">
                  Written By
                </p>
                <p className="font-bold text-lg">MyMechanic Auto Experts</p>
                <p className="text-xs text-muted-foreground">
                  Certified team of mechanics with 10+ years of experience in
                  Indore.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation: Back to Blog */}
          <div className="mt-8">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
            >
              <ArrowLeft className="w-4 h-4" />
              View All Articles
            </Link>
          </div>
        </article>

        {/* Sidebar Area (4 Cols) */}
        <aside className="lg:col-span-4 space-y-8">
          {/* CTA Widget */}
          <div className="bg-primary text-primary-foreground rounded-2xl p-6 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-black uppercase italic mb-2">
                Issue with your car?
              </h3>
              <p className="text-sm opacity-90 mb-6">
                Don't ignore the signs mentioned in this article. Get a free
                checkup today.
              </p>
              <a
                href={`tel:${company.phone.replace(/[^0-9]/g, "")}`}
                className="flex items-center justify-center gap-2 bg-background text-foreground w-full py-3 rounded-lg font-bold uppercase text-xs tracking-widest hover:bg-white/90 transition-colors"
              >
                <Phone size={16} /> Call Expert
              </a>
            </div>
            <ShieldCheck className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 rotate-12" />
          </div>

          {/* Related Posts Widget */}
          {relatedPosts.length > 0 && (
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-border bg-secondary/30">
                <h3 className="font-bold text-foreground">Related Articles</h3>
              </div>
              <div className="divide-y divide-border">
                {relatedPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blogs/${post.slug}`}
                    className="block p-4 hover:bg-secondary/20 transition-colors group"
                  >
                    <h4 className="text-sm font-bold text-foreground mb-1 group-hover:text-primary line-clamp-2">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock size={12} /> {post.readTime}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* WhatsApp Widget */}
          <a
            href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-[#25D366]/10 border border-[#25D366]/30 hover:border-[#25D366] p-6 rounded-2xl transition-all text-center"
          >
            <div className="w-10 h-10 mx-auto bg-[#25D366] text-white rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <FaWhatsapp size={20} />
            </div>
            <h3 className="font-bold text-foreground">Have a Query?</h3>
            <p className="text-xs text-muted-foreground">
              Chat directly with the author of this post.
            </p>
          </a>
        </aside>
      </div>
    </main>
  );
}
