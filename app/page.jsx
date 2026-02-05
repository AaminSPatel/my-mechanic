import HomeContent from './home-content/PageContent';
import { services } from '@/data/services';
import { testimonials } from '@/data/testimonials';

export const metadata = {
  title: 'MyMechanic | Doorstep Car Repair & Service in Indore | Vijay Nagar Workshop',
  description: 'Top-rated car mechanic in Indore offering affordable servicing, denting-painting, 24/7 breakdown support, and doorstep car care services. Visit our workshop in Vijay Nagar or book doorstep service today.',
  keywords: ['car repair indore', 'car mechanic near me', 'auto garage vijay nagar', 'car service center indore', 'doorstep car service indore', 'car wash at home indore', 'mobile car mechanic indore', 'MyMechanic auto care'],
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
  },
  openGraph: {
    title: 'MyMechanic | Doorstep Car Service & Repair in Indore',
    description: 'Expert mechanics, genuine parts, transparent pricing, and convenient doorstep services. Book your car service or repair at home today!',
    url: ' https://mymechanic24.vercel.app',
    siteName: 'MyMechanic Auto Care',
    images: [
      {
        url: '/car4.jpg', // Ensure this image exists in public folder
        width: 1200,
        height: 630,
        alt: 'MyMechanic Doorstep Car Service Indore',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <main className="min-h-screen max-w-screen overflow-hidden">
        <HomeContent services={services} testimonials={testimonials} />
      </main>
    </>
  );
}