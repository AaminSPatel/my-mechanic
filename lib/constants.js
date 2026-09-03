export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://mymechanic24.vercel.app'
).trim().replace(/\/$/, '');

export const COMPANY = {
  name: 'MyMechanic24',
  legalName: 'MyMechanic24 Auto Care',
  tagline: 'Expert Doorstep Car Repair & Washing in Indore',
  phone: '+91 99778 23169',
  phoneRaw: '+919977823169',
  whatsapp: '+91-9977823169',
  whatsappNumber: '919977823169',
  email: 'mymechanic.in@gmail.com',
  address: 'Nayta Mundla Main Road, Near Palda & Tejaji Nagar',
  fullAddress: 'Nayta Mundla Main Road, Near Palda & Tejaji Nagar, Indore, Madhya Pradesh 452020',
  locality: 'Indore',
  region: 'Madhya Pradesh',
  postalCode: '452020',
  country: 'IN',
  geo: {
    latitude: 22.6890,
    longitude: 75.8838,
  },
  googleMapsUrl: 'https://maps.app.goo.gl/DeuQikRWUgCjJkTU6?g_st=ipc',
  hours: {
    weekday: '8:00 AM - 8:00 PM',
    sunday: '8:00 AM - 2:00 PM',
    emergency: '24/7 Breakdown Hotline Available',
  },
  serviceAreas: [
    'Indore',
    'Nayta Mundla',
    'Palda',
    'Tejaji Nagar',
    'Udhyog Nagar',
    'Nemawar Road',
    'Bhawarkua',
    'AB Road',
    'Vijay Nagar',
    'Palasia',
    'Super Corridor',
    'Rau',
    'Bypass Road',
  ],
};

export function getCanonicalUrl(path = '') {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${cleanPath === '/' ? '' : cleanPath}`;
}
