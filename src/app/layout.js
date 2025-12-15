import { Inter } from "next/font/google";
import "./globals.css";
import AppLayout from "@/components/AppLayout";
import { FinanceProvider } from "@/context/FinanceContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Finalytics | Personal Finance",
  description: "Track your wealth with style.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FinanceProvider>
          <AppLayout>
            {children}
          </AppLayout>
        </FinanceProvider>
      </body>
    </html>
  );
}
