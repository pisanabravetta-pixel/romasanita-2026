import Head from "next/head";
import { createClient } from "@supabase/supabase-js";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function getServerSideProps({ params }) {
  // Cerchiamo l'annuncio usando lo slug esatto del tuo DB
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
    `La ${struttura.nome} è una farmacia situata nel quartiere ${struttura.zona}, a Roma, in ${struttura.indirizzo}. Si trova in una zona facilmente raggiungibile dai residenti di ${struttura.zona} e delle aree vicine.`,
    `Situata in ${struttura.indirizzo}, nel quartiere ${struttura.zona} di Roma, la ${struttura.nome} rientra tra le strutture sanitarie territoriali della zona ${struttura.zona}.`,
    `Nel quartiere ${struttura.zona} a Roma è presente la ${struttura.nome}, con sede in ${struttura.indirizzo}. Rappresenta un presidio importante per la salute dei cittadini in questa area.`
  ];

  // Scegliamo la variante
  const index = struttura.id ? (struttura.id % 3) : 0;
  const testoDinamico = varianti[index];

  return (
    <>
      <Head>
        <title>{struttura.nome} – Farmacia a {struttura.zona}, Roma</title>
        <meta name="description" content={`${struttura.nome}, farmacia nel quartiere ${struttura.zona} a Roma in ${struttura.indirizzo}.`} />
      </Head>

      <Navbar />

      <main style={{ padding: '20px', maxWidth: '1000px', margin: '40px auto', minHeight: '70vh' }}>
        <h1 style={{ color: '#065f46', fontSize: '2.2rem' }}>{struttura.nome}</h1>
        <p style={{ color: '#666', fontSize: '1.2rem' }}>Farmacia a Roma - Zona {struttura.zona}</p>
        
        <div style={{ backgroundColor: '#f0fdf4', padding: '25px', borderRadius: '15px', borderLeft: '5px solid #065f46', margin: '30px 0' }}>
          <p style={{ lineHeight: '1.6', fontSize: '1.1rem' }}>{testoDinamico}</p>
        </div>

        <div style={{ border: '1px solid #eee', padding: '20px', borderRadius: '10px' }}>
          <p><strong>Indirizzo:</strong> {struttura.indirizzo}</p>
          <p><strong>Quartiere:</strong> {struttura.zona}</p>
          <div style={{ marginTop: '20px' }}>
            <a href={`tel:${struttura.telefono}`} style={{ background: '#065f46', color: 'white', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}>CHIAMA ORA</a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
