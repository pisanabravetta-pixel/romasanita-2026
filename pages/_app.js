import '../styles/globals.css';
import Script from 'next/script';

const GA_ID = 'G-2CNB67FYJG';

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* ── Google Analytics 4 ── caricato su tutte le pagine */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            send_page_view: true,
            cookie_flags: 'SameSite=None;Secure'
          });
        `}
      </Script>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
