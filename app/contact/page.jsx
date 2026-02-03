import ContactContent from './contact-content/PageContent';

export const metadata = {
  title: 'Contact ProDrive Auto Care - Get in Touch',
  description: 'Contact ProDrive Auto Care in Indore for auto repair services. Call, email, or visit our location.',
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
