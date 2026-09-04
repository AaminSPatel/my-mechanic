import InvoiceContent from '../invoice/InvoiceContent';

export const metadata = {
  title: 'Service Bill Generator | MyMechanic24 Auto Care Indore',
  description:
    'Generate, download, and print official car repair & doorstep washing retail service bills, job sheets, and cash memos for MyMechanic24 customers.',
  keywords: [
    'car service bill generator',
    'auto repair cash memo indore',
    'car repair bill download',
    'mymechanic service bill',
  ],
};

export default function BillPage() {
  return (
    <main className="min-h-screen bg-background py-8">
      <InvoiceContent />
    </main>
  );
}

