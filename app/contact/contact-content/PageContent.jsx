'use client';

import { useState } from 'react';
import { useSiteContext } from '@/context/SiteContext';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Wrench,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';

const WHATSAPP_NUMBER = "919977823169";

const SERVICE_OPTIONS = [
  "Doorstep Car Repair & Inspection",
  "Doorstep High-Pressure Foam Wash",
  "OBD-II Computerized Engine Diagnostics",
  "Dead Battery Jumpstart / Replacement",
  "At-Home Synthetic Oil & Filter Service",
  "Monthly Doorstep Car Care Subscription",
  "Workshop Repair / Denting & Painting (Free Pickup)",
  "Other Roadside Emergency",
];

export default function ContactContent() {
  const { company } = useSiteContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    service: '',
    address: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'Contact Page Inquiry Form',
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Contact submit error:', err);
      setError(
        'Unable to send via email right now. Please call or WhatsApp us directly!'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    const lines = [
      "Hi MyMechanic24, I would like to book car service in Indore.",
      formData.name ? `Name: ${formData.name}` : null,
      formData.phone ? `Mobile: ${formData.phone}` : null,
      formData.vehicle ? `Car Model: ${formData.vehicle}` : null,
      formData.service ? `Service Needed: ${formData.service}` : null,
      formData.address ? `Location: ${formData.address}` : null,
      formData.message ? `Details: ${formData.message}` : null,
    ].filter(Boolean);
    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-20 pb-20 bg-background text-foreground">
      {/* Page Header with Automotive Background */}
      <PageHeader
        title="Contact MyMechanic24"
        description="Doorstep car repair and washing across Indore. Central garage located on Nayta Mundla Main Road, serving Palda, Tejaji Nagar, and nearby areas."
        image="/mymechanic_garage_indore.jpeg"
      />

      {/* Contact Info Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <a
            href="tel:+919977823169"
            className="p-6 bg-card rounded-2xl border border-border/80 hover:border-primary hover:shadow-lg transition-all text-center group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary mx-auto mb-4 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-foreground mb-1">Direct Hotline</h3>
            <p className="text-primary font-bold text-base mb-1">+91 99778 23169</p>
            <span className="text-muted-foreground text-xs">24/7 Breakdown Assistance</span>
          </a>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              "Hi MyMechanic24, I would like to inquire about car repair or washing in Indore."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-card rounded-2xl border border-border/80 hover:border-emerald-500 hover:shadow-lg transition-all text-center group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 mx-auto mb-4 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-foreground mb-1">WhatsApp Chat</h3>
            <p className="text-emerald-500 font-bold text-base mb-1">+91 99778 23169</p>
            <span className="text-muted-foreground text-xs">Instant 15-Min Response</span>
          </a>

          <a
            href="#map"
            className="p-6 bg-card rounded-2xl border border-border/80 hover:border-primary hover:shadow-lg transition-all text-center group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary mx-auto mb-4 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-foreground mb-1">Garage Workshop</h3>
            <p className="text-foreground font-semibold text-xs leading-relaxed mb-1">
              Nayta Mundla Main Road
            </p>
            <span className="text-muted-foreground text-xs">Near Palda & Tejaji Nagar, Indore</span>
          </a>

          <div className="p-6 bg-card rounded-2xl border border-border/80 text-center">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary mx-auto mb-4 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-foreground mb-1">Operational Hours</h3>
            <p className="text-foreground font-semibold text-xs mb-1">
              8:00 AM – 8:00 PM (Daily)
            </p>
            <span className="text-muted-foreground text-xs">Emergency Calls: 24/7 Available</span>
          </div>
        </div>
      </section>

      {/* Main Form & Information Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Form Column */}
          <div className="lg:col-span-7 bg-card rounded-3xl border border-border/90 p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-red-500 to-amber-500" />

            <div className="mb-8">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
                <Sparkles size={14} /> Send Service Request
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground uppercase tracking-tight">
                Get In Touch With MyMechanic24
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm mt-2 leading-relaxed">
                Whether you need doorstep car washing in Palda, emergency repair in Tejaji Nagar,
                or computerized diagnostics anywhere in Indore, fill out this quick form.
                Our team will receive your message by email and contact you immediately.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-5">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Inquiry Sent Successfully!
                </h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. An email notification has been delivered to our master mechanic at <strong>MyMechanic24</strong>. We will review your request and get back to you shortly.
                </p>
                <div className="pt-4 flex flex-wrap justify-center gap-4">
                  <button
                    onClick={handleWhatsAppRedirect}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-all shadow-md"
                  >
                    <MessageSquare size={16} /> Open On WhatsApp Also
                  </button>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        vehicle: '',
                        service: '',
                        address: '',
                        message: '',
                      });
                    }}
                    className="border border-border hover:border-primary text-foreground px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 bg-secondary/80 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:bg-background transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      inputMode="tel"
                      placeholder="e.g. 98765 43210"
                      className="w-full px-4 py-3 bg-secondary/80 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:bg-background transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 bg-secondary/80 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:bg-background transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                      Car Brand & Model
                    </label>
                    <input
                      type="text"
                      name="vehicle"
                      value={formData.vehicle}
                      onChange={handleChange}
                      placeholder="e.g. Maruti Swift, Hyundai Creta"
                      className="w-full px-4 py-3 bg-secondary/80 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:bg-background transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                      Service Required *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-secondary/80 border border-border rounded-xl text-sm text-foreground outline-none focus:border-primary focus:bg-background transition-colors"
                    >
                      <option value="">Select Service Needed</option>
                      {SERVICE_OPTIONS.map((opt, i) => (
                        <option key={i} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                      Location / Area in Indore
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="e.g. Palda, Tejaji Nagar, Nayta Mundla"
                      className="w-full px-4 py-3 bg-secondary/80 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:bg-background transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                    Vehicle Problem / Additional Details
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe what's happening (strange sound, warning light, battery dead, oil leak, or preferred wash time)..."
                    className="w-full px-4 py-3 bg-secondary/80 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:bg-background transition-colors resize-none"
                  />
                </div>

                {error && (
                  <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-xs flex items-center gap-2">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 disabled:opacity-75"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Sending Email...
                      </>
                    ) : (
                      <>
                        Send Inquiry Now <Send size={14} />
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-2">
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    100% Privacy Protected
                  </span>
                  <span>⚡ 15-Minute Response Time</span>
                </div>
              </form>
            )}
          </div>

          {/* Right Information Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Why Choose MyMechanic24 */}
            <div className="bg-card rounded-3xl border border-border/80 p-7 shadow-sm">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-md mb-4">
                <Wrench size={14} /> Local Garage & Doorstep Care
              </div>
              <h3 className="text-xl font-black text-foreground uppercase tracking-tight mb-4">
                Why Indore Drivers Rely On Us
              </h3>
              <ul className="space-y-3.5 text-xs text-muted-foreground leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                  <span>
                    <strong>Convenient Doorstep Service:</strong> We bring tools, diagnostics, and foam washing directly to your home or office in Nayta Mundla, Palda, Tejaji Nagar, and across Indore.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                  <span>
                    <strong>Single Central Workshop:</strong> Located on Nayta Mundla Main Road for heavy mechanical work, engine rebuilding, and heated spray-booth denting & painting.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                  <span>
                    <strong>Transparent Fixed Pricing:</strong> Clear estimates before work starts. Zero unauthorized part replacements or surprise bills.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                  <span>
                    <strong>Free Pickup & Drop:</strong> If your car requires workshop machinery, we provide safe transport to Nayta Mundla with live photo and video updates.
                  </span>
                </li>
              </ul>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="bg-gradient-to-br from-secondary/80 to-card rounded-3xl border border-border/80 p-7">
              <h3 className="text-lg font-bold text-foreground mb-2">Prefer Instant WhatsApp?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-5">
                Send photos, videos, or describe the issue directly to our chief mechanic. We reply with diagnosis and instant estimates.
              </p>
              <button
                onClick={handleWhatsAppRedirect}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 px-5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <MessageSquare size={16} /> Chat on WhatsApp Now
              </button>
            </div>

            {/* Coverage Areas */}
            <div className="bg-card rounded-3xl border border-border/80 p-7">
              <h3 className="text-base font-bold text-foreground mb-2">Target Service Areas in Indore</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We frequently serve car owners in:
              </p>
              <div className="flex flex-wrap gap-2 mt-3 text-xs">
                {[
                  "Nayta Mundla",
                  "Palda",
                  "Tejaji Nagar",
                  "Udhyog Nagar",
                  "Nemawar Road",
                  "RTO Road",
                  "Bhawarkua",
                  "IT Park",
                  "Bypass",
                  "AB Road Indore",
                ].map((area, i) => (
                  <span
                    key={i}
                    className="bg-secondary px-2.5 py-1 rounded-lg text-foreground font-medium border border-border/60"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - Integrated Google Maps for Nayta Mundla Main Road */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="map">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-md mb-2">
              <MapPin size={14} /> Workshop Location
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground uppercase tracking-tight">
              Visit Our Nayta Mundla Garage
            </h2>
          </div>
          <a
            href="https://maps.app.goo.gl/DeuQikRWUgCjJkTU6?g_st=ipc"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold uppercase tracking-wider text-primary hover:underline"
          >
            Open in Google Maps App &rarr;
          </a>
        </div>

        <div className="w-full h-[450px] bg-secondary rounded-3xl border border-border overflow-hidden shadow-lg relative">
          <iframe
            src="https://www.google.com/maps?q=Nayta+Mundla+Main+Road,+Indore,+Madhya+Pradesh&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="MyMechanic24 Workshop Location - Nayta Mundla Main Road Indore"
          />
        </div>
      </section>
    </div>
  );
}