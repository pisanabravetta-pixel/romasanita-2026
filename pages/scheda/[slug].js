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

  // LOGICA PULIZIA CATEGORIA (Per Farmacie, Medici e Domicilio)
  const getCategoriaPulita = (cat) => {
    if (!cat) return "Servizio Sanitario";
    let nome = cat.toLowerCase();
    
    // 1. Gestione parentesi: visite-specialistiche (cardiologo) -> Cardiologo
    if (nome.includes('(')) {
      return nome.split('(')[1].replace(')', '').trim().toUpperCase();
    }
    // 2. Gestione servizi-domicilio -> SERVIZI A DOMICILIO
    if (nome.includes('servizi-domicilio')) return "SERVIZI A DOMICILIO";
    
    // 3. Pulizia generica trattini
    return nome.replace(/-/g, ' ').toUpperCase();
  };

  useEffect(() => {
    if (typeof L !== 'undefined' && dato && dato.lat && dato.lng) {
      if (window.mapInstance) { window.mapInstance.remove(); }
      const map = L.map('map-scheda', { scrollWheelZoom: false }).setView([parseFloat(dato.lat), parseFloat(dato.lng)], 16);
      window.mapInstance = map;
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { attribution: '© OSM' }).addTo(map);
      L.marker([parseFloat(dato.lat), parseFloat(dato.lng)]).addTo(map).bindPopup(`<b>${dato.nome}</b>`).openPopup();
      setTimeout(() => { map.invalidateSize(); }, 500);
    }
  }, [dato]);

  if (loading) return <div style={{padding: '100px', textAlign: 'center'}}>Caricamento...</div>;
  if (!dato) return <div style={{padding: '100px', textAlign: 'center'}}>Scheda non trovata.</div>;

  const categoriaDisplay = getCategoriaPulita(dato.categoria);
  const nomeZona = dato.quartiere || dato.zona || "Roma";

  // I 3 TEMPLATE UNIVERSALI (Applicati a Farmacie, Medici, Infermieri)
  const varianti = [
    `La struttura **${dato.nome}** offre servizi professionali di **${categoriaDisplay}** nel quartiere di Roma **${nomeZona}**. Situata in **${dato.indirizzo}**, rappresenta un punto di riferimento per i residenti che necessitano di assistenza qualificata. Per informazioni dettagliate su orari, prestazioni specifiche o disponibilità per urgenze (come turni domenicali o h24), consigliamo di contattare direttamente il personale via telefono o tramite il tasto WhatsApp.`,
    `Se stai cercando esperti in **${categoriaDisplay}** a Roma zona **${nomeZona}**, **${dato.nome}** riceve presso la sede di **${dato.indirizzo}**. Questa attività garantisce supporto professionale per diverse necessità sanitarie. Ti invitiamo a utilizzare i contatti diretti presenti in questa scheda per richiedere un appuntamento, verificare i tempi di attesa o chiedere chiarimenti sulla disponibilità di servizi a domicilio e visite specialistiche.`,
    `In **${dato.indirizzo}**, a Roma (**${nomeZona}**), operano i professionisti di **${dato.nome}** all'interno della categoria **${categoriaDisplay}**. La scheda fornisce i recapiti essenziali per entrare in contatto immediato: chiamando o scrivendo su WhatsApp potrai parlare con un operatore per conoscere la disponibilità di assistenza h24, aperture straordinarie o per prenotare una consulenza dedicata alle tue esigenze di salute.`
  ];
  const testoDinamico = varianti[dato.id % 3] || varianti[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>{dato.nome} – {categoriaDisplay} Roma {nomeZona}</title>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      </Head>
      <Script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" strategy="lazyOnload" />
      <Navbar />
      <main style={{ flex: '1 0 auto', padding: '20px', maxWidth: '850px', margin: '0 auto', width: '100%', paddingBottom: '60px' }}>
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
          <h1 style={{ color: '#1e293b', fontSize: '1.8rem', fontWeight: '900', marginBottom: '5px' }}>{dato.nome}</h1>
          <p style={{ color: '#0284c7', fontSize: '1.1rem', marginBottom: '25px', fontWeight: '700' }}>{categoriaDisplay} — ROMA {nomeZona.toUpperCase()}</p>
          <div style={{ backgroundColor: '#f0f9ff', padding: '20px', borderRadius: '12px', marginBottom: '30px', borderLeft: '6px solid #0284c7' }}>
            <p style={{ lineHeight: '1.7', color: '#334155', margin: 0 }}>{testoDinamico}</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '35px' }}>
             <a href={`tel:${dato.telefono}`} style={{ flex: 1, backgroundColor: '#059669', color: 'white', padding: '16px', borderRadius: '10px', textAlign: 'center', fontWeight: '900', textDecoration: 'none' }}>📞 CHIAMA</a>
             {dato.whatsapp && <a href={`https://wa.me/39${dato.whatsapp}`} style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '10px', textAlign: 'center', fontWeight: '900', textDecoration: 'none' }}>💬 WHATSAPP</a>}
          </div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '15px' }}>Posizione in {dato.indirizzo}</h2>
          <div id="map-scheda" style={{ height: '350px', width: '100%', borderRadius: '12px', border: '1px solid #e2e8f0', zIndex: 1 }}></div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
