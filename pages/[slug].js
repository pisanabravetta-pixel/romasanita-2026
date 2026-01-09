import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function PaginaDinamicaSalute() {
  const router = useRouter();
  const { slug } = router.query;
  const [servizi, setServizi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [titolo, setTitolo] = useState("Servizi Sanitari Roma");

  useEffect(() => {
    if (!slug) return;

    async function fetchDati() {
      try {
        setLoading(true);
        const parti = slug.split('-'); 
        const categoriaCercata = parti.length > 1 ? parti[0] : null; 
        const zonaCercata = parti[parti.length - 1];

        const catBella = categoriaCercata ? categoriaCercata.charAt(0).toUpperCase() + categoriaCercata.slice(1) : "Servizi";
        const zonaBella = zonaCercata.charAt(0).toUpperCase() + zonaCercata.slice(1);
        setTitolo(`${catBella} a Roma ${zonaBella}`);

        let query = supabase.from('annunci').select('*').eq('approvato', true);

        if (categoriaCercata && categoriaCercata !== 'roma') {
          query = query.ilike('categoria', `%${categoriaCercata}%`);
        }
        if (zonaCercata && zonaCercata !== 'roma') {
          query = query.ilike('zona', `%${zonaCercata}%`);
        }

        const { data, error } = await query.order('is_top', { ascending: false });
        if (error) throw error;
        setServizi(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDati();
  }, [slug]);

  if (!slug) return null;

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh', color: '#1a202c' }}>
      <Head>
        <title>{titolo} | ServiziSalute Roma</title>
        <meta name="description" content={`Trova i migliori servizi di ${titolo} a Roma. Contatti, orari e indirizzi verificati.`} />
      </Head>

      {/* Header colorato coerente */}
      <div style={{ backgroundColor: '#1e40af', color: 'white', padding: '10px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        📍 RICERCA LOCALIZZATA: {titolo.toUpperCase()}
      </div>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
        <a href="/" style={{ display: 'inline-block', marginBottom: '20px', color: '#1e40af', textDecoration: 'none', fontWeight: '600' }}>
          ← Torna alla Home
        </a>

        {/* Box Titolo con stile Modello Oro */}
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '32px', margin: '0 0 10px 0' }}>{titolo}</h1>
          <p style={{ color: '#64748b', fontSize: '18px', margin: '0' }}>Risultati trovati per la tua ricerca nei quartieri di Roma.</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>Ricerca in corso...</div>
        ) : servizi.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px', backgroundColor: 'white', borderRadius: '24px' }}>
            <p style={{ fontSize: '18px', color: '#64748b' }}>Nessun risultato trovato in questa zona.</p>
          </div>
        ) : (
          servizi.map((v) => (
            <div key={v.id} style={{ 
              backgroundColor: 'white', padding: '30px', borderRadius: '24px', marginBottom: '20px', 
              border: v.is_top ? '3px solid #3b82f6' : '1px solid #e2e8f0',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h2 style={{ margin: '0', color: '#1e3a8a', fontSize: '24px', fontWeight: '800' }}>{v.nome}</h2>
                {v.is_top && <span style={{ backgroundColor: '#dbeafe', color: '#1e40af', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>TOP</span>}
              </div>
              
              <p style={{ color: '#4b5563', fontSize: '16px', margin: '10px 0' }}>
                📍 {v.indirizzo} — <strong style={{ color: '#1e3a8a' }}>{v.zona}</strong>
              </p>

              <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: '1.6', margin: '15px 0' }}>
                {v.descrizione || `Specialista in ${v.categoria} a Roma zona ${v.zona}. Contatta per orari e disponibilità.`}
              </p>

              <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: '#1e40af', color: 'white', padding: '15px', borderRadius: '14px', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold', fontSize: '16px' }}>Chiama</a>
                {v.whatsapp && (
                  <a href={`https://wa.me/${v.whatsapp.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '15px', borderRadius: '14px', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold', fontSize: '16px' }}>WhatsApp</a>
                )}
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" rel="noopener noreferrer" style={{ flex: '0.5', backgroundColor: '#f3f4f6', color: '#4b5563', padding: '15px', borderRadius: '14px', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold' }}>📍</a>
              </div>
            </div>
          ))
        )}

        <footer style={{ marginTop: '60px', paddingBottom: '40px', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', color: '#94a3b8' }}>© 2026 ServiziSalute Roma - Ricerca Quartieri</p>
        </footer>
      </main>
    </div>
  );
}
