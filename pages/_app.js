import './globals.css';

/**
 * Componente principale dell'applicazione (Next.js Custom App)
 * Utilizzato per inizializzare le pagine e persistere i layout o il CSS globale.
 */
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
