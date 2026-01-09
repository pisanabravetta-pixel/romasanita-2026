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
        
        // Dividiamo lo slug (es: "dentisti-roma-prati" oppure solo "prati")
        const parti = slug.split('-'); 
        
        // Se è un link lungo (es. dentisti-roma-prati) prendiamo la prima e l'ultima parola
        // Se è un link corto (es. prati) la categoria diventa nulla e cerchiamo solo la zona
        const categoriaCercata = parti.length > 1 ? parti[0] : null; 
        const zonaCercata = parti[parti.length - 1];

        // Formattazione Titolo
        const catBella = categoriaCercata ? categoriaCercata.charAt(0).toUpperCase() + categoriaCercata.slice(1) : "Servizi";
        const zonaBella = zonaCercata.charAt(0).toUpperCase() + zonaCercata.slice(1);
        setTitolo(`${catBella} a Roma ${zonaBella}`);

        // COSTRUZIONE QUERY
        let query = supabase
          .from('annunci')
          .select('*')
          .eq('approvato', true);

        // Se abbiamo una categoria nello slug (es. dentisti), filtriamo
        if (categoriaCercata && categoriaCercata !== 'roma') {
          query = query.ilike('categoria', `%${categoriaCercata}%`);
        }

        // FILTRO ZONA "INTELLIGENTE"
        // Il simbolo % permette di trovare "Prati" anche se nel DB hai scritto "Roma Prati"
        if (zonaCercata && zonaCercata !== 'roma') {
          query = query.ilike('zona', `%${zonaCercata}%`);
        }

        const { data, error } = await query.order('is_top', { ascending: false });
        
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
            <p style={{ color: '#64748b', marginTop: '10px' }}>Lista aggiornata dei professionisti in zona {titolo.split('Roma')[1] || 'Roma'}.</p>
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
            <p style={{ fontSize: '18px', color: '#64748b' }}>Nessun risultato in questa zona.</p>
            <p style={{ fontSize: '14px', color: '#94a3b8' }}>Verifica su Supabase che l'annuncio abbia <b>approvato: true</b> e che la zona contenga la parola cercata.</p>
          </div>
        )}
      </main>
    </div>
  );
}
