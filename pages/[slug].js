import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, quartieriTop } from '../lib/seo-logic'; 

export default function PaginaQuartiereDinamica() {
  const router = useRouter();
  const { slug } = router.query;
  const [servizi, setServizi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({ titolo: "", zona: "", cat: "", nomeSemplice: "" });
  const [tema, setTema] = useState({ primario: '#0891b2', chiaro: '#ecfeff', label: 'SERVIZI' });

  useEffect(() => {
    if (!slug || slug === 'index' || slug === '') return;

    async function fetchDati() {
      try {
        setLoading(true);
        const parti = slug.split('-'); 
        const catSlug = parti[0]; 
        const zonaSlug = parti[parti.length - 1];

        let primario = "#0891b2"; let chiaro = "#ecfeff";
        if (catSlug.includes('dentist')) { primario = "#0f766e"; chiaro = "#f0fdfa"; }
        if (catSlug.includes('farmaci')) { primario = "#15803d"; chiaro = "#f0fdf4"; }
        if (catSlug.includes('dermatol')) { primario = "#be185d"; chiaro = "#fdf2f8"; }
        if (catSlug.includes('diagnost')) { primario = "#1e40af"; chiaro = "#eff6ff"; }
        
        const nomeCatRaw = catSlug.replace('-roma', '');
        const nomeCat = nomeCatRaw.charAt(0).toUpperCase() + nomeCatRaw.slice(1);
        const zonaBella = zonaSlug.charAt(0).toUpperCase() + zonaSlug.slice(1).replace(/-/g, ' ');

        setTema({ primario, chiaro, label: nomeCat.toUpperCase() });
        setMeta({ 
          titolo: `${nomeCat} a Roma ${zonaBella}`, 
          zona: zonaBella, 
          cat: catSlug,
          nomeSemplice: nomeCat
        });

       const filtri = getDBQuery(catSlug);
const { data, error } = await supabase
  .from('annunci')
  .select('*')
  .eq('approvato', true)
  .ilike('zona', `%${zonaSlug}%`) 
  // Rimosso .or(): usiamo la categoria secca estratta dallo slug
  .ilike('categoria', `%${filtri.cat}%`)
  .order('is_top', { ascending: false });

        if (error) throw error;
        setServizi(data || []);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    }
    fetchDati();
  }, [slug]);

  if (!slug) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
  <Head>
  <title>{`${meta.nomeSemplice} a Roma ${meta.zona} – Elenco e contatti | ServiziSalute`}</title>
  <meta name="description" content={`Scopri tutte le strutture di ${meta.nomeSemplice} nel quartiere ${meta.zona} a Roma. Contatti, servizi e mappa per trovare rapidamente il servizio più vicino.`} />

  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `Come trovare ${meta.nomeSemplice.toLowerCase()} a ${meta.zona}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `È possibile consultare l’elenco dedicato al quartiere ${meta.zona} e utilizzare la mappa per individuare la struttura più vicina alla propria posizione.`
            }
          },
          {
            "@type": "Question",
            "name": `Le strutture di ${meta.zona} offrono servizi sanitari aggiuntivi?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Sì, molte strutture a Roma ${meta.zona} offrono servizi come autoanalisi, test rapidi e consulenza professionale specialistica.`
            }
          },
          {
            "@type": "Question",
            "name": `Posso contattare direttamente le strutture di ${meta.zona}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Sì, ogni scheda dispone di contatti diretti (Telefono o WhatsApp) per richiedere informazioni su orari, servizi e disponibilità.`
            }
          }
        ]
      })
    }}
  />
</Head>
      <Navbar />

      <div style={{ backgroundColor: tema.chiaro, color: tema.primario, padding: '10px', textAlign: 'center', fontWeight: '800', fontSize: '12px', textTransform: 'uppercase' }}>
        📍 {tema.label} : {meta.zona.toUpperCase()}
      </div>

      <main style={{ flex: '1 0 auto', maxWidth: '900px', margin: '0 auto', padding: '20px', width: '100%' }}>
        
        {/* Breadcrumb */}
        <div style={{ margin: '15px 0', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
          <a href="/" style={{ color: tema.primario, textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>{'>'}</span>
          <a href={`/${meta.cat}-roma`} style={{ color: tema.primario, textDecoration: 'none' }}>{meta.nomeSemplice} Roma</a>
        </div>

      {/* Header SEO */}
<div style={{ 
  marginBottom: '25px', 
  backgroundColor: 'white', 
  padding: '20px', 
  borderRadius: '12px', 
  borderLeft: `8px solid ${tema.primario}`, 
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
}}>
  <h1 style={{ color: '#1e293b', fontSize: '32px', fontWeight: '900', margin: '0 0 10px 0' }}>
    {meta.titolo}
  </h1>
  <p style={{ color: '#64748b', fontSize: '18px', fontWeight: '600', margin: 0 }}>
    I migliori professionisti a {meta.zona} aggiornati a Gennaio 2026
  </p>
</div>

{/* MINI TESTO SEO INIZIALE (Sotto H1) */}
<div style={{ marginBottom: '25px', padding: '0 10px', color: '#475569', fontSize: '16px', lineHeight: '1.7' }}>
  <p>
    Il quartiere <strong>{meta.zona}</strong> è una delle zone di Roma servite da numerose strutture sanitarie e attività dedicate alla salute. In questa pagina trovi l’elenco di <strong>{meta.titolo}</strong>, pensato per aiutare residenti, lavoratori e visitatori a individuare rapidamente un professionista o una farmacia nel quartiere <strong>{meta.zona}</strong> di Roma e verificarne contatti e posizione.
  </p>
</div>

        {/* Selezione Zone */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', marginBottom: '15px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '900', marginBottom: '12px' }}>Cerca in altre zone vicino a {meta.zona}:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {quartieriTop.map(q => (
              <a key={q.s} href={`/${meta.cat}-roma-${q.s}`} style={{ padding: '7px 12px', backgroundColor: tema.chiaro, color: tema.primario, borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '12px' }}>{q.n}</a>
            ))}
          </div>
        </div>

       {/* BOX MAPPA QUARTIERE - SOLO I TUOI ANNUNCI */}
        <div style={{ marginBottom: '25px' }}>
          <div style={{ width: '100%', height: '250px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              /* Qui cerchiamo i NOMI dei tuoi servizi + il quartiere, così Google punta solo su di loro */
              src={`https://maps.google.com/maps?q=${encodeURIComponent(servizi.map(s => s.nome).join(' OR '))}+${encodeURIComponent(meta.zona)}+Roma&t=&z=14&ie=UTF8&iwloc=&output=embed`}
            ></iframe>
          </div>
          <p style={{ fontSize: '12px', color: '#64748b', marginTop: '8px', textAlign: 'center', fontWeight: '600' }}>
            📍 Posizione delle strutture verificate a {meta.zona}
          </p>
        </div>
{/* MINI TESTO SEO SOTTO LA MAPPA - OBBLIGATORIO (PAGINA QUARTIERE) */}
<p style={{ 
  fontSize: '14px', 
  color: '#64748b', 
  textAlign: 'center', 
  marginTop: '10px', 
  marginBottom: '30px', 
  fontStyle: 'italic',
  lineHeight: '1.5'
}}>
  La mappa mostra la posizione di <strong>{meta.titolo}</strong> nel quartiere <strong>{meta.zona}</strong> a Roma, permettendo di individuare rapidamente le strutture più vicine alla tua posizione.
</p>

        {/* LISTA ANNUNCI */}
        <div style={{ display: 'block' }}>
          {servizi.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '25px', marginBottom: '20px', border: v.is_top ? `4px solid ${tema.primario}` : '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
              <h3 style={{ color: '#1e293b', fontSize: '24px', fontWeight: '900', margin: '0 0 10px 0' }}>{v.nome}</h3>
              <p style={{ fontSize: '16px', color: '#475569', marginBottom: '15px' }}>📍 {v.indirizzo} — <strong style={{ textTransform: 'uppercase' }}>{v.zona}</strong></p>
              <div style={{ marginBottom: '20px', fontWeight: '800', color: tema.primario, fontSize: '14px' }}>🦷 {tema.label}</div>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: '1', minWidth: '100px', backgroundColor: tema.primario, color: 'white', padding: '14px', borderRadius: '10px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>📞 CHIAMA</a>
                <a href={`https://wa.me/${v.whatsapp?.replace(/\s+/g, '')}`} style={{ flex: '1', minWidth: '100px', backgroundColor: '#22c55e', color: 'white', padding: '14px', borderRadius: '10px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>💬 WHATSAPP</a>
<a 
  href={`https://www.google.it/maps/search/${encodeURIComponent(v.nome + ' ' + v.indirizzo + ' Roma')}`}
  target="_blank" 
  rel="noopener noreferrer" 
  style={{ flex: '1', minWidth: '100px', backgroundColor: '#64748b', color: 'white', padding: '14px', borderRadius: '10px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}
>
  🗺️ MAPPA
</a>
              </div>
    {/* MICRO TESTO SEO SOTTO I BOTTONI */}
<p style={{ fontSize:'12px', color:'#94a3b8', marginTop:'12px', textAlign: 'center', fontWeight: '600' }}>
  {meta.nomeSemplice} a {v.zona}, Roma
</p>
            </div>
          ))}
        </div>
{/* GUIDE SPECIFICHE - DISTRIBUZIONE ARTICOLI REALI */}
<div style={{ marginTop: '25px', marginBottom: '30px', padding: '20px', backgroundColor: '#f0f9ff', borderRadius: '12px', border: '1px solid #bae6fd' }}>
  <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#0369a1', marginBottom: '12px' }}>
    💰 Approfondimenti e Costi a Roma:
  </h4>
  <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
    {meta.cat.includes('dentist') ? (
      <>
        <li>🔹 <a href="/guide/costo-pulizia-denti-roma" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: '600' }}>Quanto costa una pulizia dei denti a Roma?</a></li>
        <li>🔹 <a href="/guide/trovare-servizio-sanitario-roma" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: '600' }}>Guida: Come prenotare servizi sanitari online</a></li>
      </>
    ) : meta.cat.includes('cardiolog') ? (
      <>
        <li>🔹 <a href="/guide/costo-visita-cardiologica-roma" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: '600' }}>Quanto costa una visita cardiologica a Roma?</a></li>
        <li>🔹 <a href="/guide/trovare-servizio-sanitario-roma" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: '600' }}>Guida alle prenotazioni sanitarie nel Lazio</a></li>
      </>
    ) : meta.cat.includes('dermatolog') ? (
      <>
        <li>🔹 <a href="/guide/costo-visita-dermatologica-roma" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: '600' }}>Quanto costa una visita dermatologica a Roma?</a></li>
        <li>🔹 <a href="/guide/trovare-servizio-sanitario-roma" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: '600' }}>Come orientarsi tra i servizi sanitari della Capitale</a></li>
      </>
    ) : (
      /* Per Diagnostica, Farmacie, Domicilio ecc. usiamo le guide specialistiche come "esempio di costi" */
      <>
        <li>🔹 <a href="/guide/costo-visita-cardiologica-roma" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: '600' }}>Esempio Costi: Quanto costa una visita specialistica?</a></li>
        <li>🔹 <a href="/guide/trovare-servizio-sanitario-roma" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: '600' }}>Guida: Trovare rapidamente servizi sanitari a Roma</a></li>
      </>
    )}
  </ul>
</div>
     
{/* SEO CONCLUSIVO E FAQ CON LINK TESTUALI OBBLIGATORI */}
<section style={{ margin: '40px 0', padding: '25px', backgroundColor: 'white', borderRadius: '15px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
  
 <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#2c5282', marginBottom: '15px' }}>
  {meta.nomeSemplice} a Roma nel quartiere {meta.zona}
</h2>
  <div style={{ color: '#475569', lineHeight: '1.8', fontSize: '16px' }}>
    <p style={{ marginBottom: '15px' }}>
      Il quartiere <strong>{meta.zona}</strong> è una delle zone di Roma servite da numerose strutture sanitarie e attività dedicate alla salute. In questa pagina trovi l’elenco di <strong>{meta.titolo}</strong>, pensato per aiutare residenti e lavoratori a individuare rapidamente un professionista o una struttura nella propria zona.
    </p>
    
    <p style={{ marginBottom: '15px' }}>
      Grazie alla distribuzione sul territorio, è possibile trovare facilmente una soluzione per la propria salute e verificarne contatti e posizione direttamente sulla mappa. Oltre a questa categoria, nel quartiere {meta.zona} puoi trovare anche servizi di <a href={`/dentisti-roma-${slug?.split('-').pop()}`} style={{ color: '#059669', fontWeight: '700', textDecoration: 'underline' }}>Dentisti a Roma {meta.zona}</a> e centri di <a href={`/diagnostica-roma-${slug?.split('-').pop()}`} style={{ color: '#059669', fontWeight: '700', textDecoration: 'underline' }}>Diagnostica a Roma {meta.zona}</a>.
    </p>

    <p>
      Puoi confrontare i servizi disponibili e contattare direttamente la struttura per informazioni su orari e disponibilità. Per una visione completa di tutti i servizi in città, puoi sempre <a href={`/${meta.cat}-roma`} style={{ color: '#059669', fontWeight: '700', textDecoration: 'underline' }}>tornare alla lista generale di {meta.nomeSemplice} a Roma</a>.
    </p>
  </div>

  <div style={{ height: '1px', backgroundColor: '#f1f5f9', width: '100%', margin: '30px 0' }} />

  <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#2c5282', marginBottom: '20px' }}>Domande Frequenti</h3>
  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    <div>
      <p style={{ fontWeight: '800', color: '#1e293b', margin: '0 0 5px 0' }}>Come trovare {meta.nomeSemplice.toLowerCase()} a {meta.zona}?</p>
      <p style={{ margin: 0, color: '#475569' }}>È possibile consultare l’elenco dedicato al quartiere {meta.zona} e utilizzare la mappa per individuare la struttura più vicina alla propria posizione.</p>
    </div>
    <div>
      <p style={{ fontWeight: '800', color: '#1e293b', margin: '0 0 5px 0' }}>Le strutture di {meta.zona} offrono servizi sanitari aggiuntivi?</p>
      <p style={{ margin: 0, color: '#475569' }}>Sì, molte strutture a Roma {meta.zona} offrono servizi come autoanalisi, test rapidi e consulenza professionale specialistica.</p>
    </div>
    <div>
      <p style={{ fontWeight: '800', color: '#1e293b', margin: '0 0 5px 0' }}>Posso contattare direttamente le strutture di {meta.zona}?</p>
      <p style={{ margin: 0, color: '#475569' }}>Sì, ogni scheda dispone di contatti diretti (Telefono o WhatsApp) per richiedere informazioni su orari, servizi e disponibilità.</p>
    </div>
  </div>
</section>
{/* CTA PER PROFESSIONISTI NEL QUARTIERE */}
<div style={{ 
  backgroundColor: '#0f172a', 
  padding: '30px 20px', 
  borderRadius: '12px', 
  textAlign: 'center', 
  color: 'white', 
  margin: '35px 0',
  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
}}>
  <h2 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '10px' }}>
    Sei un {meta.nomeSemplice.toLowerCase()} a {meta.zona}?
  </h2>
  <p style={{ fontSize: '15px', color: '#94a3b8', marginBottom: '20px', maxWidth: '500px', margin: '0 auto 20px auto' }}>
    Aumenta la tua visibilità nel quartiere <strong>{meta.zona}</strong>. Inserisci la tua struttura su ServiziSalute e ricevi contatti diretti.
  </p>
  <a href="/pubblica-annuncio" style={{ 
    backgroundColor: tema.primario, 
    color: 'white', 
    padding: '12px 25px', 
    borderRadius: '10px', 
    fontWeight: '900', 
    textDecoration: 'none', 
    display: 'inline-block',
    transition: 'transform 0.2s'
  }}>
    🚀 PUBBLICA IL TUO ANNUNCIO
  </a>
</div>

          {/* CROSS LINKING */}
          <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <p style={{ fontWeight: '800', fontSize: '14px', textTransform: 'uppercase', marginBottom: '15px' }}>Esplora altri servizi a {meta.zona}:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
              <a href={`/dentisti-roma-${meta.zona.toLowerCase().replace(/\s+/g, '-')}`} style={{ color: '#0f766e', fontWeight: '700', textDecoration: 'none' }}>🦷 Dentisti {meta.zona}</a>
              <a href={`/farmacie-roma-${meta.zona.toLowerCase().replace(/\s+/g, '-')}`} style={{ color: '#15803d', fontWeight: '700', textDecoration: 'none' }}>💊 Farmacie {meta.zona}</a>
              <a href={`/diagnostica-roma-${meta.zona.toLowerCase().replace(/\s+/g, '-')}`} style={{ color: '#1e40af', fontWeight: '700', textDecoration: 'none' }}>🔬 Diagnostica {meta.zona}</a>
              <a href={`/specialisti-roma-${meta.zona.toLowerCase().replace(/\s+/g, '-')}`} style={{ color: '#be185d', fontWeight: '700', textDecoration: 'none' }}>👨‍⚕️ Specialisti {meta.zona}</a>
            </div>
            <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #e2e8f0' }}>
              <a href={`/${meta.cat}-roma`} style={{ color: '#64748b', fontWeight: '600', fontSize: '13px', textDecoration: 'none' }}>← Torna a {meta.nomeSemplice} a Roma</a>
            </div>
          </div>
      </main>

      <Footer />
    </div>
  );
}
