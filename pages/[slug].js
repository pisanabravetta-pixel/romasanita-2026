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

        // Gestione Colori Categorie
        let primario = "#0891b2"; let chiaro = "#ecfeff";
        if (catSlug.includes('dentist')) { primario = "#0f766e"; chiaro = "#f0fdfa"; }
        if (catSlug.includes('farmaci')) { primario = "#15803d"; chiaro = "#f0fdf4"; }
        if (catSlug.includes('dermatol')) { primario = "#be185d"; chiaro = "#fdf2f8"; }
        if (catSlug.includes('diagnost')) { primario = "#1e40af"; chiaro = "#eff6ff"; }
        
        const nomeCatRaw = catSlug.replace('-roma', '');
        const nomeCat = nomeCatRaw.charAt(0).toUpperCase() + nomeCatRaw.slice(1);
        const zonaBella = zonaSlug.charAt(0).toUpperCase() + zonaSlug.slice(1).replace(/-/g, ' ');

        setTema({ primario, chiaro, label: nomeCat.toUpperCase() });
        setMeta({ titolo: `${nomeCat} a Roma ${zonaBella}`, zona: zonaBella, cat: catSlug });

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

  // Correzione SEO: Evitiamo ripetizioni Prati/Prati
  const seoIntro = `Stai cercando ${meta.titolo}? In questa pagina trovi l'elenco completo e aggiornato delle migliori strutture e professionisti situati a ${meta.zona}. Abbiamo selezionato per te i centri più affidabili per garantirti assistenza immediata nel tuo quartiere.`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>{`${meta.titolo} | ServiziSalute Roma`}</title>
        <meta name="description" content={`Trova ${meta.titolo}. Contatti diretti, orari e posizioni sulla mappa a Roma ${meta.zona}.`} />
      </Head>

      <Navbar />

      <div style={{ backgroundColor: tema.chiaro, color: tema.primario, padding: '12px', textAlign: 'center', fontWeight: '800', fontSize: '13px', letterSpacing: '0.5px' }}>
        📍 {tema.label} : ROMA {meta.zona.toUpperCase()}
      </div>

      <main style={{ flex: '1 0 auto', maxWidth: '900px', margin: '0 auto', padding: '20px', width: '100%' }}>
        
        <div style={{ marginBottom: '25px', backgroundColor: 'white', padding: '25px', borderRadius: '12px', borderLeft: `8px solid ${tema.primario}`, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h1 style={{ color: '#1e293b', fontSize: '32px', fontWeight: '900', margin: '0 0 10px 0', lineHeight: '1.2' }}>{meta.titolo}</h1>
          <p style={{ color: '#64748b', fontSize: '18px', fontWeight: '600', margin: 0 }}>Eccellenze sanitarie nel quartiere {meta.zona}</p>
        </div>

        <div style={{ marginBottom: '30px', color: '#475569', fontSize: '16px', lineHeight: '1.8' }}>
          <p>{seoIntro}</p>
        </div>

        {/* MAPPA - Fix Contenitore */}
        <div style={{ marginBottom: '35px', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', height: '300px', width: '100%', position: 'relative' }}>
          <iframe 
            width="100%" 
            height="100%" 
            style={{ border: 0, display: 'block' }} 
            loading="lazy" 
            src={`https://www.google.com/maps/place//data=!3m4!1e2!3m2!1sAF1QipN8s6fjzKns9vZLE4jkOtONpBKS-_y4KyPA9AcS!2e10!4m2!3m1!1s0x132f605fa9243ee7:0xef01af9c5b69b4db{encodeURIComponent(meta.titolo + " " + meta.zona + " Roma")}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
          ></iframe>
        </div>

        {/* LISTA ANNUNCI */}
        <div style={{ marginBottom: '40px' }}>
          {servizi.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', borderRadius: '16px', padding: '25px', marginBottom: '20px', border: v.is_top ? `3px solid ${tema.primario}` : '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.08)' }}>
              <h3 style={{ color: '#1e293b', fontSize: '24px', fontWeight: '900', margin: '0 0 8px 0' }}>{v.nome}</h3>
              <p style={{ fontSize: '16px', color: '#64748b', marginBottom: '20px', fontWeight: '500' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: '1', minWidth: '100px', backgroundColor: tema.primario, color: 'white', padding: '14px', borderRadius: '10px', textAlign: 'center', fontWeight: '800', textDecoration: 'none', fontSize: '14px' }}>📞 CHIAMA</a>
                <a href={`https://wa.me/${v.whatsapp?.replace(/\s+/g, '')}`} style={{ flex: '1', minWidth: '100px', backgroundColor: '#22c55e', color: 'white', padding: '14px', borderRadius: '10px', textAlign: 'center', fontWeight: '800', textDecoration: 'none', fontSize: '14px' }}>💬 W.A.</a>
                <a href={`https://www.google.com/maps?q=...&output=embed0{encodeURIComponent(v.nome + " " + v.indirizzo)}`} target="_blank" rel="noopener noreferrer" style={{ flex: '1', minWidth: '100px', backgroundColor: '#64748b', color: 'white', padding: '14px', borderRadius: '10px', textAlign: 'center', fontWeight: '800', textDecoration: 'none', fontSize: '14px' }}>📍 MAPPA</a>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ SPECIFICHE */}
        <section style={{ padding: '30px', backgroundColor: 'white', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '20px', color: '#1e293b' }}>Domande Frequenti su {meta.zona}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <p style={{ fontWeight: '800', color: tema.primario, marginBottom: '5px' }}>Quali sono gli orari delle strutture a {meta.zona}?</p>
              <p style={{ color: '#475569', margin: 0 }}>La maggior parte dei centri a {meta.zona} osserva orari continuati. Ti consigliamo di usare il tasto WhatsApp per richiedere l'orario esatto di oggi.</p>
            </div>
            <div>
              <p style={{ fontWeight: '800', color: tema.primario, marginBottom: '5px' }}>Come raggiungere questi centri a Roma {meta.zona}?</p>
              <p style={{ color: '#475569', margin: 0 }}>Tutte le strutture elencate sono facilmente raggiungibili. Cliccando sul tasto "Mappa" nel box del professionista, il tuo navigatore ti porterà direttamente a destinazione.</p>
            </div>
            <div>
              <p style={{ fontWeight: '800', color: tema.primario, marginBottom: '5px' }}>È necessaria la prenotazione per una visita a {meta.zona}?</p>
              <p style={{ color: '#475569', margin: 0 }}>Sì, è sempre preferibile prenotare. Puoi farlo istantaneamente chiamando il numero indicato nel box dedicato a {meta.zona}.</p>
            </div>
          </div>
        </section>

        {/* CROSS LINKING QUARTIERE */}
        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: tema.chiaro, borderRadius: '12px', border: `1px solid ${tema.primario}33` }}>
          <p style={{ fontWeight: '800', fontSize: '14px', color: tema.primario, marginBottom: '15px', textTransform: 'uppercase' }}>Altre specialistiche a {meta.zona}:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            <a href={`/dentisti-roma-${meta.zona.toLowerCase()}`} style={{ color: '#1e293b', fontWeight: '700', textDecoration: 'none', fontSize: '14px' }}>🦷 Dentisti</a>
            <a href={`/farmacie-roma-${meta.zona.toLowerCase()}`} style={{ color: '#1e293b', fontWeight: '700', textDecoration: 'none', fontSize: '14px' }}>💊 Farmacie</a>
            <a href={`/diagnostica-roma-${meta.zona.toLowerCase()}`} style={{ color: '#1e293b', fontWeight: '700', textDecoration: 'none', fontSize: '14px' }}>🔬 Diagnostica</a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
