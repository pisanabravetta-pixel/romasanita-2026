import { supabase } from '../lib/supabaseClient';
import { specialisticheTop, quartieriTop } from '../lib/seo-logic';

const EXTERNAL_DATA_URL = 'https://www.servizisalute.com';

function generateSiteMap(pagine) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${pagine
       .map(({ url, priority }) => `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}${url}`}</loc>
           <lastmod>${new Date().toISOString()}</lastmod>
           <priority>${priority}</priority>
       </url>
     `).join('')}
   </urlset>
 `;
}

export default function SiteMap() {
  // Questa pagina non renderizza nulla sul lato client
}

export async function getServerSideProps({ res }) {
  // 1. RECUPERO TUTTI GLI ANNUNCI (Test flessibile per sbloccare i dati)
  const { data: annunci, error } = await supabase
    .from('annunci')
    .select('slug, categoria, quartiere, zona, approvato');

  // Filtro manuale per gestire TRUE (booleano), 'TRUE' (testo) o 'SI'
  const annunciApprovati = annunci?.filter(a => 
    a.approvato === true || 
    a.approvato === 'TRUE' || 
    String(a.approvato).toUpperCase() === 'TRUE' ||
    a.approvato === 'SI'
  ) || [];

  const annunciPerPagina = 10;

  // 2. PAGINE FISSE
  const staticPages = [
    { url: '', priority: 1.0 },
    { url: '/guide', priority: 0.9 },
    { url: '/servizi-sanitari-roma', priority: 0.9 },
    { url: '/visite-specialistiche-roma', priority: 0.9 },
    { url: '/quartieri-roma', priority: 0.8 },
    { url: '/chi-siamo', priority: 0.5 },
    { url: '/contatti', priority: 0.5 },
  ];

  // 3. PAGINE HUB + PAGINAZIONE (Usando annunciApprovati)
  const pagineHub = [];
  specialisticheTop.forEach(cat => {
    pagineHub.push({ url: `/${cat}-roma`, priority: 0.8 });
    const count = annunciApprovati.filter(a => a.categoria?.toLowerCase().includes(cat.substring(0,4))).length;
    const numPagine = Math.ceil(count / annunciPerPagina);
    if (numPagine > 1) {
      for (let i = 2; i <= numPagine; i++) {
        pagineHub.push({ url: `/${cat}-roma?page=${i}`, priority: 0.6 });
      }
    }
  });

  // 4. PAGINE QUARTIERE + PAGINAZIONE
  const pagineQuartieri = [];
  specialisticheTop.forEach(cat => {
    quartieriTop.forEach(q => {
      const slugQuartiere = `/${cat}-roma-${q.s}`;
      pagineQuartieri.push({ url: slugQuartiere, priority: 0.7 });

      const countInQuartiere = annunciApprovati.filter(a => {
        const catMatch = a.categoria?.toLowerCase().includes(cat.substring(0,4));
        const zonaMatch = (a.quartiere?.toLowerCase() === q.s || a.zona?.toLowerCase() === q.s);
        return catMatch && zonaMatch;
      }).length;

      const numPagineQ = Math.ceil(countInQuartiere / annunciPerPagina);
      if (numPagineQ > 1) {
        for (let i = 2; i <= numPagineQ; i++) {
          pagineQuartieri.push({ url: `${slugQuartiere}?page=${i}`, priority: 0.5 });
        }
      }
    });
  });

  // 5. SCHEDE SINGOLE
  const schedeMedici = annunciApprovati.map(a => ({
    url: `/scheda/${a.slug}`,
    priority: 0.6
  }));

  const tutteLePagine = [...staticPages, ...pagineHub, ...pagineQuartieri, ...schedeMedici];
  const sitemap = generateSiteMap(tutteLePagine);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return { props: {} };
}
