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

  // LA TUA MAPPA FUNZIONANTE (NON TOCCARE)
  useEffect(() => {
    if (!dato || !dato.lat || !dato.lng) return;

    const initMap = () => {
      if (typeof L === 'undefined') {
        setTimeout(initMap, 200); 
        return;
      }

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

  // PULIZIA CATEGORIA PER I TESTI
  const getCatPulita = (cat) => {
    if (!cat) return "Servizi Sanitari";
    let c = cat.toLowerCase();
    if (c.includes('(')) return c.split('(')[1].replace(')', '').trim().toUpperCase();
    if (c.includes('servizi-domicilio')) return "SERVIZI A DOMICILIO";
    return c.replace(/-/g, ' ').toUpperCase();
  };
  const categoriaDisplay = getCatPulita(dato.categoria);

  // TESTI CON KEYWORD OBBLIGATORIE
  const varianti = [
    `La struttura **${dato.nome}** è un presidio specializzato in **${categoriaDisplay}** situato a Roma, zona **${nomeZona}**. Presso la sede in **${dato.indirizzo}**, è possibile ricevere assistenza dedicata. Per sapere se l'attività è **aperta la domenica**, se effettua servizio **h24** o per urgenze, è fondamentale contattare direttamente il personale tramite **WhatsApp** o telefono. Riceverai supporto immediato per ogni tua esigenza nel quartiere ${nomeZona}.`,
    `Se cerchi esperti in **${categoriaDisplay}** a Roma ${nomeZona}, la **${dato.nome}** in **${dato.indirizzo}** rappresenta una scelta di prossimità. Consigliamo di contattare il titolare via **WhatsApp** o chiamata per verificare l'**apertura domenicale**, la disponibilità **h24** o per prenotare una visita specialistica. Il contatto diretto garantisce velocità e precisione per ogni necessità di cura.`,
    `Situata in **${dato.indirizzo}**, la **${dato.nome}** opera nella categoria **${categoriaDisplay}** servendo l'area di Roma **${nomeZona}**. Per conoscere i turni, sapere se è **aperta la domenica** o se il servizio è attivo **h24**, ti invitiamo a cliccare sui tasti di contatto rapido. Parlare con il personale via **WhatsApp** ti permetterà di ottenere chiarimenti immediati su prestazioni e disponibilità.`
  ];
  const testoDinamico = varianti[dato.id % 3] || varianti[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>{dato.nome} – {categoriaDisplay} Roma {nomeZona}</title>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      </Head>
      
      {/* SCRIPT STRATEGY PER SICUREZZA MAPPA */}
      <Script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" strategy="beforeInteractive" />

      <Navbar />

      <main style={{ flex: '1 0 auto', padding: '20px', maxWidth: '850px', margin: '0 auto', width: '100%', paddingBottom: '60px' }}>
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
          
          <h1 style={{ color: '#1e293b', fontSize: '2rem', fontWeight: '900', marginBottom: '5px' }}>{dato.nome}</h1>
          <p style={{ color: '#64748b', fontSize: '1.2rem', marginBottom: '25px', fontWeight: '600' }}>{categoriaDisplay} — Roma {nomeZona}</p>

          <div style={{ backgroundColor: '#f0f9ff', padding: '25px', borderRadius: '12px', marginBottom: '35px', borderLeft: '6px solid #0284c7' }}>
            <p style={{ lineHeight: '1.8', color: '#334155', margin: 0, fontSize: '1.1rem' }}>
              {testoDinamico.replace(/\*\*/g, '')}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '40px' }}>
            <a href={`tel:${dato.telefono}`} style={{ flex: 1, minWidth: '150px', backgroundColor: '#059669', color: 'white', padding: '18px', borderRadius: '12px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', fontSize: '1.1rem' }}>📞 CHIAMA ORA</a>
            {dato.whatsapp && (
              <a href={`https://wa.me/39${dato.whatsapp}`} style={{ flex: 1, minWidth: '150px', backgroundColor: '#22c55e', color: 'white', padding: '18px', borderRadius: '12px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', fontSize: '1.1rem' }}>💬 WHATSAPP</a>
            )}
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '15px', color: '#1e293b' }}>Mappa e Indicazioni</h2>
          <div id="map-scheda" style={{ height: '380px', width: '100%', borderRadius: '12px', border: '1px solid #e2e8f0', zIndex: 1, marginBottom: '10px' }}></div>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', textAlign: 'center' }}>Posizione GPS di {dato.nome} in {dato.indirizzo}</p>

        </div>
      </main>

      <Footer />
    </div>
  );
}
