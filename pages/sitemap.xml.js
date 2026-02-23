import { supabase } from '../lib/supabaseClient';
import { specialisticheTop, quartieriTop } from '../lib/seo-logic';

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

export async function getServerSideProps({ res }) {
  // 1. RECUPERO DINAMICO DI TUTTI I MEDICI DAL DATABASE
  // Usiamo una select specifica per lo slug di tutti gli annunci approvati
  const { data: annunci, error } = await supabase
    .from('annunci')
    .select('slug')
    .eq('approvato', true);

  if (error) {
    console.error("Errore recupero annunci per sitemap:", error);
  }

  // 2. PAGINE FISSE (Guide e Info)
  const staticPages = [
    { url: '', priority: 1.0 },
    { url: '/guide', priority: 0.9 },
    { url: '/guide/costo-visita-ginecologica-roma', priority: 0.8 },
    { url: '/guide/costo-visita-oculistica-roma', priority: 0.8 },
    { url: '/guide/costo-risonanza-magnetica-roma', priority: 0.8 },
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

  // 3. PAGINE HUB (Es: /dermatologi-roma)
  const pagineHub = specialisticheTop.map(cat => ({
    url: `/${cat}-roma`,
    priority: 0.8
  }));

  // 4. PAGINE QUARTIERE (Es: /dermatologi-roma-prati)
  const pagineDinamicheQuartieri = specialisticheTop.flatMap(cat => 
    quartieriTop.map(q => ({
      url: `/${cat}-roma-${q.s}`,
      priority: 0.7
    }))
  );

  // 5. SCHEDE PROFESSIONISTI (Le singole pagine dei medici)
  // Genera un link per ogni medico presente nel database
  const schedeMedici = (annunci || []).map(medico => ({
    url: `/scheda/${medico.slug}`,
    priority: 0.6
  }));

  // UNISCO TUTTO: Statiche + Hub + Quartieri + Tutti i Medici
  const tutteLePagine = [
    ...staticPages, 
    ...pagineHub, 
    ...pagineDinamicheQuartieri, 
    ...schedeMedici
  ];

  const sitemap = generateSiteMap(tutteLePagine);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SiteMap() {}
