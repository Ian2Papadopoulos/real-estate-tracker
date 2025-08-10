import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Estate Manager - Professional Property Portfolio Management",
  description:
    "Streamline your real estate portfolio with our comprehensive property management platform. Track listings, manage contacts, and organize your properties efficiently.",
  keywords:
    "real estate, property management, portfolio, listings, estate manager",
  authors: [{ name: "Estate Manager" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Estate Manager - Property Portfolio Management",
    description: "Professional property portfolio management platform",
    type: "website",
    siteName: "Estate Manager",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body
        className="font-sans antialiased bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-900 selection:bg-indigo-200 selection:text-indigo-900"
      >
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
