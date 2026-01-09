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
        // ESEMPIO: slug = "dentisti-roma-prati"
        const parti = slug.split('-'); 
        
        // 1. Identifichiamo la categoria (la prima parola: "dentisti")
        const categoriaCercata = parti[0]; 
        
        // 2. Identifichiamo la zona (l'ultima parola: "prati")
        const zonaCercata = parti.length > 1 ? parti[parti.length - 1] : null;

        // Formattiamo il titolo per l'utente
        const catBella = categoriaCercata.charAt(0).toUpperCase() + categoriaCercata.slice(1);
        const zonaBella = zonaCercata ? zonaCercata.charAt(0).toUpperCase() + zonaCercata.slice(1) : "";
        setTitolo(`${catBella} a Roma ${zonaBella}`);

        // 3. COSTRUIAMO LA QUERY
        let query = supabase
          .from('annunci')
          .select('*')
          .eq('approvato', true)
          .ilike('categoria', `%${categoriaCercata}%`); // Cerca "dentisti" in categoria

        // 4. FILTRIAMO PER ZONA (Se presente nello slug)
        if (zonaCercata && zonaCercata.toLowerCase() !== 'roma') {
          query = query.ilike('zona', zonaCercata); // Cerca "prati" in zona (senza badare a maiuscole)
        }

        const { data, error } = await query.order('is_top', { ascending: false });
        
        if (error) throw error;
        if (data) setServizi(data);

      } catch (err) {
        console.error("Errore recupero dati:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDati();
  }, [slug]);

  if (!slug) return null;

  return (
    <div style={{ fontFamily: '-apple-system, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', padding: '20px' }}>
      <Head>
        <title>{titolo} | ServiziSalute</title>
      </Head>
      
      <main style={{ maxWidth: '800px', margin: '0 auto' }}>
        <a href="/" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>← Torna alla Home</a>
        
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginTop: '20px', marginBottom: '30px' }}>
            <h1 style={{ color: '#1e40af', margin: 0, fontSize: '28px' }}>{titolo}</h1>
            <p style={{ color: '#64748b', marginTop: '10px' }}>Risultati verificati per la zona di {titolo.split('Roma')[1] || 'Roma'}.</p>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', padding: '20px' }}>Ricerca in corso...</p>
        ) : servizi.length > 0 ? (
          servizi.map((v) => (
            <div key={v.id} style={{ 
                backgroundColor: 'white', padding: '25px', borderRadius: '20px', marginBottom: '15px', 
                border: v.is_top ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#1e3a8a', fontSize: '20px' }}>{v.nome}</h3>
              <p style={{ color: '#4b5563', marginBottom: '20px' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: 1, background: '#3b82f6', color: 'white', padding: '12px', borderRadius: '12px', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold' }}>Chiama</a>
                {v.whatsapp && (
                    <a href={`https://wa.me/${v.whatsapp.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, background: '#22c55e', color: 'white', padding: '12px', borderRadius: '12px', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold' }}>WhatsApp</a>
                )}
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'white', borderRadius: '24px' }}>
            <p style={{ fontSize: '18px', color: '#64748b' }}>Nessun annuncio trovato per questa ricerca.</p>
            <p style={{ fontSize: '14px', color: '#94a3b8' }}>Suggerimento: Verifica che l'annuncio nel database abbia "approvato" su true e la zona scritta correttamente.</p>
          </div>
        )}
      </main>
    </div>
  );
}
