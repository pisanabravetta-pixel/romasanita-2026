import Head from "next/head";
import { createClient } from "@supabase/supabase-js";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

// Inizializzazione sicura del client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export async function getServerSideProps({ params }) {
  if (!supabase) {
    return { notFound: true };
  }

  const { data, error } = await supabase
    .from("annunci")
    .select("*")
    .eq("slug", params.slug)
    .eq("approvato", true)
    .single();

  if (!data || error) {
    return { notFound: true };
  }

  return {
    props: { struttura: data },
  };
}

export default function SchedaFarmacia({ struttura }) {
  if (!struttura) return null;

  const varianti = [
    `La ${struttura.nome} è una farmacia situata nel quartiere ${struttura.zona}, a Roma, in ${struttura.indirizzo}. Si trova in una zona facilmente raggiungibile dai residenti di ${struttura.zona} e delle aree vicine. Le farmacie in questa zona rappresentano un servizio essenziale per i cittadini, offrendo supporto e assistenza quotidiana. Questa struttura è localizzata con precisione sulla mappa per permettere una consultazione semplice e immediata.`,
    `Situata in ${struttura.indirizzo}, nel quartiere ${struttura.zona} di Roma, la ${struttura.nome} rientra tra le strutture sanitarie territoriali della zona. La posizione geografica consente ai residenti di ${struttura.zona} di individuarla facilmente. Rappresenta un punto di riferimento fondamentale per chiunque cerchi assistenza farmaceutica professionale nel cuore di ${struttura.zona}.`,
    `Nel quartiere ${struttura.zona} a Roma è presente la ${struttura.nome}, con sede in ${struttura.indirizzo}. Questa struttura è inclusa nell’elenco delle realtà sanitarie locali della zona ${struttura.zona}. La sua collocazione strategica la rende un presidio importante per la salute dei cittadini romani in questa specifica area della città.`
  ];

  const index = struttura.id ? (struttura.id % 3) : 0;
  const testoDinamico = varianti[index];

  return (
    <>
      <Head>
        <title>{struttura.nome} – Farmacia a {struttura.zona}, Roma</title>
        <meta name="description" content={`${struttura.nome}, farmacia situata in ${struttura.indirizzo}, quartiere ${struttura.zona} a Roma.`} />
      </Head>

      <Navbar />

      <main style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', minHeight: '80vh' }}>
        <div style={{ marginBottom: '20px' }}>
             <a href="/farmacie-roma" style={{color: '#065f46', textDecoration: 'none'}}>← Tutte le Farmacie</a>
        </div>

        <h1 style={{ color: '#065f46', fontSize: '2.5rem', marginBottom: '10px' }}>{struttura.nome}</h1>
        <p style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '30px' }}>Farmacia a Roma – Zona {struttura.zona}</p>

        <div style={{ backgroundColor: '#f0fdf4', padding: '25px', borderRadius: '15px', borderLeft: '5px solid #065f46', marginBottom: '30px' }}>
          <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>{testoDinamico}</p>
        </div>

        <section style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Dettagli e Contatti</h2>
            <p><strong>Indirizzo:</strong> {struttura.indirizzo}</p>
            <p><strong>Quartiere:</strong> {struttura.zona}</p>
            
            <div style={{ marginTop: '25px', display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
              <a href={`tel:${struttura.telefono}`} style={{ backgroundColor: '#065f46', color: 'white', padding: '12px 25px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold' }}>Chiama ora</a>
            </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
