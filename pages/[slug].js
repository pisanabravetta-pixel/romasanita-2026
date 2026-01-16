import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';
import { getSchemas, getDBQuery } from '../lib/seo-logic';

export default function PaginaQuartiereDinamica() {
  const router = useRouter();
  const { slug } = router.query;
  const [servizi, setServizi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({ titolo: "", zona: "", cat: "" });
  const [tema, setTema] = useState({ primario: '#0891b2', chiaro: '#ecfeff', label: 'SERVIZI' });

useEffect(() => {
    if (!slug) return;

    async function fetchDati() {
      try {
        setLoading(true);
        const parti = slug.split('-'); 
        const catSlug = parti[0]; 
        const zonaSlug = parti[parti.length - 1];

        // COLORE UNICO PER TUTTI I QUARTIERI (Semplice e Pulito)
        const primario = "#0891b2"; // Azzurro Ciano
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

  if (!slug) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>{meta.titolo} | ServiziSalute</title>
        <meta name="description" content={`Trova i migliori professionisti per ${meta.titolo}. Contatti diretti, orari e disponibilità aggiornata.`} />
      </Head>

      <Navbar />

      {/* STRISCIA DI STATO DINAMICA */}
      <div style={{ backgroundColor: tema.chiaro, color: tema.primario, padding: '10px', textAlign: 'center', fontWeight: '800', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
        📍 {tema.label} : {meta.zona}
      </div>

      <main style={{ flex: '1 0 auto', maxWidth: '900px', margin: '0 auto', padding: '20px', width: '100%' }}>
  
        {/* 1. BREADCRUMB */}
        <div style={{ margin: '15px 0', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
          <a href="/" style={{ color: tema.primario, textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>{'>'}</span>
          <a href="/servizi-sanitari-roma" style={{ color: tema.primario, textDecoration: 'none' }}>Servizi Roma</a>
          <span style={{ margin: '0 8px' }}>{'>'}</span>
          <a href={`/${meta.cat}-roma`} style={{ color: tema.primario, textDecoration: 'none' }}>{tema.label} Roma</a>
        </div>

        {/* 2. TITOLO E SOTTOTITOLO (Stile Premium 24px) */}
        <div style={{ marginBottom: '25px', backgroundColor: 'white', padding: '35px', borderRadius: '24px', borderLeft: `8px solid ${tema.primario}`, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <h1 style={{ color: '#1e293b', fontSize: '32px', fontWeight: '900', margin: '0 0 10px 0', lineHeight: '1.2' }}>
            {meta.titolo}
          </h1>
          <p style={{ color: '#64748b', fontSize: '18px', fontWeight: '600', margin: 0 }}>
            I migliori professionisti a <span style={{ color: tema.primario }}>{meta.zona}</span> aggiornati a Gennaio 2026
          </p>
        </div>

        {/* 3. CERCA PER QUARTIERE */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '24px', marginBottom: '25px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '900', marginBottom: '12px', color: '#1e293b' }}>Cerca in altre zone vicino a {meta.zona}:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense"].map(q => (
              <a key={q} href={`/${meta.cat}-roma-${q.toLowerCase()}`} style={{ padding: '7px 12px', backgroundColor: tema.chiaro, color: tema.primario, borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '12px' }}>{q}</a>
            ))}
          </div>
        </div>

        {/* 4. LISTA BOX (Stile Premium 24px) */}
        <div style={{ display: 'block' }}>
          {loading ? <p>Caricamento...</p> : servizi.length > 0 ? servizi.map((v) => (
            <div key={v.id} style={{ 
              backgroundColor: 'white', borderRadius: '24px', padding: '25px', marginBottom: '20px', 
              border: v.is_top ? `4px solid ${tema.primario}` : '1px solid #e2e8f0', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'block', width: '100%', boxSizing: 'border-box'
            }}>
              <h3 style={{ color: '#1e293b', fontSize: '24px', fontWeight: '900', margin: '0 0 8px 0' }}>{v.nome}</h3>
              <p style={{ fontSize: '17px', color: '#475569', marginBottom: '20px' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: '1', minWidth: '110px', backgroundColor: tema.primario, color: 'white', padding: '14px', borderRadius: '12px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>
                  📞 CHIAMA
                </a>
                
                <a href={`https://wa.me/${v.whatsapp ? v.whatsapp.replace(/\s+/g, '') : ''}`} target="_blank" rel="noopener noreferrer" style={{ flex: '1', minWidth: '110px', backgroundColor: '#22c55e', color: 'white', padding: '14px', borderRadius: '12px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>
                  💬 WHATSAPP
                </a>
                
                <a href={`https://www.google.it/maps/search/${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" rel="noreferrer" style={{ flex: '1', minWidth: '110px', backgroundColor: '#f1f5f9', color: '#1e293b', padding: '14px', borderRadius: '12px', textAlign: 'center', fontWeight: '800', textDecoration: 'none', border: '1px solid #e2e8f0' }}>
                  🗺️ MAPPA
                </a>
              </div>
            </div>
          )) : (
            <p style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Al momento non ci sono annunci attivi a {meta.zona}.</p>
          )}
        </div>

        {/* 5. CTA NERA */}
        <div style={{ backgroundColor: '#0f172a', padding: '35px 25px', borderRadius: '24px', textAlign: 'center', color: 'white', margin: '35px 0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '10px' }}>Sei un professionista a {meta.zona}?</h2>
          <p style={{ fontSize: '15px', color: '#94a3b8', marginBottom: '20px' }}>Metti in evidenza i tuoi servizi in questa zona.</p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: tema.primario, color: 'white', padding: '12px 25px', borderRadius: '10px', fontWeight: '900', textDecoration: 'none', display: 'inline-block' }}>ISCRIVITI ORA</a>
        </div>

        {/* 6. FAQ SPECIFICHE DEL QUARTIERE */}
        <div style={{ paddingBottom: '40px' }}>
          <h3 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '20px', color: '#1e293b' }}>Domande Frequenti {meta.zona}</h3>
          <p><strong>1. Come trovare un servizio a Roma {meta.zona}?</strong> — Puoi consultare i box qui sopra per contattare direttamente i professionisti del quartiere.</p><br/>
          <p><strong>2. I prezzi a {meta.zona} sono diversi dal resto di Roma?</strong> — Generalmente le tariffe seguono l'andamento cittadino, ma consigliamo di chiedere un preventivo via WhatsApp.</p><br/>
          <p><strong>3. Ci sono specialisti disponibili subito a {meta.zona}?</strong> — Sì, usa il tasto Chiama per verificare la disponibilità immediata in zona.</p>
        </div>

      </main>
      <Footer />
    </div>
  );
}
