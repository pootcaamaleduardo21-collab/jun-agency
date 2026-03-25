import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['600', '700', '800']
});

export const metadata: Metadata = {
  title: 'JUN - Agencia de Crecimiento Digital Riviera Maya | Estrategia y Conversión',
  description: 'Especialistas en crecimiento digital para real estate y turismo en Riviera Maya. Estrategia, contenido visual y posicionamiento que convierte.',
  keywords: 'agencia marketing digital Riviera Maya, marketing real estate, marketing turístico, agencia Playa del Carmen, crecimiento digital',
  metadataBase: new URL('https://jun.com.mx'),
  openGraph: {
    title: 'JUN - Agencia de Crecimiento Digital Riviera Maya',
    description: 'Construimos presencia digital con intención. Estrategia y conversión para proyectos, espacios y marcas.',
    url: 'https://jun.com.mx',
    siteName: 'JUN Agency',
    images: [
      {
        url: 'https://jun.com.mx/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'JUN - Agencia de Crecimiento Digital',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JUN - Agencia de Crecimiento Digital',
    description: 'Estrategia digital y conversión para real estate y turismo en Riviera Maya.',
    images: ['https://jun.com.mx/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://jun.com.mx',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${poppins.variable} scroll-smooth`}>
      <head>
        <link rel="canonical" href="https://jun.com.mx" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0A0A0A" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'JUN',
              url: 'https://jun.com.mx',
              description: 'Agencia especializada en crecimiento digital para real estate y turismo en Riviera Maya',
              sameAs: [
                'https://www.instagram.com/jun',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Sales',
                email: 'informes@jun.com.mx',
              },
            }),
          }}
        />
      </head>
      <body className="bg-black text-white font-inter antialiased">
        {children}
      </body>
    </html>
  );
}
