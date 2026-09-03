import ContactContent from './contact-content/PageContent';

export const metadata = {
  title: 'Contact MyMechanic24 | Doorstep Car Repair & Washing in Indore | Nayta Mundla Garage',
  description: 'Contact MyMechanic24 for emergency breakdown assistance, doorstep car repair, computerized diagnostics, and home car wash in Indore. Central garage on Nayta Mundla Main Road, serving Palda, Tejaji Nagar, and nearby areas. Call +91 99778 23169.',
  keywords: [
    'contact MyMechanic24',
    'car repair nayta mundla main road',
    'doorstep car mechanic indore',
    'car wash at home palda indore',
    'emergency car repair tejaji nagar',
    'car mechanic phone number indore',
    '24 hours roadside assistance indore',
    'auto garage nayta mundla indore',
  ],
  alternates: {
    canonical: 'https://mymechanic24.vercel.app/contact',
  },
  openGraph: {
    title: 'Contact MyMechanic24 Auto Care Indore',
    description: 'Book doorstep car repair, home car washing, or schedule a workshop visit on Nayta Mundla Main Road, Indore. Quick assistance on WhatsApp and phone.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mymechanic24.vercel.app'}/contact`,
    type: 'website',
  },
};

export const revalidate = 3600;

export default function ContactPage() {
  return (
    <>
      <main className="min-h-screen">
        <ContactContent />
      </main>
    </>
  );
}