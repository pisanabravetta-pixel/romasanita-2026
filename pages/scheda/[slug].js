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
  const [erroreSQL, setErroreSQL] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    // Inizializzazione
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      setErroreSQL("Mancano le chiavi API di Supabase su Vercel!");
      setLoading(false);
      return;
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    async function scaricaDati() {
      try {
        const { data, error } = await supabase
          .from("annunci")
          .select("*")
          .eq("slug", slug)
          .single();
        
        if (error) {
          setErroreSQL(error.message);
        } else {
          setDato(data);
        }
      } catch (err) {
        setErroreSQL("Errore di connessione al database.");
      } finally {
        setLoading(false);
      }
    }
    scaricaDati();
  }, [slug]);

  if (loading) return <div style={{padding: '100px', textAlign: 'center'}}>Connessione al database...</div>;

  return (
    <>
      <Head><title>Debug Supabase</title></Head>
      <Navbar />
      <main style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
        {erroreSQL ? (
          <div style={{ padding: '20px', background: '#fee2e2', border: '1px solid #ef4444', borderRadius: '10px' }}>
            <h2 style={{ color: '#b91c1c' }}>⚠️ Errore Database</h2>
            <p><strong>Messaggio:</strong> {erroreSQL}</p>
            <p>Slug cercato: <code>{slug}</code></p>
            <p><em>Suggerimento: Controlla che le variabili d'ambiente su Vercel siano corrette.</em></p>
          </div>
        ) : (
          <div style={{ padding: '20px', background: '#f0fdf4', borderRadius: '10px' }}>
            <h1 style={{color: '#166534'}}>✅ Dati Trovati!</h1>
            <h2>{dato?.nome}</h2>
            <p>Indirizzo: {dato?.indirizzo}</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
