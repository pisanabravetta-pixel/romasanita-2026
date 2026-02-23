import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HubLayout from '../components/HubLayout'; // Assicurati che l'import ci sia
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, quartieriTop, seoData } from '../lib/seo-logic';
import Script from 'next/script';

export default function PaginaQuartiereDinamica({ 
  datiIniziali, 
  totaleDalServer, 
  paginaIniziale, 
  slugSSR,
  categoriaSSR, 
  zonaSSR         
}) {
  const router = useRouter();
  const slugAttivo = slugSSR || (router.query && router.query.slug) || "";

  // Determina se è Hub (es. cardiologi-roma) o Quartiere (es. cardiologi-roma-prati)
  const isHub = slugAttivo && !slugAttivo.includes('-roma-');
  
  // Estrae la categoria (es. cardiologi)
  const catSlug = categoriaSSR || (slugAttivo ? slugAttivo.split('-roma')[0] : '');
  
  // Estrae la zona (se non c'è -roma- allora è roma)
  const zonaInSlug = isHub ? 'roma' : (slugAttivo.includes('-roma-') ? slugAttivo.split('-roma-')[1] : 'roma');
  
  const filtri = getDBQuery(catSlug);

  // Se lo slug non esiste proprio, allora manda al 404
  if (slugAttivo && filtri.cat === 'NON_ESISTE') {
    if (typeof window !== 'undefined') {
      router.replace('/404'); 
    }
    return null;
  }

  const mesi = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
  const dataAttuale = new Date();
  const meseCorrente = mesi[dataAttuale.getMonth()];
  const annoCorrente = dataAttuale.getFullYear();
  const dataStringa = `${meseCorrente} ${annoCorrente}`;

  const nomiCorrettiH1 = {
    'farmacie': 'FARMACIE', 'farmac': 'FARMACIE', 'diagnostica': 'DIAGNOSTICA',
    'diagnost': 'DIAGNOSTICA', 'dentisti': 'DENTISTI', 'dermatologi': 'DERMATOLOGI',
    'cardiologi': 'CARDIOLOGI', 'psicologi': 'PSICOLOGI', 'oculisti': 'OCULISTI',
    'ortopedici': 'ORTOPEDICI', 'nutrizionisti': 'NUTRIZIONISTI', 'ginecologi': 'GINECOLOGI'
  };

  const quartiereNome = zonaInSlug ? zonaInSlug.charAt(0).toUpperCase() + zonaInSlug.slice(1).replace(/-/g, ' ') : '';
  const titoloPulito = nomiCorrettiH1[catSlug.toLowerCase()] || catSlug.toUpperCase().replace(/-/g, ' ');
  const colore = filtri.colore || '#2563eb';

// LOGICA PULITA SSR
  const pagina = paginaIniziale || 1;
  const listaDaMostrare = datiIniziali || [];

return (
    <>
      {zonaInSlug === 'roma' ? (
        <HubLayout 
          titolo={titoloPulito || 'Specialisti'}
          categoria={catSlug}
          colore={colore}
          datiIniziali={datiIniziali || []}
          totaleDalServer={totaleDalServer || 0}
          paginaIniziale={pagina || 1}
          testoTopBar={`${titoloPulito || catSlug} ROMA`}
          badgeSpec={catSlug}
          {...(seoData[catSlug] || {})} 
        >
          <div style={{ background: 'red', color: 'white', padding: '15px', textAlign: 'center', fontWeight: 'bold', width: '100%' }}>
            DEBUG: SERVER OK - TROVATI {datiIniziali?.length || 0} ANNUNCI
          </div>
        </HubLayout>
      ) : (
        <HubLayout 
          titolo={`${titoloPulito} ${quartiereNome}`}
          categoria={catSlug}
          colore={colore}
          datiIniziali={datiIniziali || []}
          totaleDalServer={totaleDalServer || 0}
          paginaIniziale={pagina || 1}
          testoTopBar={`${titoloPulito} ${quartiereNome.toUpperCase()}`}
          badgeSpec={catSlug}
          {...(seoData[catSlug] || {})}
        >
          <div style={{ background: 'blue', color: 'white', padding: '15px', textAlign: 'center', fontWeight: 'bold', width: '100%' }}>
            QUARTIERE: {quartiereNome} - TROVATI {datiIniziali?.length || 0} ANNUNCI
          </div>
        </HubLayout>
      )}
    </>
  );
}
        <import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HubLayout from '../components/HubLayout'; // Assicurati che l'import ci sia
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, quartieriTop, seoData } from '../lib/seo-logic';
import Script from 'next/script';

export default function PaginaQuartiereDinamica({ 
  datiIniziali, 
  totaleDalServer, 
  paginaIniziale, 
  slugSSR,
  categoriaSSR, 
  zonaSSR         
}) {
  const router = useRouter();
  const slugAttivo = slugSSR || (router.query && router.query.slug) || "";

  // Determina se è Hub (es. cardiologi-roma) o Quartiere (es. cardiologi-roma-prati)
  const isHub = slugAttivo && !slugAttivo.includes('-roma-');
  
  // Estrae la categoria (es. cardiologi)
  const catSlug = categoriaSSR || (slugAttivo ? slugAttivo.split('-roma')[0] : '');
  
  // Estrae la zona (se non c'è -roma- allora è roma)
  const zonaInSlug = isHub ? 'roma' : (slugAttivo.includes('-roma-') ? slugAttivo.split('-roma-')[1] : 'roma');
  
  const filtri = getDBQuery(catSlug);

  // Se lo slug non esiste proprio, allora manda al 404
  if (slugAttivo && filtri.cat === 'NON_ESISTE') {
    if (typeof window !== 'undefined') {
      router.replace('/404'); 
    }
    return null;
  }

  const mesi = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
  const dataAttuale = new Date();
  const meseCorrente = mesi[dataAttuale.getMonth()];
  const annoCorrente = dataAttuale.getFullYear();
  const dataStringa = `${meseCorrente} ${annoCorrente}`;

  const nomiCorrettiH1 = {
    'farmacie': 'FARMACIE', 'farmac': 'FARMACIE', 'diagnostica': 'DIAGNOSTICA',
    'diagnost': 'DIAGNOSTICA', 'dentisti': 'DENTISTI', 'dermatologi': 'DERMATOLOGI',
    'cardiologi': 'CARDIOLOGI', 'psicologi': 'PSICOLOGI', 'oculisti': 'OCULISTI',
    'ortopedici': 'ORTOPEDICI', 'nutrizionisti': 'NUTRIZIONISTI', 'ginecologi': 'GINECOLOGI'
  };

  const quartiereNome = zonaInSlug ? zonaInSlug.charAt(0).toUpperCase() + zonaInSlug.slice(1).replace(/-/g, ' ') : '';
  const titoloPulito = nomiCorrettiH1[catSlug.toLowerCase()] || catSlug.toUpperCase().replace(/-/g, ' ');
  const colore = filtri.colore || '#2563eb';

// LOGICA PULITA SSR
  const pagina = paginaIniziale || 1;
  const listaDaMostrare = datiIniziali || [];

return (
    <>
      {zonaInSlug === 'roma' ? (
        <HubLayout 
          titolo={titoloPulito || 'Specialisti'}
          categoria={catSlug}
          colore={colore}
          datiIniziali={datiIniziali || []}
          totaleDalServer={totaleDalServer || 0}
          paginaIniziale={pagina || 1}
          testoTopBar={`${titoloPulito || catSlug} ROMA`}
          badgeSpec={catSlug}
          {...(seoData[catSlug] || {})} 
        >
          <div style={{ background: 'red', color: 'white', padding: '15px', textAlign: 'center', fontWeight: 'bold', width: '100%' }}>
            DEBUG: SERVER OK - TROVATI {datiIniziali?.length || 0} ANNUNCI
          </div>
        </HubLayout>
      ) : (
        <HubLayout 
          titolo={`${titoloPulito} ${quartiereNome}`}
          categoria={catSlug}
          colore={colore}
          datiIniziali={datiIniziali || []}
          totaleDalServer={totaleDalServer || 0}
          paginaIniziale={pagina || 1}
          testoTopBar={`${titoloPulito} ${quartiereNome.toUpperCase()}`}
          badgeSpec={catSlug}
          {...(seoData[catSlug] || {})}
        >
          <div style={{ background: 'blue', color: 'white', padding: '15px', textAlign: 'center', fontWeight: 'bold', width: '100%' }}>
            QUARTIERE: {quartiereNome} - TROVATI {datiIniziali?.length || 0} ANNUNCI
          </div>
        </HubLayout>
      )}
    </>
  );
}


// --- QUESTA FUNZIONE VA FUORI DAL COMPONENTE, IN FONDO AL FILE [slug].js ---
export async function getServerSideProps(context) {
  const { slug } = context.query;
  const page = parseInt(context.query.page) || 1;
  const annunciPerPagina = 10;

  try {
    const { supabase } = require('../lib/supabaseClient');

    // 1. Identificazione Categoria e Zona
    const slugPuro = slug ? slug.replace('-roma-', '@') : '';
    const catPart = slugPuro.split('@')[0].replace('-roma', '');
    const zonaPart = slugPuro.includes('@') ? slugPuro.split('@')[1] : 'roma';
    const isHub = zonaPart === 'roma';

    // 2. Definizione Radice di ricerca (fondamentale per trovare "dermatologo" nelle parentesi)
    const radice = catPart.toLowerCase().includes('cardiolog') ? 'cardiolo' : 
                   catPart.toLowerCase().includes('dermatol') ? 'dermato' : 
                   catPart.toLowerCase().substring(0, 5);

    let query = supabase
      .from('annunci')
      .select('*', { count: 'exact' })
      .eq('approvato', true);

    // 3. Logica della Query differenziata
    if (isHub) {
      // Se siamo sulla HUB (Roma), cerchiamo la radice ovunque (categoria, nome o slug)
      query = query.or(`categoria.ilike.%${radice}%,nome.ilike.%${radice}%,slug.ilike.%${radice}%`);
    } else {
      // Se siamo nel QUARTIERE, la categoria deve contenere la radice E la zona deve corrispondere
      const zQuery = zonaPart.replace(/-/g, ' ');
      query = query.ilike('categoria', `%${radice}%`)
                   .or(`zona.ilike.%${zQuery}%,slug.ilike.%${zonaPart}%`);
    }

    // 4. Paginazione e Ordinamento
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
        slugSSR: slug || '',
        categoriaSSR: catPart,
        zonaSSR: zonaPart
      },
    };
  } catch (err) {
    console.error("ERRORE SSR NELLA PAGINA [SLUG]:", err);
    return {
      props: { 
        datiIniziali: [], 
        totaleDalServer: 0, 
        paginaIniziale: 1, 
        slugSSR: slug || '',
        categoriaSSR: '',
        zonaSSR: 'roma'
      },
    };
  }
}
