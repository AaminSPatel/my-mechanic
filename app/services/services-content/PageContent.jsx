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
  Home, // Added for Doorstep representation
} from "lucide-react";
import PageHeader from "@/components/PageHeader";

export default function ServicesContent({ services }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { company } = useSiteContext();

  const handleBookNow = (service) => {
    const message = `Hi, I want to book Doorstep Service: ${service.title}\nPrice: ${service.price}`;
    const encodedMessage = encodeURIComponent(message);
    const phone = company.whatsapp.replace(/\D/g, "");
    window.location.href = `https://wa.me/${phone}?text=${encodedMessage}`;
  };

  // ================= SCHEMA GENERATION (Updated for Doorstep) =================
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Doorstep Car Repair and Washing",
    provider: {
      "@type": "AutoRepair",
      name: "MyMechanic Auto Service Center",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Indore",
        addressRegion: "MP",
        addressCountry: "IN",
      },
    },
    areaServed: {
      "@type": "City",
      name: "Indore",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Doorstep Automotive Services",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: `${service.title} - Doorstep Service Indore`,
          description: service.description,
        },
      })),
    },
  };

  return (
    <main className="w-full bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ================= PAGE HEADER (Updated with Doorstep Target) ================= */}
      <PageHeader
        title="Best Doorstep Car Repair & Washing Services in Indore"
        description="Get professional car care at your home or office. From doorstep foam washing to emergency repairs, we bring the garage to you in Indore."
        image="/oil-change.jpeg"
      />

      {/* ================= INTRODUCTION SECTION ================= */}
      <section className="py-16 border-b border-border/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold italic text-foreground mb-6">
            Expert Car Care{" "}
            <span className="text-primary">At Your Home</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Tired of waiting at service centers? Our{" "}
            <strong>doorstep car service in Indore</strong> is designed for your
            busy lifestyle. Whether you are at home in{" "}
            <strong>Vijay Nagar</strong> or at your office in{" "}
            <strong>Palasia</strong>, our certified mechanics come to you.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We specialize in <strong>on-site car repair and washing</strong>,
            using portable equipment to provide high-quality service without you
            moving an inch. From <strong>AB Road to Rau</strong>, we ensure your
            vehicle gets premium treatment right in your parking lot.
          </p>
        </div>
      </section>

      {/* ================= SERVICES GRID ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20" id="service-list">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <Home size={12} /> Doorstep Service Available Across Indore
            </div>
            <h2 className="text-4xl font-extrabold text-foreground italic uppercase">
              Our Service Packages
            </h2>
          </div>

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
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={`${service.title} Doorstep Service in Indore`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded text-[10px] font-bold uppercase shadow-sm">
                    Doorstep Available
                  </div>
                </div>

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
                    {service.description}{" "}
                    <strong>
                      Now available as a doorstep service anywhere in Indore.
                    </strong>
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
                  </div>

                  <button
                    onClick={() => handleBookNow(service)}
                    className="mt-auto w-full py-3 bg-secondary hover:bg-primary text-foreground hover:text-primary-foreground rounded-lg font-bold uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-2 group-hover:gap-4"
                  >
                    Book Doorstep Now <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
        </div>
      </section>

      {/* ================= PROCESS SECTION (Updated for Doorstep) ================= */}
      <section className="bg-secondary/30 py-20 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4 uppercase italic">
              How Our <span className="text-primary">Doorstep Service</span>{" "}
              Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional car maintenance delivered at your location in 4
              simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Clock,
                title: "Book Online",
                desc: "Pick a service and your preferred time slot.",
              },
              {
                icon: MapPin,
                title: "We Come to You",
                desc: "Our team arrives at your home or office in Indore.",
              },
              {
                icon: Sparkles,
                title: "On-Site Service",
                desc: "Expert cleaning or repair right in your parking spot.",
              },
              {
                icon: CheckCircle2,
                title: "Ready to Drive",
                desc: "Final check and digital invoice payment.",
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

      <ServiceFAQ />

      {/* ================= CTA SECTION ================= */}
      <section className="bg-foreground text-background py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase italic">
            Save Time. Book a Doorstep Service.
          </h2>
          <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
            Why drive to a garage when the garage can come to you? Get the best
            car repair and wash at your doorstep in Indore.
          </p>
          <Link
            href="/contact"
            className="px-10 py-4 bg-primary text-primary-foreground rounded-lg font-bold uppercase tracking-widest hover:bg-primary/90 transition-all inline-flex items-center gap-2 shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)]"
          >
            Book My Doorstep Appointment
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}

// ================= FAQ DATA (Optimized for Doorstep SEO) =================
const faqData = [
  {
    question: "Do you provide doorstep car service in all of Indore?",
    answer:
      "Yes, we provide doorstep car repair and washing services across all major areas of Indore, including Vijay Nagar, Saket, Bhawarkua, Annapurna, Kanadia, Teen Imli, and Super Corridor. Our mobile service units are fully equipped for on-site maintenance.",
  },
  {
    question: "What are the charges for doorstep car washing in Indore?",
    answer:
      "Our doorstep car washing starts at ₹299 for a single session. However, our Monthly Premium Package at ₹1499/month offers the best value, providing weekly doorstep cleaning at your residence.",
  },
  {
    question: "Can major car repairs be done at my home?",
    answer:
      "Minor repairs like oil changes, battery replacement, brake cleaning, and AC servicing can be done at your doorstep. For major engine work or painting, we provide a free pick-and-drop service to our Indore workshop.",
  },
  {
    question: "How do I book a doorstep car mechanic in Indore?",
    answer:
      "You can book easily through our website or WhatsApp. Simply select your service, share your location in Indore, and our expert mechanic will reach you at the scheduled time.",
  },
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
  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section className="bg-background py-20 border-t border-border/50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
            <HelpCircle size={14} /> Doorstep Service Help
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked{" "}
            <span className="text-primary italic">Questions</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-xl transition-all duration-300 ${openIndex === index ? "bg-secondary/20 border-primary shadow-md" : "bg-card border-border hover:border-primary/50"}`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
              >
                <span
                  className={`text-base md:text-lg font-bold transition-colors ${openIndex === index ? "text-primary" : "text-foreground"}`}
                >
                  {faq.question}
                </span>
                <span
                  className={`p-2 rounded-full transition-all duration-300 ${openIndex === index ? "bg-primary text-primary-foreground rotate-180" : "bg-secondary text-muted-foreground"}`}
                >
                  {openIndex === index ? (
                    <Minus size={18} />
                  ) : (
                    <Plus size={18} />
                  )}
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${openIndex === index ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0"}`}
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
