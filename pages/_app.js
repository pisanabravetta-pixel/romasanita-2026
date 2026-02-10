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
{window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag(&#39;js&#39;, new Date()); gtag(&#39;config&#39;, &#39;G-2CNB67FYJG&#39;);}
</Script>

<Component {...pageProps} />
</>
);
}

export default MyApp;
