'use client';

import { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { Inter } from 'next/font/google';
import {
  Download,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Wrench,
  CreditCard,
  Car,
  User,
  FileText,
  Eye,
} from 'lucide-react';

// Embedded, self-hosted font — this is what fixes the mobile-vs-PC mismatch.
// "Arial" isn't installed on Android, so mobile browsers silently fall back to
// Roboto/Noto Sans, which has different letter widths and breaks the table
// layout during capture. Inter is bundled by Next.js and renders 100%
// identically on every device.
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const QUICK_SERVICES = [
  'Periodic Car Maintenance & Inspection',
  'Engine Oil & Filter Replacement',
  'Doorstep High-Pressure Foam Wash',
  'Brake Pad Cleaning & Inspection',
  'Computerized OBD-II Diagnostics Scan',
  'Car AC Gas Refill & Cooling Service',
  'Battery Jumpstart & Health Test',
  'Wheel Alignment & Balancing',
  'Suspension & Steering Overhaul',
  'Clutch & Transmission Repair',
];

// ---- Strict 3-color palette used across the ENTIRE bill (no red, no green) ----
const INK = '#111111'; // all text + borders
const PAPER = '#ffffff'; // background
const ACCENT = '#1D3557'; // single navy accent — change this one value for a different brand color

export default function InvoiceContent() {
  const [billNumber, setBillNumber] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  const [brand, setBrand] = useState('');
  const [carModel, setCarModel] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [odometer, setOdometer] = useState('');
  const [fuelType, setFuelType] = useState('Petrol');
  const [serviceType, setServiceType] = useState('Doorstep Service');

  const [items, setItems] = useState([
    { id: 1, description: '', qty: 1, rate: '', amount: 0 },
  ]);

  const [discount, setDiscount] = useState('');
  const [totalPaid, setTotalPaid] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [mechanicName, setMechanicName] = useState('Salman Patel');

  const [downloading, setDownloading] = useState(false);
  const [emailStatus, setEmailStatus] = useState('');

  const previewRef = useRef(null);

  useEffect(() => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const currentTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const generatedBillNo = `MM24-BILL-${today.replace(/-/g, '')}-${randomSuffix}`;

    setDate(today);
    setTime(currentTime);
    setBillNumber(generatedBillNo);
  }, []);

  const subtotal = items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const discNum = Number(discount) || 0;
  const finalTotal = Math.max(0, subtotal - discNum);
  const paidNum = totalPaid === '' ? 0 : Number(totalPaid) || 0;
  const balanceDue = Math.max(0, finalTotal - paidNum);

  const handleItemChange = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: value };
        if (field === 'qty' || field === 'rate') {
          const qty = Number(field === 'qty' ? value : item.qty) || 0;
          const rateVal = field === 'rate' ? value : item.rate;
          const rate = rateVal === '' ? 0 : Number(rateVal) || 0;
          updated.amount = qty * rate;
        }
        return updated;
      })
    );
  };

  const addItem = () => {
    const nextId = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    setItems((prev) => [...prev, { id: nextId, description: '', qty: 1, rate: '', amount: 0 }]);
  };

  const addQuickService = (serviceName) => {
    const nextId = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    setItems((prev) => [...prev, { id: nextId, description: serviceName, qty: 1, rate: '', amount: 0 }]);
  };

  const removeItem = (id) => {
    if (items.length === 1) {
      setItems([{ id: 1, description: '', qty: 1, rate: '', amount: 0 }]);
      return;
    }
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const company = {
    name: 'MyMechanic24 Auto Care',
    tagline: 'Doorstep Car Service & Central Multi-Brand Workshop',
    address: 'Nayta Mundla Main Road, Near Palda & Tejaji Nagar, Indore, MP 452020',
    phone: '+91 99778 23169',
    email: 'mymechanic.in@gmail.com',
  };

  const handleDownload = async () => {
    const node = previewRef.current;
    if (!node || downloading) return;
    setDownloading(true);
    setEmailStatus('sending');

    // Store original styles to restore in <1 second
    const originalWidth = node.style.width;
    const originalMinWidth = node.style.minWidth;
    const originalMaxWidth = node.style.maxWidth;
    const originalHeight = node.style.height;
    const originalMinHeight = node.style.minHeight;
    const originalMaxHeight = node.style.maxHeight;
    const originalFlexShrink = node.style.flexShrink;
    const originalTransform = node.style.transform;

    try {
      // 1. Wait for web font (Inter) to be ready
      if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }

      // 2. Enforce exact standard A4 dimensions (794px × 1123px at 96 DPI, 1:1.414 aspect ratio)
      const A4_WIDTH = 794;
      const A4_HEIGHT = 1123;

      node.style.width = `${A4_WIDTH}px`;
      node.style.minWidth = `${A4_WIDTH}px`;
      node.style.maxWidth = `${A4_WIDTH}px`;
      node.style.minHeight = `${A4_HEIGHT}px`;
      node.style.flexShrink = '0';

      // Small tick to allow browser layout engine to paint A4 geometry
      await new Promise((resolve) => setTimeout(resolve, 60));

      const captureHeight = Math.max(A4_HEIGHT, node.scrollHeight || 0);

      // 3. Capture image with html-to-image toPng
      const dataUrl = await toPng(node, {
        width: A4_WIDTH,
        height: captureHeight,
        pixelRatio: 2,
        backgroundColor: PAPER,
        cacheBust: true,
        style: {
          width: `${A4_WIDTH}px`,
          minWidth: `${A4_WIDTH}px`,
          maxWidth: `${A4_WIDTH}px`,
          minHeight: `${A4_HEIGHT}px`,
          flexShrink: '0',
          margin: '0 auto',
        },
      });

      const link = document.createElement('a');
      link.download = `${(customerName || 'Customer').replace(/\s+/g, '_')}_Bill_${billNumber}.png`;
      link.href = dataUrl;
      link.click();

      try {
        const res = await fetch('/api/invoice', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            billNumber,
            customerName,
            mobileNumber,
            customerAddress,
            brand,
            carModel,
            vehicleNumber,
            odometer,
            serviceName:
              items
                .filter((i) => i.description)
                .map((i) => `${i.description} (x${i.qty || 1}${i.rate ? ' @ ₹' + i.rate : ''})`)
                .join(', ') || 'Car Repair & Service',
            charge: subtotal,
            discount: discNum,
            totalPayment: paidNum,
            balancePayment: balanceDue,
            paymentMethod,
            date,
            invoiceImage: dataUrl,
          }),
        });
        setEmailStatus(res.ok ? 'sent' : 'error');
      } catch (apiErr) {
        console.error('Bill email dispatch failed:', apiErr);
        setEmailStatus('error');
      }
    } catch (err) {
      console.error('Download failed', err);
      setEmailStatus('error');
    } finally {
      // 4. Immediately revert back to original styles (<1 second)
      node.style.width = originalWidth;
      node.style.minWidth = originalMinWidth;
      node.style.maxWidth = originalMaxWidth;
      node.style.height = originalHeight;
      node.style.minHeight = originalMinHeight;
      node.style.maxHeight = originalMaxHeight;
      node.style.flexShrink = originalFlexShrink;
      node.style.transform = originalTransform;
      setDownloading(false);
    }
  };

  const minRows = Math.max(6, items.length);
  const emptyRowsCount = minRows - items.length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans space-y-12">
      {/* Header */}
      <header className="text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider mb-2">
          <FileText size={14} /> Official Garage A4 Billing System
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground tracking-tight">
          MyMechanic24 A4 Service Bill Generator
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-2xl mx-auto leading-relaxed">
          Enter job details and prices below. On clicking &quot;Download Bill&quot;, an authentic A4 bill image downloads instantly — identical on mobile and PC — and an official copy is sent to the admin email.
        </p>
      </header>

      {/* Form Section */}
      <div className="bg-card rounded-3xl border border-border p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="text-base font-black uppercase tracking-wider text-primary flex items-center gap-2">
            <Wrench size={18} /> Enter Bill Details &amp; Services
          </h2>
          <span className="text-xs text-muted-foreground font-medium">All prices custom entered</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-muted-foreground mb-1">Bill Number</label>
            <input
              type="text"
              value={billNumber}
              onChange={(e) => setBillNumber(e.target.value)}
              className="w-full bg-secondary/80 border border-border rounded-xl px-3 py-2 text-xs text-foreground font-mono focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-muted-foreground mb-1">Bill Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-secondary/80 border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-muted-foreground mb-1">Time</label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g. 02:30 PM"
              className="w-full bg-secondary/80 border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-border">
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <User size={14} className="text-primary" /> Customer Information
            </h3>
            <div className="space-y-2.5">
              <div>
                <label className="block text-[11px] font-bold text-muted-foreground mb-1">Customer Full Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-secondary/80 border border-border rounded-xl px-3.5 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-muted-foreground mb-1">Mobile Number</label>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="e.g. 9977823169"
                  className="w-full bg-secondary/80 border border-border rounded-xl px-3.5 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-muted-foreground mb-1">Address / Location in Indore</label>
                <input
                  type="text"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="e.g. Scheme No 140 / Palda, Tejaji Nagar"
                  className="w-full bg-secondary/80 border border-border rounded-xl px-3.5 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Car size={14} className="text-primary" /> Vehicle Information
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold text-muted-foreground mb-1">Brand</label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="e.g. Maruti Suzuki"
                  className="w-full bg-secondary/80 border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-muted-foreground mb-1">Car Model</label>
                <input
                  type="text"
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                  placeholder="e.g. Swift VXI"
                  className="w-full bg-secondary/80 border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-muted-foreground mb-1">Registration No.</label>
                <input
                  type="text"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                  placeholder="e.g. MP-09-CB-1234"
                  className="w-full bg-secondary/80 border border-border rounded-xl px-3 py-2 text-xs text-foreground font-mono uppercase focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-muted-foreground mb-1">Odometer (KM)</label>
                <input
                  type="text"
                  value={odometer}
                  onChange={(e) => setOdometer(e.target.value)}
                  placeholder="e.g. 45000 KM"
                  className="w-full bg-secondary/80 border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-muted-foreground mb-1">Fuel Type</label>
                <select
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value)}
                  className="w-full bg-secondary/80 border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                >
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="CNG">CNG</option>
                  <option value="Electric (EV)">Electric (EV)</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-muted-foreground mb-1">Service Type</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full bg-secondary/80 border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                >
                  <option value="Doorstep Service">Doorstep Service (At Home)</option>
                  <option value="Central Garage Visit">Central Workshop (Nayta Mundla)</option>
                  <option value="Emergency Breakdown">24/7 Roadside Assistance</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between pb-2 mb-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Wrench size={14} className="text-primary" /> Particulars / Jobs &amp; Spare Parts
            </h3>
            <button
              type="button"
              onClick={addItem}
              className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline cursor-pointer"
            >
              <Plus size={14} /> Add Row
            </button>
          </div>

          <div className="mb-3">
            <span className="text-[11px] font-bold text-muted-foreground block mb-1">Quick Add Service (Click to add name, price remains empty):</span>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_SERVICES.map((service, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => addQuickService(service)}
                  className="text-[11px] bg-secondary hover:bg-primary hover:text-white px-2 py-2 rounded-lg border border-border transition-colors cursor-pointer"
                >
                  + {service}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {items.map((item, index) => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center gap-2 bg-secondary/40 px-2 py-2.5 rounded-xl border border-border/70">
                <div className="flex items-center gap-2 flex-1 w-full">
                  <span className="text-xs font-bold text-muted-foreground w-5 text-center shrink-0">
                    #{index + 1}
                  </span>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                      placeholder="Job / Spare Part Description"
                      className="w-full bg-background border border-border rounded-lg px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div className="w-16 shrink-0">
                    <input
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={(e) => handleItemChange(item.id, 'qty', e.target.value)}
                      placeholder="Qty"
                      title="Quantity"
                      className="w-full bg-background border border-border rounded-lg px-2 py-1.5 text-xs text-center text-foreground focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div className="w-20 shrink-0">
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) => handleItemChange(item.id, 'rate', e.target.value)}
                      placeholder="Rate ₹"
                      title="Rate (₹)"
                      className="w-full bg-background border border-border rounded-lg px-2.5 py-1.5 text-xs text-right font-mono text-foreground focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-20 shrink-0 text-right font-bold text-xs font-mono text-primary px-1">
                    ₹{item.amount || 0}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-muted-foreground hover:text-red-500 p-1 shrink-0 cursor-pointer"
                    title="Delete row"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addItem}
            className="mt-3 w-full py-2 border border-dashed border-primary/40 text-primary hover:bg-primary/5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Plus size={14} /> Add Another Service or Part Row
          </button>
        </div>

        <div className="pt-2 border-t border-border">
          <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
            <CreditCard size={14} className="text-primary" /> Payment &amp; Settlement Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-muted-foreground mb-1">Discount (₹)</label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="0"
                className="w-full bg-secondary/80 border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-muted-foreground mb-1">Amount Paid (₹)</label>
              <input
                type="number"
                value={totalPaid}
                onChange={(e) => setTotalPaid(e.target.value)}
                placeholder="₹"
                className="w-full bg-secondary/80 border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none font-mono font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-muted-foreground mb-1">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full bg-secondary/80 border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
              >
                <option value="Cash">Cash</option>
                <option value="UPI (GooglePay / PhonePe)">UPI / QR Scan</option>
                <option value="Debit / Credit Card">Debit / Credit Card</option>
                <option value="Net Banking">Net Banking</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-muted-foreground mb-1">Balance Due</label>
              <div className={`w-full border rounded-xl px-3 py-2 text-xs font-bold font-mono ${balanceDue > 0 ? 'bg-red-50 text-red-600 border-red-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'}`}>
                ₹{balanceDue} {balanceDue === 0 && '· NIL'}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="w-full bg-primary hover:bg-primary/95 text-white py-4 px-6 rounded-2xl text-sm font-black uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-75"
          >
            <Download size={20} />
            {downloading ? 'Exporting A4 Bill & Sending Email to Admin...' : 'Download Bill (PNG)'}
          </button>
          <p className="text-xs text-muted-foreground text-center mt-2">
            * On clicking &quot;Download Bill&quot;, the official A4-size bill image is saved to your device and automatically dispatched to the admin email.
          </p>
        </div>

        {emailStatus === 'sent' && (
          <div className="p-3.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span>A4 Bill downloaded &amp; digital copy successfully emailed to admin!</span>
          </div>
        )}
        {emailStatus === 'error' && (
          <div className="p-3.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle size={16} className="text-amber-600 shrink-0" />
            <span>Bill downloaded to device. (Email copy could not be dispatched; check SMTP credentials).</span>
          </div>
        )}
      </div>

      {/* Live A4 Bill Preview */}
      <div className="flex flex-col items-center justify-center w-full pt-4">
        <div className="w-full flex items-center justify-between mb-3 max-w-[794px] px-1">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Eye size={16} className="text-primary" /> Live A4 Sheet Preview (Centered &bull; 794 × 1123 px)
          </p>
          <span className="text-[11px] font-bold text-slate-800 bg-slate-100 px-3 py-1 border border-slate-300">
            A4 Standard &bull; No Signature
          </span>
        </div>

        <div className="w-full overflow-x-auto pb-8 flex justify-start sm:justify-center">
          <div
            ref={previewRef}
            id="printable-bill"
            className={`${inter.className} relative flex flex-col justify-between shrink-0`}
            style={{
              width: '794px',
              minWidth: '794px',
              maxWidth: '794px',
              minHeight: '1123px',
              flexShrink: 0,
              margin: '0 auto',
              backgroundColor: PAPER,
              color: INK,
              padding: '36px',
              border: `2px solid ${INK}`,
              boxSizing: 'border-box',
              WebkitTextSizeAdjust: '100%',
              textSizeAdjust: '100%',
              WebkitFontSmoothing: 'antialiased',
              textRendering: 'optimizeLegibility',
            }}
          >
            <div>
              {/* Header */}
              <table style={{ width: '100%', borderCollapse: 'collapse', border: `2px solid ${INK}`, backgroundColor: PAPER }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '18px', textAlign: 'center', borderBottom: `2px solid ${INK}` }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '6px' }}>
                        <img src="/logo.jpeg" alt="MyMechanic24 Logo" style={{ height: '42px', width: 'auto', objectFit: 'contain' }} />
                        <h1 style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '1px', color: INK, textTransform: 'uppercase', margin: 0 }}>
                          MyMechanic24 Auto Care
                        </h1>
                      </div>
                      <p style={{ fontSize: '12px', fontWeight: 700, color: INK, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '3px 0 0 0' }}>
                        {company.tagline}
                      </p>
                      <p style={{ fontSize: '11px', color: '#444444', margin: '3px 0 0 0' }}>{company.address}</p>
                      <p style={{ fontSize: '11.5px', fontWeight: 700, color: INK, margin: '4px 0 0 0' }}>
                        Phone / WhatsApp: +91 99778 23169 &bull; Email: mymechanic.in@gmail.com
                      </p>
                      <div
                        style={{
                          marginTop: '10px',
                          display: 'inline-block',
                          border: `1px solid ${ACCENT}`,
                          backgroundColor: ACCENT,
                          color: PAPER,
                          fontSize: '12px',
                          fontWeight: 900,
                          textTransform: 'uppercase',
                          letterSpacing: '1.5px',
                          padding: '5px 26px',
                        }}
                      >
                        Retail Service Cash Bill
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Meta strip */}
              <table style={{ width: '100%', borderCollapse: 'collapse', borderLeft: `2px solid ${INK}`, borderRight: `2px solid ${INK}`, borderBottom: `2px solid ${INK}`, fontSize: '12px' }}>
                <tbody>
                  <tr style={{ backgroundColor: '#fafafa' }}>
                    <td style={{ padding: '9px 14px', borderRight: `2px solid ${INK}`, width: '50%' }}>
                      <span style={{ fontWeight: 600, color: '#555555' }}>Bill Number:</span>{' '}
                      <strong style={{ fontFamily: 'monospace', color: INK, fontSize: '13px' }}>{billNumber || 'MM24-BILL-0001'}</strong>
                    </td>
                    <td style={{ padding: '9px 14px', width: '50%', textAlign: 'right' }}>
                      <span style={{ fontWeight: 600, color: '#555555' }}>Date &amp; Time:</span>{' '}
                      <strong style={{ color: INK, fontSize: '13px' }}>{date} {time}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Customer & Vehicle */}
              <table style={{ width: '100%', borderCollapse: 'collapse', borderLeft: `2px solid ${INK}`, borderRight: `2px solid ${INK}`, borderBottom: `2px solid ${INK}`, fontSize: '12px' }}>
                <thead>
                  <tr style={{ backgroundColor: ACCENT, color: PAPER, fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>
                    <th style={{ padding: '9px 14px', borderRight: `1px solid ${PAPER}`, width: '50%', textAlign: 'left' }}>Customer Information</th>
                    <th style={{ padding: '9px 14px', width: '50%', textAlign: 'left' }}>Vehicle Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <td style={{ padding: '11px 14px', borderRight: `2px solid ${INK}`, verticalAlign: 'top' }}>
                      <span style={{ color: '#555555', display: 'block', fontSize: '10.5px' }}>Customer Name:</span>
                      <strong style={{ fontSize: '13px', color: INK }}>{customerName || 'Walk-in Customer'}</strong>
                    </td>
                    <td style={{ padding: '11px 14px', verticalAlign: 'top' }}>
                      <span style={{ color: '#555555', display: 'block', fontSize: '10.5px' }}>Vehicle / Model:</span>
                      <strong style={{ fontSize: '13px', color: INK }}>{brand || 'Vehicle'} {carModel || ''} ({fuelType})</strong>
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <td style={{ padding: '11px 14px', borderRight: `2px solid ${INK}`, verticalAlign: 'top' }}>
                      <span style={{ color: '#555555', display: 'block', fontSize: '10.5px' }}>Contact Mobile:</span>
                      <strong style={{ fontSize: '12.5px', color: INK }}>{mobileNumber || '+91 99778 23169'}</strong>
                    </td>
                    <td style={{ padding: '11px 14px', verticalAlign: 'top' }}>
                      <span style={{ color: '#555555', display: 'block', fontSize: '10.5px' }}>Registration Number:</span>
                      <strong style={{ fontFamily: 'monospace', textTransform: 'uppercase', fontSize: '13px', color: INK }}>{vehicleNumber || 'MP-09-XX-0000'}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '11px 14px', borderRight: `2px solid ${INK}`, verticalAlign: 'top' }}>
                      <span style={{ color: '#555555', display: 'block', fontSize: '10.5px' }}>Service Location / Address:</span>
                      <span style={{ color: INK, fontSize: '12px' }}>{customerAddress || 'Indore, Madhya Pradesh'}</span>
                    </td>
                    <td style={{ padding: '11px 14px', verticalAlign: 'top' }}>
                      <span style={{ color: '#555555', display: 'block', fontSize: '10.5px' }}>Odometer Reading &amp; Job Type:</span>
                      <span style={{ color: INK, fontWeight: 500, fontSize: '12px' }}>{odometer ? `${odometer} KM` : 'N/A'} &bull; {serviceType} ({mechanicName})</span>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Items + totals */}
              <table style={{ width: '100%', borderCollapse: 'collapse', borderLeft: `2px solid ${INK}`, borderRight: `2px solid ${INK}`, borderBottom: `2px solid ${INK}`, fontSize: '12px' }}>
                <thead>
                  <tr style={{ backgroundColor: ACCENT, color: PAPER, fontSize: '11px', textTransform: 'uppercase', fontWeight: 700, textAlign: 'center', letterSpacing: '0.5px' }}>
                    <th style={{ padding: '10px 8px', borderRight: `1px solid ${PAPER}`, width: '45px' }}>S.N.</th>
                    <th style={{ padding: '10px 12px', borderRight: `1px solid ${PAPER}`, textAlign: 'left' }}>Description of Services &amp; Spare Parts</th>
                    <th style={{ padding: '10px 8px', borderRight: `1px solid ${PAPER}`, width: '55px' }}>Qty</th>
                    <th style={{ padding: '10px 10px', borderRight: `1px solid ${PAPER}`, width: '95px', textAlign: 'right' }}>Rate (₹)</th>
                    <th style={{ padding: '10px 12px', width: '115px', textAlign: 'right' }}>Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #e5e5e5' }}>
                      <td style={{ padding: '10px 8px', borderRight: `1px solid ${INK}`, textAlign: 'center', fontFamily: 'monospace', fontSize: '11px', color: '#555555' }}>
                        {idx + 1}
                      </td>
                      <td style={{ padding: '10px 12px', borderRight: `1px solid ${INK}`, fontWeight: 500, color: INK }}>
                        {item.description || 'Car Repair / Service'}
                      </td>
                      <td style={{ padding: '10px 8px', borderRight: `1px solid ${INK}`, textAlign: 'center', fontFamily: 'monospace', color: INK }}>
                        {item.qty || 1}
                      </td>
                      <td style={{ padding: '10px 10px', borderRight: `1px solid ${INK}`, textAlign: 'right', fontFamily: 'monospace', color: INK }}>
                        {item.rate !== '' ? item.rate : '—'}
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: 'monospace', fontWeight: 700, color: INK }}>
                        ₹{item.amount || 0}
                      </td>
                    </tr>
                  ))}

                  {Array.from({ length: emptyRowsCount }).map((_, i) => (
                    <tr key={`empty-${i}`} style={{ borderBottom: '1px solid #f2f2f2' }}>
                      <td style={{ padding: '10px 8px', borderRight: `1px solid ${INK}`, textAlign: 'center', color: '#bbbbbb', fontFamily: 'monospace', fontSize: '11px' }}>
                        {items.length + i + 1}
                      </td>
                      <td style={{ padding: '10px 12px', borderRight: `1px solid ${INK}` }}>&nbsp;</td>
                      <td style={{ padding: '10px 8px', borderRight: `1px solid ${INK}` }}>&nbsp;</td>
                      <td style={{ padding: '10px 10px', borderRight: `1px solid ${INK}` }}>&nbsp;</td>
                      <td style={{ padding: '10px 12px' }}>&nbsp;</td>
                    </tr>
                  ))}

                  <tr style={{ borderTop: `2px solid ${INK}`, borderBottom: '1px solid #e5e5e5' }}>
                    <td colSpan={4} style={{ padding: '8px 12px', borderRight: `1px solid ${INK}`, textAlign: 'right', fontWeight: 600, color: '#555555' }}>
                      Gross Subtotal:
                    </td>
                    <td style={{ padding: '8px 12px', textAlign: 'right', fontFamily: 'monospace', fontWeight: 700, color: INK }}>₹{subtotal}</td>
                  </tr>

                  {discNum > 0 && (
                    <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                      <td colSpan={4} style={{ padding: '8px 12px', borderRight: `1px solid ${INK}`, textAlign: 'right', fontWeight: 600, color: '#555555' }}>
                        Special Promotional Discount:
                      </td>
                      <td style={{ padding: '8px 12px', textAlign: 'right', fontFamily: 'monospace', fontWeight: 700, color: INK }}>-₹{discNum}</td>
                    </tr>
                  )}

                  <tr style={{ borderBottom: `2px solid ${INK}`, backgroundColor: '#fafafa', fontSize: '13.5px', fontWeight: 900 }}>
                    <td colSpan={4} style={{ padding: '10px 12px', borderRight: `1px solid ${INK}`, textAlign: 'right', color: INK, letterSpacing: '0.5px' }}>
                      TOTAL NET AMOUNT PAYABLE:
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: 'monospace', color: INK }}>₹{finalTotal}</td>
                  </tr>

                  <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                    <td colSpan={4} style={{ padding: '8px 12px', borderRight: `1px solid ${INK}`, textAlign: 'right', color: '#555555' }}>
                      Amount Received ({paymentMethod}):
                    </td>
                    <td style={{ padding: '8px 12px', textAlign: 'right', fontFamily: 'monospace', fontWeight: 700, color: INK }}>₹{paidNum}</td>
                  </tr>

                  <tr style={{ backgroundColor: '#fafafa' }}>
                    <td colSpan={4} style={{ padding: '8px 12px', borderRight: `1px solid ${INK}`, textAlign: 'right', fontWeight: 700, color: INK }}>
                      Balance Due:
                    </td>
                    <td style={{ padding: '8px 12px', textAlign: 'right', fontFamily: 'monospace', fontWeight: 900, color: INK }}>
                      {balanceDue > 0 ? `₹${balanceDue} (DUE)` : '₹0 (NIL)'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: '32px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', border: `2px solid ${INK}`, fontSize: '11px', marginBottom: '12px', backgroundColor: '#fafafa' }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '12px', color: INK }}>
                      <strong style={{ display: 'block', color: INK, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px', fontSize: '11px' }}>
                        Terms &amp; Conditions:
                      </strong>
                      <ol style={{ listStyleType: 'decimal', paddingLeft: '20px', margin: 0, color: '#333333', fontSize: '11px', lineHeight: '1.6' }}>
                        <li>100% Genuine OEM / OES replacement parts fitted with manufacturer warranty.</li>
                        <li>Replaced old / damaged components handed over to vehicle owner.</li>
                      </ol>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div style={{ textAlign: 'center', fontSize: '10px', color: '#444444', paddingTop: '8px', borderTop: `1px solid ${INK}`, fontWeight: 500, lineHeight: '1.5' }}>
                Thank you for choosing MyMechanic24 Auto Care! &bull; Nayta Mundla Main Road, Indore &bull; 24/7 Hotline: +91 99778 23169
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}