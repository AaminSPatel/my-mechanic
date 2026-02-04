import ContactContent from './contact-content/PageContent';

export const metadata = {
  title: 'Contact MyMechanic | Car Garage Location & Phone Number',
  description: 'Need a mechanic in Indore? Call +91 99778 23169 for 24/7 emergency breakdown support. Visit our workshop near Vijay Nagar Square.',
  keywords: ['car mechanic phone number indore', '24 hours car repair indore', 'car workshop location', 'emergency car breakdown service'],
  alternates: {
    canonical: 'https://my-mechanic-iota.vercel.app/contact',
  },
  openGraph: {
    title: 'Contact MyMechanic Auto Care',
    description: 'Get directions to our workshop or book an appointment via WhatsApp.',
    url: 'https://my-mechanic-iota.vercel.app/contact',
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