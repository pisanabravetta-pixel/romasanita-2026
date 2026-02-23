import HubLayout from "../components/HubLayout";
import { createClient } from "@supabase/supabase-js";

export async function getServerSideProps(context) {
  const { categoria } = context.params;
  const page = parseInt(context.query.page) || 1;

  const limit = 10;
  const offset = (page - 1) * limit;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const mappaCategorie = {
  dermatologi: [
    "visite-specialistiche (dermatologo)",
    "visite-specialistiche (dermatologa)",
    "visite-specialistiche (dermatologi)"
  ],
  cardiologi: [
    "visite-specialistiche (cardiologo)",
    "visite-specialistiche (cardiologa)",
    "visite-specialistiche (cardiologi)"
  ],
  psicologi: [
    "visite-specialistiche (psicologo)",
    "visite-specialistiche (psicologa)",
    "visite-specialistiche (psicologi)"
  ],
  ginecologi: [
    "visite-specialistiche (ginecologo)",
    "visite-specialistiche (ginecologa)",
    "visite-specialistiche (ginecologi)"
  ],
  oculisti: [
    "visite-specialistiche (oculista)",
    "visite-specialistiche (oculista donna)",
    "visite-specialistiche (oculisti)"
  ],
  ortopedici: [
    "visite-specialistiche (ortopedico)",
    "visite-specialistiche (ortopedica)",
    "visite-specialistiche (ortopedici)"
  ],
  nutrizionisti: [
    "visite-specialistiche (nutrizionista)",
    "visite-specialistiche (nutrizionista donna)",
    "visite-specialistiche (nutrizionisti)"
  ]
};

let filtroCategoria = mappaCategorie[categoria] || [categoria];

  if (specialisti[categoria]) {
    const base = specialisti[categoria];

    filtroCategoria = [
      `visite-specialistiche (${base}o)`,
      `visite-specialistiche (${base}a)`,
      `visite-specialistiche (${categoria})`
    ];
  } else {
    filtroCategoria = [categoria];
  }

 const { data, count, error } = await supabase
  .from("annunci")
  .select("*", { count: "exact" })
  .in("categoria", filtroCategoria)
  .eq("approvato", true)
  .range(offset, offset + limit - 1);
  if (error) {
    console.error("Errore Supabase:", error);
    return { notFound: true };
  }

  return {
    props: {
      datiIniziali: data || [],
      paginaIniziale: page,
      totaleDalServer: count || 0,
      categoria
    }
  };
}

export default function CategoriaRoma(props) {
  return <HubLayout {...props} />;
}
