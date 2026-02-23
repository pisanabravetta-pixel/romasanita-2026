// pages/hub/[categoria].js
import { useState, useEffect } from 'react';
import HubLayout from '../../components/HubLayout';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabaseClient';

export default function HubPage({ datiIniziali, totaleDalServer, paginaIniziale, categoriaSSR }) {
  const router = useRouter();
  const { categoria } = router.query;

  // Stati principali
  const [servizi, setServizi] = useState(datiIniziali || []);
  const [loading, setLoading] = useState(datiIniziali?.length > 0 ? false : true);
  const [pagina, setPagina] = useState(paginaIniziale || 1);

  const annunciPerPagina = 10;

  // Aggiorna la pagina dalla query string
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const p = parseInt(params.get('page')) || 1;
      setPagina(p);
    }
  }, [router.query]);

  // Aggiorna i dati quando cambiano i props SSR
  useEffect(() => {
    setServizi(datiIniziali || []);
    setLoading(false);
  }, [datiIniziali]);

  // Calcolo variabili derivate
  const listaUnica = Array.from(new Map((servizi || []).map(item => [item.id, item])).values());
  const totaleAnnunci = totaleDalServer || listaUnica.length;
  const totalePagine = Math.max(1, Math.ceil(totaleAnnunci / annunciPerPagina));
  const inizio = (pagina - 1) * annunciPerPagina;
  const listaDaMostrare = listaUnica.slice(inizio, inizio + annunciPerPagina);

  return (
    <HubLayout
      categoria={categoriaSSR}
      servizi={listaDaMostrare}
      loading={loading}
      pagina={pagina}
      totalePagine={totalePagine}
    />
  );
}

// --- SERVER SIDE PROPS ---
export async function getServerSideProps(context) {
  const { categoria } = context.query;
  const page = parseInt(context.query.page) || 1;
  const annunciPerPagina = 10;

  try {
    // Analisi categoria
    const catPulita = categoria ? categoria.toLowerCase() : '';

    // Query supabase
    let query = supabase
      .from('annunci')
      .select('*', { count: 'exact' })
      .eq('approvato', true);

    // Filtra per categoria o radice (es. visite-specialistiche (cardiologo))
    const keyword = catPulita.replace(/[^a-z0-9]/g, '').substring(0, 4);
    query = query.or(`categoria.ilike.%${keyword}%,nome.ilike.%${keyword}%`);

    // Paginazione
    const da = (page - 1) * annunciPerPagina;
    const a = da + annunciPerPagina - 1;

    const { data, count, error } = await query
      .order('is_top', { ascending: false })
      .range(da, a);

    if (error) throw error;

    return {
      props: {
        datiIniziali: data || [],
        totaleDalServer: count || 0,
        paginaIniziale: page,
        categoriaSSR: catPulita
      }
    };
  } catch (err) {
    console.error("Errore SSR Hub:", err);
    return {
      props: { datiIniziali: [], totaleDalServer: 0, paginaIniziale: 1, categoriaSSR: categoria || '' }
    };
  }
}
