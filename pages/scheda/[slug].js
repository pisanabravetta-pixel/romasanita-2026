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

const generaTestoSEO = () => {
  const v = dato.id % 3;
  const nome = dato.nome;
  const indirizzo = dato.indirizzo;
  const zona = nomeZona;
  const cat = categoria.toLowerCase();

  const isFarmacia = cat.includes("farmac");
  const isDentista = cat.includes("dent");
  const isDiagnostica = cat.includes("diagnost");
  const isDomicilio = cat.includes("domicilio");
  const isSpecialista = !isFarmacia && !isDentista && !isDiagnostica && !isDomicilio;

  // =========================
  // FARMACIE
  // =========================
  if (isFarmacia) {
    if (v === 0) {
      return `La ${nome} si trova in ${indirizzo}, nel quartiere ${zona} di Roma. 
Rappresenta un presidio sanitario territoriale a servizio dei residenti della zona. 
Per informazioni aggiornate su orari, turni o disponibilità di prodotti, è consigliabile contattare direttamente la farmacia.`;
    }
    if (v === 1) {
      return `Situata nel quartiere ${zona}, la ${nome} è una farmacia con sede in ${indirizzo}. 
Questa pagina riporta indirizzo e posizione per facilitarne l’individuazione. 
Per dettagli operativi o chiarimenti sui servizi disponibili è opportuno rivolgersi direttamente al punto vendita.`;
    }
    return `Nel territorio di Roma ${zona} è presente la ${nome}, con sede in ${indirizzo}. 
La farmacia offre supporto sanitario di prossimità per i cittadini della zona. 
Per ricevere informazioni specifiche si invita a utilizzare i contatti ufficiali indicati in pagina.`;
  }

  // =========================
  // DENTISTI
  // =========================
  if (isDentista) {
    if (v === 0) {
      return `${nome} opera come studio odontoiatrico nel quartiere ${zona} di Roma, in ${indirizzo}. 
La scheda consente di visualizzare la posizione e accedere ai recapiti ufficiali. 
Per informazioni su visite o trattamenti è necessario contattare direttamente lo studio.`;
    }
    if (v === 1) {
      return `Lo studio dentistico ${nome} si trova in ${indirizzo}, zona ${zona} a Roma. 
Questa pagina riporta le informazioni utili per individuare la sede e mettersi in contatto con il professionista. 
Per conoscere modalità di prenotazione o disponibilità è consigliato rivolgersi direttamente alla struttura.`;
    }
    return `Nel quartiere ${zona} di Roma è presente ${nome}, realtà odontoiatrica con sede in ${indirizzo}. 
La localizzazione precisa e i recapiti consentono un contatto diretto con lo studio per ogni informazione necessaria.`;
  }

  // =========================
  // DIAGNOSTICA
  // =========================
  if (isDiagnostica) {
    if (v === 0) {
      return `${nome} è una struttura di diagnostica situata in ${indirizzo}, nel quartiere ${zona} di Roma. 
La scheda fornisce i riferimenti utili per individuare la sede e richiedere informazioni direttamente alla struttura.`;
    }
    if (v === 1) {
      return `Situato a Roma ${zona}, in ${indirizzo}, ${nome} rientra tra i centri di diagnostica presenti sul territorio. 
Per conoscere modalità di accesso o informazioni operative è consigliabile contattare direttamente la sede.`;
    }
    return `Nel quartiere ${zona} opera ${nome}, centro di diagnostica con sede in ${indirizzo}. 
La pagina consente di visualizzare la posizione e accedere ai recapiti ufficiali per ogni richiesta informativa.`;
  }

  // =========================
  // SERVIZI A DOMICILIO
  // =========================
  if (isDomicilio) {
    if (v === 0) {
      return `${nome} fornisce servizi a domicilio nell’area di Roma ${zona}. 
La sede amministrativa risulta in ${indirizzo}. 
Per informazioni sulle modalità di intervento o disponibilità è necessario contattare direttamente il servizio.`;
    }
    if (v === 1) {
      return `Operativo nel quartiere ${zona} di Roma, ${nome} offre servizi sanitari a domicilio. 
La pagina riporta i recapiti utili per richiedere informazioni direttamente al referente del servizio.`;
    }
    return `${nome} è attivo nell’area di Roma ${zona} per servizi a domicilio, con riferimento in ${indirizzo}. 
Per dettagli organizzativi o richieste specifiche si invita a contattare direttamente la struttura.`;
  }

  // =========================
  // SPECIALISTI (7 categorie)
  // =========================
  if (v === 0) {
    return `${nome} opera come ${categoria} nel quartiere ${zona} di Roma, con studio in ${indirizzo}. 
La scheda riporta la localizzazione e i riferimenti utili per contattare direttamente il professionista.`;
  }
  if (v === 1) {
    return `Lo studio di ${nome}, specializzato in ${categoria}, si trova in ${indirizzo} a Roma ${zona}. 
Questa pagina consente di individuare facilmente la sede e accedere ai recapiti ufficiali.`;
  }
  return `Nel territorio di Roma ${zona} è presente ${nome}, ${categoria}, con sede in ${indirizzo}. 
Per informazioni su attività e disponibilità è opportuno rivolgersi direttamente allo studio tramite i contatti indicati.`;
};

<h2 style={{fontSize: '1.1rem', fontWeight: '700', marginTop: '20px'}}>
Informazioni su {dato.nome} a Roma {nomeZona}
</h2>
  // --- SCHEMA JSON-LD DINAMICO ---
  const schemaType = categoria.toLowerCase().includes('farmac') ? 'Pharmacy' : 
                     (categoria.toLowerCase().includes('dentist') ? 'Dentist' : 'Physician');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Head>
        <title>{dato.nome} – {categoria} a Roma {nomeZona} | Indirizzo e Posizione</title>
        <meta name="description" content={`${dato.nome} a Roma quartiere ${nomeZona}. Indirizzo: ${dato.indirizzo}. Contatti diretti e posizione sulla mappa per ${categoria}.`} />
        <link rel="canonical" href={`https://www.servizisalute.com/scheda/${dato.slug}`} />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": schemaType,
      "name": dato.nome,
      "url": `https://www.servizisalute.com/scheda/${dato.slug}`,
      "telephone": dato.telefono || "",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": dato.indirizzo,
        "addressLocality": "Roma",
        "addressRegion": "Lazio",
        "postalCode": "00100",
        "addressCountry": "IT"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": dato.lat,
        "longitude": dato.lng
      }
    })
  }}
/>
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
