import InvoiceContent from './InvoiceContent';

export const metadata = {
  title: 'Service Bill Generator | MyMechanic24 Auto Care',
  description:
    'Generate, download, and print official car service receipts, job sheets, and cash bills. Professional service bill creator for MyMechanic24 Indore.',
  keywords: ['service bill generator', 'car repair bill', 'car service cash memo', 'download receipt'],
};

export default function InvoicePage() {
  return (
    <main className="min-h-screen bg-background py-8">
      <InvoiceContent />
    </main>
  );
}
