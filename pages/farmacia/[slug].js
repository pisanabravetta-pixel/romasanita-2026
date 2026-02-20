import Head from "next/head";
import { createClient } from "@supabase/supabase-js";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function getServerSideProps({ params }) {
  const { data, error } = await supabase
    .from("annunci")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!data || error) {
    return { notFound: true };
  }

  return {
    props: { struttura: data },
  };
}

export default function SchedaFarmacia({ struttura }) {
  const varianti = [
    `La ${struttura.nome} è una farmacia situata a Roma in zona ${struttura.zona}. Rappresenta un punto di riferimento essenziale per i residenti di ${struttura.zona}, offrendo assistenza e professionalità in ${struttura.indirizzo}.`,
    `Situata in ${struttura.indirizzo}, nel quartiere ${struttura.zona}, la ${struttura.nome} è una struttura sanitaria dedicata alla salute dei cittadini. La sua posizione a Roma ${struttura.zona} la rende facilmente accessibile.`,
    `Nel cuore di Roma ${struttura.zona}, presso ${struttura.indirizzo}, si trova la ${struttura.nome}. Questa farmacia serve la comunità locale fornendo servizi farmaceutici nel quartiere ${struttura.zona}.`
  ];

  const index = struttura.id ? (struttura.id % 3) : 0;
  const testoDinamico = varianti[index];

  return (
    <>
      <Head>
        <title>{struttura.nome} – Farmacia a Roma {struttura.zona}</title>
      </Head>
      <Navbar />
      <main style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', minHeight: '80vh' }}>
        <h1 style={{ color: '#065f46' }}>{struttura.nome}</h1>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>Roma, quartiere {struttura.zona}</p>
        
        <div style={{ backgroundColor: '#f0fdf4', padding: '25px', borderRadius: '15px', margin: '30px 0', borderLeft: '5px solid #065f46' }}>
          <p style={{ lineHeight: '1.6' }}>{testoDinamico}</p>
        </div>

        <p><strong>Indirizzo:</strong> {struttura.indirizzo}</p>
        <a href={`tel:${struttura.telefono}`} style={{ display: 'inline-block', marginTop: '20px', background: '#065f46', color: 'white', padding: '12px 25px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>CHIAMA ORA</a>
      </main>
      <Footer />
    </>
  );
}
