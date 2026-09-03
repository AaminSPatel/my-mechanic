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
  Sparkles,
  Plus,
  Minus,
  HelpCircle,
  Home,
  ShieldCheck,
  Wrench,
  Check,
  X,
  Phone,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { COMPANY, SITE_URL } from "@/lib/constants";

export default function ServicesContent({ services = [] }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { company } = useSiteContext();

  const categories = ["all", ...new Set(services.map((s) => s.category))];

  const handleBookNow = (service) => {
    const message = `Hi MyMechanic24, I want to book: ${service.title}\nPrice: ${service.price}\nMy Location in Indore: `;
    const encodedMessage = encodeURIComponent(message);
    const phone = (company?.whatsappNumber || "919977823169").replace(/\D/g, "");
    window.location.href = `https://wa.me/${phone}?text=${encodedMessage}`;
  };

  // ================= SCHEMA GENERATION =================
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Doorstep Car Repair and Mobile Car Washing",
    provider: {
      "@type": "AutoRepair",
      name: COMPANY.legalName,
      image: `${SITE_URL}/logo.jpeg`,
      telephone: COMPANY.phone,
      url: `${SITE_URL}/services`,
      address: {
        "@type": "PostalAddress",
        streetAddress: COMPANY.address,
        addressLocality: COMPANY.locality,
        addressRegion: COMPANY.region,
        postalCode: COMPANY.postalCode,
        addressCountry: COMPANY.country,
      },
    },
    areaServed: COMPANY.serviceAreas.map((area) => ({
      "@type": "AdministrativeArea",
      name: `${area}, Indore`,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Doorstep & Workshop Automotive Services",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: `${service.title} - MyMechanic24 Indore`,
          description: service.description,
          offers: {
            "@type": "Offer",
            price: service.price.replace(/[^\d]/g, "") || "199",
            priceCurrency: "INR",
          },
        },
      })),
    },
  };

  const comparisonData = [
    {
      feature: "Doorstep On-Site Service across Indore",
      myMechanic: true,
      dealership: false,
      roadside: false,
    },
    {
      feature: "100% Genuine OEM / OES Spare Parts",
      myMechanic: true,
      dealership: true,
      roadside: false,
    },
    {
      feature: "Live Photo / Video Approval Before Work",
      myMechanic: true,
      dealership: false,
      roadside: false,
    },
    {
      feature: "Zero Hidden Labor / Miscellaneous Charges",
      myMechanic: true,
      dealership: false,
      roadside: false,
    },
    {
      feature: "Computerized OBD-II Sensor Diagnostics",
      myMechanic: true,
      dealership: true,
      roadside: false,
    },
    {
      feature: "Written Service Warranty Up to 90 Days",
      myMechanic: true,
      dealership: true,
      roadside: false,
    },
    {
      feature: "Pricing 40% Lower Than Authorized Centers",
      myMechanic: true,
      dealership: false,
      roadside: true,
    },
  ];

  return (
    <main className="w-full bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ================= PAGE HEADER ================= */}
      <PageHeader
        title="Best Doorstep Car Repair & Washing Services in Indore"
        description="Certified automotive mechanics and professional snow foam detailing brought directly to your home or office parking. Honest menu pricing, OEM parts, and post-service warranty."
        image="/car_washing_indore_mymechanic.jpeg"
      />

      {/* ================= INTRODUCTION SECTION ================= */}
      <section className="py-16 border-b border-border/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <Sparkles size={14} /> Comprehensive Auto Care Across Indore
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold italic text-foreground mb-6">
            Dealership Precision Delivered{" "}
            <span className="text-primary">To Your Doorstep</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6">
            Tired of spending your precious weekends sitting in crowded garage waiting lounges? Our{" "}
            <strong>doorstep car service across Indore</strong> brings the workshop directly to you. Whether you are at your apartment in <strong>Vijay Nagar</strong>, residence in <strong>Palda or Tejaji Nagar</strong>, or business office on <strong>AB Road</strong>, our mobile technician van arrives fully equipped.
          </p>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            From high-pressure Italian snow foam washing to on-site synthetic oil replacements, computerized OBD-II scanning, and emergency dead battery jumpstarts, we ensure your car runs like new with zero inconvenience.
          </p>
        </div>
      </section>

      {/* ================= SERVICES GRID ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20" id="service-list">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <Home size={12} /> Serving All Sectors of Indore
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground italic uppercase">
              Our Certified Service Packages
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase border transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-transparent text-muted-foreground border-border hover:border-primary"
                }`}
              >
                {cat === "all" ? "All Packages" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Cards */}
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
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded text-[10px] font-bold uppercase shadow-sm">
                    {service.locationType || "Doorstep Available"}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-4xl">{service.icon}</div>
                    <div className="text-right">
                      <div className="text-xl font-black text-primary font-mono">
                        {service.price}
                      </div>
                      <div className="text-[10px] text-muted-foreground uppercase flex items-center justify-end gap-1 mt-0.5">
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

                  {service.warranty && (
                    <div className="mb-4 inline-flex items-center gap-1.5 text-xs text-primary font-semibold bg-primary/10 px-3 py-1 rounded-md">
                      <ShieldCheck size={14} /> {service.warranty}
                    </div>
                  )}

                  <div className="space-y-2.5 mb-8 border-t border-border/50 pt-4">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-xs text-foreground/80 leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleBookNow(service)}
                    className="mt-auto w-full py-3.5 bg-secondary hover:bg-primary text-foreground hover:text-primary-foreground rounded-xl font-bold uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-2 group-hover:gap-3 shadow-sm"
                  >
                    Book Doorstep Now <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
        </div>
      </section>

      {/* ================= DOORSTEP VS WORKSHOP ROUTING ================= */}
      <section className="bg-secondary/30 py-20 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">
              Smart Service Logistics
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-foreground uppercase italic">
              Doorstep Van vs. Central Workshop: How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4 text-sm sm:text-base">
              We bring the mobile unit to your parking spot for quick repairs, or provide pick-up to our central garage on Nayta Mundla Main Road for heavy mechanical overhauls.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Column 1: Doorstep Mobile Van */}
            <div className="bg-card p-8 rounded-3xl border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <Home className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 uppercase">
                1. Doorstep Mobile Van (At Your Home / Office)
              </h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Our specialized mobile service vehicles carry water tanks, silent generators, pressure washers, OBD-II scanners, and fluid exchange tools.
              </p>
              <ul className="space-y-3 text-sm text-foreground/90">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>High-pressure snow foam car wash & interior vacuuming</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>Engine oil & filter periodic service at your parking</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>Dead battery jumpstart & 30-min on-site replacement</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>Computerized OBD-II scanner health diagnostics</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>Brake pad cleaning & minor electrical troubleshooting</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Central Workshop Facility */}
            <div className="bg-card p-8 rounded-3xl border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 uppercase">
                2. Central Workshop (Nayta Mundla Main Road)
              </h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                For repairs requiring hydraulic vehicle hoists, engine disassembly, or dust-free paint booths, we offer secure pick-and-drop to our central facility.
              </p>
              <ul className="space-y-3 text-sm text-foreground/90">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>Clutch plate, flywheel & pressure plate overhaul</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>Complete suspension strut & steering rack replacement</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>Engine head gasket repair, timing belt & overhaul</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>Brake disc rotor lathe resurfacing</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>Dust-free paint booth denting, painting & ceramic coating</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COMPARISON TABLE ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">
            The Value Equation
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground uppercase italic">
            Why Indore Car Owners Choose MyMechanic24
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4 text-sm sm:text-base">
            See how our transparent pricing, genuine parts, and doorstep convenience compare to traditional options.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary/60 text-foreground text-xs uppercase tracking-wider">
                <th className="p-4 sm:p-5 border-b border-border">Service Standards</th>
                <th className="p-4 sm:p-5 border-b border-border text-center bg-primary/10 text-primary font-black">
                  MyMechanic24
                </th>
                <th className="p-4 sm:p-5 border-b border-border text-center">
                  Authorized Dealerships
                </th>
                <th className="p-4 sm:p-5 border-b border-border text-center">
                  Roadside Mechanics
                </th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-border/60">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="hover:bg-secondary/20 transition-colors">
                  <td className="p-4 sm:p-5 font-medium text-foreground">
                    {row.feature}
                  </td>
                  <td className="p-4 sm:p-5 text-center bg-primary/5">
                    {row.myMechanic ? (
                      <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    )}
                  </td>
                  <td className="p-4 sm:p-5 text-center">
                    {row.dealership ? (
                      <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    )}
                  </td>
                  <td className="p-4 sm:p-5 text-center">
                    {row.roadside ? (
                      <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ================= 4-STEP PROCESS ================= */}
      <section className="bg-secondary/30 py-20 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4 uppercase italic">
              How Our <span className="text-primary">Doorstep Service</span> Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              Professional car maintenance delivered at your location in 4 simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Clock,
                title: "1. Book Online / WhatsApp",
                desc: "Pick your service package and preferred 1-hour arrival window.",
              },
              {
                icon: MapPin,
                title: "2. Mobile Van Arrives",
                desc: "Our equipped van reaches your doorstep anywhere in Indore within 30-45 mins.",
              },
              {
                icon: Sparkles,
                title: "3. Precision Execution",
                desc: "Certified technicians service your car in your parking lot with live photo updates.",
              },
              {
                icon: CheckCircle2,
                title: "4. Road Test & Warranty",
                desc: "Final electronic scan, road test check, digital invoice, and post-service warranty.",
              },
            ].map((step, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-16 h-16 mx-auto bg-card rounded-2xl flex items-center justify-center border border-border group-hover:border-primary group-hover:scale-110 transition-all mb-4 shadow-lg">
                  <step.icon className="text-primary" size={28} />
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">
                  {step.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <ServiceFAQ />

      {/* ================= FINAL CTA ================= */}
      <section className="bg-foreground text-background py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase italic">
            Save Time. Book Doorstep Service Today.
          </h2>
          <p className="text-base sm:text-lg opacity-80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Why spend your weekend stuck in garage waiting lounges? Get certified car repair, oil changes, and foam washing delivered at your doorstep across Indore.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-10 py-4 bg-primary text-primary-foreground rounded-xl font-bold uppercase tracking-widest hover:bg-primary/90 transition-all inline-flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(220,38,38,0.5)]"
            >
              Book Doorstep Appointment <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={`tel:${COMPANY.phoneRaw}`}
              className="px-10 py-4 bg-secondary text-foreground rounded-xl font-bold uppercase tracking-widest hover:bg-muted transition-all inline-flex items-center justify-center gap-2"
            >
              <Phone size={16} /> Call {COMPANY.phone}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

// ================= FAQ DATA =================
const faqData = [
  {
    question: "Do you provide doorstep car service across all sectors of Indore?",
    answer:
      "Yes, MyMechanic24 provides doorstep car repair, diagnostics, and foam washing across all major areas of Indore, including Nayta Mundla, Palda, Tejaji Nagar, Udhyog Nagar, Nemawar Road, Bhawarkua, AB Road, Vijay Nagar, Palasia, Super Corridor, Rau, and Bypass Road. Our mobile service vans are equipped for complete on-site maintenance.",
  },
  {
    question: "Where is your central garage workshop located for major overhauls?",
    answer:
      "Our central repair facility is situated on Nayta Mundla Main Road, Near Palda & Tejaji Nagar intersection, Indore, MP 452020. For heavy mechanical jobs like clutch replacement, suspension overhauls, engine work, or denting-painting, we provide convenient pick-and-drop service to our central garage.",
  },
  {
    question: "What are the starting prices for car services in Indore?",
    answer:
      "Our exterior snow foam wash starts at just ₹199, basic periodic service starts at ₹299 (plus consumables as per actual MRP), computerized OBD-II diagnostics starts at ₹349, and complete interior spa starts at ₹599. We believe in 100% transparent pricing without surprise add-on charges.",
  },
  {
    question: "How long does a doorstep service visit take?",
    answer:
      "A high-pressure snow foam wash takes approximately 45 minutes. A periodic oil and filter service takes 60 to 90 minutes. Computerized diagnostic scanning takes 30 minutes. You can relax at home or continue working at your office while our certified mechanic handles everything in your parking spot.",
  },
  {
    question: "Do you use genuine spare parts for car repairs?",
    answer:
      "Yes, absolutely. We strictly use 100% authentic OEM (Original Equipment Manufacturer) and OES parts from certified brands (Bosch, Mobil1, Castrol, Shell, Valeo, Amaron, Exide, Purolator, NGK). We show new sealed boxes to you before installation and return old parts upon delivery.",
  },
  {
    question: "What warranty do you provide on car repairs?",
    answer:
      "All service work carries our written warranty of 30 days or 1,000 km (up to 90 days / 5,000 km for major overhauls). Replacement parts carry original manufacturer warranties ranging from 6 months up to 66 months (for batteries). If an issue recurs within the warranty window, we rectify it with zero labor fee.",
  },
  {
    question: "How does the VIP Monthly Car Care Subscription work?",
    answer:
      "For just ₹1,499/month, a dedicated technician visits your residence on schedule, providing 11 waterless/microfiber cleans, 4 full Sunday high-pressure foam washes, interior vacuuming, and regular monthly checks of engine oil, coolant, brake fluid, and battery health. You never have to worry about cleaning or checking your car again.",
  },
  {
    question: "How do I book an emergency roadside breakdown in Indore?",
    answer:
      "Call our 24/7 hotline directly at +91 99778 23169 or message us on WhatsApp. Share your live location in Indore, and our nearest mobile emergency technician will be dispatched to reach you within 30–45 minutes.",
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
            <HelpCircle size={14} /> Service FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4 uppercase italic">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-muted-foreground text-sm">
            Answers to common questions about our Indore doorstep mobile service and central workshop.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-2xl transition-all duration-300 ${
                openIndex === index
                  ? "bg-secondary/20 border-primary shadow-md"
                  : "bg-card border-border hover:border-primary/50"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none"
              >
                <span
                  className={`text-base sm:text-lg font-bold transition-colors ${
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
                  {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100 pb-5"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden px-5 sm:px-6">
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
