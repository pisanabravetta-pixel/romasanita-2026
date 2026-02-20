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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!slug || !mounted) return;
    async function fetchDati() {
      try {
        const { data, error } = await supabase
          .from("annunci")
          .select("*")
          .eq("slug", slug)
          .single();
        if (data) setDato(data);
      } catch (err) {
        console.error("Errore fetch:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDati();
  }, [slug, mounted]);

  if (!mounted) return null;
  if (loading) return <div style={{padding: '100px', textAlign: 'center'}}>Caricamento in corso...</div>;
  if (!dato) return <div style={{padding: '100px', textAlign: 'center'}}>Scheda non trovata.</div>;

  // Usa 'zona' o 'quartiere' a seconda di come si chiama la colonna su Supabase
  const nomeZona = dato.zona || dato.quartiere || "Roma";

  // VARIANTI TESTO (Punto 1 appunti - Evitiamo Thin Content)
  const varianti = [
    `La ${dato.nome} è una struttura di tipo ${dato.categoria} situata nel quartiere ${nomeZona}, a Roma, precisamente in ${dato.indirizzo}. Rappresenta un punto di riferimento per i residenti della zona ${nomeZona} e delle aree limitrofe della città. Le strutture sanitarie in questo quadrante di Roma offrono un supporto essenziale per le necessità quotidiane dei cittadini. Questa scheda informativa riporta la posizione esatta e i contatti per agevolare la consultazione online.`,
    `Situata in ${dato.indirizzo}, la struttura ${dato.nome} opera nella categoria ${dato.categoria} all'interno del quartiere ${nomeZona} di Roma. La sua posizione strategica permette ai cittadini di Roma ${nomeZona} di accedere facilmente ai servizi offerti. Questo presidio è inserito nella nostra directory locale per garantire trasparenza e velocità nel reperimento delle informazioni di contatto e della localizzazione geografica.`,
    `Nel cuore del quartiere ${nomeZona} a Roma è presente la ${dato.nome}, specializzata in ${dato.categoria}. Con sede in ${dato.indirizzo}, questa attività serve la comunità locale garantendo presenza sul territorio. Per chi cerca ${dato.categoria} a Roma ${nomeZona}, questa struttura offre assistenza e professionalità, come indicato dai dati pubblici raccolti nella nostra guida sanitaria capitolina.`
  ];
  const testoDinamico = varianti[dato.id % 3] || varianti[0];

  // SCHEMA JSON-LD
  const typeSchema = dato.categoria?.toLowerCase().includes('farmac') ? "Pharmacy" : "Physician";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": typeSchema,
    "name": dato.nome,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": dato.indirizzo,
      "addressLocality": "Roma",
      "addressRegion": "RM",
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
        <title>{dato.nome} – {dato.categoria} Roma {nomeZona}</title>
        <meta name="description" content={`${dato.nome} a Roma quartiere ${nomeZona}. Indirizzo: ${dato.indirizzo}. Scopri posizione e contatti.`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <Navbar />

      <main style={{ flex: '1 0 auto', padding: '40px 20px', maxWidth: '800px', margin: '0 auto', width: '100%', paddingBottom: '100px' }}>
        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          <h1 style={{ color: '#0f172a', fontSize: '2.2rem', marginBottom: '10px', fontWeight: '900' }}>
            {dato.nome}
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.2rem', marginBottom: '30px', fontWeight: '600' }}>
            {dato.categoria} – Roma {nomeZona}
          </p>

          <div style={{ backgroundColor: '#f8fafc', padding: '25px', borderRadius: '15px', borderLeft: '6px solid #16a34a', marginBottom: '35px' }}>
            <p style={{ lineHeight: '1.8', color: '#334155', margin: 0, fontSize: '1.1rem' }}>
              {testoDinamico}
            </p>
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '20px', color: '#1e293b' }}>
            Informazioni e Contatti
          </h2>

          <div style={{ fontSize: '1.1rem', marginBottom: '30px', display: 'grid', gap: '12px' }}>
            <p>📍 <strong>Indirizzo:</strong> {dato.indirizzo}</p>
            <p>🏘️ <strong>Quartiere:</strong> {nomeZona}</p>
            <p>📞 <strong>Telefono:</strong> <a href={`tel:${dato.telefono}`} style={{ color: '#16a34a', fontWeight: '800' }}>{dato.telefono}</a></p>
          </div>

          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '40px' }}>
            <a href={`tel:${dato.telefono}`} style={{ flex: '1', minWidth: '150px', backgroundColor: '#16a34a', color: 'white', padding: '16px', borderRadius: '12px', textAlign: 'center', fontWeight: '900', textDecoration: 'none' }}>
              CHIAMA ORA
            </a>
            {dato.whatsapp && (
              <a href={`https://wa.me/39${dato.whatsapp}`} style={{ flex: '1', minWidth: '150px', backgroundColor: '#25D366', color: 'white', padding: '16px', borderRadius: '12px', textAlign: 'center', fontWeight: '900', textDecoration: 'none' }}>
                WHATSAPP
              </a>
            )}
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '20px', color: '#1e293b' }}>Mappa e Posizione</h2>
          <div style={{ height: '350px', width: '100%', borderRadius: '15px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
            <iframe 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              src={`https://maps.google.com/maps?q=${dato.lat},${dato.lon}&z=15&output=embed`}
            ></iframe>
          </div>

          <div style={{ marginTop: '50px', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
            <a href={`/${dato.categoria.toLowerCase().replace(/\s+/g, '-')}-roma-${nomeZona.toLowerCase().replace(/\s+/g, '-')}`} style={{ color: '#64748b', fontWeight: '700', textDecoration: 'none', fontSize: '0.9rem' }}>
              ← Torna a {dato.categoria} {nomeZona}
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
