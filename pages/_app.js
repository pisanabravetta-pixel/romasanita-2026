import '../styles/globals.css';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
return (
<>
<Script
src=""
strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
{window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-2CNB67FYJG');}
</Script>
<Component {...pageProps} />
</>
);
}

export default MyApp;
