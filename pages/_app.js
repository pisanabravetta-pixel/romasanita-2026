import '../styles/globals.css';
import Script from 'next/script';

const GA_ID = 'G-2CNB67FYJG';
const CLARITY_ID = 'vq6n8jwbfg';

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

      {/* ── Microsoft Clarity ── heatmap e session recording */}
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_ID}");
        `}
      </Script>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
