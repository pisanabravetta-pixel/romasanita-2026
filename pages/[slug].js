import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import { getSchemas } from '../lib/seo-logic';

export default function PaginaDinamicaSalute() {
  const router = useRouter();
  const { slug } = router.query;
  const [servizi, setServizi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [titolo, setTitolo] = useState("");
  const [tema, setTema] = useState({ primario: '#2563eb', chiaro: '#eff6ff', label: 'SERVIZI' });

  useEffect(() => {
    if (!slug) return;

    async function fetchDati() {
      try {
        setLoading(true);
        
        // ESEMPIO SLUG: "farmacie-roma-prati" o "dentisti-roma-eur"
        const parti = slug.split('-'); 
        const categoriaSlug = parti[0]; // farmacie
        const zonaSlug = parti[parti.length - 1]; // prati

        // Imposta il tema in base alla categoria
        if (categoriaSlug.includes('farmac')) {
          setTema({ primario: '#059669', chiaro: '#ecfdf5', label: 'FARMACIE' });
        } else if (categoriaSlug.includes('dentist')) {
          setTema({ primario: '#2563eb', chiaro: '#eff6ff', label: 'DENTISTI' });
        } else if (categoriaSlug.includes('cardiolog')) {
          setTema({ primario: '#dc2626', chiaro: '#fef2f2', label: 'CARDIOLOGI' });
        }

        // Titolo pulito: "Farmacie a Roma Prati"
        const catBella = categoriaSlug.charAt(0).toUpperCase() + categoriaSlug.slice(1);
        const zonaBella = zonaSlug.charAt(0).toUpperCase() + zonaSlug.slice(1);
        setTitolo(`${catBella} a Roma ${zonaBella}`);

        // QUERY FILTRATA PER CATEGORIA E ZONA
        const { data, error } = await supabase
          .from('annunci')
          .select('*')
          .eq('approvato', true)
          .ilike('categoria', `%${categoriaSlug}%`)
          .ilike('zona', `%${zonaSlug}%`)
          .order('is_top', { ascending: false });

        if (error) throw error;
        setServizi(data || []);

      } catch (err) {
        console.error("Errore:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDati();
  }, [slug]);

  const schemas = getSchemas(tema.label.toLowerCase().includes('farmac') ? 'farmacie' : 'dentisti', slug || 'roma');

  if (!slug) return null;

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh' }}>
      <Head>
        <title>{titolo} | ServiziSalute Roma</title>
      </Head>

      <div style={{ backgroundColor: tema.primario, color: 'white', padding: '12px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold', letterSpacing: '0.5px' }}>
        🟢 {tema.label} : ROMA {slug.split('-').pop().toUpperCase()}
      </div>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
        <a href="/" style={{ display: 'inline-block', marginBottom: '20px', color: tema.primario, textDecoration: 'none', fontWeight: 'bold' }}>← Home</a>

        <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px', borderLeft: `8px solid ${tema.primario}` }}>
          <h1 style={{ color: tema.primario, fontSize: '32px', margin: '0', fontWeight: '800' }}>{titolo}</h1>
          <p style={{ color: '#64748b', fontSize: '18px', marginTop: '10px' }}>Risultati verificati nel quartiere {slug.split('-').pop()}.</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>Caricamento specialisti...</div>
        ) : servizi.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', backgroundColor: 'white', borderRadius: '24px' }}>
            <p style={{ color: '#64748b', fontSize: '18px' }}>Nessun risultato trovato per <strong>{titolo}</strong>.</p>
          </div>
        ) : (
          servizi.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', marginBottom: '20px', border: v.is_top ? `3px solid ${tema.primario}` : '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h2 style={{ margin: '0', color: tema.primario, fontSize: '24px', fontWeight: '800' }}>{v.nome}</h2>
                  {v.is_top && <span style={{ backgroundColor: tema.chiaro, color: tema.primario, padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>TOP</span>}
              </div>
              <p style={{ color: '#4b5563', fontSize: '17px', margin: '12px 0' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: '1.6' }}>{v.descrizione || `Specialista a Roma ${v.zona}.`}</p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: tema.primario, color: 'white', padding: '16px', borderRadius: '16px', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold' }}>Chiama</a>
                {v.whatsapp && <a href={`https://wa.me/${v.whatsapp.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '16px', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold' }}>WhatsApp</a>}
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" rel="noopener noreferrer" style={{ flex: '0.4', backgroundColor: '#f3f4f6', color: '#4b5563', padding: '16px', borderRadius: '16px', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold' }}>📍</a>
              </div>
            </div>
          ))
        )}

        {/* FOOTER INTEGRALE IDENTICO ALLA HOME */}
        <footer style={{ marginTop: '100px', backgroundColor: '#1e293b', color: '#f8fafc', borderRadius: '32px 32px 0 0', padding: '60px 40px 30px 40px', marginLeft: '-20px', marginRight: '-20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px' }}>
            <div>
              <h4 style={{ color: 'white', marginBottom: '20px', fontSize: '18px', fontWeight: '700' }}>ServiziSalute Roma</h4>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.6' }}>La tua guida affidabile alla salute nella Capitale. Medici e farmacie a portata di click.</p>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '20px', fontSize: '16px', fontWeight: '700' }}>Categorie</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/farmacie-roma" style={{ color: '#94a3b8', textDecoration: 'none' }}>Farmacie Roma</a></li>
                <li><a href="/dentisti-roma" style={{ color: '#94a3b8', textDecoration: 'none' }}>Dentisti Roma</a></li>
                <li><a href="/cardiologi-roma" style={{ color: '#94a3b8', textDecoration: 'none' }}>Cardiologi Roma</a></li>
                <li><a href="/diagnostica-roma" style={{ color: '#94a3b8', textDecoration: 'none' }}>Diagnostica Roma</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '20px', fontSize: '16px', fontWeight: '700' }}>Legale</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/privacy-policy" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</a></li>
                <li><a href="/cookie-policy" style={{ color: '#94a3b8', textDecoration: 'none' }}>Cookie Policy</a></li>
                <li><a href="/termini-condizioni" style={{ color: '#94a3b8', textDecoration: 'none' }}>Termini e Condizioni</a></li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #334155', paddingTop: '30px', textAlign: 'center' }}>
            <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '15px' }}><strong>Disclaimer:</strong> Le informazioni presenti non sostituiscono il parere medico professionale.</p>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>© 2026 ServiziSalute Roma - Tutti i diritti riservati.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
