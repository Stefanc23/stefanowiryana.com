import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import '@/app/globals.css';

import Providers from '@/app/providers';
import CursorGlow from '@/components/CursorGlow';
import FireBackground from '@/components/FireBackground';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata: Metadata = {
  metadataBase: new URL('https://stefanowiryana.com'),
  title: {
    default: 'Stefano Wiryana | Security Solution Engineer',
    template: '%s | Stefano Wiryana',
  },
  description:
    'Security Solution Engineer and web developer bridging security architecture, customer-facing consulting, and hands-on software delivery.',
  authors: [{ name: 'Stefano Christian Wiryana' }],
  creator: 'Stefano Christian Wiryana',
  icons: {
    apple: [{ url: '/apple-touch-icon-sw.png', sizes: '180x180' }],
    icon: [
      { url: '/favicon-sw-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-sw-32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: ['/favicon-sw.ico'],
  },
  openGraph: {
    title: 'Stefano Wiryana | Security Solution Engineer',
    description:
      'A premium one-page portfolio for security architecture, solution engineering, and web development work.',
    url: 'https://stefanowiryana.com',
    siteName: 'Stefano Wiryana',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Stefano Wiryana | Security Solution Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stefano Wiryana | Security Solution Engineer',
    description:
      'Security architecture, customer-facing technical consulting, and hands-on web development.',
    images: ['/twitter-image'],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="font-sans">
        <Providers>
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <div id="top" className="relative min-h-screen">
            <FireBackground />
            <CursorGlow />
            <Header />
            <main id="main-content" className="relative z-10" tabIndex={-1}>
              {children}
            </main>
            <Footer />
            <ScrollToTop />
          </div>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
