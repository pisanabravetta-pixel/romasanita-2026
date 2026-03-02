import { supabase } from '../lib/supabaseClient';
import { specialisticheTop, quartieriTop, getDBQuery } from '../lib/seo-logic';

const BASE_URL = 'https://www.servizisalute.com';

// Pagine quartiere senza annunci — escluse dalla sitemap + noindex nel codice
// Aggiornato al 2026-03 da analisi CSV reale
export const PAGINE_VUOTE = new Set([
  'cardiologi-roma-ostia',
  'dermatologi-roma-ostia',
  'dermatologi-roma-tiburtina',
  'dermatologi-roma-montesacro',
  'ginecologi-roma-tiburtina',
  'nutrizionisti-roma-aurelio',
  'nutrizionisti-roma-montesacro',
  'oculisti-roma-ostia',
  'oculisti-roma-montesacro',
  'ortopedici-roma-montesacro',
  'psicologi-roma-parioli',
]);

function generateSiteMap(pagine) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${pagine.map(({ url, priority, changefreq }) => `
       <url>
           <loc>${BASE_URL}${url}</loc>
           <lastmod>${new Date().toISOString()}</lastmod>
           <changefreq>${changefreq || 'weekly'}</changefreq>
           <priority>${priority}</priority>
       </url>
     `).join('')}
   </urlset>
 `;
}

export default function SiteMap() {}

export async function getServerSideProps({ res }) {
  // 1. Recupero annunci approvati
  const { data: annunci } = await supabase
    .from('annunci')
    .select('slug, categoria, zona, approvato');

  const annunciApprovati = (annunci || []).filter(a =>
    a.approvato === true ||
    String(a.approvato).toUpperCase() === 'TRUE' ||
    a.approvato === 'SI'
  );

  const annunciPerPagina = 10;

  function categoriaMatch(annuncio, cat) {
    const qInfo = getDBQuery(cat);
    const termini = qInfo.termini || [qInfo.cat || cat];
    const catDB = (annuncio.categoria || '').toLowerCase();
    return termini.some(t => catDB.includes(t.toLowerCase()));
  }

  function zonaMatch(annuncio, q) {
    const zonaDB = (annuncio.zona || '').trim().toLowerCase();
    return (
      zonaDB === q.s.toLowerCase() ||
      zonaDB === q.s.replace(/-/g, ' ').toLowerCase() ||
      zonaDB.replace(/\s+/g, '-') === q.s.toLowerCase()
    );
  }

  // 2. Pagine statiche
  const staticPages = [
    { url: '/',                           priority: 1.0, changefreq: 'daily'   },
    { url: '/guide',                      priority: 0.9, changefreq: 'monthly' },
    { url: '/servizi-sanitari-roma',      priority: 0.9, changefreq: 'weekly'  },
    { url: '/visite-specialistiche-roma', priority: 0.9, changefreq: 'weekly'  },
    { url: '/quartieri-roma',             priority: 0.8, changefreq: 'weekly'  },
    { url: '/per-i-professionisti',       priority: 0.7, changefreq: 'monthly' },
    { url: '/pubblica-annuncio',          priority: 0.7, changefreq: 'monthly' },
  ];

  // 3. Guide
  const guidePages = [
    { url: '/guide/costo-pulizia-denti-roma',         priority: 0.8, changefreq: 'monthly' },
    { url: '/guide/costo-risonanza-magnetica-roma',   priority: 0.8, changefreq: 'monthly' },
    { url: '/guide/costo-visita-cardiologica-roma',   priority: 0.8, changefreq: 'monthly' },
    { url: '/guide/costo-visita-dermatologica-roma',  priority: 0.8, changefreq: 'monthly' },
    { url: '/guide/costo-visita-ginecologica-roma',   priority: 0.8, changefreq: 'monthly' },
    { url: '/guide/costo-visita-oculistica-roma',     priority: 0.8, changefreq: 'monthly' },
    { url: '/guide/trovare-servizio-sanitario-roma',  priority: 0.8, changefreq: 'monthly' },
  ];

  // 4. Hub categorie + paginazione
  const pagineHub = [];
  specialisticheTop.forEach(cat => {
    pagineHub.push({ url: `/${cat}-roma`, priority: 0.8, changefreq: 'daily' });
    const count = annunciApprovati.filter(a => categoriaMatch(a, cat)).length;
    const numPagine = Math.ceil(count / annunciPerPagina);
    for (let i = 2; i <= numPagine; i++) {
      pagineHub.push({ url: `/${cat}-roma?page=${i}`, priority: 0.6, changefreq: 'weekly' });
    }
  });

  // 5. Pagine quartiere — ESCLUSE quelle vuote
  const pagineQuartieri = [];
  specialisticheTop.forEach(cat => {
    quartieriTop.forEach(q => {
      const slugQuartiere = `/${cat}-roma-${q.s}`;
      const slugKey = `${cat}-roma-${q.s}`;

      // Salta le pagine senza annunci
      if (PAGINE_VUOTE.has(slugKey)) return;

      pagineQuartieri.push({ url: slugQuartiere, priority: 0.7, changefreq: 'weekly' });

      const countQ = annunciApprovati.filter(a =>
        categoriaMatch(a, cat) && zonaMatch(a, q)
      ).length;
      const numPagineQ = Math.ceil(countQ / annunciPerPagina);
      for (let i = 2; i <= numPagineQ; i++) {
        pagineQuartieri.push({ url: `${slugQuartiere}?page=${i}`, priority: 0.5, changefreq: 'weekly' });
      }
    });
  });

  // 6. Schede singole
  const schedeMedici = annunciApprovati
    .filter(a => a.slug && a.slug.trim() !== '')
    .map(a => ({ url: `/scheda/${a.slug}`, priority: 0.6, changefreq: 'monthly' }));

  const tutteLePagine = [
    ...staticPages,
    ...guidePages,
    ...pagineHub,
    ...pagineQuartieri,
    ...schedeMedici,
  ];

  const sitemap = generateSiteMap(tutteLePagine);

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(sitemap);
  res.end();

  return { props: {} };
}
