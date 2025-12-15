import './globals.css';
import { Inter } from 'next/font/google';
import Sidebar from '@/components/Sidebar';
import { FinanceProvider } from '@/context/FinanceContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Finalytics',
  description: 'Track your wealth with precision.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FinanceProvider>
          <div className="layout-wrapper">
            <Sidebar />
            <main className="main-content animate-enter">
              {children}
            </main>
          </div>
        </FinanceProvider>
      </body>
    </html>
  );
}
