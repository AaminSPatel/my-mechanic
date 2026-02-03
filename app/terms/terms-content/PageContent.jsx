'use client';

import PageHeader from '@/components/PageHeader';

export default function TermsContent() {
  return (
    <div className="space-y-12 pb-20">
      {/* Page Header */}
      <PageHeader
        title="Terms & Conditions"
        description="Please read these terms carefully before using our services."
        image="/placeholder.svg?height=400&width=1200&text=Terms"
      />

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Agreement to Terms</h2>
            <p className="text-muted-foreground mb-4">
              By accessing and using this website and our services, you accept and agree to be bound by the terms and
              provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Use License</h2>
            <p className="text-muted-foreground mb-4">
              Permission is granted to temporarily download one copy of the materials (information or software) on
              ProDrive Auto Care&apos;s website for personal, non-commercial transitory viewing only. This is the grant of
              a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose or for any public display</li>
              <li>Attempting to decompile or reverse engineer any software contained on the website</li>
              <li>Removing any copyright or other proprietary notations from the materials</li>
              <li>Transferring the materials to another person or &quot;mirroring&quot; the materials on any other server</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Disclaimer</h2>
            <p className="text-muted-foreground mb-4">
              The materials on ProDrive Auto Care&apos;s website are provided on an &apos;as is&apos; basis. ProDrive Auto Care makes
              no warranties, expressed or implied, and hereby disclaims and negates all other warranties including,
              without limitation, implied warranties or conditions of merchantability, fitness for a particular
              purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Limitations</h2>
            <p className="text-muted-foreground mb-4">
              In no event shall ProDrive Auto Care or its suppliers be liable for any damages (including, without
              limitation, damages for loss of data or profit, or due to business interruption) arising out of the use
              or inability to use the materials on ProDrive Auto Care&apos;s website, even if ProDrive Auto Care or an
              authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Accuracy of Materials</h2>
            <p className="text-muted-foreground mb-4">
              The materials appearing on ProDrive Auto Care&apos;s website could include technical, typographical, or
              photographic errors. ProDrive Auto Care does not warrant that any of the materials on its website are
              accurate, complete, or current. ProDrive Auto Care may make changes to the materials contained on its
              website at any time without notice.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Links</h2>
            <p className="text-muted-foreground mb-4">
              ProDrive Auto Care has not reviewed all of the sites linked to its website and is not responsible for the
              contents of any such linked site. The inclusion of any link does not imply endorsement by ProDrive Auto
              Care of the site. Use of any such linked website is at the user&apos;s own risk.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Modifications</h2>
            <p className="text-muted-foreground mb-4">
              ProDrive Auto Care may revise these terms of service for its website at any time without notice. By using
              this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">8. Governing Law</h2>
            <p className="text-muted-foreground mb-4">
              These terms and conditions are governed by and construed in accordance with the laws of Madhya Pradesh,
              India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </div>

          <div className="bg-secondary p-6 rounded-lg border border-border">
            <h3 className="font-bold text-foreground mb-2">Have Questions?</h3>
            <p className="text-muted-foreground">
              If you have any questions about these terms and conditions, please contact us at{' '}
              <a href="mailto:info@prodriveautocare.com" className="text-primary hover:text-red-700">
                info@prodriveautocare.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
