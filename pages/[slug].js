import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getSchemas } from '../lib/seo-logic';

export default function PaginaDinamicaQuartiere() {
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
        const parti = slug.split('-'); // es: farmacie-roma-prati
        const catSlug = parti[0]; 
        const zonaSlug = parti[parti.length - 1];

        let nomeCat = "Specialisti";
        if (catSlug.includes('farmac')) {
          setTema({ primario: '#059669', chiaro: '#ecfdf5', label: 'FARMACIE' });
          nomeCat = "Farmacie";
        } else if (catSlug.includes('dentist')) {
          setTema({ primario: '#2563eb', chiaro: '#eff6ff', label: 'DENTISTI' });
          nomeCat = "Dentisti";
        }

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
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh', color: '#1a202c' }}>
      <Head>
        <title>{meta.titolo} | ServiziSalute Roma</title>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
      </Head>

      <div style={{ backgroundColor: tema.primario, color: 'white', padding: '12px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        🟢 {tema.label} : {meta.zona.toUpperCase()}
      </div>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
        <a href="/" style={{ display: 'inline-block', marginBottom: '20px', color: tema.primario, textDecoration: 'none', fontWeight: '600' }}>← Home</a>

        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', borderLeft: `8px solid ${tema.primario}`, boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
          <h1 style={{ color: tema.primario, fontSize: '32px', margin: '0', fontWeight: '800' }}>{meta.titolo}</h1>
          <p style={{ color: '#64748b', fontSize: '18px', marginTop: '10px' }}>Risultati verificati per {meta.zona}.</p>
        </div>

        {/* LISTA ANNUNCI MODELLO ORO */}
        {loading ? <p style={{textAlign:'center'}}>Caricamento...</p> : servizi.length === 0 ? <p style={{textAlign:'center', padding:'50px'}}>Nessun annuncio trovato.</p> : (
          servizi.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', marginBottom: '20px', border: v.is_top ? `3px solid ${tema.primario}` : '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2 style={{ color: tema.primario, margin: '0', fontSize: '24px', fontWeight: '800' }}>{v.nome}</h2>
                {v.is_top && <span style={{ backgroundColor: tema.chiaro, color: tema.primario, padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>TOP</span>}
              </div>
              <p style={{ fontSize: '17px', margin: '12px 0' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: tema.primario, color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>Chiama</a>
                {v.whatsapp && <a href={`https://wa.me/${v.whatsapp}`} target="_blank" style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>WhatsApp</a>}
              </div>
            </div>
          ))
        )}

        {/* FAQ SEO */}
        <section style={{ marginTop: '50px', backgroundColor: 'white', padding: '35px', borderRadius: '24px' }}>
           <h3 style={{ color: tema.primario, fontSize: '24px', marginBottom: '20px' }}>Domande Frequenti</h3>
           {schemas.faq.mainEntity.map((item, idx) => (
             <div key={idx} style={{ marginBottom: '15px' }}>
               <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>{item.name}</p>
               <p style={{ color: '#64748b' }}>{item.acceptedAnswer.text}</p>
             </div>
           ))}
        </section>

        {/* FOOTER COMPLETO IDENTICO ALLA HOME */}
        <footer style={{ marginTop: '80px', backgroundColor: '#1e293b', color: '#f8fafc', borderRadius: '32px 32px 0 0', padding: '60px 40px', marginLeft: '-20px', marginRight: '-20px' }}>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
             <div><h4 style={{ color: 'white' }}>ServiziSalute Roma</h4></div>
             <div><h4 style={{ color: 'white' }}>Legale</h4>
                <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                  <li><a href="/privacy-policy" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</a></li>
                </ul>
             </div>
           </div>
           <div style={{ borderTop: '1px solid #334155', marginTop: '40px', paddingTop: '20px', textAlign: 'center' }}>
             <p style={{ fontSize: '11px', color: '#64748b' }}><strong>DISCLAIMER:</strong> Portale informativo.</p>
           </div>
        </footer>
      </main>
    </div>
  );
}
