'use client';

import PageHeader from '@/components/PageHeader';
import { useSiteContext } from '@/context/SiteContext';

export default function PrivacyContent() {
  const {company} = useSiteContext()
  return (
    <div className="space-y-12 pb-20">
      {/* Page Header */}
      <PageHeader
        title="Privacy Policy"
        description="We take your privacy seriously. Learn how we collect and protect your information."
        image="/bmw-wash.jpeg"
      />

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Introduction</h2>
            <p className="text-muted-foreground mb-4">
              MyMechanic Auto Care (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the website. This page informs you of our
              policies regarding the collection, use, and disclosure of personal data when you use our Service and the
              choices you have associated with that data.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Information Collection and Use</h2>
            <p className="text-muted-foreground mb-4">
              We collect several different types of information for various purposes to provide and improve our Service
              to you.
            </p>
            <h3 className="font-bold text-foreground mt-4 mb-2">Types of Data Collected:</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Personal Data: Name, email address, phone number, vehicle information</li>
              <li>Usage Data: Pages visited, access times, referrer information</li>
              <li>Cookies and tracking technologies for site improvement</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Use of Data</h2>
            <p className="text-muted-foreground mb-4">MyMechanic Auto Care uses the collected data for various purposes:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To allow you to participate in interactive features of our Service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so that we can improve our Service</li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Security of Data</h2>
            <p className="text-muted-foreground mb-4">
              The security of your data is important to us, but remember that no method of transmission over the
              Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable
              means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the &quot;Last updated&quot; date at the top of this Privacy Policy.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p>
                <span className="font-semibold text-foreground">Email:</span>{' '}
              <a href={`mailto:${company?.email}`} className="text-primary hover:text-red-700">
                {company?.email}
              </a>
              </p>
              <p>
                <span className="font-semibold text-foreground">Phone:</span>{' '}
                <a href={`tel:${company?.phone}`} className="text-primary hover:text-red-700">
                {company?.phone}
              </a>
              </p>
              <p>
                <span className="font-semibold text-foreground">Location:</span> Indore, Madhya Pradesh
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Your Rights</h2>
            <p className="text-muted-foreground mb-4">
              Depending on your location, you may have certain rights regarding your personal data, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>The right to access your personal data</li>
              <li>The right to correct inaccurate personal data</li>
              <li>The right to request deletion of your personal data</li>
              <li>The right to restrict processing of your personal data</li>
              <li>The right to withdraw consent at any time</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              To exercise any of these rights, please contact us using the information provided above.
            </p>
          </div>

          <div className="bg-secondary p-6 rounded-lg border border-border">
            <h3 className="font-bold text-foreground mb-2">Cookie Policy</h3>
            <p className="text-muted-foreground">
              Our website uses cookies to enhance your browsing experience. By continuing to use our website, you
              consent to our use of cookies. You can disable cookies in your browser settings if you prefer.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
