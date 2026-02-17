import { specialisticheTop, quartieriTop } from '../lib/seo-logic';

// Cambia BASE_URL in EXTERNAL_DATA_URL o viceversa, l'importante è che il nome sia lo stesso sotto
const EXTERNAL_DATA_URL = 'https://www.servizisalute.com'; 

function generateSiteMap(pagine) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${pagine
       .map(({ url, priority }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}${url}`}</loc>
           <lastmod>${new Date().toISOString()}</lastmod>
           <priority>${priority}</priority>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}
// ... tutto il resto del codice rimane identico

function SiteMap() {
  // Il browser non userà questo componente, getServerSideProps farà tutto il lavoro
}

export async function getServerSideProps({ res }) {
// 1. PAGINE FISSE (Aggiornato con le nuove Guide)
  const staticPages = [
    { url: '', priority: 1.0 },
    { url: '/guide', priority: 0.9 },
    { url: '/guide/costo-visita-ginecologica-roma', priority: 0.8 }, // NUOVA
    { url: '/guide/costo-visita-oculistica-roma', priority: 0.8 },   // NUOVA
    { url: '/guide/costo-risonanza-magnetica-roma', priority: 0.8 }, // NUOVA
    { url: '/guide/costo-pulizia-denti-roma', priority: 0.8 },
    { url: '/guide/costo-visita-cardiologica-roma', priority: 0.8 },
    { url: '/guide/costo-visita-dermatologica-roma', priority: 0.8 },
    { url: '/guide/trovare-servizio-sanitario-roma', priority: 0.8 },
    { url: '/servizi-sanitari-roma', priority: 0.9 },
    { url: '/visite-specialistiche-roma', priority: 0.9 },
    { url: '/quartieri-roma', priority: 0.8 },
    { url: '/chi-siamo', priority: 0.5 },
    { url: '/contatti', priority: 0.5 },
    { url: '/pubblica-annuncio', priority: 0.7 },
  ];

  // 2. PAGINE HUB (Es: /psicologi-roma, /dentisti-roma)
  const pagineHub = specialisticheTop.map(cat => ({
    url: `/${cat}-roma`,
    priority: 0.8
  }));

  // 3. PAGINE QUARTIERE (Es: /psicologi-roma-prati)
  const pagineDinamiche = specialisticheTop.flatMap(cat => 
    quartieriTop.map(q => ({
      url: `/${cat}-roma-${q.s}`,
      priority: 0.7
    }))
  );

  // UNISCO TUTTO
  const tutteLePagine = [...staticPages, ...pagineHub, ...pagineDinamiche];

  const sitemap = generateSiteMap(tutteLePagine);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
