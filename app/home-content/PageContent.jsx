"use client";

import React, { useState } from "react";
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
  MapPin,
  Calendar,
  Star,
  CheckCircle2,
  StarIcon,
  ShieldCheck,
  Sparkles,
  Droplets,
  Zap,
  Car,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Award,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { testimonials as defaultTestimonials } from "@/data/testimonials";
import { services as defaultServices } from "@/data/services";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
import "@/styles/styles.css";
import { motion, AnimatePresence } from "framer-motion";
import QuickInquiryForm from "@/components/QuickInquiryForm";

const WHATSAPP_NUMBER = "919977823169";

export default function HomeContent({
  services = defaultServices,
  testimonials = defaultTestimonials,
}) {
  const [activeFaq, setActiveFaq] = useState(null);
  const [showHeroForm, setShowHeroForm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHeroForm(true);
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const doorstepWashFeatures = [
    {
      title: "Pressure Foam Wash At Home",
      desc: "High-pressure snow foam wash that dissolves Indore dust and road grime right in your driveway without scratching paint.",
      price: "From ₹199",
      duration: "45-60 Mins",
      tag: "Most Popular",
      image: "/car_washing_indore_mymechanic.jpeg",
      highlights: ["Snow foam soak", "High-pressure rinse", "Tyre dressing & rims shine"],
    },
    {
      title: "Deep Interior Vacuum & Spa",
      desc: "Hospital-grade interior vacuuming, fabric & leather upholstery care, and dashboard UV protective polish at your parking spot.",
      price: "From ₹599",
      duration: "60-90 Mins",
      tag: "Best Value",
      image: "/doorstep_car_washing_in_indore.jpeg",
      highlights: ["Deep seat vacuum", "Dashboard conditioning", "AC vent sanitization"],
    },
    {
      title: "Monthly Home Care Subscription",
      desc: "Never drive a dusty car again in Indore. 11 weekly washes + 4 Sunday deep foam washes + monthly fluid checks at home.",
      price: "₹1,499/mo",
      duration: "Monthly Routine",
      tag: "Zero Hassle",
      image: "/car-wash1.jpeg",
      highlights: ["11x doorstep washes", "4x deep foam washes", "Free coolant & oil level check"],
    },
  ];

  const doorstepRepairFeatures = [
    {
      icon: Monitor,
      title: "OBD-II Computerized Diagnostics",
      badge: "Diagnostics",
      desc: "Check-engine light or warning on? We scan sensor telemetry, engine codes, and electrical faults right at your parking spot.",
      timing: "30 Mins On-Site",
    },
    {
      icon: Battery,
      title: "Dead Battery Jump & Replacement",
      badge: "Emergency",
      desc: "Instant jumpstart or same-day replacement with official Exide & Amaron batteries with on-site manufacturer warranty.",
      timing: "30-45 Min Arrival",
    },
    {
      icon: Settings2,
      title: "At-Home Oil & Filter Service",
      badge: "Routine Care",
      desc: "Premium synthetic engine oil replacement, OEM oil filter fitting, and air filter cleaning right in your society parking.",
      timing: "60 Mins On-Site",
    },
    {
      icon: Wrench,
      title: "Brake Pads & Disc Inspection",
      badge: "Safety",
      desc: "Squeaking or spongy brakes? We inspect rotors, replace front/rear brake pads, and top up brake fluid at your doorstep.",
      timing: "45 Mins On-Site",
    },
    {
      icon: Clock,
      title: "AC Gas Top-Up & Cooling Check",
      badge: "Comfort",
      desc: "Beat the Indore heat. R134a refrigerant recharge, condenser cleaning, and cabin filter servicing at your residence.",
      timing: "45 Mins On-Site",
    },
    {
      icon: Zap,
      title: "Emergency Roadside Assistance",
      badge: "24/7 Support",
      desc: "Stuck in Nayta Mundla, Palda, or Tejaji Nagar? Puncture repair, coolant overheat, starter failure, or fuel delivery.",
      timing: "Quick Dispatch",
    },
  ];

  const localReviews = [
    {
      name: "Rameshwar Prasad Sharma (62 yrs)",
      location: "Palda, Indore",
      vehicle: "Honda City 2021",
      comment:
        "Senior citizen hu, Indore ke traffic me gaadi chala kar garage me ghanto wait karna mere liye bohot mushkil tha. Palda me mere ghar par hi mechanic aaya aur mere samne synthetic engine oil aur filter change kiya. Brakes bhi check kiye. Bhai bohot respectful aur imandar hain!",
      service: "Doorstep Periodic Service",
    },
    {
      name: "Jagdish Chandra Verma (58 yrs)",
      location: "Tejaji Nagar, Indore",
      vehicle: "Maruti Swift 2020",
      comment:
        "Subah Tejaji Nagar me gaadi start hi nahi ho rahi thi, battery dead ho gayi. MyMechanic24 par call kiya to Nayta Mundla se 25 minute me mechanic ghar pahunch gaya. Digital meter se check karke nayi Amaron battery on the spot laga di warranty card ke sath. Zabardast service!",
      service: "Doorstep Battery Replacement",
    },
    {
      name: "Omprakash Agrawal (65 yrs)",
      location: "Nayta Mundla Main Road, Indore",
      vehicle: "Hyundai Creta 2022",
      comment:
        "Nayta Mundla main road par inki workshop hai, wahan car le gaya tha AC cooling problem ke liye. Pehle laptop se OBD scanning ki, fir genuine gas refill ki. Dusre garage wale 8-10 hazar ka kharcha bata rahe the, inhone bilkul sahi rate me ice-cold cooling kar di.",
      service: "AC Servicing & Diagnostics",
    },
    {
      name: "Kailash Narayan Tiwari (61 yrs)",
      location: "Nemawar Road, Indore",
      vehicle: "Toyota Innova Crysta",
      comment:
        "Doorstep car foam wash aur deep interior cleaning karwaya tha Nemawar Road par. Portable pressure machine lekar do ladke aaye the, driveway me bina kisi kichad ke poori car chamka di. Seats aur AC vents ki vacuuming bhi ekdum top-notch thi!",
      service: "High-Pressure Foam Wash at Home",
    },
    {
      name: "Radheshyam Joshi (56 yrs)",
      location: "Udhyog Nagar, Indore",
      vehicle: "Mahindra Scorpio 2020",
      comment:
        "Indore me pichhle 35 saal se gaadi chala raha hu, aise imaandar mechanics bohot kam milte hain. Udhyog Nagar me meri Scorpio ka suspension sound aur front brake pads change karwaya. Free pickup aur drop bhi diya, kaam ekdum solid hai.",
      service: "Suspension & Brake Repair",
    },
    {
      name: "Aditya Patidar (28 yrs)",
      location: "Bhawarkua / IT Park, Indore",
      vehicle: "Tata Nexon 2023",
      comment:
        "IT sector me 10 ghante ki job ke baad weekend pe garage jaane ka time hi nahi milta. Inka monthly doorstep car wash plan le rakha hai. Har hafte society parking me foam wash aur monthly fluid check ho jata hai. Zero headache, full paisa vasool!",
      service: "Monthly Doorstep Care Plan",
    },
  ];

  const faqs = [
    {
      q: "Where is the MyMechanic24 workshop located in Indore?",
      a: "Our central workshop is located directly on Nayta Mundla Main Road, Indore (close to Palda, Tejaji Nagar, and Udhyog Nagar). While this is our single central hub for heavy repairs, our mobile mechanic units provide doorstep car repairs, diagnostics, and foam washing across Nayta Mundla, Palda, Tejaji Nagar, Bhawarkua, and the entire city of Indore.",
    },
    {
      q: "Do I need to provide water and electricity for the doorstep car wash?",
      a: "Our mobile detailing team carries high-pressure foam washing rigs, extension power cords, and specialized nozzles. We only require access to a standard domestic tap water connection and a regular electrical plug point nearby. If you live in an apartment or society in Palda, Tejaji Nagar, or Indore, we ensure a clean, spill-controlled process that leaves no mess.",
    },
    {
      q: "How fast can a mobile mechanic reach my location in Indore?",
      a: "For emergency breakdowns and dead battery jumpstarts around Nayta Mundla, Palda, Tejaji Nagar, Nemawar Road, and Udhyog Nagar, our technician usually arrives within 30 to 45 minutes. For routine doorstep servicing or car washing, you can pick any convenient morning or evening time slot.",
    },
    {
      q: "Are the replacement parts and engine oils 100% genuine?",
      a: "Yes, 100%. We only supply sealed OEM/OES components and manufacturer-approved synthetic oils (such as Mobil, Castrol, and Shell). The packaging is unsealed right in front of your eyes before installation.",
    },
    {
      q: "What if my car requires heavy work that cannot be completed at home?",
      a: "Over 80% of routine servicing, diagnostics, and repairs are safely completed at your doorstep. For complex engine overhauls, gearbox repairs, or spray-booth denting and painting, we safely transport your vehicle to our Nayta Mundla Main Road workshop with complimentary pickup and drop.",
    },
  ];

  return (
    <main className="w-full bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">

      {/* ================= HERO SECTION (SEO Optimized for Indore, Nayta Mundla, Palda, Tejaji Nagar & MyMechanic24) ================= */}
      <section className="relative min-h-[740px] lg:min-h-[680px] w-full overflow-hidden bg-background">
        {/* Background Image with Deep Radial & Dark Gradient Overlay */}
        <div className="absolute inset-0 opacity-70">
          <Image
            src="/mechanic_inspecting_a_car.jpeg"
            alt="MyMechanic24 Doorstep car repair and washing in Nayta Mundla, Palda, Tejaji Nagar Indore"
            fill
            priority
            sizes="100vw"
            className="object-cover scale-105"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 py-12 lg:py-16 min-h-[740px] lg:min-h-[680px] flex items-center">
          <div className="grid lg:grid-cols-[1fr_390px] gap-12 lg:gap-16 items-center w-full">
            {/* HERO CONTENT */}
            <div className="max-w-3xl">
              {/* Local SEO Location Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-wide backdrop-blur-md">
                <MapPin size={13} className="text-primary shrink-0" />
                <span>Nayta Mundla Main Road · Serving Tejaji Nagar, Palda & Indore</span>
              </div>

              {/* High-Converting SEO Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-[1.08] mb-5">
                MyMechanic24: Car Repair &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-red-500 to-amber-500">
                  Washing At Home.
                </span>
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-extrabold text-muted-foreground mt-2 font-normal">
                  Garage on Nayta Mundla Main Road · Service at Your Doorstep in Indore.
                </span>
              </h1>

              {/* Organic SEO Focused Subtext */}
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-8">
                Why waste your weekend in traffic or waiting in dirty garage lounges?
                Based on <strong>Nayta Mundla Main Road, Indore</strong>, <strong>MyMechanic24</strong> delivers
                certified car mechanics, computerized OBD-II diagnostics, and high-pressure foam
                washing directly to your doorstep in <strong>Nayta Mundla, Palda, Tejaji Nagar, Udhyog Nagar</strong>,
                and all across Indore.
              </p>

              {/* Value Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-9 text-xs sm:text-sm font-semibold">
                <div className="flex items-center gap-2 bg-secondary/70 border border-border/80 px-3 py-2.5 rounded-xl">
                  <Clock size={16} className="text-primary shrink-0" />
                  <span>30-45 Min Arrival</span>
                </div>
                <div className="flex items-center gap-2 bg-secondary/70 border border-border/80 px-3 py-2.5 rounded-xl">
                  <ShieldCheck size={16} className="text-primary shrink-0" />
                  <span>100% Genuine Parts</span>
                </div>
                <div className="flex items-center gap-2 bg-secondary/70 border border-border/80 px-3 py-2.5 rounded-xl col-span-2 sm:col-span-1">
                  <Sparkles size={16} className="text-primary shrink-0" />
                  <span>Zero Travel Needed</span>
                </div>
              </div>

              {/* CTA Group */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowHeroForm(true);
                    setTimeout(() => {
                      const el = document.getElementById("quick-inquiry");
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                    }, 50);
                  }}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  Book Doorstep Service
                </button>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    "Hi MyMechanic24, I need doorstep car service or washing in Indore (Nayta Mundla / Palda / Tejaji Nagar area)."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-secondary/90 hover:bg-secondary text-foreground px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-wider border border-border hover:border-emerald-500/50 transition-all duration-300"
                >
                  <FaWhatsapp size={17} className="text-emerald-500 shrink-0" />
                  WhatsApp Inquiry
                </a>

                <a
                  href="tel:+919977823169"
                  className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors py-2 px-1"
                >
                  <Phone size={15} className="text-primary" />
                  +91 99778 23169
                </a>
              </div>

              {/* Trust Subtext */}
              <div className="mt-8 flex items-center gap-4 pt-6 border-t border-border/60 text-xs text-muted-foreground">
                <div className="flex items-center text-amber-500 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-500" />
                  ))}
                </div>
                <span>
                  <strong>4.8/5 Rating</strong> · 200+ satisfied vehicle owners across Indore
                </span>
              </div>
            </div>

            {/* SINGLE HERO INQUIRY FORM (Reveals after 7 seconds or on CTA click) */}
            <div className="relative min-h-[440px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {showHeroForm ? (
                  <motion.div
                    key="quick-form"
                    initial={{ opacity: 0, y: 24, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full"
                  >
                    <QuickInquiryForm />
                  </motion.div>
                ) : (
                  <motion.div
                    key="hero-preview"
                    initial={{ opacity: 0.9 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35 }}
                    className="w-full rounded-3xl border border-border/90 bg-card/90 p-6 md:p-8 backdrop-blur-2xl relative overflow-hidden text-center flex flex-col items-center justify-center shadow-2xl"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-red-500 to-amber-500" />
                    
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 ring-8 ring-primary/5">
                      <Wrench size={28} />
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-primary mb-2 bg-primary/10 px-3 py-1 rounded-full">
                      <Sparkles size={12} /> Doorstep Care · Indore
                    </div>

                    <h3 className="text-xl font-black text-foreground mb-2">
                      Doorstep Service Booking
                    </h3>

                    <p className="text-xs text-muted-foreground max-w-xs leading-relaxed mb-6">
                      Mobile mechanic van reaches your home or office in Indore within 30–45 mins. 100% genuine OEM parts &amp; zero upfront fees.
                    </p>

                    <button
                      type="button"
                      onClick={() => setShowHeroForm(true)}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3.5 px-6 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer hover:shadow-primary/30"
                    >
                      <Sparkles size={14} /> Open Booking Form
                    </button>

                    <div className="mt-4 flex items-center gap-2 text-[11px] text-muted-foreground">
                      <Clock size={13} className="text-primary animate-pulse" />
                      <span>Inquiry form opens automatically in 7 seconds</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ================= QUICK STATS BANNER ================= */}
      <section className="bg-secondary/40 border-y border-border py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-3">
              <div className="text-2xl sm:text-4xl font-black text-primary mb-1">200+</div>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                Cars Serviced & Washed
              </p>
            </div>
            <div className="p-3 border-l border-border/50">
              <div className="text-2xl sm:text-4xl font-black text-foreground mb-1">30-45 Mins</div>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                Emergency Arrival in Indore
              </p>
            </div>
            <div className="p-3 border-l border-border/50">
              <div className="text-2xl sm:text-4xl font-black text-primary mb-1">100%</div>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                Doorstep Transparency
              </p>
            </div>
            <div className="p-3 border-l border-border/50">
              <div className="text-2xl sm:text-4xl font-black text-foreground mb-1">₹0</div>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                Travel / Waiting Hassle
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW DOORSTEP CAR CARE WORKS (3-Step Timeline) ================= */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
              Simple & Transparent
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground uppercase">
              How Doorstep Car Service Works in Indore
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mt-4 leading-relaxed">
              No need to drive to Nayta Mundla if you prefer service at home. We bring the garage
              tools and pressure wash gear right to your doorstep in Palda, Tejaji Nagar, and across Indore.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="relative bg-card/80 backdrop-blur-sm border border-border/70 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl font-black text-primary/30 group-hover:text-primary transition-colors">
                  01
                </span>
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Calendar size={24} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Book in 60 Seconds
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Choose doorstep car wash, regular maintenance, or repair. Share your car model and
                address in Nayta Mundla, Palda, Tejaji Nagar, or Indore.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative bg-card/80 backdrop-blur-sm border border-border/70 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl font-black text-primary/30 group-hover:text-primary transition-colors">
                  02
                </span>
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Wrench size={24} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Mobile Unit Arrives
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our certified technician arrives at your home or office equipped with OBD-II
                diagnostic scanners, high-pressure foam kits, and genuine spare parts.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative bg-card/80 backdrop-blur-sm border border-border/70 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl font-black text-primary/30 group-hover:text-primary transition-colors">
                  03
                </span>
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <CheckCircle2 size={24} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Live Inspection & Drive
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Watch the work happen live right in front of your eyes. Test drive your car,
                verify the results, and pay digitally only after complete satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 1: DOORSTEP CAR WASH & DETAILING AT HOME ================= */}
      <section className="py-20 bg-secondary/30 border-y border-border/70 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Header */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                <Droplets size={14} />
                Doorstep Car Spa & Detailing
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight uppercase leading-tight mb-6">
                Showroom Gloss In Your Driveway.{" "}
                <span className="text-primary block">Zero Driving Needed.</span>
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                Dust from Nemawar Road, Palda, and Tejaji Nagar ruins your car's paint over time.
                Our mobile detailing unit brings high-pressure snow foam, paint-safe
                microfiber washing, interior vacuuming, and dashboard polish right to
                your home or society parking in Indore.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-primary/10 text-primary mt-1">
                    <Check size={14} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">
                      Scratch-Free Snow Foam Technology
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      pH-neutral foam lifts stubborn road grime without creating swirl marks on your clear coat.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-primary/10 text-primary mt-1">
                    <Check size={14} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">
                      Deep Interior Vacuum & Sanitization
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      High-suction extraction under seats, boot space, mats, and AC vent disinfection.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-primary/10 text-primary mt-1">
                    <Check size={14} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">
                      Apartment & Society Friendly
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Controlled water usage and clean drainage that leaves your parking spot neat.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Book Doorstep Wash
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 border border-border hover:border-primary px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-foreground transition-all"
                >
                  View All Packages <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right Cards Showcase */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {doorstepWashFeatures.map((pkg, idx) => (
                <div
                  key={idx}
                  className={`bg-card rounded-2xl border border-border/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${
                    idx === 2 ? "sm:col-span-2" : ""
                  }`}
                >
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={pkg.image}
                      alt={`${pkg.title} in Indore, Nayta Mundla, Palda, Tejaji Nagar`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-[10px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider">
                      {pkg.tag}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-baseline mb-2">
                        <h3 className="text-lg font-bold text-foreground">
                          {pkg.title}
                        </h3>
                        <span className="text-primary font-extrabold text-sm">
                          {pkg.price}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                        {pkg.desc}
                      </p>
                      <ul className="space-y-1.5 mb-5">
                        {pkg.highlights.map((hl, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-xs text-foreground font-medium"
                          >
                            <CheckCircle2 size={13} className="text-primary shrink-0" />
                            {hl}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      href="/contact"
                      className="w-full text-center py-2.5 px-4 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground text-xs font-bold uppercase tracking-wider transition-all block"
                    >
                      Book This Wash
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 2: DOORSTEP CAR REPAIR & DIAGNOSTICS ================= */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                <Wrench size={14} />
                Mobile Mechanics On Demand
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground uppercase leading-tight">
                Doorstep Car Repair &{" "}
                <span className="text-primary">Live Diagnostics</span>
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mt-4 leading-relaxed">
                Car refusing to start in Palda or Tejaji Nagar? Check-engine light glowing? Squeaking brakes?
                Avoid expensive towing to an unknown workshop. Our senior mobile mechanics bring
                dealership-level OBD-II scanners and genuine parts right to your parking spot.
              </p>
            </div>

            <a
              href="tel:+919977823169"
              className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-primary/25 transition-all self-start md:self-end"
            >
              <Phone size={15} />
              Emergency Mechanic Call
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doorstepRepairFeatures.map((item, idx) => (
              <div
                key={idx}
                className="group relative bg-card border border-border/80 rounded-2xl p-7 hover:border-primary/50 transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-secondary group-hover:bg-primary group-hover:text-primary-foreground text-primary flex items-center justify-center transition-all duration-300">
                      <item.icon size={22} strokeWidth={1.75} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-secondary px-2.5 py-1 rounded text-muted-foreground group-hover:text-foreground">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
                    <Clock size={13} className="text-primary" />
                    {item.timing}
                  </span>
                  <Link
                    href="/contact"
                    className="text-primary font-bold inline-flex items-center gap-1 hover:translate-x-1 transition-transform"
                  >
                    Inquire <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FIXED BACKGROUND PARALLAX SECTION (Uses /mymechanic_3.png) ================= */}
      <section
        className="relative py-28 bg-fixed bg-center bg-cover border-y border-border"
        style={{ backgroundImage: `url('/mymechanic_3.png')` }}
      >
        {/* Deep Translucent Dark Backdrop */}
        <div className="absolute inset-0 bg-black/85 backdrop-blur-xs" />

        <div className="relative max-w-7xl mx-auto px-6 text-white">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-4 rounded-full bg-primary/20 border border-primary/40 text-primary text-xs font-bold uppercase tracking-widest">
              <Sparkles size={14} />
              The MyMechanic24 Difference
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Why Indore Chooses Doorstep Over Old Garages
            </h2>
            <p className="text-gray-300 text-sm sm:text-base mt-4 leading-relaxed">
              Experience the modern way of vehicle maintenance in Nayta Mundla, Palda, Tejaji Nagar, and across Indore.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Old Way */}
            <div className="bg-black/60 backdrop-blur-md border border-red-500/30 rounded-3xl p-8 sm:p-9 relative shadow-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-red-400 bg-red-500/20 px-3.5 py-1.5 rounded-lg mb-6">
                <X size={15} /> Old Garage Experience
              </div>
              <ul className="space-y-4 text-sm text-gray-300">
                {[
                  "Waste 3 to 5 hours driving in traffic & waiting in dusty lounges",
                  "Anxiety of part swapping or hidden billing discovered at checkout",
                  "No clue what engine oil or filters are actually being poured in",
                  "Expensive towing charges if your car has a dead battery or won't start",
                  "Uncertain turnaround times leaving you stranded for days",
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 mt-0.5">
                      <X size={13} />
                    </div>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* MyMechanic24 Doorstep */}
            <div className="bg-black/70 backdrop-blur-md border-2 border-primary/60 rounded-3xl p-8 sm:p-9 relative shadow-2xl shadow-primary/20">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-3.5 py-1.5 rounded-lg mb-6">
                <Check size={15} /> MyMechanic24 Doorstep Advantage
              </div>
              <ul className="space-y-4 text-sm text-gray-100">
                {[
                  "Zero travel needed — relax at home or work while our technician services",
                  "100% upfront flat pricing with clear explanation before work begins",
                  "Live transparent inspection — watch every filter, spark plug, and oil change",
                  "No towing needed for 80% of common automotive and electrical faults",
                  "Certified experienced mechanics with dealership-grade diagnostic scanners",
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={13} />
                    </div>
                    <span className="font-medium">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COMPREHENSIVE SERVICE PACKAGES ================= */}
      <section className="py-20 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                Full-Spectrum Care
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground uppercase tracking-tight">
                Complete Automotive Packages
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mt-2">
                Available at your doorstep in Indore or at our central Nayta Mundla Main Road garage.
              </p>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:text-foreground transition-colors self-start md:self-end"
            >
              Explore Full Service Catalog <ArrowRight size={14} />
            </Link>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-3 gap-6">
            {services.slice(0, 3).map((service, i) => (
              <div
                key={i}
                className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-52 relative overflow-hidden">
                    <Image
                      src={service.image || `/car${i + 1}.jpg`}
                      alt={`${service.title} in Indore`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-md px-3 py-1 rounded text-[11px] font-bold uppercase tracking-wider text-foreground">
                      Doorstep Available
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground uppercase mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed mb-4 line-clamp-2">
                      {service.description}
                    </p>
                    <div className="flex justify-between items-center text-xs py-2 px-3 bg-secondary rounded-lg mb-4">
                      <span className="font-black text-primary text-sm">{service.price}</span>
                      <span className="text-muted-foreground">{service.duration}</span>
                    </div>
                    {service.features && (
                      <ul className="space-y-1.5 text-xs text-muted-foreground mb-4">
                        {service.features.slice(0, 3).map((f, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle2 size={12} className="text-primary shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <Link
                    href="/services"
                    className="w-full flex items-center justify-center gap-2 text-xs font-bold text-foreground hover:text-primary uppercase border border-border hover:border-primary py-2.5 rounded-lg transition-all"
                  >
                    View Details <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Swiper */}
          <div className="md:hidden">
            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards]}
              className="mySwiper"
            >
              {services.map((service, index) => (
                <SwiperSlide key={service.id || index}>
                  <div className="relative w-full h-[460px] rounded-2xl overflow-hidden bg-card border border-border">
                    <div className="relative h-48 w-full">
                      <Image
                        src={service.image || `/car${index + 1}.jpg`}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5 flex flex-col justify-between h-[calc(460px-192px)]">
                      <div>
                        <h3 className="text-base font-bold uppercase mb-1">
                          {service.title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                          {service.description}
                        </p>
                        <div className="flex justify-between items-center text-xs py-1.5 px-2.5 bg-secondary rounded mb-3">
                          <span className="font-bold text-primary">{service.price}</span>
                          <span className="text-muted-foreground">{service.duration}</span>
                        </div>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          {service.features?.slice(0, 3).map((f, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <CheckCircle2 size={11} className="text-primary" /> {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Link
                        href="/contact"
                        className="w-full text-center bg-primary text-primary-foreground py-2.5 rounded text-xs font-bold uppercase tracking-wider"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* ================= WORKSHOP BACKUP (Nayta Mundla Main Road Facility) ================= */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-secondary/80 via-card to-secondary/80 border border-border/80 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <Award size={14} />
                  Central Garage Workshop
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-foreground uppercase tracking-tight leading-tight mb-4">
                  Nayta Mundla Main Road Workshop Hub
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  While 80% of routine repairs and car washing happen right at your doorstep, our single central
                  workshop on <strong>Nayta Mundla Main Road, Indore</strong> is fully equipped for major overhauls:{" "}
                  <strong>Clutch Overhauls, Suspension Rebuilding, Engine Machining,</strong> and{" "}
                  <strong>Heated Spray-Booth Denting & Painting</strong>.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-8 text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-primary shrink-0" />
                    <span>Free Doorstep Pickup & Drop</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-primary shrink-0" />
                    <span>Live Video Status Updates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-primary shrink-0" />
                    <span>OEM-Grade Calibration Tools</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-primary shrink-0" />
                    <span>6-Month Service Warranty</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    Schedule Free Pickup
                  </Link>
                  <a
                    href="tel:+919977823169"
                    className="inline-flex items-center gap-2 text-xs font-bold text-foreground hover:text-primary px-5 py-3.5 border border-border rounded-xl transition-all"
                  >
                    <Phone size={14} /> Speak to Chief Mechanic
                  </a>
                </div>
              </div>

              <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden border border-border">
                <Image
                  src="/mymechanic_garage_indore.jpeg"
                  alt="MyMechanic24 Garage Facility on Nayta Mundla Main Road Indore"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-md p-4 rounded-xl border border-white/10 flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold text-foreground">
                      Nayta Mundla Main Road Workshop
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Near Palda & Tejaji Nagar, Indore, Madhya Pradesh
                    </p>
                  </div>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded">
                    Open 7 Days
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= REVIEWS CAROUSEL (Updated with Indian Male Senior Feedback) ================= */}
      <section className="py-20 bg-secondary/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <Star size={14} className="fill-primary" /> Verified Doorstep Reviews
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground uppercase tracking-tight">
              Trusted by 200+ Drivers in Indore
            </h2>
            <p className="text-muted-foreground text-sm mt-3">
              Authentic feedback from car owners who enjoyed doorstep repairs and gleaming home washes in Nayta Mundla, Palda, Tejaji Nagar, and across Indore.
            </p>
          </div>

          {/* Swiper Carousel for Testimonials */}
          <div className="mb-12">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              className="pb-12"
            >
              {localReviews.map((item, i) => (
                <SwiperSlide key={i} className="h-auto">
                  <div className="bg-card border border-border/80 rounded-2xl p-7 shadow-sm hover:border-primary/40 transition-all flex flex-col justify-between h-full">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex gap-1 text-amber-500">
                          {[...Array(5)].map((_, s) => (
                            <Star key={s} size={14} className="fill-amber-500" />
                          ))}
                        </div>
                        <span className="text-[10px] font-bold text-primary uppercase bg-primary/10 px-2 py-0.5 rounded">
                          {item.service}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed italic mb-6">
                        "{item.comment}"
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border flex items-center justify-between">
                      <div>
                        <h3 className="text-xs font-bold text-foreground">
                          {item.name}
                        </h3>
                        <p className="text-[10px] text-muted-foreground">
                          {item.vehicle} · {item.location}
                        </p>
                      </div>
                      <CheckCircle2 size={16} className="text-emerald-500" />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Google Maps Reviews Link */}
          <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                <StarIcon size={24} className="fill-amber-500" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">
                  Read & Post Reviews on Google
                </h3>
                <p className="text-xs text-muted-foreground">
                  Join hundreds of satisfied customers in Nayta Mundla, Palda, and Tejaji Nagar.
                </p>
              </div>
            </div>
            <a
              href="https://maps.app.goo.gl/DeuQikRWUgCjJkTU6?g_st=ipc"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider border border-border transition-all whitespace-nowrap"
            >
              View On Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* ================= DOORSTEP FREQUENTLY ASKED QUESTIONS ================= */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              Got Questions?
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground uppercase tracking-tight">
              Doorstep Service FAQs
            </h2>
            <p className="text-muted-foreground text-sm mt-3">
              Everything you need to know about getting your car repaired or washed at home in Indore.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-sm font-bold text-foreground">
                    {faq.q}
                  </span>
                  <div className="p-1 rounded bg-secondary text-primary shrink-0">
                    {activeFaq === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-5 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= VISIT HUB & CONTACT INFO (Nayta Mundla Main Road) ================= */}
      <section className="py-20 bg-secondary/30 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Box 1: Emergency Doorstep Hotline */}
            <div className="bg-card border border-border rounded-2xl p-7 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Phone size={20} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Emergency Breakdown Hotline
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                  Stuck with a dead battery, puncture, or engine breakdown near Nayta Mundla, Palda, or Tejaji Nagar? Our mobile technician is ready.
                </p>
              </div>
              <div>
                <a
                  href="tel:+919977823169"
                  className="text-xl sm:text-2xl font-black text-primary hover:underline block mb-3"
                >
                  +91 99778 23169
                </a>
                <p className="text-[11px] text-muted-foreground">
                  Available 24/7 for Roadside Assistance & Urgent Jumpstarts
                </p>
              </div>
            </div>

            {/* Box 2: Workshop & Location */}
            <div className="bg-card border border-border rounded-2xl p-7 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <MapPin size={20} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Garage Workshop Location
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  <strong>Nayta Mundla Main Road</strong>, Near Palda & Tejaji Nagar, Indore, Madhya Pradesh.
                </p>
                <div className="rounded-lg overflow-hidden border border-border h-24 mb-4">
                  <iframe
                    src="https://www.google.com/maps?q=Nayta+Mundla+Main+Road,+Indore,+Madhya+Pradesh&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="MyMechanic24 location on Nayta Mundla Main Road Indore"
                  />
                </div>
              </div>
              <Link
                href="/contact"
                className="text-xs font-bold text-primary uppercase inline-flex items-center gap-1 hover:underline"
              >
                Get GPS Directions <ArrowRight size={12} />
              </Link>
            </div>

            {/* Box 3: Working Hours & Coverage */}
            <div className="bg-card border border-border rounded-2xl p-7 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Clock size={20} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Working Hours & Slots
                </h3>
                <div className="space-y-2 text-xs mb-6">
                  <div className="flex justify-between py-1 border-b border-border/60">
                    <span className="text-muted-foreground">Mon – Sat Garage &amp; Doorstep</span>
                    <span className="font-bold text-foreground">8:00 AM – 8:00 PM</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/60">
                    <span className="text-muted-foreground">Sunday Hours</span>
                    <span className="font-bold text-foreground">8:00 AM – 2:00 PM</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/60">
                    <span className="text-muted-foreground">24/7 Breakdown Hotline</span>
                    <span className="font-bold text-emerald-500">Always Available</span>
                  </div>
                </div>
              </div>
              <Link
                href="/contact"
                className="w-full text-center py-3 bg-primary text-primary-foreground rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition-all block"
              >
                Book An Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL ACTION BANNER ================= */}
      <section className="py-14 bg-gradient-to-r from-primary to-red-700 text-primary-foreground relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight mb-4">
            Ready For Effortless Car Care at Your Doorstep?
          </h2>
          <p className="text-sm sm:text-base max-w-2xl mx-auto opacity-90 mb-8">
            Serving Nayta Mundla, Palda, Tejaji Nagar, Udhyog Nagar, and all of Indore.
            Tell us your vehicle model and address — our mobile technician will be on the way.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-background text-foreground hover:bg-secondary px-8 py-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-lg inline-block"
            >
              Book Service Now
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                "Hi MyMechanic24, I would like to book doorstep car repair or wash in Indore (Nayta Mundla / Palda / Tejaji Nagar area)."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-wider inline-flex items-center gap-2 transition-all shadow-lg"
            >
              <FaWhatsapp size={18} className="text-white shrink-0" /> WhatsApp Us Directly
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}