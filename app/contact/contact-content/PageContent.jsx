'use client';

import { useState } from 'react';
import { useSiteContext } from '@/context/SiteContext';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

export default function ContactContent() {
  const { company } = useSiteContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Construct WhatsApp message
    const message = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\nMessage: ${formData.message}`;
    // Clean phone number
    const cleanedPhone = company.whatsapp.replace(/[^0-9]/g, '');
    // Encode message
    const encodedMessage = encodeURIComponent(message);
    // Redirect to WhatsApp
    window.location.href = `https://wa.me/${cleanedPhone}?text=${encodedMessage}`;
    // Reset form
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  return (
    <div className="space-y-20 pb-20 bg-background">
      {/* Page Header */}
      <PageHeader
        title="Get In Touch"
        description="Have questions or need to book a service? We'd love to hear from you. Send us a message or call us directly!"
        image="/car-wash1.jpeg"
      />

      {/* Contact Info Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: <Phone className="w-6 h-6" />,
              title: 'Phone',
              content: company.phone,
              link: `tel:${company.phone}`,
            },
            {
              icon: <Mail className="w-6 h-6" />,
              title: 'Email',
              content: company.email,
              link: `mailto:${company.email}`,
            },
            {
              icon: <MapPin className="w-6 h-6" />,
              title: 'Location',
              content: company.location,
              link: '#map',
            },
            {
              icon: <Clock className="w-6 h-6" />,
              title: 'Hours',
              content: company.hours.weekday,
              link: '#',
            },
          ].map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              className="p-6 bg-card rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all text-center"
            >
              <div className="text-primary mb-3 flex justify-center">{item.icon}</div>
              <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.content}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Send us a Message</h2>



            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                    placeholder="+91-XXXXXXXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Service</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                  >
                    <option value="">Select a service</option>
                    <option value="engine-diagnostics">Engine Diagnostics</option>
                    <option value="brake-service">Brake Service</option>
                    <option value="oil-change">Oil Change</option>
                    <option value="battery-service">Battery Service</option>
                    <option value="air-filter">Air Filter Replacement</option>
                    <option value="transmission">Transmission Service</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary resize-none"
                  placeholder="Tell us about your vehicle and what service you need..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                Send Message
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Quick Contact Info</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg text-foreground mb-2">Business Hours</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    <span className="font-semibold text-foreground">Weekdays:</span> {company.hours.weekday}
                  </p>
                  
                  <p>
                    <span className="font-semibold text-foreground">Sunday:</span> {company.hours.sunday}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg text-foreground mb-2">Emergency Support</h3>
                <p className="text-muted-foreground">
                  Have a roadside emergency? Call our 24/7 hotline for immediate assistance.
                </p>
                <p className="text-primary font-bold mt-2 text-xl">{company.phone}</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-foreground mb-2">Connect With Us</h3>
                <p className="text-muted-foreground mb-2">Message us on WhatsApp for quick responses:</p>
                <a
                  href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition-colors"
                >
                  Start WhatsApp Chat
                </a>
              </div>

              <div className="bg-secondary p-6 rounded-xl border border-border">
                <h3 className="font-bold text-lg text-foreground mb-2">Service Area</h3>
                <p className="text-muted-foreground text-sm">
                  We serve the entire Indore region and nearby areas including Vijay Nagar, Bhawarkua, and Dewas Naka. Contact us to confirm service availability for your location.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - Integrated Google Maps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="map">
        <h2 className="text-3xl font-bold text-foreground mb-6">Visit Our Workshop</h2>
        <div className="w-full h-[450px] bg-secondary rounded-xl border border-border overflow-hidden shadow-lg relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1521.7900379506568!2d75.8837984930938!3d22.6890214028953!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcad1b410ddb%3A0x96ec4da356240f4!2sIndore%2C%20Madhya%20Pradesh!5e1!3m2!1sen!2sin!4v1770224588667!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="MyMechanic Auto Care Location Map"
          ></iframe>
          
          {/* Overlay to ensure map fits nicely in dark theme (optional, mainly for aesthetics) */}
          <div className="absolute inset-0 pointer-events-none border-2 border-primary/20 rounded-xl"></div>
        </div>
      </section>
    </div>
  );
}