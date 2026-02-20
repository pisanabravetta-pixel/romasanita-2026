import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Head from "next/head";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function SchedaProfessionale() {
  const router = useRouter();
  const { slug } = router.query;
  const [dato, setDato] = useState(null);

  useEffect(() => {
    if (!slug) return;
    async function scaricaDati() {
      const { data } = await supabase
        .from("annunci")
        .select("*")
        .eq("slug", slug)
        .single();
      if (data) setDato(data);
    }
    scaricaDati();
  }, [slug]);

  if (!dato) return <div style={{padding: '50px', textAlign: 'center'}}>Caricamento...</div>;

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', color: '#333', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <Head>
        <title>{dato.nome} | ServiziSalute Roma</title>
      </Head>

      {/* Header Semplice */}
      <header style={{ backgroundColor: '#fff', padding: '15px 20px', borderBottom: '1px solid #eee', textAlign: 'center' }}>
        <a href="/" style={{ fontWeight: 'bold', color: '#065f46', textDecoration: 'none', fontSize: '1.5rem' }}>ServiziSalute</a>
      </header>

      <main style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px' }}>
             <a href="/farmacie-roma" style={{color: '#065f46', textDecoration: 'none'}}>← Torna all'elenco</a>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
            <h1 style={{ color: '#065f46', marginTop: 0 }}>{dato.nome}</h1>
            <p style={{ fontSize: '1.1rem', color: '#64748b' }}>{dato.categoria} a Roma - Quartiere {dato.zona}</p>
            
            <div style={{ backgroundColor: '#f0fdf4', padding: '20px', borderRadius: '10px', borderLeft: '4px solid #065f46', margin: '25px 0' }}>
              <p style={{ lineHeight: '1.6', margin: 0 }}>
                La <strong>{dato.nome}</strong> è un punto di riferimento per il quartiere {dato.zona} a Roma. 
                Situata in {dato.indirizzo}, la struttura offre servizi sanitari professionali e assistenza dedicata a tutti i cittadini della zona.
              </p>
            </div>

            <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
                <p><strong>📍 Indirizzo:</strong> {dato.indirizzo}</p>
                <p><strong>📞 Telefono:</strong> {dato.telefono}</p>
                {dato.whatsapp && <p><strong>💬 WhatsApp:</strong> {dato.whatsapp}</p>}
            </div>

            <div style={{ marginTop: '30px' }}>
                <a href={`tel:${dato.telefono}`} style={{ display: 'inline-block', backgroundColor: '#065f46', color: '#fff', padding: '15px 30px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', width: '100%', textAlign: 'center' }}>
                    CHIAMA ORA
                </a>
            </div>
        </div>
      </main>

      <footer style={{ marginTop: '50px', padding: '40px 20px', backgroundColor: '#1f2937', color: '#fff', textAlign: 'center' }}>
        <p>© 2026 ServiziSalute Roma - Tutti i diritti riservati</p>
      </footer>
    </div>
  );
}
