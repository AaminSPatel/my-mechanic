import InvoiceContent from './InvoiceContent';

export const metadata = {
  title: 'Invoice Generator | MyMechanic Auto Care',
  description: 'Generate and download car service receipts as images. Professional invoice creator for auto garage services.',
  keywords: ['invoice generator', 'car service receipt', 'auto repair bill', 'download receipt'],
};

export default function InvoicePage() {
  return (
    <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <InvoiceContent />
    </main>
  );
}
