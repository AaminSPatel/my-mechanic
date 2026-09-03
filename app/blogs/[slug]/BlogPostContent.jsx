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
  MapPin,
  Sparkles,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useSiteContext } from "@/context/SiteContext";
import { SITE_URL, COMPANY } from "@/lib/constants";

export default function BlogPostContent({ blog, relatedPosts = [] }) {
  const { company } = useSiteContext();

  const shareUrl = `${SITE_URL}/blogs/${blog.slug}`;
  const phoneDigits = (company?.phoneRaw || "+919977823169").replace(/[^0-9]/g, "");
  const whatsappDigits = (company?.whatsappNumber || "919977823169").replace(/[^0-9]/g, "");

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
            Blogs
          </Link>
          <span>/</span>
          <span className="text-primary font-medium truncate max-w-[200px] sm:max-w-[350px]">
            {blog.title}
          </span>
        </div>
      </section>

      {/* Page Header */}
      <PageHeader
        title={blog.title}
        description=""
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
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `${blog.title} - ${shareUrl}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[#25D366] transition-colors p-1.5 rounded-md hover:bg-secondary"
                    aria-label="Share on WhatsApp"
                  >
                    <FaWhatsapp size={16} />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      blog.title
                    )}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-blue-400 transition-colors p-1.5 rounded-md hover:bg-secondary"
                    aria-label="Share on Twitter"
                  >
                    <Twitter size={16} />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      shareUrl
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-blue-600 transition-colors p-1.5 rounded-md hover:bg-secondary"
                    aria-label="Share on Facebook"
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
                <p className="text-xs font-bold text-foreground uppercase tracking-widest">
                  Written &amp; Verified By
                </p>
                <p className="font-bold text-base text-foreground">
                  MyMechanic24 Master Mechanics
                </p>
                <p className="text-xs text-muted-foreground">
                  Certified team of automotive engineers and technicians based on Nayta Mundla Main Road, Indore.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation: Back to Blog */}
          <div className="mt-8 flex justify-between items-center">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
            >
              <ArrowLeft className="w-4 h-4" />
              View All Articles
            </Link>
            <Link
              href="/services"
              className="text-xs text-primary font-bold uppercase tracking-wider hover:underline"
            >
              Explore Our Services &rarr;
            </Link>
          </div>
        </article>

        {/* Sidebar Area (4 Cols) */}
        <aside className="lg:col-span-4 space-y-8">
          {/* CTA Widget */}
          <div className="bg-gradient-to-br from-primary via-red-700 to-red-900 text-white rounded-2xl p-6 relative overflow-hidden shadow-xl">
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full mb-3">
                <Sparkles size={12} /> Doorstep Care in Indore
              </span>
              <h3 className="text-xl font-black uppercase italic mb-2">
                Facing Car Trouble?
              </h3>
              <p className="text-xs opacity-90 mb-6 leading-relaxed">
                Don&apos;t ignore the warning signs mentioned in this article. Our mobile van reaches your home or office in Indore within 30–45 minutes.
              </p>
              <a
                href={`tel:${phoneDigits}`}
                className="flex items-center justify-center gap-2 bg-white text-primary w-full py-3.5 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-gray-100 transition-all shadow-md"
              >
                <Phone size={16} /> Call +91 99778 23169
              </a>
            </div>
            <ShieldCheck className="absolute -bottom-6 -right-6 w-32 h-32 opacity-15 rotate-12" />
          </div>

          {/* Workshop Location Card */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-primary mb-2">
              <MapPin size={14} /> Central Garage
            </div>
            <h4 className="font-bold text-foreground text-sm mb-1">
              MyMechanic24 Workshop
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              Nayta Mundla Main Road, Near Palda &amp; Tejaji Nagar, Indore, MP 452020
            </p>
            <p className="text-[11px] text-muted-foreground border-t border-border/50 pt-2">
              Open Daily 8:00 AM – 8:00 PM | 24/7 Breakdown Hotline
            </p>
          </div>

          {/* Related Posts Widget */}
          {relatedPosts.length > 0 && (
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-border bg-secondary/30">
                <h3 className="font-bold text-foreground text-sm uppercase tracking-wide">
                  Related Guides
                </h3>
              </div>
              <div className="divide-y divide-border">
                {relatedPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blogs/${post.slug}`}
                    className="block p-4 hover:bg-secondary/20 transition-colors group"
                  >
                    <h4 className="text-sm font-bold text-foreground mb-1 group-hover:text-primary line-clamp-2 leading-snug">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <Clock size={12} /> {post.readTime}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* WhatsApp Widget */}
          <a
            href={`https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
              `Hi MyMechanic24, I read your article "${blog.title}" and would like advice on my car in Indore.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-[#25D366]/10 border border-[#25D366]/30 hover:border-[#25D366] p-6 rounded-2xl transition-all text-center shadow-sm"
          >
            <div className="w-12 h-12 mx-auto bg-[#25D366] text-white rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-md">
              <FaWhatsapp size={22} />
            </div>
            <h3 className="font-bold text-foreground text-sm">Have a Technical Question?</h3>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Chat directly with our master mechanics on WhatsApp.
            </p>
          </a>
        </aside>
      </div>
    </main>
  );
}
