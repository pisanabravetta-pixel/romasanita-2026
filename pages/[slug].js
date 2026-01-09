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
  const [titolo, setTitolo] = useState("Servizi Sanitari Roma");
  const [tema, setTema] = useState({ primario: '#2563eb', chiaro: '#eff6ff', label: 'SERVIZI SANITARI' });

  useEffect(() => {
    if (!slug) return;

    async function fetchDati() {
      try {
        setLoading(true);
        
        // 1. ANALISI DELLO SLUG (es: "farmacie-roma-prati")
        const parti = slug.split('-'); 
        
        // La categoria è la prima parola (farmacie)
        const categoriaCercata = parti[0]; 
        // La zona è l'ultima parola (prati)
        const zonaCercata = parti[parti.length - 1];

        // 2. LOGICA TEMA COLORE (Prima della query per caricare lo stile giusto)
        if (categoriaCercata.toLowerCase().includes('farmac')) {
          setTema({ primario: '#059669', chiaro: '#ecfdf5', label: 'FARMACIE E SALUTE' });
        } else if (categoriaCercata.toLowerCase().includes('dentist')) {
          setTema({ primario: '#2563eb', chiaro: '#eff6ff', label: 'STUDI DENTISTICI' });
        } else {
          setTema({ primario: '#1e40af', chiaro: '#f1f5f9', label: 'SPECIALISTI' });
        }

        // 3. QUERY DOPPIA: FILTRA PER CATEGORIA E PER ZONA
        let query = supabase
          .from('annunci')
          .select('*')
          .eq('approvato', true)
          .ilike('categoria', `%${categoriaCercata}%`) // FILTRO CATEGORIA (Fondamentale!)
          .ilike('zona', `%${zonaCercata}%`);         // FILTRO ZONA

        const { data, error } = await query.order('is_top', { ascending: false });

        if (error) throw error;
        setServizi(data || []);

        // Titolo dinamico
        const catBella = categoriaCercata.charAt(0).toUpperCase() + categoriaCercata.slice(1);
        const zonaBella = zonaCercata.charAt(0).toUpperCase() + zonaCercata.slice(1);
        setTitolo(`${catBella} a Roma ${zonaBella}`);

      } catch (err) {
        console.error("Errore query:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDati();
  }, [slug]);

  const schemas = getSchemas(tema.primario === '#059669' ? 'farmacie' : 'dentisti', slug || 'roma');

  if (!slug) return null;

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh' }}>
      <Head>
        <title>{titolo} | ServiziSalute Roma</title>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
      </Head>

      <div style={{ backgroundColor: tema.primario, color: 'white', padding: '10px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        🟢 {tema.label} : {slug.toUpperCase().replace(/-/g, ' ')}
      </div>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
        <a href="/" style={{ display: 'inline-block', marginBottom: '20px', color: tema.primario, textDecoration: 'none', fontWeight: 'bold' }}>← Torna alla Home</a>

        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px', borderLeft: `8px solid ${tema.primario}` }}>
          <h1 style={{ color: tema.primario, fontSize: '32px', margin: '0 0 10px 0', fontWeight: '800' }}>{titolo}</h1>
          <p style={{ color: '#64748b', fontSize: '18px' }}>Risultati filtrati per categoria e quartiere.</p>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center' }}>Caricamento...</p>
        ) : servizi.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', backgroundColor: 'white', borderRadius: '24px' }}>
            <p style={{ color: '#64748b', fontSize: '18px' }}>Nessun annuncio trovato per <strong>{titolo}</strong>.</p>
          </div>
        ) : (
          servizi.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', marginBottom: '20px', border: v.is_top ? `3px solid ${tema.primario}` : '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h2 style={{ margin: '0', color: tema.primario, fontSize: '24px', fontWeight: '800' }}>{v.nome}</h2>
                  {v.is_top && <span style={{ backgroundColor: tema.chiaro, color: tema.primario, padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>TOP</span>}
              </div>
              <p style={{ color: '#4b5563', fontSize: '17px', margin: '12px 0' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: '1.6' }}>{v.descrizione || `Professionista specializzato in ${v.categoria} a Roma zona ${v.zona}.`}</p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: tema.primario, color: 'white', padding: '16px', borderRadius: '16px', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold' }}>Chiama</a>
                {v.whatsapp && <a href={`https://wa.me/${v.whatsapp.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '16px', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold' }}>WhatsApp</a>}
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" rel="noopener noreferrer" style={{ flex: '0.4', backgroundColor: '#f3f4f6', color: '#4b5563', padding: '16px', borderRadius: '16px', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold' }}>📍</a>
              </div>
            </div>
          ))
        )}

        <footer style={{ marginTop: '80px', backgroundColor: '#1e293b', color: '#f8fafc', borderRadius: '32px 32px 0 0', padding: '60px 40px 20px 40px', marginLeft: '-20px', marginRight: '-20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px' }}>
            <div><h4 style={{ color: 'white', marginBottom: '20px' }}>ServiziSalute Roma</h4><p style={{ fontSize: '14px', color: '#94a3b8' }}>Portale sanitario della Capitale.</p></div>
            <div><h4 style={{ color: 'white', marginBottom: '20px' }}>Categorie</h4><ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2' }}><li><a href="/farmacie-roma" style={{ color: '#94a3b8', textDecoration: 'none' }}>Farmacie</a></li><li><a href="/dentisti-roma" style={{ color: '#94a3b8', textDecoration: 'none' }}>Dentisti</a></li></ul></div>
            <div><h4 style={{ color: 'white', marginBottom: '20px' }}>Legale</h4><ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2' }}><li><a href="/privacy-policy" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</a></li><li><a href="/cookie-policy" style={{ color: '#94a3b8', textDecoration: 'none' }}>Cookie Policy</a></li></ul></div>
          </div>
          <p style={{ textAlign: 'center', fontSize: '12px', color: '#64748b', borderTop: '1px solid #334155', paddingTop: '20px' }}>© 2026 ServiziSalute Roma</p>
        </footer>
      </main>
    </div>
  );
}
