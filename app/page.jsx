import HomeContent from './home-content/PageContent';
import { services } from '@/data/services';
import { testimonials } from '@/data/testimonials';

export const metadata = {
  title: 'MyMechanic Auto Care - Premium Car Service in Indore',
  description: 'Expert auto repair and maintenance services in Indore. Professional mechanics, genuine parts, quick service.',
};

export const revalidate = 3600; // Revalidate every hour

export default function HomePage() {
  return (
    <>
      <main className="min-h-screen max-w-screen overflow-hidden">
        <HomeContent services={services} testimonials={testimonials} />
      </main>
    </>
  );
}
