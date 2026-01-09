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
  
  // STATO PER IL COLORE E SCHEMI
  const [temaColore, setTemaColore] = useState({ primario: '#1e40af', chiaro: '#dbeafe' });
  const [schemas, setSchemas] = useState(null);

  useEffect(() => {
    if (!slug) return;

    async function fetchDati() {
      try {
        setLoading(true);
        const parti = slug.split('-'); 
        const categoriaCercata = parti.length > 1 ? parti[0] : 'servizi'; 
        const zonaCercata = parti[parti.length - 1];

        // RECUPERA SCHEMI E FAQ DINAMICHE
        const dataSchemas = getSchemas(categoriaCercata.includes('farmac') ? 'farmacie' : 'dentisti', zonaCercata);
        setSchemas(dataSchemas);

        // LOGICA COLORE (Identifica se è farmacia o dentista dallo slug o dai dati)
        if (slug.includes('farmac') || categoriaCercata.includes('farmac')) {
          setTemaColore({ primario: '#059669', chiaro: '#ecfdf5' });
        } else {
          setTemaColore({ primario: '#2563eb', chiaro: '#eff6ff' });
        }

        const catBella = categoriaCercata.charAt(0).toUpperCase() + categoriaCercata.slice(1);
        const zonaBella = zonaCercata.charAt(0).toUpperCase() + zonaCercata.slice(1);
        setTitolo(`${catBella} a Roma ${zonaBella}`);

        let query = supabase.from('annunci').select('*').eq('approvato', true);

        if (categoriaCercata !== 'servizi') {
          query = query.ilike('categoria', `%${categoriaCercata}%`);
        }
        query = query.ilike('zona', `%${zonaCercata}%`);

        const { data, error } = await query.order('is_top', { ascending: false });
        if (data) setServizi(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDati();
  }, [slug]);

  if (!slug || !schemas) return null;

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh', color: '#1a202c' }}>
      <Head>
        <title>{titolo} | ServiziSalute Roma</title>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
      </Head>

      <div style={{ backgroundColor: temaColore.primario, color: 'white', padding: '10px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        🟢 {titolo.toUpperCase()}
      </div>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
        <a href="/" style={{ display: 'inline-block', marginBottom: '20px', color: temaColore.primario, textDecoration: 'none', fontWeight: '600' }}>
          ← Torna alla Home
        </a>

        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
          <h1 style={{ color: temaColore.primario, fontSize: '32px', margin: '0 0 10px 0' }}>{titolo}</h1>
          <p style={{ color: '#64748b', fontSize: '18px', margin: '0' }}>Contatti, orari e professionisti verificati nella zona di {titolo.split('Roma')[1]}.</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>Ricerca in corso...</div>
        ) : servizi.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px', backgroundColor: 'white', borderRadius: '24px' }}>
            <p>Nessun risultato trovato in questa zona.</p>
          </div>
        ) : (
          servizi.map((v) => (
            <div key={v.id} style={{ 
              backgroundColor: 'white', padding: '30px', borderRadius: '24px', marginBottom: '20px', 
              border: v.is_top ? `3px solid ${temaColore.primario}` : '1px solid #e2e8f0',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h2 style={{ margin: '0', color: temaColore.primario, fontSize: '24px', fontWeight: '800' }}>{v.nome}</h2>
              </div>
              <p style={{ color: '#4b5563', fontSize: '16px', margin: '10px 0' }}>📍 {v.indirizzo} — <strong>{v.zona}</strong></p>
              <p style={{ color: '#6b7280', fontSize: '15px', margin: '15px 0' }}>{v.descrizione || `Servizio professionale a Roma ${v.zona}.`}</p>

              <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: temaColore.primario, color: 'white', padding: '15px', borderRadius: '14px', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold' }}>Chiama</a>
                {v.whatsapp && <a href={`https://wa.me/${v.whatsapp.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '15px', borderRadius: '14px', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold' }}>WhatsApp</a>}
              </div>
            </div>
          ))
        )}

        {/* FAQ SECTION - AGGIUNTA */}
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '24px', marginTop: '40px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ color: temaColore.primario, fontSize: '24px', marginBottom: '25px' }}>Domande Frequenti</h2>
          {schemas.faq.mainEntity.map((faq, i) => (
            <div key={i} style={{ marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '15px' }}>
              <h3 style={{ fontSize: '18px', color: temaColore.primario, marginBottom: '8px' }}>{faq.name}</h3>
              <p style={{ color: '#4b5563', fontSize: '15px', lineHeight: '1.6' }}>{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        {/* FOOTER - AGGIUNTO */}
        <footer style={{ marginTop: '80px', paddingBottom: '60px' }}>
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', fontSize: '13px', color: '#6b7280', lineHeight: '1.6', border: '1px solid #e2e8f0' }}>
            <p><strong>Disclaimer:</strong> Le informazioni possono subire variazioni. Si consiglia di chiamare sempre per conferma orari e disponibilità. ServiziSalute non è responsabile per inesattezze.</p>
            <hr style={{ border: '0', borderTop: '1px solid #f3f4f6', margin: '20px 0' }} />
            <p style={{ textAlign: 'center' }}>© 2026 ServiziSalute Roma</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
