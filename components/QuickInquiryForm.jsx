"use client";

import { useState } from "react";
import { Wrench, ShieldCheck, Sparkles, CheckCircle2, Loader2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "919977823169";

const SERVICE_OPTIONS = [
  "Doorstep Car Wash & Foam Spa",
  "Doorstep Car Repair & Inspection",
  "OBD-II Computerized Diagnostics",
  "Dead Battery Jumpstart / Replacement",
  "At-Home Periodic Oil & Filter Service",
  "Monthly Doorstep Care Subscription",
  "Major Workshop Repair (Free Pickup & Drop)",
];

function buildWhatsAppLink({ name, phone, vehicle, service, address }) {
  const lines = [
    "Hi MyMechanic24, I would like to book doorstep car care in Indore.",
    name ? `Name: ${name}` : null,
    phone ? `Mobile: ${phone}` : null,
    vehicle ? `Car Model: ${vehicle}` : null,
    service ? `Service Needed: ${service}` : null,
    address ? `Indore Location: ${address}` : null,
  ].filter(Boolean);
  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export default function QuickInquiryForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    vehicle: "",
    service: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleChange(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    // 1. Send email notification to Admin via Nodemailer API
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: "Homepage Hero Quick Inquiry Form",
        }),
      });
    } catch (err) {
      console.error("Failed to send email notification:", err);
    }

    // 2. Open WhatsApp link for immediate direct response
    const link = buildWhatsAppLink(form);
    window.open(link, "_blank", "noopener,noreferrer");

    setLoading(false);
    setSubmitted(true);
  }

  return (
    <div
      id="quick-inquiry"
      className="rounded-3xl border border-border/90 bg-card/95 p-6 shadow-2xl backdrop-blur-2xl md:p-8 relative overflow-hidden transition-all duration-500"
    >
      {/* Decorative top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-red-500 to-amber-500" />

      <div className="mb-6 flex items-center gap-3.5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
          <Sparkles size={22} />
        </div>
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-primary mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Doorstep Booking
          </div>
          <h2 className="text-lg font-black tracking-tight text-foreground">
            Get Service At Home
          </h2>
          <p className="text-xs text-muted-foreground">
            No long queues. Connect in under a minute.
          </p>
        </div>
      </div>

      {submitted ? (
        <div className="py-8 text-center space-y-4">
          <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="text-lg font-bold text-foreground">
            Inquiry Sent Successfully!
          </h3>
          <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
            Our team has received your vehicle details. A technician will review your request and call or WhatsApp you shortly.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({ name: "", phone: "", vehicle: "", service: "", address: "" });
            }}
            className="text-xs text-primary font-bold hover:underline uppercase pt-2"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label htmlFor="hero-name" className="sr-only">
              Your name
            </label>
            <input
              id="hero-name"
              type="text"
              required
              value={form.name}
              onChange={handleChange("name")}
              placeholder="Your Full Name"
              className="w-full rounded-xl border border-border bg-secondary/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-primary focus:bg-background focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="hero-phone" className="sr-only">
              Mobile number
            </label>
            <input
              id="hero-phone"
              type="tel"
              required
              inputMode="tel"
              value={form.phone}
              onChange={handleChange("phone")}
              placeholder="Mobile Number (e.g. 98765 43210)"
              className="w-full rounded-xl border border-border bg-secondary/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-primary focus:bg-background focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="hero-vehicle" className="sr-only">
                Car brand and model
              </label>
              <input
                id="hero-vehicle"
                type="text"
                required
                value={form.vehicle}
                onChange={handleChange("vehicle")}
                placeholder="Car Model (e.g. Swift, Creta)"
                className="w-full rounded-xl border border-border bg-secondary/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-primary focus:bg-background focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="hero-address" className="sr-only">
                Location in Indore
              </label>
              <input
                id="hero-address"
                type="text"
                value={form.address}
                onChange={handleChange("address")}
                placeholder="Area (e.g. Palda, Tejaji Nagar)"
                className="w-full rounded-xl border border-border bg-secondary/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-primary focus:bg-background focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label htmlFor="hero-service" className="sr-only">
              What do you need?
            </label>
            <select
              id="hero-service"
              required
              value={form.service}
              onChange={handleChange("service")}
              className="w-full rounded-xl border border-border bg-secondary/80 px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:bg-background focus:ring-1 focus:ring-primary"
            >
              <option value="">Select Service Needed</option>
              {SERVICE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-xs text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary py-3.5 px-4 text-xs font-black uppercase tracking-widest text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:bg-primary/95 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-75"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Submitting Request...
              </>
            ) : (
              <>
                <FaWhatsapp size={17} className="shrink-0" /> Book Doorstep Visit
              </>
            )}
          </button>
        </form>
      )}

      <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <ShieldCheck size={14} className="text-emerald-500" />
          No upfront payment
        </span>
        <span>⚡ 15-Min Response</span>
      </div>
    </div>
  );
}