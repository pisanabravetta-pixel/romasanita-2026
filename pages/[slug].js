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
        const zonaCercata = slug.includes('-') ? slug.split('-').pop() : slug;

        const { data, error } = await supabase
          .from('annunci')
          .select('*')
          .eq('approvato', true)
          .ilike('zona', `%${zonaCercata}%`)
          .order('is_top', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          setServizi(data);
          const isFarmacia = data[0].categoria.toLowerCase().includes('farmac');
          if (isFarmacia) {
            setTema({ primario: '#059669', chiaro: '#ecfdf5', label: 'FARMACIE E SALUTE' });
          } else {
            setTema({ primario: '#2563eb', chiaro: '#eff6ff', label: 'STUDI MEDICI E SPECIALISTI' });
          }
          const catBella = data[0].categoria;
          const zonaBella = zonaCercata.charAt(0).toUpperCase() + zonaCercata.slice(1);
          setTitolo(`${catBella} a Roma ${zonaBella}`);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDati();
  }, [slug]);

  const schemas = getSchemas(tema.primario === '#059669' ? 'farmacie' : 'dentisti', slug || 'roma');

  if (!slug) return null;

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh', color: '#1a202c' }}>
      <Head>
        <title>{titolo} | ServiziSalute Roma</title>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
      </Head>

      <div style={{ backgroundColor: tema.primario, color: 'white', padding: '10px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        🟢 {tema.label} : {slug.toUpperCase()}
      </div>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
        <a href="/" style={{ display: 'inline-block', marginBottom: '20px', color: tema.primario, textDecoration: 'none', fontWeight: '600' }}>
          ← Torna alla Home
        </a>

        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px', borderLeft: `8px solid ${tema.primario}` }}>
          <h1 style={{ color: tema.primario, fontSize: '32px', margin: '0 0 10px 0', fontWeight: '800' }}>{titolo}</h1>
          <p style={{ color: '#64748b', fontSize: '18px', margin: '0' }}>Contatti e orari verificati per la zona di {titolo.split('Roma')[1]}.</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>Caricamento...</div>
        ) : servizi.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', backgroundColor: 'white', borderRadius: '24px' }}>
            <p>Nessun risultato trovato in questa zona.</p>
          </div>
        ) : (
          servizi.map((v) => (
            <div key={v.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', marginBottom: '20px', border: v.is_top ? `3px solid ${tema.primario}` : '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h2 style={{ margin: '0', color: tema.primario, fontSize: '24px', fontWeight: '800' }}>{v.nome}</h2>
              </div>
              <p style={{ color: '#4b5563', fontSize: '17px', margin: '12px 0' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: tema.primario, color: 'white', padding: '16px', borderRadius: '16px', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold' }}>Chiama</a>
                {v.whatsapp && <a href={`https://wa.me/${v.whatsapp.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '16px', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold' }}>WhatsApp</a>}
              </div>
            </div>
          ))
        )}

        {/* FAQ SECTION */}
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '24px', marginTop: '40px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ color: tema.primario, fontSize: '24px', marginBottom: '25px', fontWeight: '800' }}>Domande Frequenti</h2>
          {schemas.faq.mainEntity.slice(0, 3).map((faq, i) => (
            <div key={i} style={{ marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '15px' }}>
              <h3 style={{ fontSize: '18px', color: tema.primario, marginBottom: '8px', fontWeight: '700' }}>{faq.name}</h3>
              <p style={{ color: '#4b5563', fontSize: '15px', lineHeight: '1.6' }}>{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        {/* FOOTER IDENTICO ALLA HOME */}
        <footer style={{ marginTop: '80px', backgroundColor: '#1e293b', color: '#f8fafc', borderRadius: '32px 32px 0 0', padding: '60px 40px 20px 40px', marginLeft: '-20px', marginRight: '-20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px' }}>
            
            {/* Colonna 1: Info */}
            <div>
              <h4 style={{ color: 'white', marginBottom: '20px', fontSize: '18px' }}>ServiziSalute Roma</h4>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.6' }}>Il portale di riferimento per trovare medici, farmacie e specialisti nella Capitale. Informazioni verificate e contatti diretti.</p>
            </div>

            {/* Colonna 2: Categorie */}
            <div>
              <h4 style={{ color: 'white', marginBottom: '20px', fontSize: '16px' }}>Categorie</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2' }}>
                <li><a href="/farmacie-roma" style={{ color: '#94a3b8', textDecoration: 'none' }}>Farmacie</a></li>
                <li><a href="/dentisti-roma" style={{ color: '#94a3b8', textDecoration: 'none' }}>Dentisti</a></li>
                <li><a href="/cardiologi-roma" style={{ color: '#94a3b8', textDecoration: 'none' }}>Cardiologi</a></li>
                <li><a href="/diagnostica-roma" style={{ color: '#94a3b8', textDecoration: 'none' }}>Diagnostica</a></li>
              </ul>
            </div>

            {/* Colonna 3: Legale */}
            <div>
              <h4 style={{ color: 'white', marginBottom: '20px', fontSize: '16px' }}>Legale</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2' }}>
                <li><a href="/privacy-policy" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</a></li>
                <li><a href="/cookie-policy" style={{ color: '#94a3b8', textDecoration: 'none' }}>Cookie Policy</a></li>
                <li><a href="/termini-condizioni" style={{ color: '#94a3b8', textDecoration: 'none' }}>Termini e Condizioni</a></li>
              </ul>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #334155', paddingTop: '30px', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '10px' }}>
              <strong>Disclaimer Medico:</strong> Le informazioni su questo sito sono a scopo puramente informativo e non sostituiscono il parere del medico.
            </p>
            <p style={{ fontSize: '12px', color: '#64748b' }}>© 2026 ServiziSalute Roma. Tutti i diritti riservati.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
