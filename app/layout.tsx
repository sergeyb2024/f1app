// app/layout.tsx
import './globals.css'; // Import your global CSS here
import { Inter } from 'next/font/google'; // Import Inter font using Next.js font optimization

// Initialize the Inter font
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'Race App Dashboard',
  description: 'Track race details and upgrades',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        {children} {/* This is where your page.tsx content will be rendered */}
      </body>
    </html>
  );
}
