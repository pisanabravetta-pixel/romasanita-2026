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

  useEffect(() => {
    // Carica i dati solo quando lo slug è disponibile nell'URL
    if (!slug) return;

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
  }, [slug]);

  if (loading) return <div style={{padding: '100px', textAlign: 'center'}}>Caricamento in corso...</div>;
  
  if (!dato) return (
    <div style={{padding: '100px', textAlign: 'center'}}>
      <h1>Scheda non trovata</h1>
      <p>Lo slug "{slug}" non corrisponde a nessun annuncio nel database.</p>
      <a href="/">Torna alla Home</a>
    </div>
  );

  // Varianti di testo per la SEO
  const varianti = [
    `La ${dato.nome} è una farmacia di riferimento situata nel quartiere ${dato.zona} a Roma. Offre assistenza professionale e una vasta gamma di servizi farmaceutici in ${dato.indirizzo}.`,
    `Situata in ${dato.indirizzo}, la ${dato.nome} serve con dedizione la comunità di Roma ${dato.zona}. Una struttura sanitaria affidabile per ogni esigenza del cittadino.`,
    `Nel cuore della zona ${dato.zona}, la ${dato.nome} rappresenta un presidio fondamentale per la salute dei residenti, garantendo competenza e cortesia in ${dato.indirizzo}.`
  ];
  const testoDinamico = varianti[dato.id % 3] || varianti[0];

  return (
    <>
      <Head>
        <title>{dato.nome} - {dato.categoria} Roma {dato.zona}</title>
        <meta name="description" content={`Contatti e informazioni su ${dato.nome}, ${dato.categoria} a Roma in zona ${dato.zona}.`} />
      </Head>

      <Navbar />

      <main style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', minHeight: '70vh' }}>
        <div style={{ marginBottom: '20px' }}>
             <a href="/farmacie-roma" style={{color: '#065f46', textDecoration: 'none', fontWeight: 'bold'}}>← Tutte le Farmacie</a>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '35px', borderRadius: '20px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
            <h1 style={{ color: '#065f46', fontSize: '2.2rem', marginBottom: '10px' }}>{dato.nome}</h1>
            <p style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '30px' }}>{dato.categoria} a Roma – {dato.zona}</p>
            
            <div style={{ backgroundColor: '#f0fdf4', padding: '25px', borderRadius: '15px', borderLeft: '6px solid #16a34a', marginBottom: '30px' }}>
              <p style={{ lineHeight: '1.8', fontSize: '1.1rem', margin: 0, color: '#166534' }}>
                {testoDinamico}
              </p>
            </div>

            <div style={{ display: 'grid', gap: '15px', fontSize: '1.1rem' }}>
                <p><strong>📍 Indirizzo:</strong> {dato.indirizzo}</p>
                <p><strong>📞 Telefono:</strong> <a href={`tel:${dato.telefono}`} style={{color: 'inherit', textDecoration: 'none'}}>{dato.telefono}</a></p>
                {dato.whatsapp && <p><strong>💬 WhatsApp:</strong> {dato.whatsapp}</p>}
            </div>

            <div style={{ marginTop: '40px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <a href={`tel:${dato.telefono}`} style={{ flex: 1, backgroundColor: '#16a34a', color: 'white', padding: '18px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', textAlign: 'center', fontSize: '1.1rem' }}>
                    CHIAMA ORA
                </a>
                {dato.whatsapp && (
                   <a href={`https://wa.me/${dato.whatsapp}`} style={{ flex: 1, backgroundColor: '#25D366', color: 'white', padding: '18px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', textAlign: 'center', fontSize: '1.1rem' }}>
                      WHATSAPP
                   </a>
                )}
            </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
