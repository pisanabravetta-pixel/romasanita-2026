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

  // FIX MAPPA: Caricamento Leaflet sicuro
  useEffect(() => {
    if (dato && dato.lat && dato.lon && typeof L !== 'undefined') {
      const container = L.DomUtil.get('map-scheda');
      if (container != null) { container._leaflet_id = null; } // Reset per evitare errori di inizializzazione

      const map = L.map('map-scheda', { scrollWheelZoom: false }).setView([dato.lat, dato.lon], 16);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap'
      }).addTo(map);
      
      L.marker([dato.lat, dato.lon]).addTo(map)
        .bindPopup(`<b>${dato.nome}</b><br>${dato.indirizzo}`).openPopup();
        
      setTimeout(() => { map.invalidateSize(); }, 500); // Forza il rendering corretto
    }
  }, [dato]);

  if (loading) return <div style={{padding: '100px', textAlign: 'center'}}>Caricamento...</div>;
  if (!dato) return <div style={{padding: '100px', textAlign: 'center'}}>Scheda non trovata.</div>;

  const nomeZona = dato.quartiere || dato.zona || "Roma";
  const cat = dato.categoria.toLowerCase();

  // VARIANTI TESTO OTTIMIZZATE (Keyword: H24, Domenica, WhatsApp, Servizi)
  const varianti = [
    `La ${dato.nome} è un punto di riferimento per chi cerca ${cat} a Roma in zona ${nomeZona}. La struttura offre assistenza nel quartiere e, per garantire la massima trasparenza sui servizi offerti, consigliamo di contattare direttamente il personale. È possibile richiedere informazioni su orari di apertura, disponibilità di farmaci o visite, e verificare se il servizio è attivo h24 o durante la domenica. Contatta la struttura tramite telefono o WhatsApp per ricevere assistenza immediata in ${dato.indirizzo}.`,
    `Se hai bisogno di una struttura specializzata come ${dato.nome} a ${nomeZona}, qui trovi i riferimenti aggiornati. Situata in ${dato.indirizzo}, questa attività opera nel settore ${cat} a Roma. Per conoscere i dettagli sulle prestazioni erogate o per urgenze notturne e festivi (apertura domenica), ti invitiamo a chiamare direttamente o inviare un messaggio WhatsApp. Riceverai tutte le informazioni utili sui servizi sanitari disponibili e sulle modalità di accesso alla struttura.`,
    `Cerchi ${cat} nel quartiere ${nomeZona}? La ${dato.nome} serve l'area di Roma con professionalità. Per ogni esigenza legata a servizi specialistici, disponibilità h24 o turni domenicali, il modo più veloce è contattare direttamente il titolare tramite i pulsanti in questa pagina. Inviando un WhatsApp o telefonando in sede in ${dato.indirizzo}, potrai ottenere chiarimenti su orari, costi e appuntamenti, evitando attese inutili e ricevendo un supporto diretto e qualificato.`
  ];
  const testoDinamico = varianti[dato.id % 3] || varianti[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Head>
        <title>{dato.nome} – {dato.categoria} Roma {nomeZona} | Contatti</title>
        <meta name="description" content={`${dato.nome} a Roma ${nomeZona}. Info su servizi offerti, apertura h24 o domenica. Contatta ora via WhatsApp o telefono.`} />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      </Head>
      
      <Script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" strategy="afterInteractive" />

      <Navbar />

      <main style={{ flex: '1 0 auto', padding: '20px', maxWidth: '850px', margin: '0 auto', width: '100%', paddingBottom: '60px' }}>
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #f1f5f9' }}>
          
          <h1 style={{ color: '#0f172a', fontSize: '1.8rem', fontWeight: '900', marginBottom: '5px' }}>{dato.nome}</h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '25px' }}>{dato.categoria} a Roma {nomeZona}</p>

          <div style={{ backgroundColor: '#f0fdf4', padding: '20px', borderRadius: '12px', marginBottom: '30px', borderLeft: '5px solid #22c55e' }}>
            <p style={{ lineHeight: '1.7', color: '#166534', margin: 0, fontSize: '1.05rem' }}>
              <strong>Nota informativa:</strong> {testoDinamico}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
            <div style={{ padding: '15px', background: '#f8fafc', borderRadius: '10px' }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 'bold', display: 'block' }}>INDIRIZZO</span>
              <span style={{ fontWeight: '700', color: '#1e293b' }}>{dato.indirizzo}</span>
            </div>
            <div style={{ padding: '15px', background: '#f8fafc', borderRadius: '10px' }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 'bold', display: 'block' }}>ZONA</span>
              <span style={{ fontWeight: '700', color: '#1e293b' }}>{nomeZona}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '35px' }}>
            <a href={`tel:${dato.telefono}`} style={{ flex: 1, minWidth: '160px', backgroundColor: '#059669', color: 'white', padding: '16px', borderRadius: '10px', textAlign: 'center', fontWeight: '900', textDecoration: 'none' }}>📞 CHIAMA ORA</a>
            {dato.whatsapp && (
              <a href={`https://wa.me/39${dato.whatsapp}`} style={{ flex: 1, minWidth: '160px', backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '10px', textAlign: 'center', fontWeight: '900', textDecoration: 'none' }}>💬 WHATSAPP</a>
            )}
          </div>

          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '15px' }}>Posizione e Mappa</h2>
          <div id="map-scheda" style={{ height: '350px', width: '100%', borderRadius: '12px', border: '1px solid #e2e8f0', zIndex: 1, marginBottom: '20px' }}></div>

          <p style={{ fontSize: '0.9rem', color: '#94a3b8', textAlign: 'center', fontStyle: 'italic' }}>
            Dati estratti da fonti pubbliche. Si consiglia di contattare la struttura per confermare orari e servizi.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
