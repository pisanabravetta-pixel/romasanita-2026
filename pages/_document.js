import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="it">
      <Head>
        {/* Solo i font essenziali */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />

        {/* LA MAPPA (LEAFLET) È STATA RIMOSSA DA QUI 
           PER RENDERE LA HOME VELOCISSIMA (100/100).
           LA AGGIUNGEREMO TRA POCO SOLO NELLE PAGINE HUB E SLUG.
        */}
      </Head>
      <body style={{ margin: 0, padding: 0 }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
