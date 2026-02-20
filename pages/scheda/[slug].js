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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!slug || !mounted) return;
    async function fetchDati() {
      try {
        const { data } = await supabase.from("annunci").select("*").eq("slug", slug).single();
        if (data) setDato(data);
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    }
    fetchDati();
  }, [slug, mounted]);

  // Inizializzazione Mappa Leaflet
  useEffect(() => {
    if (mounted && dato && dato.lat && dato.lon && typeof L !== 'undefined') {
      const map = L.map('map-scheda', { scrollWheelZoom: false }).setView([dato.lat, dato.lon], 16);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
      L.marker([dato.lat, dato.lon]).addTo(map).bindPopup(`<b>${dato.nome}</b>`).openPopup();
    }
  }, [mounted, dato]);

  if (!mounted) return null;
  if (loading) return <div style={{padding: '100px', textAlign: 'center'}}>Caricamento...</div>;
  if (!dato) return <div style={{padding: '100px', textAlign: 'center'}}>Scheda non trovata.</div>;

  const nomeZona = dato.quartiere || dato.zona || "Roma";
  
  // VARIANTI TESTO (Punto 1 appunti - Minimo 200 parole)
  const varianti = [
    `La ${dato.nome} è una struttura d'eccellenza nella categoria ${dato.categoria} situata nel quartiere ${nomeZona}, a Roma, precisamente in ${dato.indirizzo}. Rappresenta un punto di riferimento fondamentale per i residenti della zona ${nomeZona} e delle aree limitrofe della capitale. Le strutture sanitarie in questo quadrante di Roma offrono un supporto essenziale per le necessità quotidiane, garantendo professionalità e vicinanza al cittadino. Questa scheda informativa riporta la posizione geografica esatta e i contatti diretti per agevolare la consultazione immediata da parte degli utenti di ServiziSalute.`,
    `Situata in ${dato.indirizzo}, la struttura ${dato.nome} opera con successo nella categoria ${dato.categoria} all'interno del vivace quartiere ${nomeZona} di Roma. La sua posizione strategica permette ai cittadini residenti a Roma ${nomeZona} di accedere rapidamente ai servizi professionali offerti. Questo presidio sanitario è stato inserito nella nostra directory locale per assicurare la massima trasparenza e velocità nel reperimento dei dati di contatto. La presenza di attività come questa contribuisce a rendere ${nomeZona} un'area servita e attenta al benessere dei suoi abitanti.`,
    `Nel cuore del quartiere ${nomeZona} a Roma si trova la ${dato.nome}, un centro specializzato in ${dato.categoria}. Con sede operativa in ${dato.indirizzo}, questa attività serve con dedizione la comunità locale garantendo una presenza costante sul territorio capitolino. Per chiunque sia alla ricerca di ${dato.categoria} a Roma zona ${nomeZona}, questa struttura rappresenta una scelta di prossimità ideale. I dati qui riportati sono estratti da fonti pubbliche per fornire una guida aggiornata e affidabile sulla sanità e i servizi a Roma.`
  ];
  const testoDinamico = varianti[dato.id % 3] || varianti[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Head>
        <title>{dato.nome} – {dato.categoria} a Roma {nomeZona}</title>
        <meta name="description" content={`${dato.nome} situata in ${dato.indirizzo}, quartiere ${nomeZona} a Roma. Contatti, telefono e mappa.`} />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      </Head>
      
      <Script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" strategy="afterInteractive" />

      <Navbar />

      <main style={{ flex: '1 0 auto', padding: '40px 20px', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          
          <h1 style={{ color: '#1e293b', fontSize: '2.4rem', fontWeight: '900', marginBottom: '10px' }}>{dato.nome}</h1>
          <p style={{ color: '#64748b', fontSize: '1.2rem', fontWeight: '600', marginBottom: '30px' }}>
            {dato.categoria.toUpperCase()} • ROMA {nomeZona.toUpperCase()}
          </p>

          <div style={{ backgroundColor: '#f1f5f9', padding: '25px', borderRadius: '16px', marginBottom: '35px', lineHeight: '1.8', color: '#334155', fontSize: '1.1rem' }}>
            {testoDinamico}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
            <div style={{ padding: '20px', border: '1px solid #f1f5f9', borderRadius: '12px' }}>
              <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem', fontWeight: 'bold' }}>📍 INDIRIZZO</p>
              <p style={{ margin: '5px 0 0 0', color: '#1e293b', fontWeight: '700' }}>{dato.indirizzo}</p>
            </div>
            <div style={{ padding: '20px', border: '1px solid #f1f5f9', borderRadius: '12px' }}>
              <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem', fontWeight: 'bold' }}>🏘️ QUARTIERE</p>
              <p style={{ margin: '5px 0 0 0', color: '#1e293b', fontWeight: '700' }}>{nomeZona}</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '40px' }}>
            <a href={`tel:${dato.telefono}`} style={{ flex: 1, minWidth: '200px', backgroundColor: '#059669', color: 'white', padding: '18px', borderRadius: '12px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', fontSize: '1.1rem' }}>📞 CHIAMA ORA</a>
            {dato.whatsapp && (
              <a href={`https://wa.me/39${dato.whatsapp}`} style={{ flex: 1, minWidth: '200px', backgroundColor: '#22c55e', color: 'white', padding: '18px', borderRadius: '12px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', fontSize: '1.1rem' }}>💬 WHATSAPP</a>
            )}
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '20px', color: '#1e293b' }}>Posizione su Mappa</h2>
          <div id="map-scheda" style={{ height: '400px', width: '100%', borderRadius: '16px', border: '1px solid #e2e8f0', zIndex: 1 }}></div>

          <div style={{ marginTop: '50px', textAlign: 'center' }}>
            <a href={`/${dato.categoria.toLowerCase().replace(/\s+/g, '-')}-roma-${nomeZona.toLowerCase().replace(/\s+/g, '-')}`} style={{ color: '#059669', fontWeight: '800', textDecoration: 'none' }}>
              ← Torna all'elenco di {dato.categoria} a {nomeZona}
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
