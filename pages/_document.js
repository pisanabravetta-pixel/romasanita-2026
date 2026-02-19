import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="it">
     <Head>
  {/* Preconnessioni centralizzate (UNA sola volta per tutto il sito) */}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
  <link rel="preconnect" href="https://images.unsplash.com" /> {/* Aggiungilo qui */}

  <link 
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" 
  rel="stylesheet" 
  media="print" 
  onLoad="this.media='all'" 
/>
  
</Head>
      <body style={{ margin: 0, padding: 0 }}>
        <Main />
        <NextScript />
 
     <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" 
          media="print" 
          onLoad="this.media='all'" 
        />
      </body>
    </Html>
  )
}
