import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function getServerSideProps({ params }) {
  // TEST 1: Vediamo cosa arriva nei parametri
  console.log("Parametro ID ricevuto:", params.id);

  const { data, error } = await supabase
    .from("annunci")
    .select("nome, slug, zona")
    .eq("slug", params.id)
    .single();

  return {
    props: { 
      debug: {
        parametroInserito: params.id,
        datoTrovato: data || "Nessun dato trovato",
        erroreSupabase: error ? error.message : "Nessuno"
      }
    },
  };
}

export default function DebugPage({ debug }) {
  return (
    <pre style={{ padding: '20px', background: '#000', color: '#0f0' }}>
      {JSON.stringify(debug, null, 2)}
    </pre>
  );
}
