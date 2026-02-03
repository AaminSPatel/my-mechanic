import ServicesContent from './services-content/PageContent';
import { services } from '@/data/services';

export const metadata = {
  title: 'Our Services - ProDrive Auto Care',
  description: 'Complete auto repair and maintenance services in Indore. Engine diagnostics, brake service, oil changes, and more.',
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
