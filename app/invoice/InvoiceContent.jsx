'use client';

import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';

export default function InvoiceContent() {
  const [formData, setFormData] = useState({
    customerName: '',
    mobileNumber: '',
    vehicleNumber: '',
    brand: '',
    carModel: '',
    odometer: '',
    serviceName: '',
    charge: '',
    totalPayment: '',
    balancePayment: '',
    paymentMethod: 'Cash',
    date: '',
  });

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, date: today }));
  }, []);

  const previewRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDownload = async () => {
    if (!previewRef.current || !formData.serviceName) return;
    const element = previewRef.current;
    const clone = element.cloneNode(true);
    document.body.appendChild(clone);
    clone.style.position = 'fixed';
    clone.style.left = '-9999px';
    clone.style.top = '0';
    clone.style.width = '400px'; 
    clone.style.transform = 'none'; 

    try {
      const canvas = await html2canvas(clone, {
        backgroundColor: '#ffffff',
        scale: 3, 
        useCORS: true,
        width: 400,
      });
      const link = document.createElement('a');
      link.download = `${formData.customerName || 'customer'}-invoice.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error("Download failed", err);
    } finally {
      document.body.removeChild(clone);
    }
  };

  const company = {
    name: 'MyMechanic Auto Care',
    phone: '+91 99778 23169',
    address: 'Indore, Madhya Pradesh',
    email: 'mymechanic.in@gmail.com',
  };

  // Responsive Grid Style Helper
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    width: '100%'
  };

  const inputWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    width: '100%'
  };

  const inputStyle = {
    padding: '0.75rem', // Mobile friendly touch area
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    fontSize: '1rem', // Prevents iOS auto-zoom on focus
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box'
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1rem', fontFamily: 'sans-serif', backgroundColor: '#f8fafc' }}>
      <header style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b' }}>Invoice Generator</h1>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
        
        {/* Form Section - Ab ye overflow nahi karega */}
        <div style={{ 
          backgroundColor: '#fff', 
          padding: '1.25rem', 
          borderRadius: '16px', 
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', 
          width: '100%', 
          maxWidth: '700px',
          boxSizing: 'border-box'
        }}>
          <h3 style={{ marginBottom: '1.25rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.5rem', fontSize: '1.1rem', color: '#334155' }}>
            Customer & Vehicle Details
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Row 1: Name & Mobile */}
            <div style={gridStyle}>
              <div style={inputWrapperStyle}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#64748b' }}>Customer Name</label>
                <input name="customerName" value={formData.customerName} onChange={handleChange} placeholder="Rahul Sharma" style={inputStyle} />
              </div>
              <div style={inputWrapperStyle}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#64748b' }}>Mobile Number</label>
                <input name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} placeholder="9988776655" style={inputStyle} />
              </div>
            </div>

            {/* Row 2: Brand & Model */}
            <div style={gridStyle}>
              <div style={inputWrapperStyle}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#64748b' }}>Brand</label>
                <input name="brand" value={formData.brand} onChange={handleChange} placeholder="Maruti Suzuki" style={inputStyle} />
              </div>
              <div style={inputWrapperStyle}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#64748b' }}>Car Model</label>
                <input name="carModel" value={formData.carModel} onChange={handleChange} placeholder="Swift VXI" style={inputStyle} />
              </div>
            </div>

            {/* Row 3: Vehicle No & Odometer */}
            <div style={gridStyle}>
              <div style={inputWrapperStyle}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#64748b' }}>Vehicle No.</label>
                <input name="vehicleNumber" value={formData.vehicleNumber} onChange={handleChange} placeholder="MP-09-AB-1234" style={inputStyle} />
              </div>
              <div style={inputWrapperStyle}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#64748b' }}>Odometer (KM)</label>
                <input name="odometer" value={formData.odometer} onChange={handleChange} placeholder="45000" style={inputStyle} />
              </div>
            </div>

            <hr style={{ border: '0', borderTop: '1px solid #e2e8f0', margin: '0.5rem 0' }} />

            {/* Row 4: Service Name (Full Width) */}
            <div style={inputWrapperStyle}>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#64748b' }}>Service Description</label>
              <input name="serviceName" value={formData.serviceName} onChange={handleChange} placeholder="Full Service, Oil Change, etc." style={inputStyle} />
            </div>

            {/* Row 5: Payments & Method */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
              <div style={inputWrapperStyle}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#64748b' }}>Charge (₹)</label>
                <input name="charge" type="number" value={formData.charge} onChange={handleChange} style={inputStyle} />
              </div>
              <div style={inputWrapperStyle}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#64748b' }}>Total (₹)</label>
                <input name="totalPayment" type="number" value={formData.totalPayment} onChange={handleChange} style={inputStyle} />
              </div>
              <div style={inputWrapperStyle}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#64748b' }}>Balance (₹)</label>
                <input name="balancePayment" type="number" value={formData.balancePayment} onChange={handleChange} style={inputStyle} />
              </div>
            </div>

            <div style={gridStyle}>
              <div style={inputWrapperStyle}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#64748b' }}>Payment Method</label>
                <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} style={inputStyle}>
                  <option value="Cash">Cash</option>
                  <option value="Online / UPI">Online / UPI</option>
                  <option value="Card">Card</option>
                </select>
              </div>
              <div style={inputWrapperStyle}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#64748b' }}>Date</label>
                <input name="date" type="date" value={formData.date} onChange={handleChange} style={inputStyle} />
              </div>
            </div>
          </div>

          <button 
            onClick={handleDownload}
            disabled={!formData.serviceName}
            style={{ 
              width: '100%', marginTop: '2rem', padding: '1rem', 
              backgroundColor: formData.serviceName ? '#2563eb' : '#94a3b8', 
              color: 'white', border: 'none', borderRadius: '10px', fontWeight: '700', 
              fontSize: '1rem', cursor: formData.serviceName ? 'pointer' : 'not-allowed',
              boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)'
            }}
          >
            Download Invoice PNG
          </button>
        </div>

        {/* Preview Section */}
        <div style={{ width: '100%', maxWidth: '400px', paddingBottom: '3rem' }}>
          <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#64748b', marginBottom: '0.75rem', fontWeight: '600' }}>
            Live Preview
          </p>
          
          <div ref={previewRef} style={{ width: '100%', backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 0 25px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem', borderBottom: '2px solid #f8fafc', paddingBottom: '1rem' }}>
              <img src="/logo.jpeg" alt="Logo" style={{ height: '45px', width: 'auto', borderRadius: '6px' }} />
              <div>
                <h2 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>{company.name}</h2>
                <p style={{ fontSize: '0.65rem', color: '#64748b', margin: 0 }}>Authorized Car Service Center</p>
              </div>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '8px' }}>
                <div>
                  <p style={{ fontSize: '0.6rem', color: '#94a3b8', margin: 0, fontWeight: '700' }}>CUSTOMER</p>
                  <p style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1e293b', margin: '2px 0' }}>{formData.customerName || '---'}</p>
                  <p style={{ fontSize: '0.7rem', color: '#64748b', margin: 0 }}>{formData.mobileNumber}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '0.6rem', color: '#94a3b8', margin: 0, fontWeight: '700' }}>VEHICLE</p>
                  <p style={{ fontSize: '0.8rem', fontWeight: '700', color: '#1e293b', margin: '2px 0' }}>{formData.brand} {formData.carModel}</p>
                  <p style={{ fontSize: '0.7rem', color: '#64748b', margin: 0 }}>{formData.vehicleNumber}</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.65rem', color: '#64748b', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
              <span>INV: <b style={{ color: '#1e293b' }}>#INV-{formData.date?.replace(/-/g, '')}</b></span>
              <span>KM: <b style={{ color: '#1e293b' }}>{formData.odometer || '---'}</b></span>
              <span>DATE: <b style={{ color: '#1e293b' }}>{formData.date}</b></span>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f8fafc' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Service</span>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', textAlign: 'right', maxWidth: '65%' }}>{formData.serviceName || '---'}</span>
              </div>
              
              <div style={{ marginTop: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Net Amount</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700' }}>₹{formData.charge || '0'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Paid via</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#10b981' }}>{formData.paymentMethod}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderTop: '2px solid #f8fafc', marginTop: '8px' }}>
                  <span style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a' }}>Total</span>
                  <span style={{ fontSize: '1rem', fontWeight: '800', color: '#2563eb' }}>₹{formData.totalPayment || '0'}</span>
                </div>
                {formData.balancePayment > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#fff1f2', borderRadius: '8px', border: '1px solid #ffe4e6' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#e11d48' }}>Balance Due</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#e11d48' }}>₹{formData.balancePayment}</span>
                  </div>
                )}
              </div>
            </div>

            <div style={{ textAlign: 'center', borderTop: '1px dashed #cbd5e1', paddingTop: '1rem' }}>
              <p style={{ fontSize: '0.8rem', fontWeight: '800', color: '#2563eb', margin: '0 0 4px 0' }}>THANKS FOR YOUR VISIT!</p>
              {/* <p style={{ fontSize: '0.6rem', color: '#64748b', margin: '2px 0' }}>{company.address}</p> */}
              <p style={{ fontSize: '0.6rem', color: '#64748b', margin: '2px 0' }}>{company.phone}</p>
              <p style={{ fontSize: '0.5rem', color: '#94a3b8', marginTop: '10px' }}>Powered by MyMechanic</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}