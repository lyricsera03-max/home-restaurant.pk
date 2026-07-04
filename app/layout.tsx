import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://home-restaurant-pk.vercel.app"),
  title: {
    default: "HomeRestaurant | Fresh Homemade Meals in Karachi",
    template: "%s | HomeRestaurant",
  },
  description:
    "HomeRestaurant helps Karachi families, offices, and night-shift teams discover fresh homemade meals, meal plans, and catering inquiries.",
  keywords: [
    "HomeRestaurant",
    "Karachi meals",
    "homemade food",
    "corporate catering",
    "meal plans",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "HomeRestaurant | Fresh Homemade Meals in Karachi",
    description:
      "Fresh homemade meals, daily specials, and corporate meal plans for Karachi.",
    url: "https://home-restaurant-pk.vercel.app",
    siteName: "HomeRestaurant",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HomeRestaurant | Fresh Homemade Meals in Karachi",
    description:
      "Fresh homemade meals, daily specials, and corporate meal plans for Karachi.",
  },
  verification: {
    google: "Zx7wpPBNC_d3ypLnsFJ8jVmucu8ftWkFatBsY1dZup0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <meta name="google-site-verification" content="Zx7wpPBNC_d3ypLnsFJ8jVmucu8ftWkFatBsY1dZup0" />
        {gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
