'use client';

import PageHeader from '@/components/PageHeader';
import { useSiteContext } from '@/context/SiteContext';
import { COMPANY } from '@/lib/constants';

export default function TermsContent() {
  const { company } = useSiteContext();

  return (
    <div className="space-y-12 pb-20">
      {/* Page Header */}
      <PageHeader
        title="Terms & Conditions"
        description="Transparent service policies, genuine parts warranty, and customer rights at MyMechanic24 Auto Care."
        image="/car-wash.jpeg"
      />

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Agreement to Terms</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              By booking an appointment, scheduling a doorstep mobile visit, or utilizing garage facilities operated by{' '}
              <strong>MyMechanic24 Auto Care</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Digital Estimates &amp; Pre-Approval</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              We operate on a strict zero-surprise billing policy:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 text-sm leading-relaxed">
              <li>A digital job card and estimated quotation are generated following the initial multi-point vehicle inspection.</li>
              <li>No mechanical work or parts replacement begins without explicit customer approval via WhatsApp, phone, or written confirmation.</li>
              <li>Any newly discovered defects during disassembly are documented with high-definition photos or video proof before supplemental work commences.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Spare Parts &amp; Workmanship Warranty</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              MyMechanic24 Auto Care stands behind every wrench turned:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 text-sm leading-relaxed">
              <li><strong>100% Genuine OEM/OES Parts:</strong> All replacement components are sourced from authorized original equipment manufacturers and carry official manufacturer warranties.</li>
              <li><strong>Labor Warranty:</strong> All general mechanical repairs carry a 30-day or 1,000 km workmanship warranty (whichever comes first). Major engine and transmission overhauls carry up to 90 days or 5,000 km warranty.</li>
              <li><strong>Old Parts Return:</strong> All replaced worn parts are packaged and returned to the customer upon delivery for verification.</li>
              <li><strong>Exclusions:</strong> Warranty does not cover normal wear-and-tear items (wiper blades, clutch burnout due to aggressive driving, puncture damage), or vehicles subjected to racing or water immersion.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Doorstep Service Protocol</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              For on-site car repairs and snow foam washing in Indore:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 text-sm leading-relaxed">
              <li>Our mobile service van arrives equipped with an independent power generator, high-pressure water system, and specialized tools.</li>
              <li>The vehicle owner must provide safe, legal parking access (driveway, society parking bay, or designated roadside area).</li>
              <li>Repairs that require vehicle hoists (such as heavy suspension pressing, clutch gearbox drops, or engine lowering) cannot be completed at doorstep and will be routed to our central workshop on Nayta Mundla Main Road.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Payments &amp; Invoicing</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Payments are due upon completion of the service and customer satisfaction check. We accept UPI (Google Pay, PhonePe, Paytm), Net Banking, Debit/Credit Cards, and Cash. A formal digital invoice is provided for every completed service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Limitation of Liability</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              MyMechanic24 Auto Care takes utmost care with customer vehicles. However, we are not responsible for pre-existing internal fractures, electronic module failures caused by prior third-party tampering, or valuable personal items left unattended inside the passenger cabin. Customers are requested to remove valuables before service handover.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Governing Law &amp; Jurisdiction</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of Madhya Pradesh, India. Any disputes arising in connection with our services shall be subject to the exclusive jurisdiction of the courts in Indore, MP.
            </p>
          </div>

          <div className="bg-secondary p-6 rounded-2xl border border-border">
            <h3 className="font-bold text-foreground mb-2">Have Questions About Our Service Agreement?</h3>
            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
              Our customer care desk is available daily from 8:00 AM to 8:00 PM.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>
                <strong className="text-foreground">Workshop Address:</strong> Nayta Mundla Main Road, Near Palda &amp; Tejaji Nagar, Indore, MP 452020
              </p>
              <p>
                <strong className="text-foreground">Email:</strong>{' '}
                <a href={`mailto:${company?.email || 'mymechanic.in@gmail.com'}`} className="text-primary hover:underline">
                  {company?.email || 'mymechanic.in@gmail.com'}
                </a>
              </p>
              <p>
                <strong className="text-foreground">Direct Hotline:</strong>{' '}
                <a href={`tel:${company?.phoneRaw || '+919977823169'}`} className="text-primary hover:underline">
                  {company?.phone || '+91 99778 23169'}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
