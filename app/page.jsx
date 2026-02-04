import HomeContent from './home-content/PageContent';
import { services } from '@/data/services';
import { testimonials } from '@/data/testimonials';

export const metadata = {
  title: 'MyMechanic | Best Car Repair Service in Indore & Vijay Nagar',
  description: 'Top-rated car mechanic in Indore offering affordable servicing, denting-painting, and 24/7 breakdown support. Visit our workshop in Vijay Nagar today.',
  keywords: ['car repair indore', 'car mechanic near me', 'auto garage vijay nagar', 'car service center indore', 'MyMechanic auto care'],
  alternates: {
    canonical: 'https://my-mechanic-iota.vercel.app',
  },
  openGraph: {
    title: 'MyMechanic | #1 Car Service Center in Indore',
    description: 'Expert mechanics, genuine parts, and transparent pricing. Book your car service today!',
    url: 'https://my-mechanic-iota.vercel.app',
    siteName: 'MyMechanic Auto Care',
    images: [
      {
        url: '/car4.jpg', // Ensure this image exists in public folder
        width: 1200,
        height: 630,
        alt: 'MyMechanic Car Workshop Indore',
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