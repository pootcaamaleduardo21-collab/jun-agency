import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://junmkt.com'),
  title: 'JUN | Agencia de Marketing Digital en la Riviera Maya',
  description:
    'Especialistas en crecimiento digital para real estate y turismo en la Riviera Maya. Estrategia, contenido y conversión orientadas a posicionar mejor tu proyecto o marca.',
  keywords: [
    'agencia de marketing digital en la Riviera Maya',
    'marketing para real estate en Mexico',
    'marketing turístico Riviera Maya',
    'agencia digital en Playa del Carmen',
    'creación de contenido para real estate',
    'recorridos virtuales 360 en la Riviera Maya',
    'posicionamiento digital Quintana Roo',
    'estrategia digital inmobiliaria',
    'JUN agencia marketing',
    'marketing hoteles Riviera Maya',
  ],
  authors: [{ name: 'JUN Agency' }],
  creator: 'JUN Agency',
  publisher: 'JUN Agency',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    url: 'https://junmkt.com',
    title: 'JUN | Agencia de Marketing Digital en la Riviera Maya',
    description:
      'Especialistas en crecimiento digital para real estate y turismo. Construimos presencia digital con intención.',
    siteName: 'JUN Agency',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'JUN Agency — Marketing Digital Riviera Maya',
      },
    ],
    locale: 'es_MX',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JUN | Agencia de Marketing Digital en la Riviera Maya',
    description:
      'Especialistas en crecimiento digital para real estate y turismo en la Riviera Maya',
    images: ['/og-image.jpg'],
    creator: '@junagency',
  },
  alternates: {
    canonical: 'https://junmkt.com',
  },
};

const schemaOrg = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://junmkt.com/#organization',
      name: 'JUN Agency',
      description:
        'Agencia de marketing digital especializada en crecimiento digital para real estate y turismo en la Riviera Maya',
      url: 'https://junmkt.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://junmkt.com/logo.png',
      },
      sameAs: [
        'https://www.instagram.com/junagency',
        'https://www.facebook.com/junagency',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        email: 'informesjunmkt@gmail.com',
        telephone: '+52-985-108-9671',
        availableLanguage: 'Spanish',
      },
      areaServed: {
        '@type': 'GeoShape',
        name: 'Riviera Maya, Quintana Roo, México',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://junmkt.com/#website',
      url: 'https://junmkt.com',
      name: 'JUN Agency',
      publisher: { '@id': 'https://junmkt.com/#organization' },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://junmkt.com/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: '¿Trabajan solo con proyectos de la Riviera Maya?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No exclusivamente. Aunque somos especialistas en el mercado de la Riviera Maya, trabajamos con proyectos de otros destinos que tengan características similares: mercado competitivo, audiencia sofisticada y necesidad de diferenciarse.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Qué tipo de servicios puede incluir JUN?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Estrategia digital, campañas publicitarias, creación y producción de contenido, posicionamiento de marca, recorridos virtuales 360° y optimización continua. Los servicios se adaptan a lo que tu proyecto necesita en este momento.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Pueden trabajar con proyectos desde cero o en etapa de lanzamiento?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sí. Muchos de nuestros clientes nos contactan cuando están desarrollando su proyecto. Nos encanta ayudar a posicionar desde el inicio — es cuando más impacto tiene una estrategia bien construida.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Ofrecen solo contenido o también estrategia?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Siempre estrategia primero. Creemos que el contenido sin dirección estratégica es ruido. Cada proyecto arranca con un diagnóstico, y el contenido se alinea a esa dirección para generar resultados reales.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Cómo sé si mi proyecto encaja con JUN?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Si tu proyecto tiene calidad, visión de crecimiento y necesitas mejorar tu presencia digital, probablemente sí encajas. Lo mejor es que solicites un diagnóstico estratégico sin compromiso — ahí lo vemos juntos.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} scroll-smooth`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#080808" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
