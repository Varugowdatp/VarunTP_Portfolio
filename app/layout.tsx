import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const title = "Varun T P — Product Engineer | Java, Spring Boot, Full-Stack";
const description =
  "Product Engineer at TCS building Java/Spring Boot backends, REST APIs and full-stack and mobile products with React and Flutter.";

export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: "Varun T P" }],
  keywords: ["Varun T P", "Software Engineer", "Java", "Spring Boot", "React", "Flutter", "Portfolio"],
  openGraph: { title, description, type: "website", locale: "en_IN" },
  twitter: { card: "summary", title, description },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#09090b",
};

const themeScript = `try{var t=localStorage.getItem('theme');if(t!=='light')document.documentElement.classList.add('dark')}catch(e){document.documentElement.classList.add('dark')}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
