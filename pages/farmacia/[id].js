import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Head from "next/head";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function SchedaFarmacia() {
  const router = useRouter();
  const { id } = router.query;
  const [struttura, setStruttura] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchDati() {
      const { data, error } = await supabase
        .from("annunci")
        .select("*")
        .eq("slug", id)
        .single();

      if (data) {
        setStruttura(data);
      }
      setLoading(false);
    }

    fetchDati();
  }, [id]);

  if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Caricamento...</div>;
  if (!struttura) return <div style={{ padding: '100px', textAlign: 'center' }}>Farmacia non trovata.</div>;

  const varianti = [
    `La ${struttura.nome} è una farmacia situata a Roma in zona ${struttura.zona}. Offre assistenza e professionalità in ${struttura.indirizzo}.`,
    `Situata in ${struttura.indirizzo}, nel quartiere ${struttura.zona}, la ${struttura.nome} è un punto di riferimento per la salute.`,
    `Nel cuore di Roma ${struttura.zona}, si trova la ${struttura.nome}, che serve la comunità in ${struttura.indirizzo}.`
  ];
  const testoDinamico = varianti[struttura.id % 3] || varianti[0];

  return (
    <>
      <Head>
        <title>{struttura.nome} – Farmacia Roma {struttura.zona}</title>
      </Head>
      <Navbar />
      <main style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', minHeight: '80vh' }}>
        <h1 style={{ color: '#065f46' }}>{struttura.nome}</h1>
        <div style={{ backgroundColor: '#f0fdf4', padding: '25px', borderRadius: '15px', margin: '20px 0' }}>
          <p>{testoDinamico}</p>
        </div>
        <p><strong>Indirizzo:</strong> {struttura.indirizzo}</p>
        <p><strong>Telefono:</strong> {struttura.telefono}</p>
        <a href={`tel:${struttura.telefono}`} style={{ display: 'inline-block', marginTop: '20px', background: '#065f46', color: 'white', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none' }}>CHIAMA ORA</a>
      </main>
      <Footer />
    </>
  );
}
