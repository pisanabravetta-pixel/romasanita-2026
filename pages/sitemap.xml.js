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

export async function getServerSideProps({ res }) {
  // 1. RECUPERO TUTTI GLI ANNUNCI (Versione rinforzata)
  const { data: annunci, error } = await supabase
    .from('annunci')
    .select('slug, categoria, quartiere, zona')
    // Cerchiamo sia il booleano true che la stringa 'TRUE' per sicurezza
    .or('approvato.eq.true,approvato.eq.TRUE'); 

  if (error) console.error("Errore recupero annunci:", error);

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

  // 3. PAGINE HUB + PAGINAZIONE SEO
  const pagineHub = [];
  specialisticheTop.forEach(cat => {
    pagineHub.push({ url: `/${cat}-roma`, priority: 0.8 });
    
    // Filtro per categoria (radice 4 lettere)
    const count = annunci?.filter(a => a.categoria?.toLowerCase().includes(cat.substring(0,4))).length || 0;
    const numPagine = Math.ceil(count / annunciPerPagina);
    if (numPagine > 1) {
      for (let i = 2; i <= numPagine; i++) {
        pagineHub.push({ url: `/${cat}-roma?page=${i}`, priority: 0.6 });
      }
    }
  });

  // 4. PAGINE QUARTIERE + PAGINAZIONE SEO (Dinamica)
  const pagineQuartieri = [];
  specialisticheTop.forEach(cat => {
    quartieriTop.forEach(q => {
      const slugQuartiere = `/${cat}-roma-${q.s}`;
      pagineQuartieri.push({ url: slugQuartiere, priority: 0.7 });

      // CONTEGGIO SPECIFICO: Quanti medici di QUESTA categoria in QUESTO quartiere?
      const countInQuartiere = annunci?.filter(a => {
        const catMatch = a.categoria?.toLowerCase().includes(cat.substring(0,4));
        const zonaMatch = (a.quartiere?.toLowerCase() === q.s || a.zona?.toLowerCase() === q.s);
        return catMatch && zonaMatch;
      }).length || 0;

      const numPagineQ = Math.ceil(countInQuartiere / annunciPerPagina);
      if (numPagineQ > 1) {
        for (let i = 2; i <= numPagineQ; i++) {
          pagineQuartieri.push({ url: `${slugQuartiere}?page=${i}`, priority: 0.5 });
        }
      }
    });
  });

  // 5. SCHEDE SINGOLE
  const schedeMedici = (annunci || []).map(a => ({
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

export default function SiteMap() {}
