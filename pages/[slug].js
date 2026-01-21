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

        // Logica Colori Dinamici
        let primario = "#0891b2"; 
        let chiaro = "#ecfeff";
        if (catSlug.includes('dentist')) { primario = "#0f766e"; chiaro = "#f0fdfa"; }
        if (catSlug.includes('farmaci')) { primario = "#15803d"; chiaro = "#f0fdf4"; }
        if (catSlug.includes('dermatol')) { primario = "#be185d"; chiaro = "#fdf2f8"; }
        
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
      </Head>

      <Navbar />

      {/* Barra superiore */}
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
        <div style={{ marginBottom: '25px', backgroundColor: 'white', padding: '25px', borderRadius: '12px', borderLeft: `8px solid ${tema.primario}`, boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h1 style={{ color: '#1e293b', fontSize: '32px', fontWeight: '900', margin: '0 0 10px 0', lineHeight: '1.2' }}>{meta.titolo}</h1>
          <p style={{ color: '#64748b', fontSize: '18px', fontWeight: '600', margin: 0 }}>I migliori professionisti a {meta.zona} aggiornati a Gennaio 2026</p>
        </div>

        {/* BOX MAPPA SELETTIVA (Solo i tuoi annunci) */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{ width: '100%', height: '280px', borderRadius: '15px', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
            <iframe
              width="100%" height="100%" style={{ border: 0 }} loading="lazy" allowFullScreen
              src={`https://maps.google.com/maps?q=${encodeURIComponent(servizi.length > 0 ? servizi.map(s => s.nome).join(' OR ') : meta.titolo)}+${encodeURIComponent(meta.zona)}+Roma&t=&z=14&ie=UTF8&iwloc=&output=embed`}
            ></iframe>
          </div>
          <p style={{ fontSize: '12px', color: '#64748b', marginTop: '10px', textAlign: 'center', fontWeight: '600' }}>📍 Centri specializzati rilevati nell'area di {meta.zona}</p>
        </div>

        {/* LISTA ANNUNCI - BOX PREMIUM CON OMBRA E FONT 900 */}
        <div style={{ display: 'grid', gap: '20px' }}>
          {loading ? (
            <p>Caricamento...</p>
          ) : servizi.length > 0 ? (
            servizi.map((v) => (
              <div key={v.id} style={{ 
                backgroundColor: 'white', 
                borderRadius: '16px', 
                padding: '30px', 
                border: v.is_top ? `3px solid ${tema.primario}` : '1px solid #f1f5f9', 
                boxShadow: '0 15px 30px -10px rgba(0,0,0,0.1)',
                position: 'relative'
              }}>
                {v.is_top && (
                  <span style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: tema.primario, color: 'white', padding: '5px 15px', borderRadius: '30px', fontSize: '10px', fontWeight: '900' }}>TOP PARTNER</span>
                )}
                <h3 style={{ color: '#0f172a', fontSize: '28px', fontWeight: '900', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>{v.nome}</h3>
                <p style={{ fontSize: '17px', color: '#475569', marginBottom: '25px', fontWeight: '500' }}>📍 {v.indirizzo} — <strong style={{color: tema.primario}}>{v.zona}</strong></p>
                
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a href={`tel:${v.telefono}`} style={{ flex: '1', minWidth: '150px', backgroundColor: tema.primario, color: 'white', padding: '18px', borderRadius: '12px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', fontSize: '16px' }}>📞 CHIAMA ORA</a>
                  <a href={`https://wa.me/${v.whatsapp?.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ flex: '1', minWidth: '150px', backgroundColor: '#22c55e', color: 'white', padding: '18px', borderRadius: '12px', textAlign: 'center', fontWeight: '900', textDecoration: 'none', fontSize: '16px' }}>💬 WHATSAPP</a>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f8fafc', borderRadius: '15px', border: '2px dashed #cbd5e1' }}>
              <p style={{ fontWeight: '700', color: '#64748b' }}>Nessun risultato trovato a {meta.zona}.</p>
            </div>
          )}
        </div>

        {/* Cerca in altre zone (Cross-linking) */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', margin: '30px 0', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '900', marginBottom: '15px', textTransform: 'uppercase' }}>Zone limitrofe a {meta.zona}:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {quartieriTop.map(q => (
              <a key={q.s} href={`/${meta.cat}-roma-${q.s}`} style={{ padding: '8px 14px', backgroundColor: tema.chiaro, color: tema.primario, borderRadius: '8px', textDecoration: 'none', fontWeight: '800', fontSize: '12px' }}>{q.n}</a>
            ))}
          </div>
        </div>

        {/* FAQ E CONCLUSIONE */}
        <section style={{ marginTop: '40px', padding: '25px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '20px' }}>Informazioni Utili</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <p style={{ fontWeight: '800', margin: '0 0 5px 0' }}>Quali sono gli orari a {meta.zona}?</p>
              <p style={{ color: '#475569', margin: 0 }}>La maggior parte delle strutture riceve su appuntamento dal lunedì al venerdì.</p>
            </div>
            <div style={{ paddingTop: '15px', borderTop: '1px solid #f1f5f9' }}>
               <a href={`/${meta.cat}-roma`} style={{ color: tema.primario, fontWeight: '800', fontSize: '14px', textDecoration: 'none' }}>← Torna a tutti i {tema.label} di Roma</a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
