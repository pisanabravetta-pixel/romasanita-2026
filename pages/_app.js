import '../styles/globals.css';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  const googleCode = "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-2CNB67FYJG');";

  return (
    <>
      {/* Script principale di Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-2CNB67FYJG"
        strategy="afterInteractive"
      />
      {/* Configurazione dello script */}
      <Script id="google-analytics" strategy="afterInteractive">
        {googleCode}
      </Script>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
