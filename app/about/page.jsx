import AboutContent from './about-content/PageContent';
import { team } from '@/data/team';

export const metadata = {
  title: 'About ProDrive Auto Care - Your Trusted Auto Repair Partner',
  description: 'Learn about ProDrive Auto Care, our mission, team of expert mechanics, and commitment to quality service in Indore.',
};

export const revalidate = 3600;

export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen">
        <AboutContent team={team} />
      </main>
    </>
  );
}
