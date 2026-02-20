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

  // LOGICA PULIZIA CATEGORIA
  const getCategoriaPulita = (cat) => {
    if (!cat) return "Servizio Sanitario";
    let nome = cat.toLowerCase();
    if (nome.includes('(')) {
      return nome.split('(')[1].replace(')', '').trim().toUpperCase();
    }
    if (nome.includes('servizi-domicilio')) return "SERVIZI A DOMICILIO";
    return nome.replace(/-/g, ' ').toUpperCase();
  };

  // EFFETTO MAPPA CON CONTROLLO RETRY
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
        const map = L.map('map-scheda', { scrollWheelZoom: false })
          .setView([parseFloat(dato.lat), parseFloat(dato.lng)], 16);
        window.mapInstance = map;
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '© OSM'
        }).addTo(map);
        L.marker([parseFloat(dato.lat), parseFloat(dato.lng)])
          .addTo(map)
          .bindPopup(`<b>${dato.nome}</b>`)
          .openPopup();
        setTimeout(() => { map.invalidateSize(); }, 500);
      } catch (e) { console.error("Errore mappa:", e); }
    };
    initMap();
    return () => {
      if (window.mapInstance) { window.mapInstance.remove(); window.mapInstance = null; }
    };
  }, [dato]);

  if (loading) return <div style={{padding: '100px', textAlign: 'center'}}>Caricamento...</div>;
  if (!dato) return <div style={{padding: '100px', textAlign: 'center'}}>Scheda non trovata.</div>;

  const categoriaDisplay = getCategoriaPulita(dato.categoria);
  const nomeZona = dato.quartiere || dato.zona || "Roma";
  
  // RILEVAMENTO TIPO PER TESTI DINAMICI
  const isFarmacia = categoriaDisplay.includes('FARMACI');

  const varianti = isFarmacia ? [
    `La **${dato.nome}** è un presidio sanitario fondamentale nel quartiere **${nomeZona}**. Situata in **${dato.indirizzo}**, la farmacia offre assistenza farmaceutica completa e consulenza professionale. Per verificare la disponibilità di farmaci specifici o per conoscere i turni della domenica e l'eventuale apertura h24, ti invitiamo a contattare direttamente i farmacisti tramite WhatsApp o telefono.`,
    `Se cerchi una farmacia di riferimento a Roma zona **${nomeZona}**, la **${dato.nome}** in **${dato.indirizzo}** garantisce una vasta gamma di servizi per la salute. Oltre alla dispensazione di medicinali, puoi richiedere informazioni su preparazioni e test rapidi. Usa i contatti diretti per parlare con il personale e confermare orari di apertura o turni notturni in corso.`,
    `La **${dato.nome}** serve l'area di **${nomeZona}** con professionalità. Presso la sede in **${dato.indirizzo}** potrai trovare supporto per ogni tua esigenza sanitaria. Per urgenze o per sapere se la farmacia è aperta ora, clicca sui pulsanti di chiamata o WhatsApp: il contatto diretto ti permetterà di ricevere assistenza immediata sui servizi disponibili.`
  ] : [
    `Il profilo di **${dato.nome}** è specializzato in **${categoriaDisplay}** a Roma, zona **${nomeZona}**. Presso la struttura in **${dato.indirizzo}**, il professionista offre consulenze dedicate. Per prenotare una visita, conoscere i costi delle prestazioni o verificare la disponibilità per un appuntamento, consigliamo di inviare un messaggio WhatsApp o telefonare direttamente in sede.`,
    `Se hai bisogno di assistenza per **${categoriaDisplay}** nel quartiere **${nomeZona}**, **${dato.nome}** riceve in **${dato.indirizzo}**. La struttura rappresenta una scelta di prossimità per chi necessita di interventi professionali. Utilizzando i tasti di contatto, potrai parlare con il personale per definire i dettagli della tua prestazione o richiedere informazioni su modalità di visita e orari.`,
    `In **${dato.indirizzo}**, zona **${nomeZona}**, operano i professionisti di **${dato.nome}** per la categoria **${categoriaDisplay}**. La struttura è disponibile per nuove prenotazioni e consulenze. Ti invitiamo a contattare direttamente il titolare tramite WhatsApp o telefono per ricevere supporto immediato, verificare le tariffe o concordare un appuntamento presso lo studio o a domicilio.`
  ];

  const testoDinamico = varianti[dato.id % 3] || varianti[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>{dato.nome} – {categoriaDisplay} Roma {nomeZona}</title>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      </Head>
      <Script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" strategy="beforeInteractive" />
      <Navbar />
      <main style={{ flex: '1 0 auto', padding: '20px', maxWidth: '850px', margin: '0 auto', width: '100%', paddingBottom: '60px' }}>
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
          <h1 style={{ color: '#1e293b', fontSize: '1.8rem', fontWeight: '900', marginBottom: '5px' }}>{dato.nome}</h1>
          <p style={{ color: '#0284c7', fontSize: '1.1rem', marginBottom: '25px', fontWeight: '700' }}>{categoriaDisplay} — ROMA {nomeZona.toUpperCase()}</p>
          <div style={{ backgroundColor: '#f0f9ff', padding: '20px', borderRadius: '12px', marginBottom: '30px', borderLeft: '6px solid #0284c7' }}>
            <p style={{ lineHeight: '1.7', color: '#334155', margin: 0 }}>{testoDinamico.replace(/\*\*/g, '')}</p>
          </div>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '40px' }}>
            <a href={`tel:${dato.telefono}`} style={{ flex: 1, minWidth: '150px', backgroundColor: '#059669', color: 'white', padding: '18px', borderRadius: '12px', textAlign: 'center', fontWeight: '900', textDecoration: 'none' }}>📞 CHIAMA ORA</a>
            {dato.whatsapp && <a href={`https://wa.me/39${dato.whatsapp}`} style={{ flex: 1, minWidth: '150px', backgroundColor: '#22c55e', color: 'white', padding: '18px', borderRadius: '12px', textAlign: 'center', fontWeight: '900', textDecoration: 'none' }}>💬 WHATSAPP</a>}
          </div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '15px', color: '#1e293b' }}>Mappa e Posizione</h2>
          <div id="map-scheda" style={{ height: '380px', width: '100%', borderRadius: '12px', border: '1px solid #e2e8f0', zIndex: 1 }}></div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
