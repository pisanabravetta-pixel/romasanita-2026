import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getSchemas } from '../lib/seo-logic';

export default function PaginaQuartiereDinamica() {
  const router = useRouter();
  const { slug } = router.query;
  const [servizi, setServizi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({ titolo: "", zona: "", cat: "" });
  const [tema, setTema] = useState({ primario: '#2563eb', chiaro: '#eff6ff', label: 'SERVIZI' });

  useEffect(() => {
    if (!slug) return;
    async function fetchDati() {
      try {
        setLoading(true);
        const parti = slug.split('-'); 
        const catSlug = parti[0]; 
        const zonaSlug = parti[parti.length - 1];

        let nomeCat = catSlug.includes('farmac') ? "Farmacie" : "Dentisti";
        let color = catSlug.includes('farmac') ? "#059669" : "#2563eb";
        let colorChiaro = catSlug.includes('farmac') ? "#ecfdf5" : "#eff6ff";
        
        setTema({ primario: color, chiaro: colorChiaro, label: nomeCat.toUpperCase() });
        const zonaBella = zonaSlug.charAt(0).toUpperCase() + zonaSlug.slice(1);
        setMeta({ titolo: `${nomeCat} a Roma ${zonaBella}`, zona: zonaBella, cat: catSlug });

        const { data, error } = await supabase
          .from('annunci')
          .select('*')
          .eq('approvato', true)
          .ilike('categoria', `%${catSlug}%`)
          .ilike('zona', `%${zonaSlug}%`)
          .order('is_top', { ascending: false });

        if (error) throw error;
        setServizi(data || []);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    }
    fetchDati();
  }, [slug]);

  const schemas = getSchemas(meta.cat || 'farmacie', slug || 'roma');
  if (!slug) return null;

  return (
    <div style={{ fontFamily: '-apple-system, system-ui, sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh' }}>
      <Head>
        <title>{meta.titolo} | ServiziSalute</title>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
      </Head>

      <div style={{ backgroundColor: tema.primario, color: 'white', padding: '12px', textAlign: 'center', fontWeight: 'bold' }}>
        🟢 {tema.label} : {meta.zona.toUpperCase()}
      </div>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        <a href="/" style={{ color: tema.primario, textDecoration: 'none', fontWeight: 'bold' }}>← Home</a>

        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', borderLeft: `8px solid ${tema.primario}`, marginTop: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h1 style={{ color: tema.primario, fontSize: '32px', margin: '0', fontWeight: '800' }}>{meta.titolo}</h1>
        </div>

        {loading ? <p style={{textAlign:'center'}}>Caricamento...</p> : servizi.map((v) => (
          <div key={v.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', margin: '20px 0', border: v.is_top ? `3px solid ${tema.primario}` : '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h2 style={{ color: tema.primario, margin: '0', fontSize: '24px', fontWeight: '800' }}>{v.nome}</h2>
              {v.is_top && <span style={{ backgroundColor: tema.chiaro, color: tema.primario, padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>TOP</span>}
            </div>
            <p style={{ fontSize: '17px', margin: '15px 0' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
              <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: tema.primario, color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>Chiama</a>
              {v.whatsapp && <a href={`https://wa.me/${v.whatsapp.replace(/\s+/g, '')}`} target="_blank" style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>WhatsApp</a>}
              {/* MAPPA AGGIUNTA QUI */}
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" style={{ flex: '0.4', backgroundColor: '#f3f4f6', color: '#4b5563', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>📍</a>
            </div>
          </div>
        ))}
      </main>

      {/* FOOTER INTEGRALE */}
      <footer style={{ background: '#1a202c', color: 'white', padding: '60px 0 30px', borderTop: '4px solid #3182ce' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            <div>
              <h4 style={{ color: '#63b3ed', marginBottom: '15px' }}>ServiziSalute</h4>
              <p style={{ fontSize: '14px', color: '#a0aec0', lineHeight: '1.6' }}>ServiziSalute è il portale di annunci dedicato ai servizi sanitari a Roma.</p>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Per gli utenti</h4>
              <p style={{ fontSize: '12px', color: '#48bb78', marginBottom: '10px', fontWeight: 'bold' }}>● Disponibilità aggiornate: Gennaio 2026</p>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/" style={{ color: '#a0aec0', textDecoration: 'none' }}>Home</a></li>
                <li><a href="/servizi-sanitari-roma" style={{ color: '#63b3ed', fontWeight: 'bold', textDecoration: 'none' }}>📍 Mappa Servizi per Quartiere</a></li>
                <li><a href="/guide/costo-pulizia-denti-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Costo Pulizia Denti</a></li>
                <li><a href="/guide/costo-visita-cardiologica-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Costo Visita Cardiologica</a></li>
                <li><a href="/guide/costo-visita-dermatologica-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Costo Visita Dermatologica</a></li>
                <li><a href="/farmacie-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Farmacie a Roma</a></li>
                <li><a href="/dentisti-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Dentisti a Roma</a></li>
                <li><a href="/diagnostica-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Diagnostica a Roma</a></li>
                <li><a href="/visite-specialistiche-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Visite specialistiche</a></li>
                <li><a href="/servizi-domicilio-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Servizi a domicilio</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Per i professionisti</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/pubblica-annuncio" style={{ color: '#48bb78', textDecoration: 'none', fontWeight: 'bold' }}>Pubblica il tuo annuncio</a></li>
                <li><a href="/contatti" style={{ color: '#a0aec0', textDecoration: 'none' }}>Contattaci</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Note legali</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/privacy-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Privacy Policy</a></li>
                <li><a href="/disclaimer" style={{ color: '#a0aec0', textDecoration: 'none' }}>Disclaimer</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
