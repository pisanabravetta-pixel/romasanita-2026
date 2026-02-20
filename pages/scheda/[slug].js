import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
// IMPORTIAMO IL TUO CLIENT GIÀ CONFIGURATO
import { supabase } from "../../lib/supabaseClient";

export default function SchedaDinamica() {
  const router = useRouter();
  const { slug } = router.query;
  const [dato, setDato] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    async function fetchDati() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("annunci")
          .select("*")
          .eq("slug", slug)
          .single();

        if (data) {
          setDato(data);
        }
      } catch (err) {
        console.error("Errore fetch scheda:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDati();
  }, [slug]);

  if (loading) return <div style={{padding: '100px', textAlign: 'center'}}>Caricamento dati...</div>;
  if (!dato) return <div style={{padding: '100px', textAlign: 'center'}}>Scheda non trovata.</div>;

  return (
    <>
      <Head>
        <title>{dato.nome} - {dato.categoria} {dato.zona}</title>
      </Head>
      <Navbar />
      <main style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', minHeight: '60vh' }}>
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #f1f5f9' }}>
          <h1 style={{ color: '#0f172a', fontSize: '2.5rem', marginBottom: '10px' }}>{dato.nome}</h1>
          <p style={{ color: '#64748b', fontSize: '1.2rem', marginBottom: '25px' }}>{dato.categoria} a Roma {dato.zona}</p>
          
          <div style={{ backgroundColor: '#f0fdf4', padding: '20px', borderRadius: '12px', marginBottom: '30px' }}>
            <p style={{ margin: 0, lineHeight: '1.6', color: '#166534' }}>
              <strong>{dato.nome}</strong> è una struttura specializzata in <strong>{dato.categoria}</strong> situata nel quartiere {dato.zona} a Roma. 
              Puoi trovarla in {dato.indirizzo}.
            </p>
          </div>

          <div style={{ fontSize: '1.1rem', display: 'grid', gap: '15px' }}>
            <p>📍 <strong>Indirizzo:</strong> {dato.indirizzo}</p>
            <p>📞 <strong>Telefono:</strong> <a href={`tel:${dato.telefono}`} style={{ color: '#16a34a', fontWeight: 'bold' }}>{dato.telefono}</a></p>
          </div>

          <div style={{ marginTop: '30px' }}>
            <a href={`tel:${dato.telefono}`} style={{ display: 'block', backgroundColor: '#16a34a', color: 'white', padding: '15px', textAlign: 'center', borderRadius: '10px', fontWeight: 'bold', textDecoration: 'none' }}>
              CHIAMA ORA
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
