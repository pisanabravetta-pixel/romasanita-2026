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

  // --- LOGICA MAPPA TRAPIANTATA DALLA PAGINA QUARTIERE ---
  useEffect(() => {
    if (typeof L !== 'undefined' && dato && dato.lat && dato.lng) {
      if (window.mapInstance) { window.mapInstance.remove(); }
      
      // Setup mappa con lo stesso stile della pagina quartiere
      const map = L.map('map-scheda', { scrollWheelZoom: false }).setView([parseFloat(dato.lat), parseFloat(dato.lng)], 16);
      window.mapInstance = map;
      
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OSM'
      }).addTo(map);

      const group = new L.featureGroup();
      
      const marker = L.marker([parseFloat(dato.lat), parseFloat(dato.lng)])
        .addTo(map)
        .bindPopup(`<b>${dato.nome}</b><br>${dato.indirizzo}`)
        .openPopup();
        
      group.addLayer(marker);

      // Invalidate per forzare il rendering corretto
      setTimeout(() => { map.invalidateSize(); }, 500);
    }
  }, [dato]);

  if (loading) return <div style={{padding: '100px', textAlign: 'center'}}>Caricamento...</div>;
  if (!dato) return <div style={{padding: '100px', textAlign: 'center'}}>Scheda non trovata.</div>;

  const nomeZona = dato.quartiere || dato.zona || "Roma";

  // LOGICA TEMPLATE CATEGORIE
  const getTemplate = (index) => {
    const cat = (dato.categoria || "").toLowerCase();
    const nome = dato.nome;
    const indirizzo = dato.indirizzo;
    
    if (cat.includes('farmaci')) {
      return [
        `La ${nome} è un presidio sanitario fondamentale a Roma, zona ${nomeZona}. In ${indirizzo}, offre assistenza farmaceutica e consulenza professionale. Per conoscere i turni della domenica, la disponibilità di farmaci o l'apertura h24, contatta subito tramite WhatsApp o telefono.`,
        `Se cerchi una farmacia in zona ${nomeZona}, la ${nome} in ${indirizzo} garantisce supporto per ogni esigenza di salute. Verifica l'apertura domenicale o il servizio h24 contattando direttamente i farmacisti via WhatsApp o chiamata per assistenza immediata.`,
        `Presso la ${nome} a ${nomeZona}, troverai professionalità e cortesia. Per urgenze e per sapere se l'attività è aperta oggi o effettua turni h24, clicca sui tasti di contatto diretto e parla subito con il personale in sede.`
      ][index];
    }

    return [
      `Il profilo di ${nome} è specializzato in ${dato.categoria} e riceve a Roma nel quartiere ${nomeZona}. Presso la struttura in ${indirizzo}, si offrono consulenze dedicate. Per prenotare una visita, verificare i costi o la disponibilità per appuntamenti urgenti (anche domenica o h24 dove previsto), contatta direttamente tramite WhatsApp o telefono.`,
      `Cerchi assistenza per ${dato.categoria} a Roma ${nomeZona}? La struttura ${nome} in ${indirizzo} è un punto di riferimento per il benessere dei pazienti. Consigliamo di scrivere su WhatsApp o chiamare per conoscere gli orari aggiornati, la disponibilità di visite a domicilio e prenotare il tuo appuntamento specialistico.`,
      `Situata in ${indirizzo}, la ${nome} opera con esperienza nella categoria ${dato.categoria} servendo l'area di ${nomeZona}. Per urgenze o chiarimenti sui servizi sanitari offerti, ti invitiamo a utilizzare i contatti rapidi. Parlare via WhatsApp o telefono ti permetterà di verificare disponibilità e turni nel cuore di Roma.`
    ][index];
  };

  const testoDinamico = getTemplate(dato.id % 3);

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

          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '40px' }}>
            <a href={`tel:${dato.telefono}`} style={{ flex: 1, minWidth: '150px', backgroundColor: '#059669', color: 'white', padding: '18px', borderRadius: '12px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', fontSize: '1.1rem' }}>📞 CHIAMA ORA</a>
            {dato.whatsapp && (
              <a href={`https://wa.me/39${dato.whatsapp}`} style={{ flex: 1, minWidth: '150px', backgroundColor: '#22c55e', color: 'white', padding: '18px', borderRadius: '12px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', fontSize: '1.1rem' }}>💬 WHATSAPP</a>
            )}
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '15px', color: '#1e293b' }}>Mappa e Indicazioni</h2>
          
          {/* BOX MAPPA CON LO STILE DELLA PAGINA QUARTIERE */}
          <div id="map-scheda" style={{ 
              height: '380px', 
              width: '100%', 
              borderRadius: '12px', 
              border: '1px solid #e2e8f0', 
              zIndex: 1, 
              marginBottom: '10px',
              filter: 'grayscale(0.2) contrast(1.1) brightness(0.92)',
              background: '#f8fafc'
          }}></div>
          
          <p style={{ fontSize: '0.85rem', color: '#64748b', textAlign: 'center', fontStyle: 'italic' }}>
            Posizione GPS di <strong>{dato.nome}</strong> a Roma {nomeZona}
          </p>

        </div>
      </main>

      <Footer />
    </div>
  );
}
