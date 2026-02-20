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

  // LOGICA MAPPA LEAFLET - FIX DEFINITIVO
  useEffect(() => {
    if (dato && dato.lat && dato.lon && typeof L !== 'undefined') {
      // Pulizia eventuale mappa esistente
      const container = L.DomUtil.get('map-scheda');
      if (container != null) { container._leaflet_id = null; }

      const map = L.map('map-scheda', { 
        scrollWheelZoom: false,
        dragging: !L.Browser.mobile 
      }).setView([dato.lat, dato.lon], 16);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap'
      }).addTo(map);
      
      L.marker([dato.lat, dato.lon]).addTo(map)
        .bindPopup(`<b>${dato.nome}</b><br>${dato.indirizzo}`).openPopup();

      // Forza il ricalcolo delle dimensioni dopo il caricamento
      setTimeout(() => { map.invalidateSize(); }, 400);
    }
  }, [dato]);

  if (loading) return <div style={{padding: '100px', textAlign: 'center'}}>Caricamento...</div>;
  if (!dato) return <div style={{padding: '100px', textAlign: 'center'}}>Scheda non trovata.</div>;

  const nomeZona = dato.quartiere || dato.zona || "Roma";

  // --- I 3 TEMPLATE DIVERSI (Punto 1 degli appunti) ---
  const varianti = [
    `La ${dato.nome} è un presidio sanitario fondamentale per chi cerca ${dato.categoria} a Roma in zona ${nomeZona}. La struttura offre assistenza diretta in ${dato.indirizzo} e, per conoscere nel dettaglio i servizi offerti (come tamponi, autoanalisi o consulenze), consigliamo di contattare il personale. È possibile verificare se la struttura è aperta h24 o di domenica chiamando direttamente o inviando un messaggio WhatsApp per ricevere informazioni utili in tempo reale.`,
    `Se ti trovi nel quartiere ${nomeZona} e cerchi ${dato.categoria}, la ${dato.nome} in ${dato.indirizzo} è una delle opzioni disponibili a Roma. Per avere certezza sugli orari di apertura, inclusi i turni notturni (h24) o l'apertura domenicale, ti invitiamo a utilizzare i contatti telefonici o il tasto WhatsApp. Contattare direttamente la struttura è il modo più rapido per conoscere la disponibilità di servizi specifici e ricevere assistenza personalizzata.`,
    `Nel quadrante di Roma ${nomeZona}, la ${dato.nome} opera nel settore ${dato.categoria} fornendo supporto ai residenti locali. Situata precisamente in ${dato.indirizzo}, la struttura può essere contattata direttamente per ogni esigenza sanitaria. Se necessiti di sapere se è aperta la domenica, se effettua servizio h24 o per scoprire l'elenco completo dei servizi offerti, scrivi su WhatsApp o telefona in sede per parlare con un operatore e ricevere tutte le info utili.`
  ];
  
  // Sceglie il template in base all'ID (così ogni farmacia ha sempre lo stesso testo, ma diverso dalle vicine)
  const testoDinamico = varianti[dato.id % 3] || varianti[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Head>
        <title>{dato.nome} – {dato.categoria} Roma {nomeZona} | Contatti e Mappa</title>
        <meta name="description" content={`${dato.nome} in zona ${nomeZona} a Roma. Scopri i servizi offerti, contatta via WhatsApp o telefono per info su apertura h24 e domenica.`} />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      </Head>
      
      <Script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" strategy="afterInteractive" />

      <Navbar />

      <main style={{ flex: '1 0 auto', padding: '20px', maxWidth: '800px', margin: '0 auto', width: '100%', paddingBottom: '60px' }}>
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 2px 15px rgba(0,0,0,0.1)', border: '1px solid #eee' }}>
          
          <h1 style={{ color: '#111', fontSize: '1.8rem', fontWeight: '800', marginBottom: '5px' }}>{dato.nome}</h1>
          <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '20px' }}>{dato.categoria} a Roma {nomeZona}</p>

          <div style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '10px', marginBottom: '25px', borderLeft: '4px solid #16a34a' }}>
            <p style={{ lineHeight: '1.6', color: '#333', margin: 0 }}>
              <strong>Servizi e Informazioni:</strong> {testoDinamico}
            </p>
          </div>

          <div style={{ marginBottom: '25px' }}>
            <p style={{ margin: '5px 0' }}>📍 <strong>Indirizzo:</strong> {dato.indirizzo}</p>
            <p style={{ margin: '5px 0' }}>🏘️ <strong>Quartiere:</strong> {nomeZona}</p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
            <a href={`tel:${dato.telefono}`} style={{ flex: 1, minWidth: '150px', backgroundColor: '#16a34a', color: 'white', padding: '15px', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>CHIAMA ORA</a>
            {dato.whatsapp && (
              <a href={`https://wa.me/39${dato.whatsapp}`} style={{ flex: 1, minWidth: '150px', backgroundColor: '#25D366', color: 'white', padding: '15px', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>WHATSAPP</a>
            )}
          </div>

          <h2 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '15px' }}>Posizione su Mappa</h2>
          {/* IL DIV DELLA MAPPA DEVE AVERE UN ID UNICO E ALTEZZA DEFINITA */}
          <div id="map-scheda" style={{ height: '350px', width: '100%', borderRadius: '10px', border: '1px solid #ddd', zIndex: 1, marginBottom: '20px' }}></div>

          <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '30px 0' }} />
          
          <div style={{ textAlign: 'center' }}>
             <a href={`/${dato.categoria.toLowerCase().replace(/\s+/g, '-')}-roma-${nomeZona.toLowerCase().replace(/\s+/g, '-')}`} style={{ color: '#16a34a', fontWeight: 'bold', textDecoration: 'none' }}>
              ← Torna a {dato.categoria} {nomeZona}
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
