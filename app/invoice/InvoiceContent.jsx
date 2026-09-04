'use client';

import { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { 
  Download, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Wrench, 
  Clock, 
  CreditCard, 
  Car, 
  User, 
  FileText, 
  Eye 
} from 'lucide-react';

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

  // No pre-filled prices as requested!
  const [items, setItems] = useState([
    { id: 1, description: '', qty: 1, rate: '', amount: 0 },
  ]);

  const [discount, setDiscount] = useState('');
  const [totalPaid, setTotalPaid] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [mechanicName, setMechanicName] = useState('Salman Patel');

  const [downloading, setDownloading] = useState(false);
  const [emailStatus, setEmailStatus] = useState(''); // 'sending', 'sent', 'error'

  const previewRef = useRef(null);

  // Initialize date, time, and unique bill number
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

  // Recalculate item amounts and totals
  const subtotal = items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const discNum = Number(discount) || 0;
  const finalTotal = Math.max(0, subtotal - discNum);
  const paidNum = totalPaid === '' ? 0 : Number(totalPaid) || 0;
  const balanceDue = Math.max(0, finalTotal - paidNum);

  // Handle Item Operations
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
    setItems((prev) => [
      ...prev,
      { id: nextId, description: '', qty: 1, rate: '', amount: 0 },
    ]);
  };

  // Quick service adds description only (no pre-filled price)
  const addQuickService = (serviceName) => {
    const nextId = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    setItems((prev) => [
      ...prev,
      { id: nextId, description: serviceName, qty: 1, rate: '', amount: 0 },
    ]);
  };

  const removeItem = (id) => {
    if (items.length === 1) {
      setItems([{ id: 1, description: '', qty: 1, rate: '', amount: 0 }]);
      return;
    }
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Download A4 PNG & Email Admin (Uses html-to-image with zero lab/oklch color issues)
  const handleDownload = async () => {
    if (!previewRef.current || downloading) return;
    setDownloading(true);
    setEmailStatus('sending');

    try {
      // Generate High-Res A4 PNG (794 x 1123 px at 2x retina scale)
      const dataUrl = await toPng(previewRef.current, {
        quality: 0.98,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        width: 794,
        height: 1123,
        cacheBust: true,
      });

      // 1. Download file to device
      const link = document.createElement('a');
      link.download = `${(customerName || 'Customer').replace(/\s+/g, '_')}_Bill_${billNumber}.png`;
      link.href = dataUrl;
      link.click();

      // 2. Automatically send email copy with A4 bill image to Admin
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
            serviceName: items
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

        if (res.ok) {
          setEmailStatus('sent');
        } else {
          setEmailStatus('error');
        }
      } catch (apiErr) {
        console.error('Bill email dispatch failed:', apiErr);
        setEmailStatus('error');
      }
    } catch (err) {
      console.error('Download failed', err);
      setEmailStatus('error');
    } finally {
      setDownloading(false);
    }
  };

  const company = {
    name: 'MyMechanic24 Auto Care',
    tagline: 'Doorstep Car Service & Central Multi-Brand Workshop',
    address: 'Nayta Mundla Main Road, Near Palda & Tejaji Nagar, Indore, MP 452020',
    phone: '+91 99778 23169',
    email: 'mymechanic.in@gmail.com',
  };

  // Minimum rows for authentic A4 bill paper look
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
          Create official, full A4-size cash bills. Enter job details and prices below. On clicking &quot;Download Bill&quot;, an authentic A4 bill image downloads instantly and an official copy is sent to the admin email.
        </p>
      </header>

      {/* ================= STEP 1: FORM SECTION (Centered Container) ================= */}
      <div className="bg-card rounded-3xl border border-border p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="text-base font-black uppercase tracking-wider text-primary flex items-center gap-2">
            <Wrench size={18} /> Enter Bill Details &amp; Services
          </h2>
          <span className="text-xs text-muted-foreground font-medium">All prices custom entered</span>
        </div>
        
        {/* Bill Meta Inputs */}
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

        {/* Customer & Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-border">
          {/* Customer Details */}
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

          {/* Vehicle Details */}
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

        {/* Itemized Services & Spare Parts */}
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

          {/* Quick Add Pills (Name only, rate left blank) */}
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

          {/* Dynamic Items Rows */}
          <div className="space-y-2">
            {items.map((item, index) => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center gap-1 bg-secondary/40 px-1 py-2.5 rounded-xl border border-border/70">
              <div className='flex items-center gap-2'>
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
                <div className='flex items-center border-red-300 border-[1px] rounded-md p-1 gap-2'>

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

        {/* Payment & Summary Inputs */}
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

        {/* Action Button: ONLY DOWNLOAD BILL (PNG) */}
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

        {/* Status Banners */}
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

      {/* ================= STEP 2: LIVE A4 BILL PREVIEW SECTION (Centered) ================= */}
      <div className="flex flex-col items-center justify-center w-full pt-4">
        <div className="w-full flex items-center justify-between mb-3 max-w-[794px] px-1">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Eye size={16} className="text-primary" /> Live A4 Sheet Preview (Centered &bull; 794 × 1123 px)
          </p>
          <span className="text-[11px] font-bold text-slate-800 bg-slate-100 px-3 py-1 border border-slate-300">
            A4 Standard &bull; No Signature
          </span>
        </div>

        {/* Scrollable container for mobile/tablet to ensure true A4 dimensions are preserved */}
        <div className="w-full overflow-x-auto pb-8 flex justify-center">
          
          {/* TRUE A4 PAPER SHEET (Centered, 794px width x 1123px min-height at 96 DPI) */}
          <div
            ref={previewRef}
            id="printable-bill"
            className="relative flex flex-col justify-between"
            style={{
              width: '794px',
              minHeight: '1123px',
              margin: '0 auto',
              backgroundColor: '#ffffff',
              color: '#000000',
              padding: '36px',
              border: '2px solid #000000',
              fontFamily: 'Arial, Helvetica, sans-serif',
              boxSizing: 'border-box',
            }}
          >
            {/* TOP SECTION: HEADER + DETAILS + UNIFIED TABLE */}
            <div>
              {/* 1. TOP HEADER TABLE */}
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  border: '2px solid #000000',
                  marginBottom: '0',
                  backgroundColor: '#ffffff',
                }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        padding: '16px',
                        textAlign: 'center',
                        borderBottom: '2px solid #000000',
                        backgroundColor: '#ffffff',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '6px' }}>
                        <img
                          src="/logo.jpeg"
                          alt="MyMechanic24 Logo"
                          style={{ height: '42px', width: 'auto', objectFit: 'contain' }}
                        />
                        <h1
                          style={{
                            fontSize: '24px',
                            fontWeight: '900',
                            letterSpacing: '1px',
                            color: '#000000',
                            textTransform: 'uppercase',
                            margin: '0',
                          }}
                        >
                          MyMechanic24 Auto Care
                        </h1>
                      </div>
                      <p
                        style={{
                          fontSize: '12px',
                          fontWeight: '700',
                          color: '#000000',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          margin: '3px 0 0 0',
                        }}
                      >
                        {company.tagline}
                      </p>
                      <p style={{ fontSize: '11px', color: '#333333', margin: '3px 0 0 0' }}>
                        {company.address}
                      </p>
                      <p style={{ fontSize: '11.5px', fontWeight: '700', color: '#000000', margin: '4px 0 0 0' }}>
                        Phone / WhatsApp: +91 99778 23169 &bull; Email: mymechanic.in@gmail.com
                      </p>
                      <div
                        style={{
                          marginTop: '10px',
                          display: 'inline-block',
                          border: '1px solid #000000',
                          backgroundColor: '#000000',
                          color: '#ffffff',
                          fontSize: '12px',
                          fontWeight: '900',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          padding: '4px 24px',
                        }}
                      >
                        RETAIL SERVICE CASH BILL
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* 2. BILL METADATA STRIP TABLE */}
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  borderLeft: '2px solid #000000',
                  borderRight: '2px solid #000000',
                  borderBottom: '2px solid #000000',
                  fontSize: '12px',
                }}
              >
                <tbody>
                  <tr style={{ backgroundColor: '#f3f4f6' }}>
                    <td
                      style={{
                        padding: '8px 12px',
                        borderRight: '2px solid #000000',
                        width: '50%',
                        color: '#111827',
                      }}
                    >
                      <span style={{ fontWeight: '600', color: '#4b5563' }}>Bill Number:</span>{' '}
                      <strong style={{ fontFamily: 'monospace', color: '#000000', fontSize: '13px' }}>
                        {billNumber || 'MM24-BILL-0001'}
                      </strong>
                    </td>
                    <td style={{ padding: '8px 12px', width: '50%', textAlign: 'right', color: '#111827' }}>
                      <span style={{ fontWeight: '600', color: '#4b5563' }}>Date &amp; Time:</span>{' '}
                      <strong style={{ color: '#000000', fontSize: '13px' }}>
                        {date} {time}
                      </strong>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* 3. CUSTOMER & VEHICLE DETAILS TABLE */}
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  borderLeft: '2px solid #000000',
                  borderRight: '2px solid #000000',
                  borderBottom: '2px solid #000000',
                  fontSize: '12px',
                }}
              >
                <thead>
                  <tr
                    style={{
                      backgroundColor: '#e5e7eb',
                      borderBottom: '2px solid #000000',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      fontWeight: '700',
                      color: '#000000',
                    }}
                  >
                    <th style={{ padding: '8px 12px', borderRight: '2px solid #000000', width: '50%', textAlign: 'left' }}>
                      Customer Information
                    </th>
                    <th style={{ padding: '8px 12px', width: '50%', textAlign: 'left' }}>
                      Vehicle Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #d1d5db' }}>
                    <td style={{ padding: '10px 12px', borderRight: '2px solid #000000', verticalAlign: 'top' }}>
                      <span style={{ color: '#4b5563', display: 'block', fontSize: '10.5px' }}>Customer Name:</span>
                      <strong style={{ fontSize: '13px', color: '#000000' }}>{customerName || 'Walk-in Customer'}</strong>
                    </td>
                    <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
                      <span style={{ color: '#4b5563', display: 'block', fontSize: '10.5px' }}>Vehicle / Model:</span>
                      <strong style={{ fontSize: '13px', color: '#000000' }}>
                        {brand || 'Vehicle'} {carModel || ''} ({fuelType})
                      </strong>
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #d1d5db' }}>
                    <td style={{ padding: '10px 12px', borderRight: '2px solid #000000', verticalAlign: 'top' }}>
                      <span style={{ color: '#4b5563', display: 'block', fontSize: '10.5px' }}>Contact Mobile:</span>
                      <strong style={{ fontSize: '12.5px', color: '#000000' }}>{mobileNumber || '+91 99778 23169'}</strong>
                    </td>
                    <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
                      <span style={{ color: '#4b5563', display: 'block', fontSize: '10.5px' }}>Registration Number:</span>
                      <strong style={{ fontFamily: 'monospace', textTransform: 'uppercase', fontSize: '13px', color: '#000000' }}>
                        {vehicleNumber || 'MP-09-XX-0000'}
                      </strong>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px 12px', borderRight: '2px solid #000000', verticalAlign: 'top' }}>
                      <span style={{ color: '#4b5563', display: 'block', fontSize: '10.5px' }}>Service Location / Address:</span>
                      <span style={{ color: '#1f2937', fontSize: '12px' }}>{customerAddress || 'Indore, Madhya Pradesh'}</span>
                    </td>
                    <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
                      <span style={{ color: '#4b5563', display: 'block', fontSize: '10.5px' }}>Odometer Reading &amp; Job Type:</span>
                      <span style={{ color: '#1f2937', fontWeight: '500', fontSize: '12px' }}>
                        {odometer ? `${odometer} KM` : 'N/A'} &bull; {serviceType} ({mechanicName})
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* 4. UNIFIED PARTICULAR & PAYMENT CALCULATION TABLE (Perfect Column Alignment Across All Rows) */}
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  borderLeft: '2px solid #000000',
                  borderRight: '2px solid #000000',
                  borderBottom: '2px solid #000000',
                  fontSize: '12px',
                }}
              >
                <thead>
                  <tr
                    style={{
                      backgroundColor: '#e5e7eb',
                      borderBottom: '2px solid #000000',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      fontWeight: '700',
                      textAlign: 'center',
                      color: '#000000',
                    }}
                  >
                    <th style={{ padding: '10px 8px', borderRight: '1px solid #000000', width: '45px' }}>S.N.</th>
                    <th style={{ padding: '10px 12px', borderRight: '1px solid #000000', textAlign: 'left' }}>
                      Description of Services &amp; Spare Parts
                    </th>
                    <th style={{ padding: '10px 8px', borderRight: '1px solid #000000', width: '55px' }}>Qty</th>
                    <th style={{ padding: '10px 10px', borderRight: '1px solid #000000', width: '95px', textAlign: 'right' }}>
                      Rate (₹)
                    </th>
                    <th style={{ padding: '10px 12px', width: '115px', textAlign: 'right' }}>Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Actual Job Items */}
                  {items.map((item, idx) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td
                        style={{
                          padding: '10px 8px',
                          borderRight: '1px solid #000000',
                          textAlign: 'center',
                          fontFamily: 'monospace',
                          fontSize: '11px',
                          color: '#4b5563',
                        }}
                      >
                        {idx + 1}
                      </td>
                      <td style={{ padding: '10px 12px', borderRight: '1px solid #000000', fontWeight: '500', color: '#000000' }}>
                        {item.description || 'Car Repair / Service'}
                      </td>
                      <td
                        style={{
                          padding: '10px 8px',
                          borderRight: '1px solid #000000',
                          textAlign: 'center',
                          fontFamily: 'monospace',
                          color: '#1f2937',
                        }}
                      >
                        {item.qty || 1}
                      </td>
                      <td
                        style={{
                          padding: '10px 10px',
                          borderRight: '1px solid #000000',
                          textAlign: 'right',
                          fontFamily: 'monospace',
                          color: '#1f2937',
                        }}
                      >
                        {item.rate !== '' ? item.rate : '—'}
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: 'monospace', fontWeight: '700', color: '#000000' }}>
                        ₹{item.amount || 0}
                      </td>
                    </tr>
                  ))}

                  {/* Clean Placeholder Rows to Ensure Balanced A4 Proportions */}
                  {Array.from({ length: emptyRowsCount }).map((_, i) => (
                    <tr key={`empty-${i}`} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td
                        style={{
                          padding: '10px 8px',
                          borderRight: '1px solid #000000',
                          textAlign: 'center',
                          color: '#9ca3af',
                          fontFamily: 'monospace',
                          fontSize: '11px',
                        }}
                      >
                        {items.length + i + 1}
                      </td>
                      <td style={{ padding: '10px 12px', borderRight: '1px solid #000000' }}>&nbsp;</td>
                      <td style={{ padding: '10px 8px', borderRight: '1px solid #000000' }}>&nbsp;</td>
                      <td style={{ padding: '10px 10px', borderRight: '1px solid #000000' }}>&nbsp;</td>
                      <td style={{ padding: '10px 12px' }}>&nbsp;</td>
                    </tr>
                  ))}

                  {/* Gross Subtotal Row (colSpan=4 perfectly aligned with Amount column) */}
                  <tr style={{ borderTop: '2px solid #000000', borderBottom: '1px solid #e5e7eb' }}>
                    <td
                      colSpan={4}
                      style={{
                        padding: '8px 12px',
                        borderRight: '1px solid #000000',
                        textAlign: 'right',
                        fontWeight: '600',
                        color: '#4b5563',
                      }}
                    >
                      Gross Subtotal:
                    </td>
                    <td style={{ padding: '8px 12px', textAlign: 'right', fontFamily: 'monospace', fontWeight: '700', color: '#000000' }}>
                      ₹{subtotal}
                    </td>
                  </tr>

                  {/* Discount Row (if applicable) */}
                  {discNum > 0 && (
                    <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td
                        colSpan={4}
                        style={{
                          padding: '8px 12px',
                          borderRight: '1px solid #000000',
                          textAlign: 'right',
                          fontWeight: '600',
                          color: '#dc2626',
                        }}
                      >
                        Special Promotional Discount:
                      </td>
                      <td style={{ padding: '8px 12px', textAlign: 'right', fontFamily: 'monospace', fontWeight: '700', color: '#dc2626' }}>
                        -₹{discNum}
                      </td>
                    </tr>
                  )}

                  {/* Total Net Amount Row */}
                  <tr
                    style={{
                      borderBottom: '2px solid #000000',
                      backgroundColor: '#f3f4f6',
                      fontSize: '13.5px',
                      fontWeight: '900',
                    }}
                  >
                    <td
                      colSpan={4}
                      style={{
                        padding: '10px 12px',
                        borderRight: '1px solid #000000',
                        textAlign: 'right',
                        color: '#000000',
                        letterSpacing: '0.5px',
                      }}
                    >
                      TOTAL NET AMOUNT PAYABLE:
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: 'monospace', color: '#000000' }}>
                      ₹{finalTotal}
                    </td>
                  </tr>

                  {/* Paid Row */}
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td
                      colSpan={4}
                      style={{
                        padding: '8px 12px',
                        borderRight: '1px solid #000000',
                        textAlign: 'right',
                        color: '#4b5563',
                      }}
                    >
                      Amount Received ({paymentMethod}):
                    </td>
                    <td style={{ padding: '8px 12px', textAlign: 'right', fontFamily: 'monospace', fontWeight: '700', color: '#047857' }}>
                      ₹{paidNum}
                    </td>
                  </tr>

                  {/* Balance Due Row */}
                  <tr style={{ backgroundColor: '#f9fafb' }}>
                    <td
                      colSpan={4}
                      style={{
                        padding: '8px 12px',
                        borderRight: '1px solid #000000',
                        textAlign: 'right',
                        fontWeight: '700',
                        color: '#000000',
                      }}
                    >
                      Balance Due:
                    </td>
                    <td style={{ padding: '8px 12px', textAlign: 'right', fontFamily: 'monospace', fontWeight: '700' }}>
                      {balanceDue > 0 ? (
                        <span style={{ color: '#dc2626', fontWeight: '900' }}>₹{balanceDue} (DUE)</span>
                      ) : (
                        <span style={{ color: '#047857', fontWeight: '900' }}>₹0 (NIL)</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* BOTTOM SECTION: ONLY THE 2 TERMS POINTS + FOOTER (NO SIGNATURES!) */}
            <div style={{ marginTop: '32px' }}>
              {/* 5. TERMS & CONDITIONS TABLE (EXACTLY 2 POINTS ONLY) */}
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  border: '2px solid #000000',
                  fontSize: '11px',
                  marginBottom: '12px',
                  backgroundColor: '#f9fafb',
                }}
              >
                <tbody>
                  <tr>
                    <td style={{ padding: '12px', color: '#111827' }}>
                      <strong
                        style={{
                          display: 'block',
                          color: '#000000',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          marginBottom: '4px',
                          fontSize: '11px',
                        }}
                      >
                        Terms &amp; Conditions:
                      </strong>
                      <ol style={{ listStyleType: 'decimal', paddingLeft: '20px', margin: '0', color: '#374151', fontSize: '11px', lineHeight: '1.6' }}>
                        <li>100% Genuine OEM / OES replacement parts fitted with manufacturer warranty.</li>
                        <li>Replaced old / damaged components handed over to vehicle owner.</li>
                      </ol>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* 6. FOOTER */}
              <div
                style={{
                  textAlign: 'center',
                  fontSize: '10px',
                  color: '#4b5563',
                  paddingTop: '8px',
                  borderTop: '1px solid #9ca3af',
                  fontWeight: '500',
                  lineHeight: '1.5',
                }}
              >
                Thank you for choosing MyMechanic24 Auto Care! &bull; Nayta Mundla Main Road, Indore &bull; 24/7 Hotline: +91 99778 23169
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}