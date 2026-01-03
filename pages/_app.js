import './globals.css' // Ho tolto ../styles/ perché ora il file è nella stessa cartella

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
