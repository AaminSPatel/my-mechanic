"use client";

import { useEffect, useRef, useState } from "react";
import { X, Send, Sparkles, PhoneCall } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const STORAGE_KEY = "mm24_inquiry_popup_dismissed";
const WHATSAPP_NUMBER = "919977823169";

const SERVICE_OPTIONS = [
  "Doorstep Car Repair & Inspection",
  "Doorstep Car Wash & Detailing",
  "OBD-II Computerized Diagnostics",
  "Dead Battery Jumpstart / Replacement",
  "At-Home Periodic Oil & Filter Service",
  "Monthly Doorstep Care Subscription",
  "Workshop Visit (Nayta Mundla Main Road)",
];

function buildWhatsAppLink({ name, phone, vehicle, problem, service }) {
  const lines = [
    "Hi MyMechanic24, I would like assistance with my car in Indore.",
    name ? `Name: ${name}` : null,
    phone ? `Mobile: ${phone}` : null,
    vehicle ? `Vehicle: ${vehicle}` : null,
    service ? `Service Needed: ${service}` : null,
    problem ? `Problem/Details: ${problem}` : null,
  ].filter(Boolean);
  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export default function InquiryPopup() {
  const [visible, setVisible] = useState(false);
  const [canClose, setCanClose] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    vehicle: "",
    problem: "",
    service: "",
  });
  const panelRef = useRef(null);
  const firstFieldRef = useRef(null);

  // Trigger popup after exactly 7 seconds of loading
  useEffect(() => {
    let alreadyDismissed = false;
    try {
      alreadyDismissed = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      alreadyDismissed = false;
    }
    if (alreadyDismissed) return;

    const showTimer = setTimeout(() => {
      setVisible(true);
      setCanClose(true);
    }, 7000);

    return () => {
      clearTimeout(showTimer);
    };
  }, []);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => firstFieldRef.current?.focus(), 150);
      return () => clearTimeout(t);
    }
  }, [visible]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && visible && canClose) {
        dismiss();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [visible, canClose]);

  function dismiss() {
    setVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // sessionStorage unavailable
    }
  }

  function handleChange(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: "7-Second Auto Popup Form",
        }),
      });
    } catch (err) {
      console.error("Popup email error:", err);
    }
    const link = buildWhatsAppLink(form);
    window.open(link, "_blank", "noopener,noreferrer");
    dismiss();
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:justify-end sm:px-0 sm:pb-0 pointer-events-auto"
      role="dialog"
      aria-modal="false"
      aria-labelledby="inquiry-popup-title"
    >
      <div
        ref={panelRef}
        className="w-full max-w-sm animate-[slideUp_0.4s_ease-out] rounded-2xl border border-border/90 bg-card/95 p-5 shadow-2xl backdrop-blur-2xl sm:rounded-3xl sm:p-6 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-red-500 to-amber-500" />

        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-primary mb-1">
              <Sparkles size={13} /> MyMechanic24 · Quick Assistance
            </div>
            <h2
              id="inquiry-popup-title"
              className="text-base font-black text-foreground"
            >
              Need Doorstep Car Care in Indore?
            </h2>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Serving Nayta Mundla, Tejaji Nagar, Palda & all Indore areas. Get a rapid response on WhatsApp.
            </p>
          </div>

          {canClose && (
            <button
              type="button"
              onClick={dismiss}
              aria-label="Close inquiry popup"
              className="shrink-0 rounded-full border border-border p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <X size={15} />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-2.5">
          <div>
            <label htmlFor="popup-name" className="sr-only">
              Your name
            </label>
            <input
              ref={firstFieldRef}
              id="popup-name"
              type="text"
              required
              value={form.name}
              onChange={handleChange("name")}
              placeholder="Your Full Name"
              className="w-full rounded-xl border border-border bg-secondary/80 px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:bg-background transition-colors"
            />
          </div>

          <div>
            <label htmlFor="popup-phone" className="sr-only">
              Mobile number
            </label>
            <input
              id="popup-phone"
              type="tel"
              required
              inputMode="tel"
              value={form.phone}
              onChange={handleChange("phone")}
              placeholder="Mobile Number"
              className="w-full rounded-xl border border-border bg-secondary/80 px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:bg-background transition-colors"
            />
          </div>

          <div>
            <label htmlFor="popup-vehicle" className="sr-only">
              Vehicle brand and model
            </label>
            <input
              id="popup-vehicle"
              type="text"
              value={form.vehicle}
              onChange={handleChange("vehicle")}
              placeholder="Car Model (e.g. Swift, Creta, City)"
              className="w-full rounded-xl border border-border bg-secondary/80 px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:bg-background transition-colors"
            />
          </div>

          <div>
            <label htmlFor="popup-service" className="sr-only">
              What do you need?
            </label>
            <select
              id="popup-service"
              value={form.service}
              onChange={handleChange("service")}
              className="w-full rounded-xl border border-border bg-secondary/80 px-3.5 py-2.5 text-xs text-foreground outline-none focus:border-primary focus:bg-background transition-colors"
            >
              <option value="">Select Service Needed</option>
              {SERVICE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90 transition-all"
          >
            <FaWhatsapp size={16} className="shrink-0" /> Send WhatsApp Inquiry
          </button>
        </form>

        <p className="mt-3 text-center text-[10px] text-muted-foreground">
          ⚡ 15-Minute Response · No Upfront Charges
        </p>
      </div>

      <style jsx global>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}