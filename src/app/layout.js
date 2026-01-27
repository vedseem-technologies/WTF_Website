import { Geist, Geist_Mono, Dancing_Script, Playfair_Display, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const cheddarGothic = localFont({
  src: [
    {
      path: "../../public/fonts/CheddarGothicRough-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/CheddarGothicRough-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-cheddar",
});

export const metadata = {
  title: "Where's The Fork",
  description: "Franchise Opportunity",
};

import BottomNavbar from "@/components/ui/BottomNavbar";
import PageLoader from "@/components/ui/PageLoader";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} ${playfairDisplay.variable} ${montserrat.variable} ${cheddarGothic.variable} antialiased`}
        suppressHydrationWarning
      >
        <PageLoader />
        {children}
        <BottomNavbar />
      </body>
    </html>
  );
}
