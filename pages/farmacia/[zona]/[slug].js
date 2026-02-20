import Head from "next/head";
import { createClient } from "@supabase/supabase-js";

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
  return (
    <div style={{ padding: '50px', fontFamily: 'sans-serif' }}>
      <Head>
        <title>{struttura.nome} - Test</title>
      </Head>
      <h1>{struttura.nome}</h1>
      <p>Indirizzo: {struttura.indirizzo}</p>
      <p>Zona: {struttura.zona}</p>
      <hr />
      <p>Se vedi questa pagina, il database è collegato correttamente!</p>
    </div>
  );
}
