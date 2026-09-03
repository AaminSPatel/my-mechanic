'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Zap,
  Award,
  Users,
  Heart,
  MapPin,
  ShieldCheck,
  Wrench,
  CheckCircle2,
  Clock,
  Phone,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Cpu,
  Sparkles,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { COMPANY } from '@/lib/constants';

export default function AboutContent({ team = [] }) {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const pillars = [
    {
      icon: Award,
      title: '100% Genuine OEM / OES Parts',
      desc: 'We never compromise engine health with spurious parts. Every spark plug, brake pad, filter, and sensor is sourced directly from certified OEM/OES distributors with manufacturer warranty.',
    },
    {
      icon: ShieldCheck,
      title: 'Photo & Video Transparency',
      desc: 'No surprise bills. Before replacing any worn component, our technicians share live photos and high-resolution video over WhatsApp explaining the exact defect, cost, and rationale.',
    },
    {
      icon: Users,
      title: 'Certified Master Mechanics',
      desc: 'Our team comprises factory-trained master technicians with a minimum of 7+ years of hands-on experience troubleshooting complex petrol, CRDi diesel, hybrid, and automatic transmission powertrains.',
    },
    {
      icon: Zap,
      title: 'Doorstep + Central Workshop Agility',
      desc: 'Experience the best of both worlds: quick 45-minute doorstep visits for foam washing, oil changes, and diagnostics, paired with our fully equipped central garage on Nayta Mundla Main Road for major overhauls.',
    },
    {
      icon: Heart,
      title: 'Post-Service Warranty Assurance',
      desc: 'Every repair at MyMechanic24 is backed by our comprehensive service warranty—ranging from 30 days on routine periodic maintenance to up to 6 months on brake and suspension overhauls.',
    },
    {
      icon: Wrench,
      title: 'Transparent Digital Billing',
      desc: 'We strictly practice standardized menu pricing. Labor rates, fluid charges, and spare part costs are clearly broken down without arbitrary hidden fees or unnecessary add-on upsells.',
    },
  ];

  const infrastructureItems = [
    {
      title: 'Dual-Post & Four-Post Hydraulic Hoists',
      desc: 'Allows full 360-degree underbody inspection, oil pan draining, suspension link testing, and exhaust inspection in a safe, ergonomic setup.',
    },
    {
      title: 'Bosch & Launch OBD-II Diagnostic Scanners',
      desc: 'Advanced ECU telemetry reading, live sensor graphing, injector pulse diagnostics, and DTC fault code clearing for all Indian, Japanese, Korean, and European models.',
    },
    {
      title: 'Italian 150-Bar High-Pressure Foam Wash Bays',
      desc: 'Equipped with commercial de-mineralized water systems and pH-neutral snow foam lances to lift abrasive road dust without micro-scratching paint.',
    },
    {
      title: 'Computerized Battery & Alternator Load Analyzers',
      desc: 'Digital conductance testers that measure exact Cold Cranking Amps (CCA), state of health (SOH), and alternator ripple voltage on-site within 2 minutes.',
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Book Inspection',
      desc: 'Choose your desired service package online or speak to our service advisor via phone or WhatsApp at +91 99778 23169.',
    },
    {
      step: '02',
      title: 'Digital Job Card & Estimate',
      desc: 'We conduct a systematic multi-point health check and issue a clear digital estimate before any spanner touches your vehicle.',
    },
    {
      step: '03',
      title: 'Transparent Workmanship',
      desc: 'Receive live photo/video updates during parts replacement. Old worn parts are packaged and returned to you upon delivery.',
    },
    {
      step: '04',
      title: 'Road Test & Quality Audit',
      desc: 'Every vehicle undergoes a rigorous 5 km road test, brake stopping distance audit, and computerized sensor scan before handover.',
    },
  ];

  const faqs = [
    {
      q: 'Where is the central MyMechanic24 workshop located in Indore?',
      a: 'Our central garage and service center is located on Nayta Mundla Main Road, Near Palda & Tejaji Nagar intersection, Indore, Madhya Pradesh 452020. In addition, our mobile service vans operate across all Indore localities including Vijay Nagar, Bhawarkua, AB Road, Super Corridor, Rau, and Palasia.',
    },
    {
      q: 'How does your doorstep car service work?',
      a: 'Our doorstep van arrives directly at your residence, bungalow, or office parking lot fully equipped with an onboard water tank, power generator, OBD-II scanner, synthetic oils, and pneumatic tools. We perform foam washing, oil changes, battery replacements, and minor repairs on-site without you leaving your home.',
    },
    {
      q: 'Why should I choose MyMechanic24 over authorized dealerships?',
      a: 'Authorized brand dealerships typically charge 40% to 60% higher labor fees, push unnecessary replacement packages, and lack direct mechanic access. At MyMechanic24, you get 100% genuine OEM parts, direct communication with your mechanic, live video proof of repairs, and faster same-day turnaround.',
    },
    {
      q: 'Which car brands and models do you service?',
      a: 'We service all passenger vehicles in India, including Maruti Suzuki, Hyundai, Tata Motors, Mahindra, Honda, Toyota, Kia, Volkswagen, Skoda, Renault, Ford, MG, as well as luxury brands including BMW, Audi, and Mercedes-Benz.',
    },
    {
      q: 'What kind of warranty do you provide on repairs?',
      a: 'All labor work carries a minimum 30-day or 1,000 km warranty. Replacement spare parts carry original manufacturer warranties ranging from 6 months to 66 months (for car batteries). If an issue recurs within the warranty window, we fix it with zero labor charge.',
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Page Header */}
      <PageHeader
        title="Redefining Auto Care in Indore"
        description="Indore's trusted central auto workshop on Nayta Mundla Main Road and premier doorstep mobile mechanic fleet. Dedicated to honesty, precision engineering, and genuine OEM parts."
        image="/mymechanic_garage_indore.jpeg"
      />

      {/* ================= STORY SECTION (Local SEO & Authoritative Copywriting) ================= */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <MapPin size={12} /> Central Garage: Nayta Mundla Main Road, Indore
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-6 leading-tight italic">
              From Honest Passion to <br />
              <span className="text-primary">Indore's Most Trusted Garage</span>
            </h2>

            <div className="text-muted-foreground space-y-5 text-base leading-relaxed">
              <p>
                <strong>MyMechanic24</strong> was founded with a single, uncompromising commitment: <strong>to eradicate opaque billing, spurious counterfeit parts, and careless workmanship</strong> from Indore's automobile service landscape.
              </p>
              <p>
                For decades, car owners in Indore had to choose between two unsatisfactory extremes: overpriced authorized dealerships that inflate service bills with needless replacements, or unorganized roadside mechanics who lack computerized diagnostic tools and rely on guesswork.
              </p>
              <p>
                We bridged that divide. Operating from our state-of-the-art central workshop on <strong>Nayta Mundla Main Road (near Palda & Tejaji Nagar)</strong>, combined with our <strong>mobile doorstep repair vans</strong>, we deliver dealership-grade precision with neighbourhood garage warmth and fair pricing.
              </p>
              <p className="border-l-4 border-primary pl-4 text-foreground italic font-medium">
                &ldquo;We don&apos;t just replace parts; we diagnose root causes. Every car owner deserves to see what is happening under their hood with complete digital transparency.&rdquo;
              </p>
            </div>
          </div>

          <div className="relative h-[480px] w-full group">
            <div className="absolute inset-0 bg-primary/20 rounded-3xl transform rotate-3 group-hover:rotate-0 transition-all duration-500"></div>
            <Image
              src="/mymechanic_4.png"
              alt="MyMechanic24 Central Auto Repair Workshop on Nayta Mundla Main Road Indore"
              fill
              className="object-cover rounded-3xl shadow-2xl transition-all duration-700"
            />

            {/* Experience Badge */}
            <div className="absolute -bottom-6 -left-6 bg-card border border-border p-6 rounded-2xl shadow-2xl hidden md:block">
              <p className="text-4xl font-black text-primary mb-1">7+</p>
              <p className="text-xs font-bold uppercase tracking-widest text-foreground">
                Years of Automotive<br />Excellence in Indore
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= THE 6 PILLARS ================= */}
      <section className="bg-secondary/30 py-20 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">
              The MyMechanic24 Standard
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground uppercase italic">
              Our Core Operating Commitments
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4 text-sm sm:text-base">
              Whether you drive a daily hatchback for city traffic or a luxury German sedan for highway cruising, our certified technicians apply the exact same uncompromising engineering standards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-8 bg-card rounded-2xl border border-border hover:border-primary transition-all duration-300 group hover:shadow-xl"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <pillar.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3 uppercase tracking-wide">
                  {pillar.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WORKSHOP INFRASTRUCTURE ================= */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <Cpu size={14} /> Advanced Technical Equipment
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground uppercase italic leading-tight">
              State-of-the-Art <br />
              <span className="text-primary">Workshop Infrastructure</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Modern vehicles are complex computerized machines on wheels. You cannot repair modern multipoint electronic fuel injection, ABS modulators, or automatic dual-clutch gearboxes with a simple hammer and spanner.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              That is why our central garage facility on Nayta Mundla Main Road is equipped with enterprise-grade automotive tooling designed to match authorized factory service centers:
            </p>

            <div className="space-y-4 pt-2">
              {infrastructureItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-card p-4 rounded-xl border border-border">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 relative h-[520px] rounded-3xl overflow-hidden shadow-2xl border border-border">
            <Image
              src="/mechanic_inspecting_a_car.jpeg"
              alt="Certified Mechanic Diagnosing Engine at MyMechanic24 Indore"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
              <span className="text-primary font-bold text-xs uppercase tracking-wider mb-1">
                Zero Guesswork Guarantee
              </span>
              <h3 className="text-white text-xl font-black uppercase">
                OBD-II Computerized Sensor Diagnostic Bay
              </h3>
              <p className="text-gray-300 text-xs mt-2 leading-relaxed">
                Reading live ECU fuel trim, air-fuel stoichiometry, and sensor faults on Indian and imported vehicles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4-STEP PROCESS ================= */}
      <section className="bg-secondary/30 py-20 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">
              Transparent Customer Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground uppercase italic">
              How We Service Your Vehicle
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4 text-sm sm:text-base">
              No hidden fees, no unnecessary part swaps, and no confusing technical jargon.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-card p-6 rounded-2xl border border-border hover:border-primary transition-all relative overflow-hidden group"
              >
                <div className="text-4xl font-black text-primary/20 group-hover:text-primary transition-colors font-mono mb-4">
                  {step.step}
                </div>
                <h3 className="text-base font-bold text-foreground mb-2 uppercase tracking-wide">
                  {step.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TEAM SHOWCASE ================= */}
   {/*    {team && team.length > 0 && (
        <section className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">
              Meet The Specialists
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground uppercase italic">
              Our Certified Mechanics & Leadership
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4 text-sm sm:text-base">
              The hands behind your engine&apos;s performance. Certified professionals with decades of cumulative mechanical and diagnostic experience across Indore.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div
                key={member.id}
                className="bg-card rounded-2xl border border-border overflow-hidden group hover:border-primary transition-all shadow-sm hover:shadow-xl flex flex-col"
              >
                <div className="relative h-64 w-full overflow-hidden bg-secondary">
                  <Image
                    src={member.image || '/placeholder-user.jpg'}
                    alt={`${member.name} - ${member.role} at MyMechanic24 Indore`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                    {member.experience}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs text-primary font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4 leading-relaxed flex-1">
                    {member.bio}
                  </p>
                  <div className="pt-3 border-t border-border/60">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                      Key Expertise:
                    </span>
                    <span className="text-xs font-medium text-foreground">
                      {member.expertise}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )} */}

      {/* ================= STATS SECTION ================= */}
      <section className="bg-foreground text-background py-20 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute right-0 top-0 w-96 h-96 bg-primary blur-[150px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center divide-x divide-white/10">
            {[
              { number: '5+', label: 'Years Serving Indore' },
              { number: '200+', label: 'Vehicles Repaired' },
              { number: '100%', label: 'Genuine OEM Parts' },
              { number: '4.8 ★', label: 'Google Rating' },
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

      {/* ================= ABOUT FAQS ================= */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">
            Common Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground uppercase italic">
            Frequently Asked Questions About MyMechanic24
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Everything you need to know about our workshop, doorstep service radius, and warranty terms.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-card rounded-2xl border border-border overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-foreground hover:text-primary transition-colors text-base"
                aria-expanded={activeFaq === idx}
              >
                <span>{faq.q}</span>
                {activeFaq === idx ? (
                  <ChevronUp className="w-5 h-5 text-primary shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                )}
              </button>

              {activeFaq === idx && (
                <div className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ================= FINAL CTA SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-red-700 to-red-900 px-6 py-16 md:px-12 md:py-20 text-center shadow-2xl">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-64 w-64 rounded-full bg-black/20 blur-3xl"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-6">
              <Sparkles size={14} /> Indore&apos;s Certified Auto Care
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic mb-6 leading-tight">
              Ready to Experience Honest, <br />
              Precision Car Service?
            </h2>
            <p className="text-base sm:text-lg text-white/90 mb-10 leading-relaxed font-medium">
              Join thousands of happy drivers across Indore. Visit our central garage on Nayta Mundla Main Road or have our mobile technician arrive at your doorstep in 30–45 minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Book Inspection or Visit <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={`tel:${COMPANY.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 bg-black/30 text-white border border-white/30 px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-black/50 transition-all backdrop-blur-sm"
              >
                <Phone size={18} /> Call {COMPANY.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}