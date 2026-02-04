'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Zap, Award, Users, Heart, MapPin } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

export default function AboutContent({ team }) {
  return (
    <div className="space-y-24 pb-20">
      
      {/* Page Header */}
      <PageHeader
        title="Redefining Auto Care in Indore"
        description="More than just a garage. We are Indore's certified car experts dedicated to transparency, speed, and precision since 2010."
        image="/bmw-wash.jpeg"
      />

      {/* ================= STORY SECTION (Local SEO Focused) ================= */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
               <MapPin size={12} /> Established in Indore, 2010
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 leading-tight italic">
              From a Small Garage to <br />
              <span className="text-primary">Indore's Trusted Hub</span>
            </h2>
            
            <div className="prose prose-invert text-muted-foreground space-y-6">
              <p>
                MyMechanic Auto Care was founded with a simple yet rebellious mission: <strong>to end the era of overcharging and fake parts in Indore's auto repair market.</strong> What started as a single-shutter garage near Palasia has now grown into a full-scale service center covering Vijay Nagar, Bhawarkua, and the Super Corridor.
              </p>
              <p>
                We understand the specific challenges of driving in MP—the dust that clogs filters, the summer heat that kills batteries, and the potholes that ruin suspension. That’s why our maintenance protocols are customized for <strong>Indore’s driving conditions</strong>.
              </p>
              <p className="border-l-4 border-primary pl-4 text-foreground italic font-medium">
                "We don't just fix cars; we educate owners. Transparency is not a policy here; it's our only way of working."
              </p>
            </div>
          </div>
          
          <div className="relative h-[500px] w-full group">
            <div className="absolute inset-0 bg-primary/20 rounded-2xl transform rotate-3 group-hover:rotate-0 transition-all duration-500"></div>
            <Image
              src="/washing-car.jpeg" 
              alt="MyMechanic Workshop Inside View Indore"
              fill
              className="object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700 shadow-2xl"
            />
            
            {/* Experience Badge */}
            <div className="absolute -bottom-8 -left-8 bg-card border border-border p-6 rounded-xl shadow-xl hidden md:block">
              <p className="text-5xl font-black text-primary mb-1">5+</p>
              <p className="text-xs font-bold uppercase tracking-widest text-foreground">Years of<br/>Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MISSION & VALUES ================= */}
      <section className="bg-secondary/30 py-20 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4 uppercase italic">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We treat every car—whether a Maruti Alto or an Audi A6—with the same level of respect and technical precision.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Award className="w-8 h-8" />,
                title: 'OEM Standard',
                description: 'We adhere strictly to manufacturer guidelines for all repairs.',
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: 'Total Honesty',
                description: 'We show you the old parts before installing the new ones.',
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Expert Team',
                description: 'All mechanics are certified with minimum 5 years experience.',
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Fast Turnaround',
                description: 'Same-day delivery for 90% of general service bookings.',
              },
            ].map((value, idx) => (
              <div key={idx} className="p-8 bg-card hover:bg-background rounded-2xl border border-border hover:border-primary transition-all duration-300 group">
                <div className="text-primary mb-6 flex justify-center group-hover:scale-110 transition-transform">{value.icon}</div>
                <h3 className="text-lg font-bold text-foreground mb-3 text-center uppercase tracking-wide">{value.title}</h3>
                <p className="text-sm text-muted-foreground text-center leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    
      {/* ================= STATS SECTION ================= */}
      <section className="bg-foreground text-background py-20 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute right-0 top-0 w-96 h-96 bg-primary blur-[150px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center divide-x divide-white/10">
            {[
              { number: '15+', label: 'Years Legacy' },
              { number: '10k+', label: 'Cars Repaired' },
              { number: '100%', label: 'Genuine Parts' },
              { number: '4.8', label: 'Google Rating' },
            ].map((stat, idx) => (
              <div key={idx} className="p-4">
                <div className="text-4xl md:text-5xl font-black text-primary mb-2 font-mono tracking-tighter">
                  {stat.number}
                </div>
                <p className="text-sm md:text-base font-bold uppercase tracking-widest opacity-80">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-red-800 px-6 py-16 md:px-12 md:py-20 text-center shadow-2xl">
          
          {/* Background Decor */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-64 w-64 rounded-full bg-black/20 blur-3xl"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic mb-6 leading-tight">
              Ready to Experience <br/> the Difference?
            </h2>
            <p className="text-lg text-white/90 mb-10 leading-relaxed font-medium">
              Join the family of 10,000+ satisfied car owners in Indore. Experience honest pricing, transparency, and technical excellence today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Book Service Appointment <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 bg-black/20 text-white border border-white/30 px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-black/40 transition-all backdrop-blur-sm"
              >
                View Service Menu
              </Link>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}