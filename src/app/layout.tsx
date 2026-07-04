import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Crimson_Text, Inter } from "next/font/google";
import { SITE_URL, SITE_NAME, IS_INDEXABLE } from "@/lib/site";
// @ts-ignore: Allow importing global CSS without type declarations
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s — IIAP",
  },
  description:
    "Plataforma unificada de la Subdirección de Investigaciones del Instituto de Investigaciones Ambientales del Pacífico (IIAP). Planificación, Centros y Grupos de Investigación del Chocó Biogeográfico.",
  applicationName: SITE_NAME,
  keywords: [
    "IIAP",
    "investigación ambiental",
    "Chocó Biogeográfico",
    "Pacífico colombiano",
    "biodiversidad",
    "geoinformática",
    "PICIA",
  ],
  authors: [
    { name: "IIAP — Instituto de Investigaciones Ambientales del Pacífico" },
  ],
  creator: "IIAP",
  publisher: "IIAP",
  alternates: {
    canonical: "/",
  },
  // Indexable solo en la producción real (NEXT_PUBLIC_ALLOW_INDEXING=true).
  // En el preview de Render queda noindex/nofollow para no filtrarse a buscadores.
  robots: IS_INDEXABLE
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      }
    : { index: false, follow: false },
  icons: {
    icon: "/favicon.ico",
    apple: "/assets/logo-iiap.png",
  },
  openGraph: {
    title: SITE_NAME,
    description:
      "Conocimiento científico al servicio de la biodiversidad del Chocó Biogeográfico.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "/assets/logo-iiap.png",
        width: 512,
        height: 512,
        alt: "Instituto de Investigaciones Ambientales del Pacífico (IIAP)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description:
      "Conocimiento científico al servicio de la biodiversidad del Chocó Biogeográfico.",
    images: ["/assets/logo-iiap.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0B3D2C",
  colorScheme: "light",
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
      <body className="min-h-screen antialiased">
        <a href="#main-content" className="skip-link">
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
