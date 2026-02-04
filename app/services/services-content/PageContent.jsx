"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useSiteContext } from "@/context/SiteContext";
import {
  ArrowRight,
  Clock,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Sparkles,
  Plus,
  Minus,
  HelpCircle,
} from "lucide-react";
import PageHeader from "@/components/PageHeader"; // Assuming you have this component

export default function ServicesContent({ services }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { company } = useSiteContext();

  const handleBookNow = (service) => {
    const message = `Hi, I want to book: ${service.title}\n\ Price: ${service.price}`;
    const encodedMessage = encodeURIComponent(message);
    const phone = company.whatsapp.replace(/\D/g, '');
    window.location.href = `https://wa.me/${phone}?text=${encodedMessage}`;
  };

  // ================= SCHEMA GENERATION (JSON-LD) =================
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Car Repair and Washing Services in Indore",
    description:
      "List of professional automotive services offered by our workshop in Indore.",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: {
          "@type": "AutoRepair",
          name: "MyMechanic Auto Service Center", // Replace with actual name
          address: {
            "@type": "PostalAddress",
            addressLocality: "Indore",
            addressRegion: "MP",
            addressCountry: "IN",
          },
        },
        offers: {
          "@type": "Offer",
          price: service.price.replace(/[^0-9]/g, ""),
          priceCurrency: "INR",
        },
      },
    })),
  };

  return (
    <main className="w-full bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Inject Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ================= PAGE HEADER (H1) ================= */}
      <PageHeader
        title="Best Car Repair & Washing Services in Indore"
        description="From foam washing to engine overhauling, we provide top-rated car care solutions tailored for Indore's driving conditions."
        image="/oil-change.jpeg"
      />

      {/* ================= INTRODUCTION SECTION (Word Count Booster) ================= */}
      <section className="py-16 border-b border-border/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold italic text-foreground mb-6">
            Why Your Car Needs{" "}
            <span className="text-primary">Specialized Care</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Indore's climate, characterized by dry, dusty summers and heavy
            monsoons, can be tough on vehicles. Dust accumulation clogs air
            filters rapidly, while stop-and-go traffic in areas like{" "}
            <strong>Rajwada and AB Road</strong> puts extra stress on your
            engine and clutch.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Our <strong>car repair services in Indore</strong> are designed
            specifically to tackle these issues. We don't just wash your car; we
            protect it using high-grade Teflon coatings and underbody anti-rust
            treatments perfect for MP roads. Whether you own a Hatchback, Sedan,
            or Luxury SUV, we ensure peak performance.
          </p>
        </div>
      </section>

      {/* ================= SERVICES GRID ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20" id="service-list">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <MapPin size={12} /> Serving Vijay Nagar, Bhawarkua & Entire
              Indore
            </div>
            <h2 className="text-4xl font-extrabold text-foreground italic uppercase">
              Our Service Packages
            </h2>
          </div>

          {/* Simple Filter (Optional enhancement) */}
          <div className="flex gap-2">
            {["all", "Maintenance", "Cleaning"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase border transition-all ${selectedCategory === cat ? "bg-primary text-primary-foreground border-primary" : "bg-transparent text-muted-foreground border-border hover:border-primary"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services
            .filter(
              (s) =>
                selectedCategory === "all" || s.category === selectedCategory,
            )
            .map((service) => (
              <article
                key={service.id}
                className="group flex flex-col bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300"
              >
                {/* Image Area */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={`${service.title} in Indore`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur text-foreground px-3 py-1 rounded text-xs font-bold shadow-sm">
                    {service.category}
                  </div>
                  <div className="absolute -bottom-4 right-4 bg-transparent  text-foreground px-3 py-1 rounded text-xs font-bold">
                    <Image
                      src={"/logo.png"}
                      className="h-18 w-32"
                      height={400}
                      width={400}
                      alt="MyMechanic24 Auto Care Service in Indore"
                    />
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-4xl">{service.icon}</div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary">
                        {service.price}
                      </div>
                      <div className="text-[10px] text-muted-foreground uppercase flex items-center justify-end gap-1">
                        <Clock size={10} /> {service.duration}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed flex-1">
                    {service.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-sm text-foreground/80"
                      >
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                    {/*  {service.features.length > 4 && (
                     <div className="text-xs text-muted-foreground italic pl-6">
                        + {service.features.length - 4} more features
                     </div>
                  )} */}
                  </div>

                  <button
                    onClick={() => handleBookNow(service)}
                    className="mt-auto w-full py-3 bg-secondary hover:bg-primary text-foreground hover:text-primary-foreground rounded-lg font-bold uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-2 group-hover:gap-4"
                  >
                    Book Now <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
        </div>
      </section>

      {/* ================= PROCESS SECTION (Trust Signals) ================= */}
      <section className="bg-secondary/30 py-20 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4 uppercase italic">
              Experience the <span className="text-primary">Best Car Wash</span>{" "}
              in Indore
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our 4-step cleaning process ensures your car shines like new while
              protecting the paint from Malwa's harsh sun and dust.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Inspection",
                desc: "Detailed analysis of scratches and paint health.",
              },
              {
                icon: Sparkles,
                title: "Foam Wash",
                desc: "pH-neutral snow foam to lift dirt without swirls.",
              },
              {
                icon: MapPin,
                title: "Detailing",
                desc: "Precision cleaning of vents, dashboard, and rims.",
              },
              {
                icon: CheckCircle2,
                title: "Quality Check",
                desc: "Final inspection by senior supervisors.",
              },
            ].map((step, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-16 h-16 mx-auto bg-card rounded-full flex items-center justify-center border border-border group-hover:border-primary group-hover:scale-110 transition-all mb-4 shadow-lg">
                  <step.icon className="text-primary" size={32} />
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">
                  {step.title}
                </h4>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION (SEO - People Also Ask) ================= */}
      <ServiceFAQ />

      {/* ================= CTA SECTION ================= */}
      <section className="bg-foreground text-background py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase italic">
            Ready to pamper your car?
          </h2>
          <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
            Don't let the Indore dust ruin your car's value. Book a professional
            service today.
          </p>
          <Link
            href="/contact"
            className="px-10 py-4 bg-primary text-primary-foreground rounded-lg font-bold uppercase tracking-widest hover:bg-primary/90 transition-all inline-flex items-center gap-2 shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)]"
          >
            Schedule Service Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}

// ================= FAQ DATA WITH SEO KEYWORDS =================
const faqData = [
  {
    question: "What is the starting price for car service in Indore?",
    answer:
      "Our basic car service in Indore starts at just ₹299. This includes engine oil check, oil filter inspection, air filter cleaning, and a general health checkup. It is the most affordable car maintenance package in Vijay Nagar and nearby areas.",
  },
  {
    question: "Do you offer doorstep car washing service in Indore?",
    answer:
      "Yes, we offer a Premium Monthly Car Care Package (₹1499/month) which includes doorstep car washing services. Our team visits your home or office in Indore to provide bucket wash and full foam wash on Sundays.",
  },
  {
    question: "Which areas in Indore do you cover for breakdown support?",
    answer:
      "We cover the entire Indore city for car repair and breakdown support, including major areas like Vijay Nagar, Bhawarkua, Palasia, Rajwada, AB Road, and Super Corridor. Our mechanics can reach you within 30-45 minutes.",
  },
  {
    question: "Do you use genuine spare parts for car repairs?",
    answer:
      "Absolutely. We strictly use 100% genuine OEM parts (Original Equipment Manufacturer) for all brands like Maruti Suzuki, Hyundai, Tata, Honda, and Toyota. We believe in transparency and show the parts to customers before installation.",
  },
  {
    question: "How much time does a standard car service take?",
    answer:
      "A Basic Service typically takes 1-2 hours, while our Standard Service (including washing and vacuuming) takes about 2-3 hours. For Major Service or deep cleaning, we might require 4-6 hours to ensure perfection.",
  },
  {
    question: "Is interior dry cleaning available for SUVs?",
    answer:
      "Yes, we specialize in SUV and MUV interior cleaning (₹799). Our detailing process includes deep vacuuming, dashboard polishing, roof cleaning, and stain removal to remove Indore's dust and grime completely.",
  },
  {
    question: "Why should I choose you over an authorized service center?",
    answer:
      "We offer the same dealership-level quality at 40% lower prices. You get transparent pricing, genuine parts, faster turnaround time, and personalized attention from our expert mechanics in Indore.",
  },
  {
    question: "Do you service luxury cars like BMW or Audi?",
    answer:
      "Yes, our workshop is equipped with advanced OBD-II scanners and tools to handle luxury cars. We provide oil changes, brake pad replacement, and ceramic coating services for premium vehicles in Indore.",
  },
  {
    question: "What is included in the Major Service Package?",
    answer:
      "Our Major Service (₹699 + Consumables) is a complete overhaul. It covers engine oil, coolant, brake oil, gear oil changes, AC vent foam wash, door lubrication, and deep interior cleaning along with exterior washing.",
  },
  {
    question: "Can I book a car service online in Indore?",
    answer:
      "Yes! You can book an appointment directly through our website. Just select your service package, choose a time slot, and our team will confirm your booking instantly. We also accept phone bookings.",
  },
  {
    question: "How often should I get my car AC serviced in Indore?",
    answer:
      "Given Indore's hot summers, we recommend getting your Car AC serviced once a year, preferably in March or April. We check for gas leakage, clean the cooling coil, and top up the refrigerant.",
  },
  {
    question: "Do you offer car denting and painting services?",
    answer:
      "Yes, we provide high-quality denting and painting services using a dust-free paint booth. Whether it's a small scratch or a bumper replacement, we match the exact factory color of your car.",
  },
];

function ServiceFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // ================= FAQ SCHEMA GENERATOR =================
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="bg-background py-20 border-t border-border/50">
      {/* Inject FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
            <HelpCircle size={14} /> Support & Queries
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked{" "}
            <span className="text-primary italic">Questions</span>
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about the best car repair services in
            Indore.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-xl transition-all duration-300 ${
                openIndex === index
                  ? "bg-secondary/20 border-primary shadow-md"
                  : "bg-card border-border hover:border-primary/50"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
              >
                <span
                  className={`text-base md:text-lg font-bold transition-colors ${
                    openIndex === index ? "text-primary" : "text-foreground"
                  }`}
                >
                  {faq.question}
                </span>
                <span
                  className={`p-2 rounded-full transition-all duration-300 ${
                    openIndex === index
                      ? "bg-primary text-primary-foreground rotate-180"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {openIndex === index ? (
                    <Minus size={18} />
                  ) : (
                    <Plus size={18} />
                  )}
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100 pb-5"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden px-5">
                  <p className="text-muted-foreground text-sm leading-relaxed border-t border-border/50 pt-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
