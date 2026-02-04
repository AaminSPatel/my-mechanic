import ServicesContent from './services-content/PageContent';
import { services } from '@/data/services';

export const metadata = {
  title: 'Car Repair Services & Washing Rates in Indore | MyMechanic',
  description: 'Check our affordable car service packages starting @ ₹299. We offer Oil Change, AC Repair, Foam Wash, and Engine Diagnostics in Indore.',
  keywords: ['car washing charges indore', 'car ac repair vijay nagar', 'engine oil change price', 'car dry cleaning indore', 'wheel alignment indore'],
  alternates: {
    canonical: 'https://my-mechanic-iota.vercel.app/services',
  },
  openGraph: {
    title: 'Car Service Menu & Rates | MyMechanic Indore',
    description: 'Full range of auto repair services: Denting, Painting, General Service & more.',
    url: 'https://my-mechanic-iota.vercel.app/services',
    type: 'website',
  },
};

export const revalidate = 3600;

export default function ServicesPage() {
  return (
    <>
      <main className="min-h-screen">
        <ServicesContent services={services} />
      </main>
    </>
  );
}