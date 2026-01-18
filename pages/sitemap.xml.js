import { seoData } from '../lib/seo-logic';

const EXTERNAL_DATA_URL = 'https://servizisalute-roma.vercel.app';

// Lista completa dei quartieri per l'indicizzazione
const quartieri = [
  'prati', 'parioli', 'corso-francia', 'balduina', 'talenti', 'montesacro', 'fleming', 'olgiata', 'labaro', 'nomentano',
  'eur', 'ostiense', 'garbatella', 'laurentina', 'montagnola', 'spinaceto', 'mostacciano', 'infernetto', 'ostia', 'acilia',
  'tiburtina', 'san-giovanni', 'prenestino', 'casilino', 'pigneto', 'collatino', 'centocelle', 'san-lorenzo', 'rebibbia', 'lunghezza',
  'centro-storico', 'trastevere', 'aurelio', 'boccea', 'monteverde', 'portuense', 'gianicolense', 'testaccio', 'bravetta', 'cornelia'
];

function generateSiteMap(specialistiche) {
  const date = new Date().toISOString();
  
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url><loc>${EXTERNAL_DATA_URL}/</loc><lastmod>${date}</lastmod><priority>1.0</priority></url>
     <url><loc>${EXTERNAL_DATA_URL}/servizi-sanitari-roma</loc><lastmod>${date}</lastmod><priority>0.9</priority></url>
     <url><loc>${EXTERNAL_DATA_URL}/visite-specialistiche-roma</loc><lastmod>${date}</lastmod><priority>0.9</priority></url>
     <url><loc>${EXTERNAL_DATA_URL}/quartieri-roma</loc><lastmod>${date}</lastmod><priority>0.8</priority></url>
     <url><loc>${EXTERNAL_DATA_URL}/chi-siamo</loc><lastmod>${date}</lastmod><priority>0.5</priority></url>

     ${Object.keys(specialistiche).map((key) => {
       return `<url>
         <loc>${EXTERNAL_DATA_URL}/${key}-roma</loc>
         <lastmod>${date}</lastmod>
         <priority>0.8</priority>
       </url>`;
     }).join('')}

     ${Object.keys(specialistiche).flatMap((spec) => 
       quartieri.map((q) => {
         return `<url>
           <loc>${EXTERNAL_DATA_URL}/${spec}-roma-${q}</loc>
           <lastmod>${date}</lastmod>
           <priority>0.7</priority>
         </url>`;
       })
     ).join('')}
   </urlset>
 `;
}

export async function getServerSideProps({ res }) {
  // Passiamo le chiavi di seoData (dentisti, cardiologi, ecc.)
  const sitemap = generateSiteMap(seoData);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SiteMap() {}
