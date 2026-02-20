// Forza Next.js a non renderizzare questa pagina sul server durante il build
export const dynamic = 'force-dynamic';

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Head from "next/head";

// Inizializzazione super sicura
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default function SchedaProfessionale() {
  const router = useRouter();
  const { slug } = router.query;
  const [dato, setDato] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    
    async function scaricaDati() {
      try {
        const { data, error } = await supabase
          .from("annunci")
          .select("*")
          .eq("slug", slug)
          .single();
        
        if (data) setDato(data);
      } catch (err) {
        console.error("Errore caricamento:", err);
      } finally {
        setLoading(false);
      }
    }
    scaricaDati();
  }, [slug]);

  if (loading) return <div style={{padding: '50px', textAlign: 'center'}}>Caricamento in corso...</div>;
  
  if (!dato) return (
    <div style={{padding: '50px', textAlign: 'center'}}>
      <h1>Scheda non trovata</h1>
      <a href="/">Torna alla Home</a>
    </div>
  );

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <Head>
        <title>{dato.nome} | ServiziSalute Roma</title>
      </Head>

      <header style={{ backgroundColor: '#fff', padding: '15px', borderBottom: '1px solid #eee', textAlign: 'center' }}>
        <a href="/" style={{ fontWeight: 'bold', color: '#065f46', textDecoration: 'none', fontSize: '1.2rem' }}>ServiziSalute Roma</a>
      </header>

      <main style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h1 style={{ color: '#065f46', fontSize: '1.8rem', margin: '0 0 10px 0' }}>{dato.nome}</h1>
            <p style={{ color: '#666', marginBottom: '20px' }}>{dato.categoria} a Roma - {dato.zona}</p>
            
            <div style={{ backgroundColor: '#f0fdf4', padding: '15px', borderRadius: '10px', marginBottom: '20px', borderLeft: '4px solid #065f46' }}>
              <p style={{ margin: 0, lineHeight: '1.5' }}>
                Struttura sanitaria situata in <strong>{dato.indirizzo}</strong>. 
                Punto di riferimento per i servizi di {dato.categoria.toLowerCase()} nel quartiere {dato.zona}.
              </p>
            </div>

            <div style={{ borderTop: '1px solid #eee', paddingTop: '15px' }}>
                <p><strong>📍 Indirizzo:</strong> {dato.indirizzo}</p>
                <p><strong>📞 Telefono:</strong> {dato.telefono}</p>
            </div>

            <a href={`tel:${dato.telefono}`} style={{ display: 'block', backgroundColor: '#065f46', color: '#fff', padding: '15px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', textAlign: 'center', marginTop: '20px' }}>
                CHIAMA ORA
            </a>
        </div>
      </main>
    </div>
  );
}
