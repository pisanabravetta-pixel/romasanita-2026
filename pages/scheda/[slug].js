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

// 1. Cambia lo Script in Head o subito sotto (togli lazyOnload)
<Script 
  src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" 
  strategy="beforeInteractive" // Carica prima del resto per essere pronti
/>

// 2. Sostituisci lo useEffect della mappa con questo che ha il controllo "retry"
useEffect(() => {
  if (!dato || !dato.lat || !dato.lng) return;

  const initMap = () => {
    // Controllo se Leaflet è pronto
    if (typeof L === 'undefined') {
      setTimeout(initMap, 200); // Riprova tra 200ms se non è ancora pronto
      return;
    }

    // Pulizia
    const container = L.DomUtil.get('map-scheda');
    if (container != null) { container._leaflet_id = null; }
    if (window.mapInstance) { window.mapInstance.remove(); }

    try {
      const map = L.map('map-scheda', { 
        scrollWheelZoom: false 
      }).setView([parseFloat(dato.lat), parseFloat(dato.lng)], 16);
      
      window.mapInstance = map;

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OSM'
      }).addTo(map);

      L.marker([parseFloat(dato.lat), parseFloat(dato.lng)])
        .addTo(map)
        .bindPopup(`<b>${dato.nome}</b>`)
        .openPopup();

      setTimeout(() => { map.invalidateSize(); }, 500);
    } catch (e) {
      console.error("Errore mappa:", e);
    }
  };

  initMap();

  return () => {
    if (window.mapInstance) {
      window.mapInstance.remove();
      window.mapInstance = null;
    }
  };
}, [dato]);

  if (loading) return <div style={{padding: '100px', textAlign: 'center'}}>Caricamento...</div>;
  if (!dato) return <div style={{padding: '100px', textAlign: 'center'}}>Scheda non trovata.</div>;

  const nomeZona = dato.quartiere || dato.zona || "Roma";

  // TRE TEMPLATE DIFFERENTI (Punto 1 Appunti) - Con Keyword WhatsApp, h24, Domenica
  const varianti = [
    `La ${dato.nome} è un presidio sanitario specializzato in ${dato.categoria} situato nel cuore di Roma, zona ${nomeZona}. In ${dato.indirizzo}, la struttura offre assistenza dedicata e servizi professionali. Per informazioni su orari di apertura, turni della domenica o disponibilità h24, è fondamentale contattare direttamente la struttura tramite telefono o WhatsApp. Riceverai supporto immediato per ogni tua esigenza sanitaria o per prenotare una prestazione specifica nel quartiere ${nomeZona}.`,
    `Se cerchi ${dato.categoria} a Roma ${nomeZona}, la ${dato.nome} rappresenta una scelta di prossimità in ${dato.indirizzo}. Questa attività fornisce servizi essenziali per la salute dei cittadini. Consigliamo di contattare direttamente il titolare tramite WhatsApp o chiamata telefonica per ricevere informazioni aggiornate sui servizi offerti e verificare l'apertura domenicale o il servizio h24. Il contatto diretto garantisce velocità e precisione per ogni necessità di cura a ${nomeZona}.`,
    `Situata in ${dato.indirizzo}, la ${dato.nome} opera nella categoria ${dato.categoria} servendo l'area di Roma ${nomeZona}. La struttura è inserita nella nostra guida per facilitare il reperimento di contatti utili. Per urgenze, turni h24 o per sapere se l'attività è aperta la domenica, ti invitiamo a cliccare sui tasti di contatto diretto. Chiamando o scrivendo via WhatsApp, potrai parlare con il personale specializzato e ottenere chiarimenti su tutti i servizi sanitari e le disponibilità correnti.`
  ];
  const testoDinamico = varianti[dato.id % 3] || varianti[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>{dato.nome} – {dato.categoria} Roma {nomeZona}</title>
        <meta name="description" content={`${dato.nome} a Roma ${nomeZona}. Info servizi, apertura h24 o domenica. Contatta ora via WhatsApp o telefono in ${dato.indirizzo}.`} />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      </Head>
      
      <Script 
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" 
        strategy="lazyOnload" 
      />

      <Navbar />

      <main style={{ flex: '1 0 auto', padding: '20px', maxWidth: '850px', margin: '0 auto', width: '100%', paddingBottom: '60px' }}>
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
          
          <h1 style={{ color: '#1e293b', fontSize: '2rem', fontWeight: '900', marginBottom: '5px' }}>{dato.nome}</h1>
          <p style={{ color: '#64748b', fontSize: '1.2rem', marginBottom: '25px', fontWeight: '600' }}>{dato.categoria} — Roma {nomeZona}</p>

          <div style={{ backgroundColor: '#f0f9ff', padding: '25px', borderRadius: '12px', marginBottom: '35px', borderLeft: '6px solid #0284c7' }}>
            <p style={{ lineHeight: '1.8', color: '#334155', margin: 0, fontSize: '1.1rem' }}>
              <strong>Dettagli e Servizi:</strong> {testoDinamico}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '35px' }}>
            <div style={{ padding: '15px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 'bold', display: 'block' }}>INDIRIZZO</span>
              <span style={{ fontWeight: '700', color: '#1e293b' }}>{dato.indirizzo}</span>
            </div>
            <div style={{ padding: '15px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 'bold', display: 'block' }}>ZONA / QUARTIERE</span>
              <span style={{ fontWeight: '700', color: '#1e293b' }}>{nomeZona}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '40px' }}>
            <a href={`tel:${dato.telefono}`} style={{ flex: 1, minWidth: '150px', backgroundColor: '#059669', color: 'white', padding: '18px', borderRadius: '12px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', fontSize: '1.1rem' }}>📞 CHIAMA ORA</a>
            {dato.whatsapp && (
              <a href={`https://wa.me/39${dato.whatsapp}`} style={{ flex: 1, minWidth: '150px', backgroundColor: '#22c55e', color: 'white', padding: '18px', borderRadius: '12px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', fontSize: '1.1rem' }}>💬 WHATSAPP</a>
            )}
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '15px', color: '#1e293b' }}>Mappa e Indicazioni</h2>
          <div id="map-scheda" style={{ height: '380px', width: '100%', borderRadius: '12px', border: '1px solid #e2e8f0', zIndex: 1, marginBottom: '10px' }}></div>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', textAlign: 'center', marginBottom: '40px' }}>Visualizzazione GPS di {dato.nome} a Roma {nomeZona}</p>

          <div style={{ textAlign: 'center', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
            <a href={`/${dato.categoria.toLowerCase().replace(/\s+/g, '-')}-roma-${nomeZona.toLowerCase().replace(/\s+/g, '-')}`} style={{ color: '#0284c7', fontWeight: '800', textDecoration: 'none' }}>
              ← Torna all'elenco di {dato.categoria} a {nomeZona}
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
