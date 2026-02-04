'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { 
  ArrowRight, Calendar, Clock, Tag, Search, BookOpen, TrendingUp, 
  AlertTriangle, Phone, MessageCircle, ShieldCheck, ArrowUpRight, 
  Filter, X, ChevronDown, ChevronUp // New Icons added
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { FaWhatsapp } from 'react-icons/fa';
import { useSiteContext } from '@/context/SiteContext';

export default function BlogsContent({ blogs }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false); // New State for Collapse
  const { company } = useSiteContext();

  const categories = ['all', ...new Set(blogs.map((blog) => blog.category))];

  // Filter Logic: Category + Search Query
  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          blog.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-16 pb-20">
      {/* Page Header */}
      <PageHeader
        title="Auto Care Insights & Tips"
        description="Your go-to resource for expert car maintenance guides, seasonal care tips, and money-saving repair hacks."
        image="/washing-car.jpeg"
      />

      {/* ================= SEO INTRO SECTION ================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Master Your Vehicle's <span className="text-primary italic">Health</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Owning a car in a busy city brings unique challenges—from dusty roads affecting your <strong>air filters</strong> to stop-and-go traffic impacting your <strong>clutch and mileage</strong>. Our blog is dedicated to helping you understand your machine better.
        </p>
      </section>

      {/* ================= COLLAPSIBLE SEARCH & FILTER BAR ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sticky top-4 z-30">
        <div className="bg-card/95 backdrop-blur-md border border-border p-4 rounded-xl shadow-2xl transition-all duration-300">
          
          <div className="flex flex-row gap-4 items-center justify-between">
            {/* Search Input (Always Visible) */}
            <div className="relative w-full flex-1">
              <input 
                type="text" 
                placeholder="Search articles (e.g., mileage, engine, tyres)..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors text-sm"
              />
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Filter Toggle Button */}
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all border ${
                isFilterOpen || selectedCategory !== 'all'
                  ? 'bg-primary text-primary-foreground border-primary' 
                  : 'bg-secondary text-foreground border-border hover:bg-muted'
              }`}
            >
              <Filter size={16} />
              Filters
              {selectedCategory !== 'all' && <span className="ml-1 bg-background/20 px-1.5 rounded text-xs">{selectedCategory}</span>}
              {isFilterOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          {/* Collapsible Categories Area */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isFilterOpen ? 'max-h-60 opacity-100 mt-4 pt-4 border-t border-border' : 'max-h-0 opacity-0'}`}>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Filter by Category:</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all capitalize ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-secondary text-foreground hover:bg-muted border border-transparent hover:border-primary/20'
                  }`}
                >
                  {category}
                </button>
              ))}
              
              {/* Reset Button (Only shows if category is selected) */}
              {selectedCategory !== 'all' && (
                <button 
                  onClick={() => setSelectedCategory('all')}
                  className="px-4 py-2 rounded-lg text-sm font-bold text-red-500 hover:bg-red-50 transition-all flex items-center gap-1"
                >
                  <X size={14} /> Clear
                </button>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ================= BLOG GRID ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <article
              key={blog.id}
              className="group flex flex-col bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={blog.image || "/placeholder.svg"}
                  alt={`${blog.title} - Car maintenance tip`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-background/90 backdrop-blur px-3 py-1 rounded text-xs font-bold text-foreground flex items-center gap-1">
                    <Tag className="w-3 h-3 text-primary" /> {blog.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(blog.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {blog.readTime || "5 min read"}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-6 leading-relaxed flex-1 line-clamp-3">
                  {blog.excerpt || blog.description}
                </p>

                <Link
                  href={`/blogs/${blog.slug || '#'}`}
                  className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider hover:gap-3 transition-all"
                >
                  Read Full Guide <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-16 bg-secondary/20 rounded-xl border border-dashed border-border">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-bold text-foreground">No articles found</h3>
            <p className="text-muted-foreground">Try searching for "Engine", "Tyres", or "Oil".</p>
          </div>
        )}
      </section>

      {/* ================= CONTENT HUB (SEO STRATEGY) ================= */}
      <section className="bg-secondary/30 py-16 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Column 1 */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                   <TrendingUp className="text-primary" /> Why Regular Maintenance Matters?
                </h3>
                <div className="prose prose-sm text-muted-foreground space-y-4">
                   <p>Many car owners ignore minor signs like a <strong>squeaky brake</strong> or a <strong>vibrating steering wheel</strong> until it becomes a costly repair.</p>
                   <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Fluid Checks:</strong> Regular oil changes prevent engine sludge.</li>
                      <li><strong>Tyre Care:</strong> Proper alignment improves fuel efficiency by up to 10%.</li>
                   </ul>
                </div>
              </div>
              {/* Column 2 */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                   <AlertTriangle className="text-primary" /> Common Car Issues in India
                </h3>
                <div className="prose prose-sm text-muted-foreground space-y-4">
                   <p>Indian road conditions put specific stress on vehicles. Here is what you should watch out for:</p>
                   <div className="space-y-4 mt-4">
                      <div className="bg-background p-4 rounded-lg border border-border">
                         <h4 className="font-bold text-foreground mb-1">Suspension Wear</h4>
                         <p className="text-xs">Frequent driving on damaged roads can damage shock absorbers.</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* ================= PREMIUM CONTACT DOCK ================= */}
      <section className="py-24 border-t border-border bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-black text-foreground italic uppercase leading-none mb-4">
                Need Expert <span className="text-primary">Advice?</span>
              </h2>
              <p className="text-muted-foreground max-w-lg">
                Direct access to our senior mechanics. Whether it's a breakdown or a quote, we are just one tap away.
              </p>
            </div>
            <div className="flex gap-6 text-xs font-bold text-muted-foreground uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-primary" /> Verified Pros
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-primary" /> 10 Min Response
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a 
              href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, '')}`} 
              target="_blank"
              className="group relative bg-card hover:bg-[#25D366]/5 border border-border hover:border-[#25D366]/50 p-8 rounded-2xl transition-all duration-500 flex flex-col justify-between h-64"
            >
              <div className="absolute top-6 right-6 p-3 bg-background border border-border rounded-full group-hover:scale-110 transition-transform">
                <ArrowUpRight size={20} className="text-muted-foreground group-hover:text-[#25D366]" />
              </div>
              <div className="space-y-4">
                <div className="w-14 h-14 bg-[#25D366]/10 text-[#25D366] rounded-xl flex items-center justify-center">
                  <FaWhatsapp size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Get Quote via WhatsApp</h3>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1 group-hover:text-foreground transition-colors">Best for:</p>
                <p className="text-sm font-medium text-foreground">Sharing photos of dents, scratches, or bill estimates.</p>
              </div>
            </a>

            <a 
              href={`tel:${company.phone.replace(/[^0-9]/g, '')}`}
              className="group relative bg-card hover:bg-primary/5 border border-border hover:border-primary/50 p-8 rounded-2xl transition-all duration-500 flex flex-col justify-between h-64"
            >
              <div className="absolute top-6 right-6 p-3 bg-background border border-border rounded-full group-hover:scale-110 transition-transform">
                <Phone size={20} className="text-muted-foreground group-hover:text-primary" />
              </div>
              <div className="space-y-4">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                   <Phone size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Emergency Call 24/7</h3>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1 group-hover:text-foreground transition-colors">Best for:</p>
                <p className="text-sm font-medium text-foreground">Breakdowns, engine overheating, or urgent booking.</p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}