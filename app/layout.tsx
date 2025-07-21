// app/layout.tsx
import './globals.css'; // Import your global CSS here
import { Inter } from 'next/font/google'; // Import Inter font using Next.js font optimization
import React from 'react'; // Import React to use React.ReactNode

// Initialize the Inter font
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'Race App Dashboard',
  description: 'Track race details and upgrades',
};

// Corrected: Type 'children' as React.ReactNode
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        {children} {/* This is where your page.tsx content will be rendered */}
      </body>
    </html>
  );
}
