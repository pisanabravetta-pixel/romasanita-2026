import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';
import { getDBQuery, quartieriTop } from '../lib/seo-logic'; 
import { theme } from '../styles/theme';

export default function PaginaQuartiereDinamica() {
  const router = useRouter();
  const { slug } = router.query;
  const [servizi, setServizi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({ titolo: "", zona: "", cat: "" });
  const [tema, setTema] = useState({ primario: '#0891b2', chiaro: '#ecfeff', label: 'SERVIZI' });

  useEffect(() => {
    if (!slug || slug === 'index' || slug === '') return;

    async function fetchDati() {
      try {
        setLoading(true);
        const parti = slug.split('-'); 
        const catSlug = parti[0]; 
        const zonaSlug = parti[parti.length - 1];

        const primario = "#0891b2"; 
        const chiaro = "#ecfeff";
        
        const nomeCatRaw = catSlug.replace('-roma', '');
        const nomeCat = nomeCatRaw.charAt(0).toUpperCase() + nomeCatRaw.slice(1);
        
        setTema({ primario, chiaro, label: nomeCat.toUpperCase() });

        const zonaBella = zonaSlug.charAt(0).toUpperCase() + zonaSlug.slice(1).replace(/-/g, ' ');
        const titoloCorretto = `${nomeCat} a Roma ${zonaBella}`;

        setMeta({ titolo: titoloCorretto, zona: zonaBella, cat: catSlug });

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

      } catch (err) { 
        console.error("Errore Fetch:", err);
        setServizi([]); 
      } finally { 
        setLoading(false); 
      }
    }

    fetchDati();
  }, [slug]);

  if (!slug || slug === 'index' || slug === '') return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title key="slug-title">{meta.titolo ? `${meta.titolo} | ServiziSalute` : "Caricamento..."}</title>
        <meta key="slug-desc" name="description" content={`Scopri i migliori professionisti per ${meta.titolo}. Elenco aggiornato con contatti, servizi e informazioni utili a ${meta.zona}.`} />

        {meta.titolo && (
          <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                { "@type": "Question", "name": `Dove trovare ${meta.titolo.toLowerCase()} a Roma ${meta.zona}?`, "acceptedAnswer": { "@type": "Answer", "text": `Su ServiziSalute puoi consultare l'elenco aggiornato di ${meta.titolo} con indirizzi e contatti per raggiungere la struttura nel quartiere ${meta.zona}.` }},
                { "@type": "Question", "name": `Quali servizi offrono le strutture a ${meta.zona}?`, "acceptedAnswer": { "@type": "Answer", "text": `Le strutture a Roma ${meta.zona} offrono prestazioni standard, test diagnostici e consulenze specialistiche.` }}
              ]
            })}} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.servizisalute.com" },
                { "@type": "ListItem", "position": 2, "name": `${tema.label} Roma`, "item": `https://www.servizisalute.com/${meta.cat}-roma` },
                { "@type": "ListItem", "position": 3, "name": meta.zona, "item": `https://www.servizisalute.com/${slug}` }
              ]
            })}} />
          </>
        )}
      </Head>

      <Navbar />

      <div style={{ backgroundColor: tema.chiaro, color: tema.primario, padding: '10px', textAlign: 'center', fontWeight: '800', fontSize: '12px', textTransform: 'uppercase' }}>
        📍 {tema.label} : {meta.zona}
      </div>

      <main style={{ flex: '1 0 auto', maxWidth: '900px', margin: '0 auto', padding: '20px', width: '100%' }}>
        
        {/* Breadcrumb */}
        <div style={{ margin: '15px 0', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
          <a href="/" style={{ color: tema.primario, textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>{'>'}</span>
          <a href={`/${meta.cat}-roma`} style={{ color: tema.primario, textDecoration: 'none' }}>{tema.label} Roma</a>
        </div>

        {/* Titolo Box */}
        <div style={{ marginBottom: '25px', backgroundColor: 'white', padding: '20px', borderRadius: '12px', borderLeft: `8px solid ${tema.primario}`, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h1 style={{ color: '#1e293b', fontSize: '32px', fontWeight: '900', margin: '0 0 10px 0' }}>{meta.titolo}</h1>
          <p style={{ color: '#64748b', fontSize: '18px', fontWeight: '600', margin: 0 }}>I migliori professionisti a {meta.zona} aggiornati a Gennaio 2026</p>
        </div>

        {/* Testo SEO Intro */}
        <div style={{ marginBottom: '25px', color: '#475569', fontSize: '16px', lineHeight: '1.7' }}>
          <p>Cerchi <strong>{meta.titolo}</strong> nel quartiere <strong>{meta.zona} a Roma</strong>? Su ServiziSalute trovi un elenco selezionato di professionisti e strutture sanitarie.</p>
        </div>

        {/* Cerca in altre zone */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', marginBottom: '25px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '900', marginBottom: '12px' }}>Cerca zone vicino a {meta.zona}:</h2>
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
       {/* BOX MAPPA QUARTIERE - SOLO I TUOI ANNUNCI (Preciso Estremo) */}
        <div style={{ marginBottom: '25px' }}>
          <div style={{ width: '100%', height: '250px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              /* Cerchiamo solo i nomi dei tuoi annunci per isolare la concorrenza */
              src={`https://maps.google.com/maps?q=${encodeURIComponent(servizi.map(s => s.nome).join(' OR '))}+${encodeURIComponent(meta.zona)}+Roma&t=&z=14&ie=UTF8&iwloc=&output=embed`}
            ></iframe>
          </div>
          <p style={{ fontSize: '12px', color: '#64748b', marginTop: '8px', textAlign: 'center', fontWeight: '600' }}>
            📍 Posizione delle strutture verificate a {meta.zona}
          </p>
        </div>

        {/* LISTA ANNUNCI - BOX PREMIUM */}
        <div style={{ display: 'block' }}>
          {loading ? (
            <p>Caricamento...</p>
          ) : servizi.length > 0 ? (
            servizi.map((v) => (
              <div 
                key={v.id} 
                style={{ 
                  backgroundColor: 'white', 
                  borderRadius: '12px', 
                  padding: '25px', 
                  marginBottom: '20px', 
                  border: v.is_top ? `4px solid ${tema.primario}` : '1px solid #e2e8f0', 
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', 
                  display: 'block', 
                  width: '100%', 
                  boxSizing: 'border-box',
                  position: 'relative'
                }}
              >
                {v.is_top && (
                  <span style={{ position: 'absolute', top: '-12px', right: '20px', backgroundColor: tema.primario, color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase' }}>
                    Top Partner
                  </span>
                )}

                <h3 style={{ color: '#1e293b', fontSize: '26px', fontWeight: '900', margin: '0 0 10px 0', lineHeight: '1.1' }}>
                  {v.nome}
                </h3>
                
                <p style={{ fontSize: '17px', color: '#475569', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  📍 {v.indirizzo} — <strong style={{ color: tema.primario }}>{v.zona}</strong>
                </p>

                {/* PULSANTI AZIONE GRANDI */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  <a 
                    href={`tel:${v.telefono}`} 
                    style={{ 
                      flex: '1', 
                      minWidth: '140px', 
                      backgroundColor: tema.primario, 
                      color: 'white', 
                      padding: '16px', 
                      borderRadius: '10px', 
                      textAlign: 'center', 
                      fontWeight: '800', 
                      textDecoration: 'none',
                      fontSize: '16px',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                    }}
                  >
                    📞 CHIAMA ORA
                  </a>
                  <a 
                    href={`https://wa.me/${v.whatsapp ? v.whatsapp.replace(/\s+/g, '') : ''}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ 
                      flex: '1', 
                      minWidth: '140px', 
                      backgroundColor: '#22c55e', 
                      color: 'white', 
                      padding: '16px', 
                      borderRadius: '10px', 
                      textAlign: 'center', 
                      fontWeight: '800', 
                      textDecoration: 'none',
                      fontSize: '16px',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                    }}
                  >
                    💬 WHATSAPP
                  </a>
                </div>
              </div>
            ))
          ) : (
            /* BOX VUOTO SE NON CI SONO ANNUNCI */
            <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#f8fafc', borderRadius: '15px', border: '2px dashed #e2e8f0' }}>
              <div style={{ fontSize: '50px', marginBottom: '20px' }}>🏥</div>
              <h3 style={{ fontSize: '22px', fontWeight: '900', color: '#1e293b' }}>Ricerca in corso a {meta.zona}</h3>
              <p style={{ color: '#64748b' }}>Stiamo selezionando i migliori profili per {meta.titolo}.</p>
            </div>
          )}
        </div>

        {/* GUIDE COSTI */}
        <div style={{ marginTop: '25px', marginBottom: '30px', padding: '20px', backgroundColor: '#f0f9ff', borderRadius: '12px', border: '1px solid #bae6fd' }}>
          <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#0369a1', marginBottom: '12px' }}>💰 Guide ai Costi Roma 2026:</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {meta.cat.includes('dentist') ? (
              <>
                <li>🔹 <a href="/guide/costo-pulizia-denti-roma" style={{ color: '#0284c7', fontWeight: '600' }}>Quanto costa una pulizia dei denti a Roma?</a></li>
                <li>🔹 <a href="/guide/prezzi-impianti-dentali-roma" style={{ color: '#0284c7', fontWeight: '600' }}>Tariffe impianti dentali (Guida 2026)</a></li>
              </>
            ) : (
              <>
                <li>🔹 <a href="/guide/costo-tac-risonanza-roma" style={{ color: '#0284c7', fontWeight: '600' }}>Quanto costa una TAC o Risonanza a Roma?</a></li>
                <li>🔹 <a href="/guide/ticket-sanitario-lazio-guida" style={{ color: '#0284c7', fontWeight: '600' }}>Guida esenzioni Regione Lazio</a></li>
              </>
            )}
          </ul>
        </div>

        {/* SEO CONCLUSIVO E FAQ */}
        <section style={{ margin: '40px 0', padding: '25px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '15px' }}>Servizi offerti per {meta.titolo}</h2>
          <p style={{ color: '#475569', lineHeight: '1.7', marginBottom: '25px' }}>Le strutture a <strong>{meta.zona}</strong> sono punti di riferimento per la zona.</p>

          <h3 style={{ fontSize: '20px', fontWeight: '900', marginBottom: '15px', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>Domande frequenti su {meta.zona}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <p><strong>Dove trovare {meta.titolo.toLowerCase()} a Roma {meta.zona}?</strong><br/>Consulta l'elenco sopra per indirizzi e contatti.</p>
          </div>

          {/* CROSS LINKING */}
          <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <p style={{ fontWeight: '800', fontSize: '14px', textTransform: 'uppercase' }}>Esplora altro a {meta.zona}:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <a href={`/dentisti-roma-${meta.zona.toLowerCase()}`} style={{ color: tema.primario, fontWeight: '700' }}>🦷 Dentisti</a>
              <a href={`/farmacie-roma-${meta.zona.toLowerCase()}`} style={{ color: tema.primario, fontWeight: '700' }}>💊 Farmacie</a>
            </div>
            <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #e2e8f0' }}>
              <a href={`/${meta.cat}-roma`} style={{ color: '#64748b', fontWeight: '600', fontSize: '13px' }}>← Torna a {meta.titolo.split(' a Roma')[0]} a Roma</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
