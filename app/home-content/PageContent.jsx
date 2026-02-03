"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Settings2,
  Battery,
  Wrench,
  Clock,
  Key,
  Monitor,
  Phone,
  Search,
  MapPin,
  Calendar,
  Star,
  CheckCircle2,
} from "lucide-react";
import { blogs } from "@/data/blogs";
import { testimonials } from "@/data/testimonials";
import { services } from "@/data/services";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "@/styles/styles.css";
import { EffectCards } from "swiper/modules";

export default function HomeContent() {
  return (
    <main className="w-full bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      {/* ================= HERO SECTION (H1 SEO) ================= */}
      <section className="relative h-auto md:h-[600px] pb-12 w-full overflow-hidden bg-background group">
        <div className="absolute inset-0 opacity-50">
          <Image
            src="/car4.jpg"
            alt="Best car repair service in Indore providing affordable maintenance"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
          <div className="max-w-3xl pt-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <MapPin size={12} /> Top Rated Car Workshop in Indore & Vijay
              Nagar
            </div>

            <h1 className="text-5xl sm:text-6xl font-extrabold text-foreground italic leading-tight mb-4">
              Best <span className="text-primary">Car Repair Service</span>{" "}
              <br />
              In Indore - Reliable & Fast
            </h1>

            <div className="text-xl text-muted-foreground italic mt-4 font-light border-l-4 border-primary pl-4">
              Are you searching for a reliable{" "}
              <strong>car mechanic in Indore</strong>? Our multi-brand workshop
              offers premium servicing at 40% less than authorized centers.
            </div>

            <p className="text-muted-foreground text-md mt-6 leading-relaxed max-w-2xl">
              From routine oil changes to complex engine overhauls, we are your
              one-stop destination for{" "}
              <strong>affordable car maintenance in Indore</strong>. Located
              strategically near Vijay Nagar and Bhawarkua, we ensure your
              vehicle gets the care it deserves with genuine OEM parts and
              certified expertise.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                href="/contact"
                className="bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground px-8 py-3 uppercase text-xs font-bold tracking-widest border border-border transition-all duration-300"
              >
                Book Your Service
              </Link>
              <Link
                href="/services"
                className="bg-transparent hover:border-primary text-foreground px-8 py-3 uppercase text-xs font-bold tracking-widest border border-border transition-all duration-300"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURE CARDS ================= */}
      <section className="md:block hidden bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border border-x border-border">
          {services.slice(0, 3).map((service, i) => (
            <div key={i} className="group relative bg-card">
              <div className="h-56 relative overflow-hidden">
                <Image
                  src={service.image || `/car${i + 1}.jpg`}
                  alt={`${service.title} specialized service in Indore`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
              </div>
              <div className="p-8">
                <h2 className="text-xl font-bold text-foreground uppercase mb-2">
                  {service.title}
                </h2>
                <p className="text-muted-foreground min-h-12 text-xs mb-4">
                  {service.description}
                </p>
                <div className="text-xs mb-2">
                  <span className="font-bold">Price: {service.price}</span> |{" "}
                  <span>Duration: {service.duration}</span>
                </div>
                <Link
                  href="/services"
                  className="flex items-center gap-2 text-xs font-bold text-primary uppercase hover:text-foreground"
                >
                  Learn More <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="py-6 md:hidden">
        <div className="flex justify-center mb-6">
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
          >
            {services.map((service, index) => (
              <SwiperSlide key={service.id}>
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src={service.image ||`/car${index + 1}.jpg`}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-black/70"></div>

                  <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
                    <div></div>

                    <div>
                      <h3 className="text-lg font-bold uppercase mb-2">
                        {service.title}
                      </h3>

                      <p className="text-sm leading-relaxed mb-2 line-clamp-2">
                        {service.description}
                      </p>

                      <div className="text-xs mb-2">
                        <span className="font-bold">
                          Price: {service.price}
                        </span>{" "}
                        | <span>Duration: {service.duration}</span>
                      </div>

                      <ul className="text-xs mb-4 list-disc list-inside">
                        {service.features.slice(0, 2).map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>

                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded text-xs font-bold uppercase hover:bg-primary/80 transition-colors"
                      >
                        <ArrowRight size={12} /> Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            At our auto repair center in Indore, we specialize in comprehensive
            car maintenance and repair services tailored to meet the needs of
            modern vehicles.{" "}
            {/* From routine oil changes and brake inspections to
            advanced engine diagnostics and transmission services, our certified
            mechanics use state-of-the-art equipment to ensure your vehicle runs
            smoothly and safely.  */}
          </p>

          <Link
            href="/services"
            className="bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground px-8 py-3 uppercase text-xs font-bold tracking-widest border border-border transition-all duration-300 inline-block"
          >
            View All Services
          </Link>
        </div>
      </section>
      {/* ================= DETAILED SEO CONTENT SECTION (New) ================= */}
      <section className="py-20 bg-background border-t border-border/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-[2px] w-12 bg-primary"></span>
                <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs">
                  Premium Services
                </span>
              </div>
              <h2 className="text-3xl font-bold italic text-foreground mb-6 uppercase">
                Trusted Car Mechanic in Indore with{" "}
                <span className="text-primary">5+ Years Experience</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Maintaining a car in the dusty and busy roads of Indore
                  requires professional attention. Whether you drive a Maruti
                  Suzuki, Hyundai, or a Luxury BMW, our{" "}
                  <strong>car repair service in Indore</strong>
                  is designed to handle every challenge. We focus on semantic
                  maintenance—meaning we don't just fix the problem; we diagnose
                  the root cause.
                </p>
                <p>
                  Our workshop in Vijay Nagar uses{" "}
                  <strong>OBD-II Scanning</strong> and computerized engine
                  testing to ensure precision. As a leading{" "}
                  <strong>car mechanic in Indore</strong>, we provide:
                </p>
                <ul className="grid grid-cols-2 gap-3 mt-4">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="text-primary" size={16} /> Periodic
                    Car Service
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="text-primary" size={16} /> Denting
                    & Painting
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="text-primary" size={16} />{" "}
                    Suspension Repair
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="text-primary" size={16} /> AC Gas
                    Refill
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-40 bg-card rounded border border-border flex flex-col justify-center items-center p-4">
                  <span className="text-3xl font-bold text-primary">10k+</span>
                  <span className="text-xs uppercase tracking-tighter">
                    Cars Repaired
                  </span>
                </div>
                <div className="h-48 relative rounded overflow-hidden">
                  <Image
                    src="/auto1.jpeg"
                    alt="Car servicing Indore"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="h-48 relative rounded overflow-hidden">
                  <Image
                    src="/car-repair.jpeg"
                    alt="Engine repair Indore"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="h-40 bg-card rounded border border-border flex flex-col justify-center items-center p-4">
                  <span className="text-3xl font-bold text-primary">100%</span>
                  <span className="text-xs uppercase tracking-tighter">
                    Genuine Parts
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ENHANCED PROFESSIONAL SOLUTIONS SECTION ================= */}
      <section
        className="bg-background py-24 relative overflow-hidden"
        id="services"
      >
        {/* Background Decorative Element (Subtle glow) */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 blur-[120px] -z-10"></div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-[2px] w-12 bg-primary"></span>
                <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs">
                  Premium Excellence
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black italic text-foreground uppercase leading-none">
                Professional <br />
                <span className="text-primary stroke-text">
                  Auto Solutions
                </span>{" "}
                in Indore
              </h2>
              <p className="text-muted-foreground mt-6 text-sm md:text-base max-w-lg leading-relaxed">
                Indore's most advanced{" "}
                <strong>multi-brand car diagnostic center</strong>. We combine
                master craftsmanship with cutting-edge technology to keep your
                vehicle in showroom condition.
              </p>
            </div>

            <Link
              href="/services"
              className="group flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors"
            >
              Explore All Services{" "}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-2 transition-transform"
              />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/50 border border-border/50 rounded-xl overflow-hidden shadow-2xl">
            {[
              {
                title: "Precision Car Tuning",
                icon: Settings2,
                desc: "Boost your engine's BHP and fuel efficiency with our proprietary ECU remapping and performance tuning.",
                tag: "Performance",
              },
              {
                title: "Power Battery Hub",
                icon: Battery,
                desc: "Instant health check and premium battery replacements from Exide & Amaron with on-site warranty.",
                tag: "Electrical",
              },
              {
                title: "Advanced Suspension",
                icon: Wrench,
                desc: "Complete overhaul of shock absorbers and steering racks for a butter-smooth driving experience on Indore roads.",
                tag: "Mechanical",
              },
              {
                title: "Climate Control AC",
                icon: Clock,
                desc: "Anti-bacterial cleaning and high-grade R134a gas refilling for ice-cold cooling even in peak summers.",
                tag: "Comfort",
              },
              {
                title: "Digital Key Solutions",
                icon: Key,
                desc: "Expert programming for smart keys, immobilizers, and central locking systems for all luxury & domestic cars.",
                tag: "Security",
              },
              {
                title: "Electronic Diagnostics",
                icon: Monitor,
                desc: "Identify hidden faults within minutes using our dealership-level OBD-II scanners and live data analysis.",
                tag: "Diagnostic",
              },
            ].map((service, i) => (
              <div
                key={i}
                className="group relative bg-card p-10 hover:bg-secondary/50 transition-all duration-500 overflow-hidden"
              >
                {/* Hover Accent Line */}
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500"></div>

                <div className="relative z-10">
                  <div className="inline-block p-4 rounded-lg bg-secondary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 transform group-hover:-rotate-12">
                    <service.icon size={32} strokeWidth={1.25} />
                  </div>

                  <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {service.tag}
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3 group-hover:text-foreground/80 transition-colors">
                    {service.desc}
                  </p>

                  <Link
                    href={`/services#${service.title.toLowerCase().replace(/ /g, "-")}`}
                    className="inline-flex items-center gap-2 text-[11px] font-bold text-foreground uppercase border-b border-border group-hover:border-primary pb-1 transition-all"
                  >
                    Service Details <ArrowRight size={12} />
                  </Link>
                </div>

                {/* Background Number (Watermark effect) */}
                <span className="absolute -bottom-4 -right-2 text-8xl font-black text-foreground/[0.03] italic group-hover:text-primary/[0.05] transition-colors">
                  0{i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CSS for custom text effect - Add this to your globals.css or styles.css */}
        <style jsx>{`
          .stroke-text {
            -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
            text-shadow: none;
          }
          .group:hover .stroke-text {
            -webkit-text-stroke: 1px var(--primary);
          }
        `}</style>
      </section>

      {/* ================= TRUST & INFO HUB SECTION ================= */}

      <section className="bg-secondary/20 py-24 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Column 1: Our Legacy (About) */}
          <article className="group flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-12 bg-primary"></span>
              <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs">
                About Us
              </span>
            </div>
            <div className="flex items-center gap-3 mb-8">
              <h3 className="text-2xl font-black italic text-foreground uppercase tracking-tight">
                Our Legacy
              </h3>
            </div>

            <div className="relative h-64 w-full mb-8 rounded-xl overflow-hidden border border-border group-hover:border-primary/50 transition-colors">
              <Image
                src="/car9.jpg"
                alt="State of the art car repair workshop in Indore"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-background/80 backdrop-blur-md p-3 rounded border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase text-muted-foreground font-bold">
                      Experience
                    </p>
                    <p className="text-sm font-bold">5+ Years in Indore</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase text-muted-foreground font-bold">
                      Rating
                    </p>
                    <p className="text-sm font-bold text-primary flex items-center gap-1">
                      <Star size={12} className="fill-primary" /> 4.8
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Since 2020, we have redefined the{" "}
              <strong>car repair service in Indore</strong>. Our workshop near
              Vijay Nagar isn't just a garage; it's a precision-led tech center
              where certified experts use OEM standards to treat your vehicle.
            </p>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase border-b-2 border-primary/20 hover:border-primary pb-1 w-fit transition-all"
            >
              Learn Our Story <ArrowRight size={14} />
            </Link>
          </article>

          {/* Column 2: Testimonials (Real Stories) */}
          <section className="flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-12 bg-primary"></span>
              <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs">
                Feedbacks
              </span>
            </div>
            <div className="flex items-center gap-3 mb-8">
              <h3 className="text-2xl font-black italic text-foreground uppercase tracking-tight">
                Real Stories
              </h3>
            </div>

            <div className="flex-1 space-y-4 mb-8">
              {testimonials.slice(0, 4).map((testimonial, i) => (
                <div
                  key={i}
                  className="bg-card p-5 rounded-xl border border-border/50 hover:bg-secondary/30 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center text-[10px] font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-foreground">
                          {testimonial.name}
                        </p>
                        <p className="text-[9px] text-primary font-bold uppercase tracking-wider">
                          {testimonial.vehicle}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, s) => (
                        <Star
                          key={s}
                          size={10}
                          className="fill-primary text-primary"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed italic">
                    "{testimonial.comment}"
                  </p>
                </div>
              ))}
            </div>

            {/* <Link
              href="/testimonials"
              className="bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground px-8 py-4 uppercase text-xs font-bold tracking-[0.2em] border border-border transition-all text-center rounded-lg"
            >
              View Community Reviews
            </Link> */}
          </section>

          {/* Column 3: Contact/Hours (Action Hub) */}
          <aside className="flex flex-col h-full bg-card border border-border/50 rounded-2xl p-8 relative overflow-hidden">
            {/* Subtle glow effect */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 blur-3xl"></div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-12 bg-primary"></span>
              <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs">
                Contact Us
              </span>
            </div>
            <h3 className="text-2xl font-black italic text-foreground uppercase tracking-tight mb-8">
              Visit Hub
            </h3>

            <div className="space-y-6 flex-1">
              <div className="group">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="text-primary" size={18} />
                  <span className="text-sm font-bold uppercase tracking-widest text-foreground">
                    Operational Hours
                  </span>
                </div>
                <div className="space-y-2 pl-7">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Weekdays</span>
                    <span className="text-foreground font-medium">
                      9 AM - 8 PM
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Sundays</span>
                    <span className="text-primary font-bold">
                      Open (Priority Only)
                    </span>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="text-primary" size={18} />
                  <span className="text-sm font-bold uppercase tracking-widest text-foreground">
                    Location
                  </span>
                </div>
                <div className="rounded-xl overflow-hidden border border-border grayscale hover:grayscale-0 transition-all duration-500">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d697.7437081149659!2d75.88465681452895!3d22.68904118915273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcad1b410ddb%3A0x96ec4da356240f4!2sIndore%2C%20Madhya%20Pradesh!5e1!3m2!1sen!2sin!4v1770051441582!5m2!1sen!2sin"
                    width="100%"
                    height="140"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Car repair center location Indore"
                  ></iframe>
                </div>
              </div>

              <div className="pt-4">
                <div className="bg-secondary/50 p-4 rounded-r-lg border-l-4 border-primary">
                  <p className="text-[10px] font-bold text-primary uppercase mb-1">
                    Emergency Support
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    24/7 Breakdown Assistance
                  </p>
                  <p className="text-lg font-bold text-foreground mt-2 tracking-tighter">
                    +91 81201 73615
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="mt-8 bg-primary text-primary-foreground px-8 py-4 uppercase text-xs font-bold tracking-[0.2em] text-center rounded-lg hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] transition-all"
            >
              Get Directions & Contact
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
