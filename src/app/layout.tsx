import type { Metadata } from "next";
import { Inter, Vazirmatn } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amir Eftekhar — Full-Stack Dev & AI-Powered Architect",
  description:
    "Portfolio of Amir Eftekhar, a Full-Stack Developer and AI-Powered Architect building intelligent, scalable systems with Next.js, Laravel, Django, React, and modern AI tools.",
  keywords: [
    "Amir Eftekhar",
    "Full-Stack Developer",
    "AI Developer",
    "Next.js",
    "Laravel",
    "Django",
    "React",
    "Portfolio",
  ],
  authors: [{ name: "Amir Eftekhar" }],
  creator: "Amir Eftekhar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eftekhar.dev",
    title: "Amir Eftekhar — Full-Stack Dev & AI-Powered Architect",
    description:
      "Building intelligent, scalable systems at the intersection of modern web and AI.",
    siteName: "Amir Eftekhar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amir Eftekhar — Full-Stack Dev & AI-Powered Architect",
    description: "Building intelligent, scalable systems powered by AI.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className={`${inter.variable} ${vazirmatn.variable}`}>
      <body className={inter.className}>
        <LanguageProvider>
          {children}
          <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                background: "#111",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                fontSize: "14px",
                padding: "12px 20px",
              },
            }}
          />
        </LanguageProvider>
      </body>
    </html>
  );
}
