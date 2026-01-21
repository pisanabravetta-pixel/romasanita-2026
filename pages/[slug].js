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
          .or(`specialista.ilike.%${filtri.spec}%,categoria.ilike.%${filtri.cat}%`)
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
        <title>{`${meta.titolo} | ServiziSalute`}</title>
        <meta name="description" content={`Cerchi ${meta.titolo}? Trova i migliori professionisti nel quartiere ${meta.zona}. Contatti, orari e mappa.`} />
     <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": `Migliori ${meta.titolo}`,
  "description": `Elenco selezionato di ${meta.titolo} nel quartiere ${meta.zona} a Roma.`,
  "itemListElement": servizi.map((v, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "LocalBusiness",
      "name": v.nome,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": v.indirizzo,
        "addressLocality": "Roma",
        "addressRegion": "Lazio",
        "addressCountry": "IT"
      },
      "telephone": v.telefono
    }
  }))
})}} />
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
        <div style={{ marginBottom: '25px', backgroundColor: 'white', padding: '20px', borderRadius: '12px', borderLeft: `8px solid ${tema.primario}`, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h1 style={{ color: '#1e293b', fontSize: '32px', fontWeight: '900', margin: '0 0 10px 0' }}>{meta.titolo}</h1>
          <p style={{ color: '#64748b', fontSize: '18px', fontWeight: '600', margin: 0 }}>I migliori professionisti a {meta.zona} aggiornati a Gennaio 2026</p>
        </div>

        <div style={{ marginBottom: '25px', color: '#475569', fontSize: '16px', lineHeight: '1.7' }}>
          <p>Cerchi <strong>{meta.titolo}</strong> nel quartiere <strong>{meta.zona}</strong> a Roma? Su ServiziSalute trovi un elenco selezionato di professionisti e strutture sanitarie, con informazioni utili su contatti, servizi disponibili e posizione.</p>
          <p>Il quartiere <strong>{meta.zona}</strong> dispone di numerose realtà che offrono servizi per la salute e il benessere dei cittadini. Attraverso il nostro portale puoi individuare rapidamente la soluzione più adatta alle tue esigenze nel tuo quadrante di riferimento.</p>
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

        {/* MAPPA QUARTIERE (Sotto i link zone) */}
        <div style={{ marginBottom: '30px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', height: '250px' }}>
          <iframe width="100%" height="100%" style={{ border: 0 }} loading="lazy"src={`https://www.google.com/maps?q=${encodeURIComponent(meta.titolo)}&output=embed`} ></iframe>
        </div>

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
                <a href={`https://maps.google.com/maps/contrib/107807434180698320195{encodeURIComponent(v.nome + " " + v.indirizzo)}`} target="_blank" rel="noopener noreferrer" style={{ flex: '1', minWidth: '100px', backgroundColor: '#64748b', color: 'white', padding: '14px', borderRadius: '10px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>🗺️ MAPPA</a>
              </div>
            </div>
          ))}
        </div>

        {/* APPROFONDIMENTI COSTI */}
        <div style={{ marginTop: '25px', marginBottom: '30px', padding: '20px', backgroundColor: '#f0f9ff', borderRadius: '12px', border: '1px solid #bae6fd' }}>
          <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#0369a1', marginBottom: '12px' }}>💰 Approfondimenti e Costi a Roma:</h4>
         <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
  {meta.cat.includes('farmac') ? (
    <>
      <li>🔹 <a href="/guide/costo-tac-risonanza-roma" style={{ color: '#0284c7', fontWeight: '600', textDecoration: 'none' }}>Quanto costa una TAC o Risonanza a Roma?</a></li>
      <li>🔹 <a href="/guide/ticket-sanitario-lazio-guida" style={{ color: '#0284c7', fontWeight: '600', textDecoration: 'none' }}>Guida esenzioni e Ticket Regione Lazio</a></li>
    </>
  ) : (
    <>
      <li>🔹 <a href="/guide/costo-pulizia-denti-roma" style={{ color: '#0284c7', fontWeight: '600', textDecoration: 'none' }}>Quanto costa una pulizia dei denti a Roma?</a></li>
      <li>🔹 <a href="/guide/prezzi-impianti-dentali-roma" style={{ color: '#0284c7', fontWeight: '600', textDecoration: 'none' }}>Tariffe medie per impianti dentali (Guida 2026)</a></li>
    </>
  )}
</ul>
        </div>

        {/* SEO CONCLUSIVO E FAQ */}
        <section style={{ margin: '40px 0', padding: '25px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '15px' }}>Servizi offerti per {meta.titolo}</h2>
          <p style={{ color: '#475569', lineHeight: '1.7', marginBottom: '25px' }}>Le strutture presenti nel quartiere <strong>{meta.zona}</strong> rappresentano un punto di riferimento per i residenti della zona. Oltre alle prestazioni standard, molte realtà offrono servizi integrativi e consulenze specialistiche personalizzate. Grazie alla posizione strategica a <strong>{meta.zona}</strong>, queste strutture sono facilmente raggiungibili e permettono un contatto diretto tramite i canali indicati.</p>

          <h3 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '15px', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>Domande frequenti su {meta.zona}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <p style={{ fontWeight: '800', margin: '0 0 5px 0' }}>Dove trovare {meta.titolo.toLowerCase()} a Roma {meta.zona}?</p>
              <p style={{ color: '#475569', margin: 0 }}>Su ServiziSalute puoi consultare l'elenco aggiornato con indirizzi e contatti utili per raggiungere rapidamente la struttura più vicina.</p>
            </div>
            <div>
              <p style={{ fontWeight: '800', margin: '0 0 5px 0' }}>Le strutture di {meta.zona} offrono servizi sanitari aggiuntivi?</p>
              <p style={{ color: '#475569', margin: 0 }}>Sì, molte strutture del quartiere offrono servizi come test rapidi e consulenze farmacologiche o specialistiche.</p>
            </div>
            <div>
              <p style={{ fontWeight: '800', margin: '0 0 5px 0' }}>Come verificare gli orari a {meta.zona}?</p>
              <p style={{ color: '#475569', margin: 0 }}>Gli orari possono variare. È consigliato contattare direttamente la struttura tramite telefono o WhatsApp per confermare l'apertura.</p>
            </div>
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
        </section>
      </main>

      <Footer />
    </div>
  );
}
