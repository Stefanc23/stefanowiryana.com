import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Metadata } from 'next';
import { Quicksand } from 'next/font/google';

import '@/app/globals.css';

import Providers from '@/app/providers';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const quicksand = Quicksand({
  subsets: ['latin-ext'],
});

export const metadata: Metadata = {
  title: "Stefano's Portfolio Website",
  description:
    'Hi! My name is Stefano, a software developer, and this is my portfolio website.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth!" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`bg-light dark:bg-dark selection:bg-primary selection:text-light dark:selection:text-dark ${quicksand.className}`}
      >
        <Providers>
          <div className="relative">
            <div
              id="top"
              className="absolute top-0 left-0 w-full h-3 bg-linear-to-r from-primary to-secondary animate-gradient"
            ></div>
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
