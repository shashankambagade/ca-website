//src/app/layout.jsx

import { Raleway, Merriweather } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ThemeScrollController from '@/components/sections/elements/ThemeScrollController';
import './globals.css';

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
});

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-merriweather', 
  display: 'swap',
});

export const metadata = {
  title: "Collaboration Art",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${raleway.variable} ${merriweather.variable} bg-gray-100 text-gray-900 antialiased`}  >
            <Header />
            <ThemeScrollController />
        {children}
        <Footer />
      </body> 
    </html>
  );
}
