import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
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

  if (loading) return <div style={{padding: '100px', textAlign: 'center'}}>Caricamento...</div>;
  if (!dato) return <div style={{padding: '100px', textAlign: 'center'}}>Scheda non trovata.</div>;

  // --- LOGICA VARIANTI TESTO (Punto 1 degli appunti per evitare Thin Content) ---
  const varianti = [
    `La ${dato.nome} è una ${dato.categoria} situata nel quartiere ${dato.quartiere}, a Roma, in ${dato.indirizzo}. Si trova in una zona facilmente raggiungibile dai residenti di ${dato.quartiere} e delle aree vicine. Le strutture di questo tipo nel quartiere ${dato.quartiere} rappresentano un servizio essenziale per i cittadini di Roma, offrendo supporto e assistenza quotidiana. Questa struttura è localizzata con precisione sulla mappa per permettere una consultazione semplice e immediata.`,
    `Situata in ${dato.indirizzo}, nel quartiere ${dato.quartiere} di Roma, la ${dato.nome} rientra tra le strutture sanitarie e i presidi territoriali della zona. La posizione geografica consente ai residenti di ${dato.quartiere} di individuarla facilmente per ogni necessità legata alla categoria ${dato.categoria}. Rappresenta un punto di riferimento per la comunità locale e viene riportata in questa directory per agevolare la ricerca di informazioni di contatto e localizzazione.`,
    `Nel quartiere ${dato.quartiere} a Roma è presente la ${dato.nome}, con sede operativa in ${dato.indirizzo}. Questa ${dato.categoria} è inclusa nell’elenco delle strutture sanitarie locali della zona ${dato.quartiere}. Per chi vive o lavora a Roma in zona ${dato.quartiere}, questa struttura offre un accesso rapido ai servizi di assistenza. La mappa sottostante indica l'esatta posizione per facilitare il raggiungimento della sede.`
  ];
  // Sceglie la variante in base all'ID per renderla statica per Google
  const testoDinamico = varianti[dato.id % 3];

  // --- SCHEMA JSON-LD (Punto 4 e 6 degli appunti) ---
  const typeSchema = dato.categoria.toLowerCase().includes('farmac') ? "Pharmacy" : "Physician";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": typeSchema,
    "name": dato.nome,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": dato.indirizzo,
      "addressLocality": "Roma",
      "addressRegion": "RM",
      "postalCode": "", 
      "addressCountry": "IT"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": dato.lat,
      "longitude": dato.lon
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Head>
        <title>{dato.nome} – {dato.categoria} a {dato.quartiere}, Roma | Indirizzo</title>
        <meta name="description" content={`${dato.nome} situata nel quartiere ${dato.quartiere} a Roma. Indirizzo, zona e posizione sulla mappa per la categoria ${dato.categoria}.`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <Navbar />

      <main style={{ flex: '1 0 auto', padding: '40px 20px', maxWidth: '800px', margin: '0 auto', width: '100%', paddingBottom: '80px' }}>
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          <h1 style={{ color: '#065f46', fontSize: '2rem', marginBottom: '20px', fontWeight: '800' }}>
            {dato.nome} – {dato.categoria} a {dato.quartiere}, Roma
          </h1>

          <p style={{ lineHeight: '1.8', color: '#475569', fontSize: '1.1rem', marginBottom: '30px' }}>
            {testoDinamico}
          </p>

          <h2 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '15px', borderBottom: '2px solid #f1f5f9', paddingBottom: '10px' }}>
            Informazioni principali
          </h2>

          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px 0', lineHeight: '2' }}>
            <li><strong>📍 Indirizzo:</strong> {dato.indirizzo}</li>
            <li><strong>🏘️ Zona:</strong> {dato.quartiere}</li>
            <li><strong>📋 Categoria:</strong> {dato.categoria}</li>
          </ul>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
            <a href={`tel:${dato.telefono}`} style={{ flex: 1, minWidth: '200px', backgroundColor: '#16a34a', color: 'white', padding: '15px', borderRadius: '10px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>
              CHIAMA ORA
            </a>
            {dato.whatsapp && (
              <a href={`https://wa.me/39${dato.whatsapp}`} style={{ flex: 1, minWidth: '200px', backgroundColor: '#25D366', color: 'white', padding: '15px', borderRadius: '10px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>
                WHATSAPP
              </a>
            )}
          </div>

          <h2 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '15px' }}>Posizione sulla mappa</h2>
          <div style={{ height: '350px', width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
            <iframe 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              src={`https://maps.google.com/maps?q=${dato.lat},${dato.lon}&z=15&output=embed`}
            ></iframe>
          </div>

          <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
            <a href={`/${dato.categoria.toLowerCase().replace(/\s+/g, '-')}-roma-${dato.quartiere.toLowerCase().replace(/\s+/g, '-')}`} style={{ color: '#065f46', fontWeight: '700', textDecoration: 'none' }}>
              ← Torna a {dato.categoria} {dato.quartiere}
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
