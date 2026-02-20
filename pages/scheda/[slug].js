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

  // LOGICA MAPPA - VERSIONI QUARTIERE + RETRY
  useEffect(() => {
    if (!dato || !dato.lat || !dato.lng) return;

    const caricaMappa = () => {
      // Se Leaflet non è ancora caricato dallo Script, riprova tra 200ms
      if (typeof L === 'undefined') {
        setTimeout(caricaMappa, 200);
        return;
      }

      // Pulizia istanze precedenti per evitare l'errore "Map container is already initialized"
      const container = L.DomUtil.get('map-scheda');
      if (container) { container._leaflet_id = null; }
      if (window.mapInstance) { 
        window.mapInstance.remove(); 
      }

      try {
        const lat = parseFloat(dato.lat);
        const lng = parseFloat(dato.lng);

        const map = L.map('map-scheda', { 
          scrollWheelZoom: false,
          zoomControl: true 
        }).setView([lat, lng], 16);
        
        window.mapInstance = map;

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '© OSM'
        }).addTo(map);

        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(`<b>${dato.nome}</b><br>${dato.indirizzo}`)
          .openPopup();

        // Forza il ricalcolo delle dimensioni per evitare zone grigie
        setTimeout(() => { map.invalidateSize(); }, 400);

      } catch (e) {
        console.error("Errore inizializzazione mappa:", e);
      }
    };

    caricaMappa();

    return () => {
      if (window.mapInstance) {
        window.mapInstance.remove();
        window.mapInstance = null;
      }
    };
  }, [dato]); // Si attiva appena 'dato' è disponibile

  if (loading) return <div style={{padding: '100px', textAlign: 'center'}}>Caricamento...</div>;
  if (!dato) return <div style={{padding: '100px', textAlign: 'center'}}>Scheda non trovata.</div>;

  const nomeZona = dato.quartiere || dato.zona || "Roma";
  const cat = (dato.categoria || "").toLowerCase();

  const varianti = [
    `La ${dato.nome} è un presidio specializzato in ${cat} a Roma ${nomeZona}. In ${dato.indirizzo}, trovi assistenza dedicata. Per orari, turni domenica o h24, scrivi su WhatsApp o chiama direttamente.`,
    `Cerchi ${cat} a Roma ${nomeZona}? ${dato.nome} in ${dato.indirizzo} è il riferimento in zona. Contatta il titolare via WhatsApp per info su h24 e disponibilità immediata.`,
    `Situata in ${dato.indirizzo}, ${dato.nome} serve l'area di ${nomeZona} per ${cat}. Per urgenze o servizi festivi, usa i tasti WhatsApp o telefono per parlare col personale.`
  ];
  const testoDinamico = varianti[dato.id % 3] || varianti[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>{dato.nome} – {dato.categoria} Roma {nomeZona}</title>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      </Head>
      
      <Script 
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" 
        strategy="afterInteractive" 
      />

      <Navbar />

      <main style={{ flex: '1 0 auto', padding: '20px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          
          <h1 style={{ color: '#1e293b', fontSize: '28px', fontWeight: '900', marginBottom: '5px' }}>{dato.nome}</h1>
          <p style={{ color: '#64748b', fontSize: '18px', marginBottom: '20px', fontWeight: '600' }}>{dato.categoria} — Roma {nomeZona}</p>

          <div style={{ backgroundColor: '#f0f9ff', padding: '20px', borderRadius: '10px', marginBottom: '30px', borderLeft: '5px solid #0284c7' }}>
             {testoDinamico}
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
            <a href={`tel:${dato.telefono}`} style={{ flex: 1, backgroundColor: '#059669', color: 'white', padding: '15px', borderRadius: '10px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>📞 CHIAMA</a>
            {dato.whatsapp && (
              <a href={`https://wa.me/39${dato.whatsapp}`} style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '15px', borderRadius: '10px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>💬 WHATSAPP</a>
            )}
          </div>

          <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '15px' }}>Mappa</h2>
          <div id="map-scheda" style={{ 
            height: '350px', 
            width: '100%', 
            borderRadius: '12px', 
            border: '1px solid #e2e8f0',
            filter: 'grayscale(0.2) contrast(1.1) brightness(0.92)',
            zIndex: 1 
          }}></div>
          
        </div>
      </main>
      <Footer />
    </div>
  );
}
