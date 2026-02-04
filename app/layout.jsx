import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SiteProvider } from "@/context/SiteContext";
import FloatingContactBar from "@/components/FloatingContactBar";

export const metadata = {
  title: 'MyMechanic Auto Care - Premium Car Service in Indore',
  description: 'Expert auto repair and maintenance services in Indore. Professional mechanics, genuine parts, quick service.',
  keywords: 'auto repair, car service, Indore, mechanics, car maintenance',
  authors: [{ name: 'MyMechanic Auto Care' }],
  creator: 'MyMechanic Auto Care',
  publisher: 'MyMechanic Auto Care',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://my-mechanic-iota.vercel.app'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'MyMechanic Auto Care - Premium Car Service in Indore',
    description: 'Expert auto repair and maintenance services in Indore. Professional mechanics, genuine parts, quick service.',
    url: 'https://my-mechanic-iota.vercel.app',
    siteName: 'MyMechanic Auto Care',
    images: [
      {
        url: 'https://my-mechanic-iota.vercel.app/car-repair.jpeg', // Replace with actual image
        width: 1200,
        height: 630,
        alt: 'MyMechanic Auto Care - Car Service in Indore',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyMechanic Auto Care - Premium Car Service in Indore',
    description: 'Expert auto repair and maintenance services in Indore. Professional mechanics, genuine parts, quick service.',
    images: ['https://my-mechanic-iota.vercel.app/apple-icon.jpeg'], // Replace with actual image
    creator: '@mymechaniccare', // Replace with actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="antialiased overflow-x-hidden w-screen"
      >
        <SiteProvider>
          <Header />
          {children}
          <Footer />

          <FloatingContactBar />
        </SiteProvider>
      </body>
    </html>
  );
}
