import React from 'react';
import { useRouter } from 'next/router';
import HubLayout from '../components/HubLayout';
import { getDBQuery, seoData } from '../lib/seo-logic';

export default function PaginaQuartiereDinamica({ 
  datiIniziali, totaleDalServer, paginaIniziale, slugSSR, categoriaSSR, zonaSSR 
}) {
  const router = useRouter();
  const slugAttivo = slugSSR || (router.query && router.query.slug) || "";

  // 1. Identifica Categoria e Zona
  const isHub = slugAttivo && !slugAttivo.includes('-roma-');
  const catSlug = categoriaSSR || (slugAttivo ? slugAttivo.split('-roma')[0] : '');
  const zonaInSlug = isHub ? 'roma' : (slugAttivo.includes('-roma-') ? slugAttivo.split('-roma-')[1] : 'roma');
  
  const filtri = getDBQuery(catSlug);
  const colore = filtri.colore || '#2563eb';

  const nomiCorrettiH1 = {
    'farmacie': 'FARMACIE', 'dentisti': 'DENTISTI', 'dermatologi': 'DERMATOLOGI',
    'cardiologi': 'CARDIOLOGI', 'psicologi': 'PSICOLOGI', 'oculisti': 'OCULISTI',
    'ortopedici': 'ORTOPEDICI', 'nutrizionisti': 'NUTRIZIONISTI', 'ginecologi': 'GINECOLOGI',
    'diagnostica': 'DIAGNOSTICA'
  };

  const quartiereNome = zonaInSlug !== 'roma' 
    ? zonaInSlug.charAt(0).toUpperCase() + zonaInSlug.slice(1).replace(/-/g, ' ') 
    : '';
  const titoloPulito = nomiCorrettiH1[catSlug.toLowerCase()] || catSlug.toUpperCase().replace(/-/g, ' ');

  return (
    <HubLayout 
      {...seoData[catSlug]} // <--- QUI DENTRO CI SONO LE TUE FAQ E IL SEO!
      titolo={isHub ? `${titoloPulito} ROMA` : `${titoloPulito} ROMA ${quartiereNome.toUpperCase()}`}
      categoria={catSlug}
      colore={colore}
      datiIniziali={datiIniziali || []}
      totaleDalServer={totaleDalServer || 0}
      paginaIniziale={paginaIniziale || 1}
      testoTopBar={isHub ? `${titoloPulito} ROMA` : `${titoloPulito} ${quartiereNome.toUpperCase()}`}
      badgeSpec={catSlug}
    >
      {/* BREADCRUMBS (PUNTO 4 DEL PIANO) */}
      <nav style={{ padding: '15px 10px', fontSize: '14px', color: '#64748b' }}>
        <a href="/" style={{ color: colore, textDecoration: 'none' }}>Home</a> / 
        {isHub ? (
          <span style={{ fontWeight: 'bold' }}> {titoloPulito} Roma</span>
        ) : (
          <>
            <a href={`/${catSlug}-roma`} style={{ color: colore, textDecoration: 'none' }}> {titoloPulito} Roma</a> / 
            <span style={{ fontWeight: 'bold' }}> {quartiereNome}</span>
          </>
        )}
      </nav>
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
