import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function PaginaQuartiere() {
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
        
        // LOGICA SLUG PULITA: farmacie-roma-prati
        const parti = slug.split('-'); 
        const categoriaSlug = parti[0]; // farmacie
        const zonaSlug = parti[parti.length - 1]; // prati

        // Imposta Tema Colore
        if (categoriaSlug.includes('farmac')) {
          setTema({ primario: '#059669', chiaro: '#ecfdf5', label: 'FARMACIE' });
        } else if (categoriaSlug.includes('dentist')) {
          setTema({ primario: '#2563eb', chiaro: '#eff6ff', label: 'DENTISTI' });
        }

        const catBella = categoriaSlug.charAt(0).toUpperCase() + categoriaSlug.slice(1);
        const zonaBella = zonaSlug.charAt(0).toUpperCase() + zonaSlug.slice(1);
        setTitolo(`${catBella} a Roma ${zonaBella}`);

        // QUERY DOPPIA: Categoria + Zona
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
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDati();
  }, [slug]);

  if (!slug) return null;

  return (
    <div style={{ fontFamily: '-apple-system, system-ui, sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh' }}>
      <Head><title>{titolo} | ServiziSalute</title></Head>
      
      <div style={{ backgroundColor: tema.primario, color: 'white', padding: '12px', textAlign: 'center', fontWeight: 'bold' }}>
        🟢 {tema.label} : {titolo.toUpperCase()}
      </div>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
        <a href="/" style={{ color: tema.primario, textDecoration: 'none', fontWeight: 'bold' }}>← Torna alla Home</a>

        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', marginTop: '20px', borderLeft: `8px solid ${tema.primario}`, boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h1 style={{ color: tema.primario, fontSize: '30px', margin: '0' }}>{titolo}</h1>
          <p style={{ color: '#64748b' }}>Elenco aggiornato dei professionisti nella zona di {titolo.split('Roma')[1]}.</p>
        </div>

        {loading ? <p>Caricamento...</p> : servizi.length === 0 ? (
          <p style={{ padding: '40px', textAlign: 'center' }}>Nessun risultato trovato.</p>
        ) : (
          servizi.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', margin: '20px 0', border: v.is_top ? `3px solid ${tema.primario}` : '1px solid #e2e8f0' }}>
              <h2 style={{ color: tema.primario, margin: '0 0 10px 0' }}>{v.nome}</h2>
              <p>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: tema.primario, color: 'white', padding: '15px', borderRadius: '12px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>Chiama</a>
                {v.whatsapp && <a href={`https://wa.me/${v.whatsapp}`} style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '15px', borderRadius: '12px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none' }}>WhatsApp</a>}
              </div>
            </div>
          ))
        )}

        {/* FOOTER IDENTICO ALLA HOME */}
        <footer style={{ marginTop: '80px', backgroundColor: '#1e293b', color: '#f8fafc', borderRadius: '32px 32px 0 0', padding: '60px 40px', marginLeft: '-20px', marginRight: '-20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            <div>
              <h4 style={{ color: 'white', marginBottom: '20px' }}>ServiziSalute Roma</h4>
              <p style={{ fontSize: '14px', color: '#94a3b8' }}>Guida completa ai servizi sanitari della Capitale. Informazioni verificate h24.</p>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '20px' }}>Categorie</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/farmacie-roma" style={{ color: '#94a3b8', textDecoration: 'none' }}>Farmacie Roma</a></li>
                <li><a href="/dentisti-roma" style={{ color: '#94a3b8', textDecoration: 'none' }}>Dentisti Roma</a></li>
                <li><a href="/cardiologi-roma" style={{ color: '#94a3b8', textDecoration: 'none' }}>Cardiologi Roma</a></li>
                <li><a href="/diagnostica-roma" style={{ color: '#94a3b8', textDecoration: 'none' }}>Diagnostica Roma</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '20px' }}>Legale</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/privacy-policy" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</a></li>
                <li><a href="/cookie-policy" style={{ color: '#94a3b8', textDecoration: 'none' }}>Cookie Policy</a></li>
                <li><a href="/termini-condizioni" style={{ color: '#94a3b8', textDecoration: 'none' }}>Termini e Condizioni</a></li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #334155', marginTop: '40px', paddingTop: '20px', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.6' }}>
              <strong>DISCLAIMER:</strong> Le informazioni contenute in questo portale hanno carattere puramente informativo. 
              ServiziSalute Roma non fornisce consulenza medica. Verificare sempre orari e turni telefonicamente.
            </p>
            <p style={{ fontSize: '14px', marginTop: '20px' }}>© 2026 ServiziSalute Roma - Tutti i diritti riservati.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
