'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Clock, DollarSign, CheckCircle2 } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

export default function ServicesContent({ services }) {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Maintenance', 'Diagnostics', 'Safety'];

  return (
    <div className="space-y-20 pb-20">
      {/* Page Header */}
      <PageHeader
        title="Our Professional Services"
        description="Comprehensive auto care solutions for all your vehicle needs. Expert service with genuine parts and guaranteed satisfaction."
        image="/oil-change.jpeg"
      />

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">All Services</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
                className="cursor-pointer p-6 bg-card rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all"
              >
                <div className="text-6xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>

                <div className="space-y-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{service.price}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{service.duration}</span>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="mt-4 w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-red-700 transition-colors inline-flex items-center justify-center gap-2"
                >
                  Book Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Each Service */}
      <section className="bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Service Excellence</h2>
            <p className="text-lg text-muted-foreground">What makes our services stand out</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { number: '500+', label: 'Satisfied Customers' },
              { number: '1000+', label: 'Services Completed' },
              { number: '15+', label: 'Years Experience' },
              { number: '24/7', label: 'Support Available' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <p className="text-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Need a Service?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Contact us today to book an appointment or get more information about any of our services.
            </p>
            <Link
              href="/contact"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-red-700 transition-colors inline-flex items-center gap-2"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
