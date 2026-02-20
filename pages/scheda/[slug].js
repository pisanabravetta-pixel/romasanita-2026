import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Head from "next/head";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function PaginaDinamica() {
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

  if (!dato) return <div style={{padding: '50px'}}>Caricamento...</div>;

  return (
    <>
      <Head><title>{dato.nome}</title></Head>
      <Navbar />
      <main style={{ padding: '50px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{color: '#065f46'}}>{dato.nome}</h1>
        <p><strong>Indirizzo:</strong> {dato.indirizzo}</p>
        <p><strong>Quartiere:</strong> {dato.zona}</p>
        <div style={{marginTop: '20px', padding: '20px', background: '#f0fdf4', borderRadius: '10px'}}>
           <p>Benvenuti nella scheda di {dato.nome} a Roma {dato.zona}.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
