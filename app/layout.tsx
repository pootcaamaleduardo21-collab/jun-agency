import type { Metadata, Viewport } from 'next'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://junmkt.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'JUN - Estrategia Digital para Real Estate y Turismo | Riviera Maya',
  description: 'Especialistas en crecimiento digital para real estate, turismo y marcas experienciales en la Riviera Maya. Construimos presencia digital con dirección y conversión.',
  keywords: [
    'agencia de marketing digital',
    'marketing para real estate',
    'marketing turístico',
    'agencia digital Riviera Maya',
    'agencia marketing digital Playa del Carmen',
    'creación de contenido',
    'recorridos virtuales 360',
    'estrategia digital',
    'posicionamiento de marcas',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: siteUrl,
    siteName: 'JUN',
    title: 'JUN - Estrategia Digital para Real Estate y Turismo | Riviera Maya',
    description: 'Especialistas en crecimiento digital para real estate, turismo y marcas experienciales en la Riviera Maya. Construimos presencia digital con dirección y conversión.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'JUN - Agencia de Marketing Digital',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JUN - Estrategia Digital para Real Estate y Turismo | Riviera Maya',
    description: 'Especialistas en crecimiento digital para real estate, turismo y marcas experienciales.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es-MX">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={siteUrl} />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body className="bg-jun-light">
        {children}
      </body>
    </html>
  )
}
