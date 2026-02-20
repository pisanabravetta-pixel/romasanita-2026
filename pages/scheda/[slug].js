import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import Script from "next/script";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { supabase } from "../../lib/supabaseClient";

export default function SchedaProfessionale() {
  const router = useRouter();
  const { slug } = router.query;
  const [dato, setDato] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    async function fetchDati() {
      try {
        const { data } = await supabase.from("annunci").select("*").eq("slug", slug).single();
        if (data) setDato(data);
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    }
    fetchDati();
  }, [slug]);

  // MAPPA RIPRISTINATA (Logica standard funzionante)
  useEffect(() => {
    if (typeof L !== 'undefined' && dato && (dato.lat || dato.latitudine) && (dato.lng || dato.lon || dato.longitudine)) {
      const latitude = parseFloat(dato.lat || dato.latitudine);
      const longitude = parseFloat(dato.lng || dato.lon || dato.longitudine);

      if (window.mapInstance) { window.mapInstance.remove(); }
      
      const map = L.map('map-scheda', { scrollWheelZoom: false }).setView([latitude, longitude], 16);
      window.mapInstance = map;
      
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OSM'
      }).addTo(map);

      L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup(`<b>${dato.nome}</b>`)
        .openPopup();

      setTimeout(() => { map.invalidateSize(); }, 500);
    }
  }, [dato]);

  if (loading) return <div style={{padding: '100px', textAlign: 'center'}}>Caricamento...</div>;
  if (!dato) return <div style={{padding: '100px', textAlign: 'center'}}>Scheda non trovata.</div>;

  const nomeZona = dato.quartiere || dato.zona || "Roma";
  const catPulita = (dato.categoria || "").replace(/-/g, ' ').toUpperCase();

  // TEMPLATE CON KEYWORD OBBLIGATORIE (Aperta Domenica, h24, WhatsApp)
  const varianti = [
    `La struttura **${dato.nome}** opera a Roma in zona **${nomeZona}** per la categoria **${catPulita}**. Per sapere se è **aperta la domenica**, se effettua servizio **h24** o per conoscere la disponibilità di farmaci e visite urgenti, è necessario contattare direttamente la sede. Inviando un messaggio **WhatsApp** o telefonando al numero indicato, potrai ricevere assistenza immediata e dettagli sugli orari aggiornati in **${dato.indirizzo}**.`,
    `Se cerchi **${catPulita}** nel quartiere **${nomeZona}**, la **${dato.nome}** in **${dato.indirizzo}** è il punto di riferimento più vicino. Per informazioni su **turni domenicali**, disponibilità **h24** o per prenotare una prestazione specifica, ti invitiamo a cliccare sui tasti di contatto diretto. Parlare con il personale tramite **WhatsApp** o telefono ti permetterà di verificare l'effettiva apertura e i servizi sanitari attivi oggi.`,
    `In **${dato.indirizzo}** troviamo la **${dato.nome}**, specializzata in **${catPulita}** a Roma (**${nomeZona}**). La scheda fornisce i recapiti per parlare subito con un operatore: contattali ora per sapere se la struttura è **aperta la domenica**, se offre reperibilità **h24** o per urgenze mediche. Il contatto via **WhatsApp** o chiamata garantisce una risposta rapida su ogni esigenza di salute e orari di ricezione.`
  ];
  const testoDinamico = varianti[dato.id % 3] || varianti[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>{dato.nome} – {catPulita} Roma {nomeZona}</title>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      </Head>
      
      <Script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" strategy="lazyOnload" />

      <Navbar />

      <main style={{ flex: '1 0 auto', padding: '20px', maxWidth: '850px', margin: '0 auto', width: '100%' }}>
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
          <h1 style={{ color: '#1e293b', fontSize: '1.8rem', fontWeight: '900', marginBottom: '5px' }}>{dato.nome}</h1>
          <p style={{ color: '#0284c7', fontSize: '1.1rem', marginBottom: '25px', fontWeight: '700' }}>{catPulita} — ROMA {nomeZona.toUpperCase()}</p>

          <div style={{ backgroundColor: '#f0f9ff', padding: '25px', borderRadius: '12px', marginBottom: '35px', borderLeft: '6px solid #0284c7' }}>
            <p style={{ lineHeight: '1.8', color: '#334155', margin: 0, fontSize: '1.1rem' }}>
              {testoDinamico.replace(/\*\*/g, '')}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '15px', marginBottom: '40px' }}>
            <a href={`tel:${dato.telefono}`} style={{ flex: 1, backgroundColor: '#059669', color: 'white', padding: '18px', borderRadius: '12px', textAlign: 'center', fontWeight: '900', textDecoration: 'none' }}>📞 CHIAMA ORA</a>
            {dato.whatsapp && (
              <a href={`https://wa.me/39${dato.whatsapp}`} style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '18px', borderRadius: '12px', textAlign: 'center', fontWeight: '900', textDecoration: 'none' }}>💬 WHATSAPP</a>
            )}
          </div>

          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '15px' }}>Mappa e Indicazioni</h2>
          <div id="map-scheda" style={{ height: '380px', width: '100%', borderRadius: '12px', border: '1px solid #e2e8f0', zIndex: 1 }}></div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
