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

  // --- GENERAZIONE TESTO SEO DINAMICO AGGIORNATO (KEYWORDS: H24, DOMENICA, SERVIZI) ---
  const generaTestoSEO = () => {
    const v = dato.id % 3; // Rotazione varianti per evitare thin content
    const nome = dato.nome;
    const indirizzo = dato.indirizzo;
    const cat = categoria.toLowerCase();

    // Rileviamo se è uno dei tuoi 7 specialisti o altre categorie mediche
    const isSpecialistico = cat.includes('dermatol') || cat.includes('cardiol') || 
                            cat.includes('psicol') || cat.includes('oculist') || 
                            cat.includes('ortoped') || cat.includes('nutrizion') || 
                            cat.includes('ginecol') || cat.includes('dentist') || 
                            cat.includes('diagnost');

    const callToAction = "Per tutte le informazioni dettagliate sui servizi offerti, orari di ricevimento, disponibilità per visite la domenica o assistenza h24, è fondamentale contattare direttamente la struttura tramite WhatsApp o telefono utilizzando i tasti di contatto presenti in questa pagina.";

    // --- TEMPLATE FARMACIE ---
    if (cat.includes('farmac')) {
      return [
        `La ${nome} è una farmacia di riferimento situata nel quartiere ${nomeZona} a Roma, precisamente in ${indirizzo}. In quanto presidio sanitario locale, offre i classici servizi di assistenza e distribuzione farmaci. Molti cittadini cercano spesso informazioni su farmacie aperte domenica o servizi h24 a Roma ${nomeZona}: per verificare i turni attuali e i servizi offerti oggi, ti consigliamo di contattare subito i farmacisti via WhatsApp o telefono. ${callToAction}`,
        `Se ti trovi in zona ${nomeZona} e cerchi la ${nome} in ${indirizzo}, qui trovi la posizione GPS e i recapiti ufficiali. Le farmacie a Roma garantiscono un servizio essenziale e la ${nome} serve i residenti della zona con professionalità. Se hai necessità di sapere se la struttura è aperta oggi, se effettua servizio notturno h24 o turni domenicali a Roma, usa i pulsanti di contatto immediato. ${callToAction}`,
        `Presso la ${nome} a Roma ${nomeZona} (indirizzo: ${indirizzo}), i residenti possono trovare supporto per ogni esigenza di salute. Poiché gli orari e i servizi offerti (inclusi i turni di apertura domenica e i turni h24 a Roma) possono variare, è opportuno richiedere conferma ufficiale. Per ogni dettaglio o per verificare la disponibilità di prodotti, contatta direttamente la sede tramite i tasti WhatsApp o chiamata. ${callToAction}`
      ][v];
    }

    // --- TEMPLATE SPECIALISTI E ALTRI SERVIZI ---
    if (isSpecialistico) {
      return [
        `Il profilo di ${nome} riguarda la categoria ${categoria} nel quartiere ${nomeZona} a Roma. Lo studio si trova in ${indirizzo} e offre prestazioni e servizi specializzati ai pazienti della zona. Quando si cerca un ${categoria} a Roma ${nomeZona}, è importante verificare i servizi offerti e la disponibilità per appuntamenti urgenti, anche nei festivi o di domenica. ${callToAction}`,
        `Cerchi assistenza per ${categoria} a Roma zona ${nomeZona}? ${nome} riceve in ${indirizzo} ed è una delle realtà segnalate nel quartiere per questa specializzazione. I servizi offerti spaziano dalla consulenza alla diagnostica: per conoscere il tariffario, i tempi di attesa o la disponibilità per visite urgenti h24 a Roma, ti invitiamo a scrivere su WhatsApp o chiamare il professionista. ${callToAction}`,
        `Situato in ${indirizzo}, ${nome} opera come ${categoria} servendo l'area di Roma ${nomeZona}. La presenza di uno specialista in ${categoria} nella zona di ${nomeZona} facilita l'accesso alle cure per i residenti. Per dettagli completi sui servizi offerti e per sapere se il medico riceve di domenica o gestisce urgenze h24 a Roma, utilizza i recapiti diretti presenti in questa scheda professionale. ${callToAction}`
      ][v];
    }

    // --- TEMPLATE FALLBACK (DOMICILIO E ALTRI) ---
    return [
      `${nome} opera a Roma nel quartiere ${nomeZona} (indirizzo: ${indirizzo}) fornendo assistenza nella categoria ${categoria}. I servizi offerti sono rivolti ai residenti della zona e della Capitale. Per verificare disponibilità h24, interventi la domenica o prenotazioni rapide, è necessario contattare direttamente tramite i tasti WhatsApp o telefono. ${callToAction}`,
      `Se cerchi ${categoria} in zona ${nomeZona} a Roma, ${nome} in ${indirizzo} è la struttura indicata in questa pagina. Per informazioni su turni festivi, reperibilità domenica o assistenza h24, ti invitiamo a utilizzare i contatti rapidi qui sotto per parlare col personale o il professionista. ${callToAction}`,
      `La struttura ${nome} si trova in ${indirizzo} a Roma ${nomeZona}. Questo profilo appartiene alla categoria ${categoria}. Per conoscere nel dettaglio tutti i servizi offerti e le disponibilità per visite la domenica o urgenze h24, si prega di contattare direttamente tramite WhatsApp o telefono. ${callToAction}`
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
