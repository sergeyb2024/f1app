// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// Setup the Inter font for a clean, modern look.
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Race.App | F1 Upgrade Tracker',
  description: 'Track Formula 1 car upgrades, race by race.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-br from-gray-900 to-black text-gray-200 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}

// app/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Add a simple fade-in/out animation for the alert messages */
@keyframes fadeInOut {
  0%, 100% { opacity: 0; transform: translateY(-20px); }
  10%, 90% { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-out {
  animation: fadeInOut 3s ease-in-out forwards;
}
