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

  // --- LOGICA MAPPA FUNZIONANTE (DALLA PAGINA QUARTIERE) ---
  useEffect(() => {
    if (!dato || !dato.lat || !dato.lng) return;

    const caricaMappa = () => {
      if (typeof L === 'undefined') {
        setTimeout(caricaMappa, 200);
        return;
      }
      const container = L.DomUtil.get('map-scheda');
      if (container) { container._leaflet_id = null; }
      if (window.mapInstance) { window.mapInstance.remove(); }

      try {
        const lat = parseFloat(dato.lat);
        const lng = parseFloat(dato.lng);
        const map = L.map('map-scheda', { scrollWheelZoom: false }).setView([lat, lng], 16);
        window.mapInstance = map;

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '© OSM'
        }).addTo(map);

        L.marker([lat, lng]).addTo(map).bindPopup(`<b>${dato.nome}</b>`).openPopup();
        setTimeout(() => { map.invalidateSize(); }, 400);
      } catch (e) { console.error("Errore mappa:", e); }
    };
    caricaMappa();
    return () => { if (window.mapInstance) { window.mapInstance.remove(); window.mapInstance = null; } };
  }, [dato]);

  if (loading) return <div style={{padding: '100px', textAlign: 'center'}}>Caricamento...</div>;
  if (!dato) return <div style={{padding: '100px', textAlign: 'center'}}>Scheda non trovata.</div>;

  const nomeZona = dato.quartiere || dato.zona || "Roma";
  const categoria = dato.categoria || "Specialista";
  const catSlug = categoria.toLowerCase().replace(/\s+/g, '-');
  const zonaSlug = nomeZona.toLowerCase().replace(/\s+/g, '-');

  // --- GENERAZIONE TESTO SEO DINAMICO (200+ PAROLE) ---
  const generaTestoSEO = () => {
    const v = dato.id % 3; // Rotazione varianti per evitare duplicati
    if (categoria.toLowerCase().includes('farmac')) {
      return [
        `La ${dato.nome} è una farmacia situata nel quartiere ${nomeZona}, a Roma, precisamente in ${dato.indirizzo}. Rappresenta un presidio sanitario fondamentale per i residenti della zona ${nomeZona} e delle aree limitrofe, offrendo supporto e assistenza quotidiana. Le farmacie a Roma svolgono un ruolo essenziale nella distribuzione di farmaci e nella consulenza sanitaria territoriale. Questa struttura è inserita nel nostro elenco professionale con posizione GPS verificata per permettere una consultazione semplice.`,
        `Situata in ${dato.indirizzo}, nel cuore del quartiere ${nomeZona} di Roma, la ${dato.nome} rientra tra le strutture farmaceutiche di riferimento della zona. La posizione strategica consente ai cittadini di ${nomeZona} di raggiungere facilmente la sede per ogni esigenza di salute. In una città complessa come Roma, avere un punto di riferimento per la categoria ${categoria} nel proprio quartiere è un vantaggio per la prevenzione e la cura dei pazienti.`,
        `Nel quartiere ${nomeZona} a Roma è presente la ${dato.nome}, con sede operativa in ${dato.indirizzo}. Questa attività è inclusa nell'elenco aggiornato delle farmacie locali della zona ${nomeZona}. Grazie ai recapiti diretti presenti in questa scheda, è possibile contattare la struttura per verificare la disponibilità di prodotti o orari di apertura. La presenza di ${categoria} in questa area di Roma garantisce una copertura sanitaria capillare.`
      ][v];
    }
    // Variant per Specialisti / Medici
    return [
      `Il profilo professionale di ${dato.nome} riguarda la categoria ${categoria} nel quartiere ${nomeZona} a Roma. L'attività viene svolta presso la sede in ${dato.indirizzo}, dove il professionista riceve i pazienti della zona ${nomeZona} e di tutta la Capitale. La scelta di uno specialista in ${categoria} a Roma è un passo importante per la salute e la prevenzione. Questa scheda fornisce i dettagli necessari per individuare la posizione esatta e i contatti diretti per richiedere informazioni su visite e appuntamenti.`,
      `Se cerchi un esperto in ${categoria} a Roma zona ${nomeZona}, la struttura ${dato.nome} situata in ${dato.indirizzo} offre servizi dedicati alla cura del paziente. Operando nel quadrante di ${nomeZona}, questo profilo si inserisce nel network sanitario locale di Roma per agevolare l'accesso alle cure specialistiche. Si consiglia di contattare direttamente il professionista tramite i pulsanti chiama o WhatsApp per conoscere le disponibilità orarie e i dettagli sulle prestazioni offerte.`,
      `${dato.nome} opera come ${categoria} a Roma, servendo con professionalità il quartiere ${nomeZona}. La sede si trova in ${dato.indirizzo}, un punto facilmente raggiungibile per chi risiede a ${nomeZona} o nelle zone vicine. In questa pagina sono riportati i dati pubblici relativi a ${dato.nome}, inclusa la mappa interattiva per agevolare il raggiungimento dello studio. Contattare un professionista in ${categoria} nella propria zona di residenza a Roma permette di ottimizzare i tempi di attesa e ricevere assistenza rapida.`
    ][v];
  };

  // --- SCHEMA JSON-LD DINAMICO ---
  const schemaType = categoria.toLowerCase().includes('farmac') ? 'Pharmacy' : 
                     (categoria.toLowerCase().includes('dentist') ? 'Dentist' : 'Physician');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Head>
        <title>{dato.nome} – {categoria} a Roma {nomeZona} | Indirizzo e Posizione</title>
        <meta name="description" content={`${dato.nome} a Roma quartiere ${nomeZona}. Indirizzo: ${dato.indirizzo}. Contatti diretti e posizione sulla mappa per ${categoria}.`} />
        <link rel="canonical" href={`https://www.servizisalute.com/${catSlug}-roma-${zonaSlug}/${dato.slug}`} />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": schemaType,
          "name": dato.nome,
          "address": { "@type": "PostalAddress", "streetAddress": dato.indirizzo, "addressLocality": "Roma", "addressRegion": "Lazio", "postalCode": "00100" },
          "geo": { "@type": "GeoCoordinates", "latitude": dato.lat, "longitude": dato.lng }
        })}} />
      </Head>
      
      <Script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" strategy="afterInteractive" />
      <Navbar />

      <main style={{ flex: '1 0 auto', padding: '20px', maxWidth: '850px', margin: '0 auto', width: '100%' }}>
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
          
          <h1 style={{ color: '#1e293b', fontSize: '1.8rem', fontWeight: '900', marginBottom: '10px', lineHeight: '1.2' }}>
            {dato.nome} – {categoria} a {nomeZona}, Roma
          </h1>

          <div style={{ marginBottom: '30px', lineHeight: '1.8', color: '#475569', fontSize: '1.05rem' }}>
            <p>{generaTestoSEO()}</p>
          </div>

          <div style={{ backgroundColor: '#f1f5f9', padding: '20px', borderRadius: '12px', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '15px', color: '#1e293b' }}>Informazioni Principali</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '10px' }}><strong>📍 Indirizzo:</strong> {dato.indirizzo}</li>
              <li style={{ marginBottom: '10px' }}><strong>🏠 Zona:</strong> {nomeZona}</li>
              <li style={{ marginBottom: '10px' }}><strong>🩺 Categoria:</strong> {categoria}</li>
            </ul>
          </div>

          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '40px' }}>
            <a href={`tel:${dato.telefono}`} style={{ flex: 1, minWidth: '160px', backgroundColor: '#0284c7', color: 'white', padding: '16px', borderRadius: '12px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>CHIAMA ORA</a>
            {dato.whatsapp && (
              <a href={`https://wa.me/39${dato.whatsapp}`} style={{ flex: 1, minWidth: '160px', backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '12px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>WHATSAPP</a>
            )}
          </div>

          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '15px', color: '#1e293b' }}>Posizione sulla mappa</h2>
          <div id="map-scheda" style={{ height: '400px', width: '100%', borderRadius: '12px', border: '1px solid #cbd5e1', zIndex: 1, filter: 'grayscale(0.2) contrast(1.1) brightness(0.95)' }}></div>

          <hr style={{ margin: '40px 0', border: '0', borderTop: '1px solid #e2e8f0' }} />
          
          <p style={{ textAlign: 'center' }}>
            ← <a href={`/${catSlug}-roma-${zonaSlug}`} style={{ color: '#0284c7', fontWeight: '700', textDecoration: 'none' }}>Torna a {categoria} {nomeZona}</a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
