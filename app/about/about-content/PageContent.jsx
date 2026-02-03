'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Zap, Award, Users, Heart } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

export default function AboutContent({ team }) {
  return (
    <div className="space-y-20 pb-20">
      {/* Page Header */}
      <PageHeader
        title="About ProDrive Auto Care"
        description="Your trusted partner for professional auto care and maintenance since 2009. Serving Indore with excellence."
        image="/bmw-wash.jpeg"
      />

      {/* Company Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-6">Our Story</h2>
            <p className="text-lg text-muted-foreground mb-4">
              ProDrive Auto Care was founded in 2009 with a simple mission: to provide honest, professional, and
              affordable auto repair services to the residents of Indore. What started as a small garage with one
              mechanic has grown into a full-service auto care center trusted by hundreds of customers.
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              We believe in building long-term relationships with our customers through transparency, quality work,
              and exceptional customer service. Every vehicle that comes through our doors receives the same level of
              expert care and attention.
            </p>
            <p className="text-lg text-muted-foreground">
              Today, ProDrive stands as one of Indore's premier auto service centers, equipped with modern diagnostic
              equipment and staffed by certified professionals dedicated to keeping your vehicle in top condition.
            </p>
          </div>
          <div className="relative h-96">
            <Image
              src="/washing-car.jpeg"
              alt="ProDrive Auto Care Shop"
              fill
              className="object-cover rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Mission & Values</h2>
            <p className="text-lg text-muted-foreground">What drives us every day</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: <Award className="w-8 h-8" />,
                title: 'Excellence',
                description: 'Delivering the highest quality service on every job',
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: 'Integrity',
                description: 'Honest advice and transparent pricing always',
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Community',
                description: 'Supporting local businesses and customers',
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Innovation',
                description: 'Staying updated with latest automotive technology',
              },
            ].map((value, idx) => (
              <div key={idx} className="p-6 bg-card rounded-xl border border-border text-center">
                <div className="text-primary mb-4 flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Meet Our Team</h2>
          <p className="text-lg text-muted-foreground">Expert professionals dedicated to your car's care</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div key={member.id} className="bg-card rounded-xl border border-border overflow-hidden text-center">
              <div className="relative h-64">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-primary font-semibold text-sm mb-3">{member.role}</p>
                <p className="text-xs text-muted-foreground mb-3">{member.expertise}</p>
                <p className="text-sm text-muted-foreground italic">{member.experience} experience</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '15+', label: 'Years in Business' },
              { number: '500+', label: 'Happy Customers' },
              { number: '1000+', label: 'Services Completed' },
              { number: '24/7', label: 'Support' },
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-5xl font-bold text-primary mb-2">{stat.number}</div>
                <p className="text-lg opacity-90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-primary to-red-700 text-white rounded-xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Join Our Family of Satisfied Customers</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Experience the ProDrive difference with professional service, honest advice, and competitive pricing.
          </p>
          <Link
            href="/contact"
            className="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-opacity-90 transition-colors inline-flex items-center gap-2"
          >
            Book Your Service Today
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
