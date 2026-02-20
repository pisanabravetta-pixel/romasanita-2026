import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Head from "next/head";

export default function SchedaProfessionale() {
  const router = useRouter();
  const { slug } = router.query;
  const [dato, setDato] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Inizializziamo Supabase SOLO quando siamo nel browser (client-side)
    if (!slug) return;
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    async function scaricaDati() {
      try {
        const { data, error } = await supabase
          .from("annunci")
          .select("*")
          .eq("slug", slug)
          .single();
        
        if (data) setDato(data);
      } catch (err) {
        console.error("Errore:", err);
      } finally {
        setLoading(false);
      }
    }
    scaricaDati();
  }, [slug]);

  if (loading) return <div style={{padding: '50px', textAlign: 'center'}}>Caricamento...</div>;
  if (!dato) return <div style={{padding: '50px', textAlign: 'center'}}>Scheda non trovata.</div>;

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <Head><title>{dato.nome}</title></Head>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h1 style={{ color: '#065f46' }}>{dato.nome}</h1>
        <p><strong>Quartiere:</strong> {dato.zona}</p>
        <p><strong>Indirizzo:</strong> {dato.indirizzo}</p>
        <p><strong>Telefono:</strong> {dato.telefono}</p>
        <a href={`tel:${dato.telefono}`} style={{ display: 'block', background: '#065f46', color: '#fff', padding: '10px', textAlign: 'center', borderRadius: '5px', marginTop: '20px', textDecoration: 'none' }}>CHIAMA ORA</a>
      </div>
    </div>
  );
}
