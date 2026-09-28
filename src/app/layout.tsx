import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://soraproject.reaksy.com";

export const viewport: Viewport = {
  themeColor: "#1C2434",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sora Project — Dashboard Manajemen & Cost Control Kontraktor Interior",
    template: "%s | Sora Project",
  },
  description:
    "Platform enterprise operasional kontraktor interior: kontrol HPP real-time, RAB, pengadaan material, SPK tukang & vendor, invoicing termin, serta monitoring cashflow.",
  keywords: [
    "Sora Project",
    "kontraktor interior",
    "cost control kontraktor",
    "manajemen proyek interior",
    "RAB interior",
    "HPP aktual",
    "termin invoicing kontraktor",
    "procurement vendor interior",
    "software kontraktor",
  ],
  authors: [{ name: "Sora Project Team", url: siteUrl }],
  creator: "Sora Project",
  publisher: "Sora Project",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sora Project — Dashboard Manajemen & Cost Control Kontraktor Interior",
    description:
      "Platform enterprise operasional kontraktor interior: kontrol HPP real-time, RAB, pengadaan material, SPK tukang & vendor, invoicing termin, serta monitoring cashflow.",
    url: siteUrl,
    siteName: "Sora Project",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sora Project — Dashboard Manajemen & Cost Control Kontraktor Interior",
    description:
      "Platform enterprise operasional kontraktor interior: kontrol HPP real-time, RAB, pengadaan material, SPK tukang & vendor, invoicing termin, serta monitoring cashflow.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Sora Project",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "IDR",
      },
      description:
        "Dashboard operasional enterprise untuk kontraktor interior dengan fitur cost control HPP real-time, pengadaan material, manajemen tukang & subkon, serta penagihan termin.",
      url: siteUrl,
    },
    {
      "@type": "Organization",
      name: "Sora Project",
      url: siteUrl,
      logo: `${siteUrl}/favicon.ico`,
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F1F5F9] text-[#64748B] antialiased">
        {children}
      </body>
    </html>
  );
}
