import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function SchedaProfessionale() {
  const router = useRouter();
  const { slug } = router.query;
  const [dato, setDato] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // 1. Assicuriamoci che il componente sia montato nel browser
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. Carichiamo i dati da Supabase
  useEffect(() => {
    if (!mounted || !slug) return;

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    async function scaricaDati() {
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
    scaricaDati();
  }, [slug, mounted]);

  // Se non siamo ancora sul browser, non renderizziamo nulla per evitare l'errore client-side
  if (!mounted) return null;

  if (loading) return <div style={{padding: '100px', textAlign: 'center'}}>Caricamento in corso...</div>;
  
  if (!dato) return (
    <div style={{padding: '100px', textAlign: 'center'}}>
      <h1>Scheda non trovata</h1>
      <p>Lo slug "{slug}" non corrisponde a nessun annuncio.</p>
      <a href="/">Torna alla Home</a>
    </div>
  );

  const varianti = [
    `La ${dato.nome} è una farmacia di riferimento nel quartiere ${dato.zona} a Roma. Offre assistenza professionale in ${dato.indirizzo}.`,
    `Situata in ${dato.indirizzo}, la ${dato.nome} serve la comunità di Roma ${dato.zona} con dedizione e competenza.`,
    `Nel cuore della zona ${dato.zona}, la ${dato.nome} garantisce servizi farmaceutici di qualità in ${dato.indirizzo}.`
  ];
  const testoDinamico = varianti[dato.id % 3] || varianti[0];

  return (
    <>
      <Head>
        <title>{dato.nome} - {dato.categoria} Roma {dato.zona}</title>
      </Head>

      <Navbar />

      <main style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', minHeight: '70vh' }}>
        <div style={{ backgroundColor: '#fff', padding: '35px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
            <h1 style={{ color: '#065f46', fontSize: '2rem', marginBottom: '5px' }}>{dato.nome}</h1>
            <p style={{ color: '#64748b', marginBottom: '25px' }}>{dato.categoria} – Roma {dato.zona}</p>
            
            <div style={{ backgroundColor: '#f0fdf4', padding: '20px', borderRadius: '12px', borderLeft: '5px solid #16a34a', marginBottom: '25px' }}>
              <p style={{ lineHeight: '1.7', margin: 0, color: '#166534' }}>{testoDinamico}</p>
            </div>

            <div style={{ fontSize: '1.1rem', lineHeight: '2' }}>
                <p><strong>📍 Indirizzo:</strong> {dato.indirizzo}</p>
                <p><strong>📞 Telefono:</strong> <a href={`tel:${dato.telefono}`} style={{color: '#065f46', fontWeight: 'bold'}}>{dato.telefono}</a></p>
            </div>

            <a href={`tel:${dato.telefono}`} style={{ display: 'block', backgroundColor: '#16a34a', color: 'white', padding: '18px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', textAlign: 'center', marginTop: '30px' }}>
                CHIAMA ORA
            </a>
        </div>
      </main>

      <Footer />
    </>
  );
}
