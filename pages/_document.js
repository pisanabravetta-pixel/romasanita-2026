import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="it">
      <Head>
        {/* Preconnessioni — risorse effettivamente usate */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link rel="preconnect" href="https://mkmyadztjcnebrhuzdka.supabase.co" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />

        {/* Google Fonts — non-blocking */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
          media="print"
          onLoad="this.media='all'"
        />
        {/* Noscript fallback per font */}
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
        </noscript>
      </Head>
      <body style={{ margin: 0, padding: 0 }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
