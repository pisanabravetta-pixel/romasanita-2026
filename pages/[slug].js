import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import HubLayout from '../components/HubLayout';
import { getDBQuery, seoData, quartieriTop } from '../lib/seo-logic';

export default function PaginaQuartiereDinamica({ 
  datiIniziali, totaleDalServer, paginaIniziale, slugSSR, categoriaSSR, zonaSSR 
}) {
  const router = useRouter();
  const slugAttivo = slugSSR || (router.query && router.query.slug) || "";

  // 1. Identificazione Categoria e Zona
  const isHub = slugAttivo && !slugAttivo.includes('-roma-');
  const catSlug = categoriaSSR || (slugAttivo ? slugAttivo.split('-roma')[0] : '');
  const zonaInSlug = isHub ? 'roma' : (slugAttivo.includes('-roma-') ? slugAttivo.split('-roma-')[1] : 'roma');
  
  const filtri = getDBQuery(catSlug);
  const colore = filtri.colore || '#2563eb';
  const tema = { primario: colore, chiaro: `${colore}11` };

  const nomiCorrettiH1 = {
    'farmacie': 'FARMACIE', 'dentisti': 'DENTISTI', 'dermatologi': 'DERMATOLOGI',
    'cardiologi': 'CARDIOLOGI', 'psicologi': 'PSICOLOGI', 'oculisti': 'OCULISTI',
    'ortopedici': 'ORTOPEDICI', 'nutrizionisti': 'NUTRIZIONISTI', 'ginecologi': 'GINECOLOGI',
    'diagnostica': 'DIAGNOSTICA'
  };

  const quartiereNome = zonaInSlug !== 'roma' 
    ? zonaInSlug.charAt(0).toUpperCase() + zonaInSlug.slice(1).replace(/-/g, ' ') 
    : 'Roma';
  
  const titoloPulito = nomiCorrettiH1[catSlug.toLowerCase()] || catSlug.toUpperCase().replace(/-/g, ' ');
  const meta = { 
    zona: quartiereNome, 
    cat: catSlug, 
    nomeSemplice: titoloPulito,
    titolo: isHub ? `${titoloPulito} ROMA` : `${titoloPulito} ROMA ${quartiereNome.toUpperCase()}`
  };

  const dataStringa = `${new Date().toLocaleString('it-IT', { month: 'long' })} ${new Date().getFullYear()}`;

  return (
    <HubLayout 
      {...seoData[catSlug]}
      titolo={meta.titolo}
      categoria={catSlug}
      colore={colore}
      datiIniziali={datiIniziali || []}
      totaleDalServer={totaleDalServer || 0}
      paginaIniziale={paginaIniziale || 1}
      testoTopBar={meta.titolo}
      badgeSpec={catSlug}
    >
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', width: '100%' }}>
        
        {/* BREADCRUMBS */}
        <nav style={{ margin: '15px 0', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
          <a href="/" style={{ color: colore, textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>{'>'}</span>
          {isHub ? (
             <span>{titoloPulito} Roma</span>
          ) : (
            <>
              <a href={`/${catSlug}-roma`} style={{ color: colore, textDecoration: 'none' }}>{titoloPulito} Roma</a>
              <span style={{ margin: '0 8px' }}>{'>'}</span>
              <span>{quartiereNome}</span>
            </>
          )}
        </nav>

        {/* HEADER SEO */}
        <div style={{ marginBottom: '25px', backgroundColor: 'white', padding: '20px', borderRadius: '12px', borderLeft: `8px solid ${colore}`, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h1 style={{ color: '#1e293b', fontSize: '32px', fontWeight: '900', margin: '0 0 10px 0' }}>{meta.titolo}</h1>
          <p style={{ color: '#64748b', fontSize: '18px', fontWeight: '600', margin: 0 }}>
            I migliori professionisti a {meta.zona} aggiornati a <span style={{ color: colore }}>{dataStringa}</span>
          </p>
        </div>

        {/* TESTO SEO INTELLIGENTE */}
        <div style={{ marginBottom: '25px', color: '#475569', fontSize: '16px', lineHeight: '1.7' }}>
           <p>
             Stai cercando <strong>{meta.nomeSemplice} a Roma {meta.zona}</strong>? In questa pagina trovi i contatti diretti, WhatsApp e la posizione dei professionisti disponibili oggi.
             Visualizza la mappa per trovare il centro più vicino a te e chiama per prenotare una visita.
           </p>
        </div>

        {/* SELEZIONE ZONE RAPIDA */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', marginBottom: '25px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '900', marginBottom: '12px' }}>Altre zone vicino a {meta.zona}:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {quartieriTop.map(q => (
              <a key={q.s} href={`/${meta.cat}-roma-${q.s}`} style={{ padding: '7px 12px', backgroundColor: tema.chiaro, color: colore, borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '12px' }}>{q.n}</a>
            ))}
          </div>
        </div>

        {/* BOX RISULTATI (Il Layout si occupa di ciclarli, qui mettiamo solo il contatore) */}
        <div style={{ marginBottom: '20px', padding: '0 5px', fontSize: '15px', fontWeight: '700', color: '#475569' }}>
           📍 Trovati {totaleDalServer} {meta.nomeSemplice.toLowerCase()} a {meta.zona}
        </div>

      </main>
    </HubLayout>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.query;
  const page = parseInt(context.query.page) || 1;
  const annunciPerPagina = 20;

  try {
    const { supabase } = require('../lib/supabaseClient');
    const slugPuro = slug ? slug.replace('-roma-', '@') : '';
    const catPart = slugPuro.split('@')[0].replace('-roma', '');
    const zonaPart = slugPuro.includes('@') ? slugPuro.split('@')[1] : 'roma';
    const isHub = zonaPart === 'roma';

    const radice = catPart.toLowerCase().substring(0, 5);
    let query = supabase.from('annunci').select('*', { count: 'exact' }).eq('approvato', true);

    if (isHub) {
      query = query.or(`categoria.ilike.%${radice}%,nome.ilike.%${radice}%`);
    } else {
      const zQuery = zonaPart.replace(/-/g, ' ');
      query = query.ilike('categoria', `%${radice}%`).or(`quartiere.ilike.%${zQuery}%,zona.ilike.%${zQuery}%`);
    }

    const { data, count } = await query
      .order('is_top', { ascending: false })
      .range((page - 1) * annunciPerPagina, page * annunciPerPagina - 1);

    return {
      props: { 
        datiIniziali: data || [], 
        totaleDalServer: count || 0, 
        paginaIniziale: page, 
        slugSSR: slug || '', 
        categoriaSSR: catPart, 
        zonaSSR: zonaPart 
      }
    };
  } catch (err) {
    return { props: { datiIniziali: [], totaleDalServer: 0, paginaIniziale: 1, slugSSR: slug || '' } };
  }
}
