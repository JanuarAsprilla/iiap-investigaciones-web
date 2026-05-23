import type { Metadata } from "next";
import { Bebas_Neue, Crimson_Text, Inter } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
});

const crimsonText = Crimson_Text({
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-crimson",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Subdirección de Investigaciones — IIAP",
  description:
    "Plataforma unificada de la Subdirección de Investigaciones del Instituto de Investigaciones Ambientales del Pacífico (IIAP). Planificación, Centros y Grupos de Investigación del Chocó Biogeográfico.",
  keywords: [
    "IIAP",
    "investigación ambiental",
    "Chocó Biogeográfico",
    "Pacífico colombiano",
    "biodiversidad",
    "geoinformática",
    "PICIA",
  ],
  authors: [{ name: "IIAP — Institut de Investigaciones Ambientales del Pacífico" }],
  openGraph: {
    title: "Subdirección de Investigaciones — IIAP",
    description:
      "Conocimiento científico al servicio de la biodiversidad del Chocó Biogeográfico.",
    locale: "es_CO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${bebasNeue.variable} ${crimsonText.variable} ${inter.variable}`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
