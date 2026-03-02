import { supabase } from '../lib/supabaseClient';
import { specialisticheTop, quartieriTop, getDBQuery } from '../lib/seo-logic';

const BASE_URL = 'https://www.servizisalute.com';

function generateSiteMap(pagine) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${pagine
       .map(({ url, priority }) => `
       <url>
           <loc>${BASE_URL}${url}</loc>
           <lastmod>${new Date().toISOString()}</lastmod>
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

  // Helper: controlla se un annuncio appartiene a una categoria
  // Usa gli stessi termini di getDBQuery (es. 'cardiol', 'dermatol', 'domicilio'...)
  function categoriaMatch(annuncio, cat) {
    const qInfo = getDBQuery(cat);
    const termini = qInfo.termini || [qInfo.cat || cat];
    const catDB = (annuncio.categoria || '').toLowerCase();
    return termini.some(t => catDB.includes(t.toLowerCase()));
  }

  // 2. Pagine statiche principali
  const staticPages = [
    { url: '/',                              priority: 1.0 },
    { url: '/guide',                         priority: 0.9 },
    { url: '/servizi-sanitari-roma',         priority: 0.9 },
    { url: '/visite-specialistiche-roma',    priority: 0.9 },
    { url: '/quartieri-roma',                priority: 0.8 },
    { url: '/per-i-professionisti',          priority: 0.7 },
    { url: '/pubblica-annuncio',             priority: 0.7 },
  ];

  // 3. Guide
  const guidePages = [
    { url: '/guide/costo-pulizia-denti-roma',         priority: 0.8 },
    { url: '/guide/costo-risonanza-magnetica-roma',   priority: 0.8 },
    { url: '/guide/costo-visita-cardiologica-roma',   priority: 0.8 },
    { url: '/guide/costo-visita-dermatologica-roma',  priority: 0.8 },
    { url: '/guide/costo-visita-ginecologica-roma',   priority: 0.8 },
    { url: '/guide/costo-visita-oculistica-roma',     priority: 0.8 },
    { url: '/guide/trovare-servizio-sanitario-roma',  priority: 0.8 },
  ];

  // 4. Pagine hub categoria + paginazione corretta
  const pagineHub = [];
  specialisticheTop.forEach(cat => {
    pagineHub.push({ url: `/${cat}-roma`, priority: 0.8 });

    const count = annunciApprovati.filter(a => categoriaMatch(a, cat)).length;
    const numPagine = Math.ceil(count / annunciPerPagina);
    for (let i = 2; i <= numPagine; i++) {
      pagineHub.push({ url: `/${cat}-roma?page=${i}`, priority: 0.6 });
    }
  });

  // 5. Pagine quartiere + paginazione corretta
  const pagineQuartieri = [];
  specialisticheTop.forEach(cat => {
    quartieriTop.forEach(q => {
      const slugQuartiere = `/${cat}-roma-${q.s}`;
      pagineQuartieri.push({ url: slugQuartiere, priority: 0.7 });

      const countQ = annunciApprovati.filter(a => {
        const catOk  = categoriaMatch(a, cat);
        // zona nel DB può essere "Prati", "prati", "san-giovanni", "San Giovanni"
        const zonaDB = (a.zona || '').toLowerCase().replace(/\s+/g, '-');
        const zonaOk = zonaDB === q.s.toLowerCase();
        return catOk && zonaOk;
      }).length;

      const numPagineQ = Math.ceil(countQ / annunciPerPagina);
      for (let i = 2; i <= numPagineQ; i++) {
        pagineQuartieri.push({ url: `${slugQuartiere}?page=${i}`, priority: 0.5 });
      }
    });
  });

  // 6. Schede singole (solo annunci con slug valido)
  const schedeMedici = annunciApprovati
    .filter(a => a.slug && a.slug.trim() !== '')
    .map(a => ({ url: `/scheda/${a.slug}`, priority: 0.6 }));

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
