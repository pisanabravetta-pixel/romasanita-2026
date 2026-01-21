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
    // 1. PROTEZIONE: Se non c'è slug o è la home, non fare nulla
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

  // 2. BLOCCO DI SICUREZZA: Impedisce al file [slug] di caricarsi se siamo in Home
  if (!slug || slug === 'index' || slug === '') return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        {/* Il segreto è la key="slug-title": forza Next.js a distinguere questo titolo da quello della Home */}
        <title key="slug-title">{meta.titolo ? `${meta.titolo} | ServiziSalute` : "Caricamento..."}</title>
        <meta key="slug-desc" name="description" content={`Trova i migliori professionisti per ${meta.titolo}. Contatti diretti, orari e disponibilità aggiornata.`} />
      </Head>

      <Navbar />

      <div style={{ backgroundColor: tema.chiaro, color: tema.primario, padding: '10px', textAlign: 'center', fontWeight: '800', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
        📍 {tema.label} : {meta.zona}
      </div>

      <main style={{ flex: '1 0 auto', maxWidth: '900px', margin: '0 auto', padding: '20px', width: '100%' }}>
  
        <div style={{ margin: '15px 0', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
          <a href="/" style={{ color: tema.primario, textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>{'>'}</span>
          <a href="/servizi-sanitari-roma" style={{ color: tema.primario, textDecoration: 'none' }}>Servizi Roma</a>
          <span style={{ margin: '0 8px' }}>{'>'}</span>
          <a href={`/${meta.cat}-roma`} style={{ color: tema.primario, textDecoration: 'none' }}>{tema.label} Roma</a>
        </div>

        <div style={{ marginBottom: '25px', backgroundColor: 'white', padding: theme.padding?.main || '20px', borderRadius: theme.radius?.main || '12px', borderLeft: `8px solid ${tema.primario}`, boxShadow: theme.shadows?.premium || '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h1 style={{ color: '#1e293b', fontSize: '32px', fontWeight: '900', margin: '0 0 10px 0', lineHeight: '1.2' }}>
            {meta.titolo}
          </h1>
          <p style={{ color: '#64748b', fontSize: '18px', fontWeight: '600', margin: 0 }}>
            I migliori professionisti a <span style={{ color: tema.primario }}>{meta.zona}</span> aggiornati a Gennaio 2026
          </p>
        </div>
     {/* TESTO SEO INTRO (Tratto dagli Appunti di Oggi) */}
        <div style={{ marginBottom: '25px', padding: '0 10px', color: '#475569', fontSize: '16px', lineHeight: '1.7' }}>
          <p style={{ margin: '0 0 15px 0' }}>
            Cerchi <strong>{meta.titolo}</strong> nel quartiere <strong>{meta.zona} a Roma</strong>? 
            Su ServiziSalute trovi un elenco selezionato di professionisti e strutture sanitarie, 
            con informazioni utili su contatti, servizi disponibili e posizione.
          </p>
          <p style={{ margin: 0 }}>
            Il quartiere <strong>{meta.zona}</strong> dispone di numerose realtà che offrono 
            servizi per la salute e il benessere dei cittadini. Attraverso il nostro portale puoi individuare 
            rapidamente la soluzione più adatta alle tue esigenze nel tuo quadrante di riferimento.
          </p>
        </div>         

        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: theme.radius?.main || '12px', marginBottom: '25px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '900', marginBottom: '12px', color: '#1e293b' }}>Cerca in altre zone vicino a {meta.zona}:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {quartieriTop.map(q => (
              <a key={q.s} href={`/${meta.cat}-roma-${q.s}`} style={{ padding: '7px 12px', backgroundColor: tema.chiaro, color: tema.primario, borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '12px' }}>
                {q.n}
              </a>
            ))}
          </div>
        </div>

        <div style={{ display: 'block' }}>
          {loading ? <p>Caricamento...</p> : servizi.length > 0 ? servizi.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', borderRadius: theme.radius?.card || '12px', padding: theme.padding?.card || '20px', marginBottom: '20px', border: v.is_top ? `4px solid ${tema.primario}` : '1px solid #e2e8f0', boxShadow: theme.shadows?.premium || '0 4px 6px rgba(0,0,0,0.1)', display: 'block', width: '100%', boxSizing: 'border-box' }}>
              <h3 style={{ color: '#1e293b', fontSize: '24px', fontWeight: '900', margin: '0 0 8px 0' }}>{v.nome}</h3>
              <p style={{ fontSize: '17px', color: '#475569', marginBottom: '20px' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: '1', minWidth: '110px', backgroundColor: tema.primario, color: 'white', padding: '14px', borderRadius: theme.radius?.button || '8px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>
                  📞 CHIAMA
                </a>
                <a href={`https://wa.me/${v.whatsapp ? v.whatsapp.replace(/\s+/g, '') : ''}`} target="_blank" rel="noopener noreferrer" style={{ flex: '1', minWidth: '110px', backgroundColor: '#22c55e', color: 'white', padding: '14px', borderRadius: theme.radius?.button || '8px', textAlign: 'center', fontWeight: '800', textDecoration: 'none' }}>
                  💬 WHATSAPP
                </a>
              </div>
            </div>
          )) : (
            <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#f8fafc', borderRadius: '15px', border: '2px dashed #e2e8f0', marginTop: '20px' }}>
              <div style={{ fontSize: '50px', marginBottom: '20px' }}>🏥</div>
              <h3 style={{ fontSize: '22px', fontWeight: '900', color: '#1e293b', marginBottom: '10px' }}>Ricerca in corso a {meta.zona}</h3>
              <p style={{ color: '#64748b', fontSize: '16px', maxWidth: '500px', margin: '0 auto 25px', lineHeight: '1.6' }}>Stiamo verificando i migliori profili per {meta.titolo}.</p>
            </div>
          )}
        </div>
{/* TESTO SEO CONCLUSIVO E FAQ LOCAL (Regola Appunti 21 Gennaio) */}
        <section style={{ margin: '40px 0', padding: '25px', backgroundColor: 'white', borderRadius: theme.radius?.main || '12px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#1e293b', marginBottom: '15px' }}>
            Servizi offerti per {meta.titolo}
          </h2>
          <p style={{ color: '#475569', lineHeight: '1.7', marginBottom: '25px' }}>
            Le strutture presenti nel quartiere <strong>{meta.zona}</strong> rappresentano un punto di riferimento per i residenti della zona. 
            Oltre alle prestazioni standard, molte realtà offrono servizi integrativi e consulenze specialistiche personalizzate. 
            Grazie alla posizione strategica a {meta.zona}, queste strutture sono facilmente raggiungibili e permettono un contatto diretto tramite i canali indicati.
          </p>

          <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#1e293b', marginBottom: '15px', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
            Domande frequenti su {meta.zona}
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '15px' }}>
            <p><strong>Dove trovare {meta.titolo.toLowerCase()} a Roma {meta.zona}?</strong><br/>
            Su ServiziSalute puoi consultare l'elenco aggiornato con indirizzi e contatti utili per raggiungere rapidamente la struttura più vicina.</p>
            
            <p><strong>Le strutture di {meta.zona} offrono servizi sanitari aggiuntivi?</strong><br/>
            Sì, molte strutture del quartiere offrono servizi come test rapidi e consulenze farmacologiche o specialistiche.</p>
            
            <p><strong>Come verificare gli orari a {meta.zona}?</strong><br/>
            Gli orari possono variare. È consigliato contattare direttamente la struttura tramite telefono o WhatsApp per confermare l'apertura.</p>
          </div>

          {/* LINK INTERNI COMPLETI (Regola Appunti 21 Gennaio) */}
          <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <p style={{ fontWeight: '800', color: '#1e293b', marginBottom: '10px', fontSize: '14px', textTransform: 'uppercase' }}>Esplora altri servizi a {meta.zona}:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '14px' }}>
              <a href={`/dentisti-roma-${meta.zona.toLowerCase().replace(/\s+/g, '-')}`} style={{ color: tema.primario, fontWeight: '700', textDecoration: 'none' }}>🦷 Dentisti {meta.zona}</a>
              <a href={`/farmacie-roma-${meta.zona.toLowerCase().replace(/\s+/g, '-')}`} style={{ color: tema.primario, fontWeight: '700', textDecoration: 'none' }}>💊 Farmacie {meta.zona}</a>
              <a href={`/diagnostica-roma-${meta.zona.toLowerCase().replace(/\s+/g, '-')}`} style={{ color: tema.primario, fontWeight: '700', textDecoration: 'none' }}>🔬 Diagnostica {meta.zona}</a>
              <a href={`/visite-specialistiche-roma-${meta.zona.toLowerCase().replace(/\s+/g, '-')}`} style={{ color: tema.primario, fontWeight: '700', textDecoration: 'none' }}>👨‍⚕️ Specialisti {meta.zona}</a>
            </div>
            <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #e2e8f0' }}>
              <a href={`/${meta.cat}-roma`} style={{ color: '#64748b', fontWeight: '600', textDecoration: 'none', fontSize: '13px' }}>← Torna a tutti i {tema.label} di Roma</a>
            </div>
          </div>
        </section>
      </main>
       <Footer />
    </div>
  );
}
