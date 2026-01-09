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
  
  // Colore di base (Blu) che cambierà se trova farmacie
  const [tema, setTema] = useState({ primario: '#2563eb', chiaro: '#eff6ff', label: 'SERVIZI SANITARI' });

  useEffect(() => {
    if (!slug) return;

    async function fetchDati() {
      try {
        setLoading(true);
        const zonaCercata = slug.includes('-') ? slug.split('-').pop() : slug;

        // Query al database
        const { data, error } = await supabase
          .from('annunci')
          .select('*')
          .eq('approvato', true)
          .ilike('zona', `%${zonaCercata}%`)
          .order('is_top', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          setServizi(data);
          
          // LOGICA COLORE AUTOMATICA: 
          // Se il primo risultato è una farmacia, tutta la pagina diventa VERDE
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
        console.error("Errore caricamento:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDati();
  }, [slug]);

  // Recupera schemi SEO (usiamo il tema per decidere quali FAQ mostrare)
  const schemas = getSchemas(tema.primario === '#059669' ? 'farmacie' : 'dentisti', slug || 'roma');

  if (!slug) return null;

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh', color: '#1a202c' }}>
      <Head>
        <title>{titolo} | ServiziSalute Roma</title>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.medical) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
      </Head>

      <div style={{ backgroundColor: tema.primario, color: 'white', padding: '10px 0', textAlign: 'center', fontSize: '14px', fontWeight: 'bold', letterSpacing: '1px' }}>
        🟢 {tema.label} : {slug.toUpperCase()}
      </div>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
        <a href="/" style={{ display: 'inline-block', marginBottom: '20px', color: tema.primario, textDecoration: 'none', fontWeight: '600' }}>
          ← Torna alla Home
        </a>

        {/* BOX TITOLO MODELLO ORO */}
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px', borderLeft: `8px solid ${tema.primario}` }}>
          <h1 style={{ color: tema.primario, fontSize: '32px', margin: '0 0 10px 0', fontWeight: '800' }}>{titolo}</h1>
          <p style={{ color: '#64748b', fontSize: '18px', margin: '0' }}>Informazioni verificate, indirizzi e contatti rapidi a Roma.</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px', fontSize: '18px', color: '#64748b' }}>Caricamento risultati...</div>
        ) : servizi.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', backgroundColor: 'white', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
            <p style={{ fontSize: '20px', color: '#64748b' }}>Nessun professionista trovato in questa zona.</p>
            <a href="/pubblica" style={{ color: tema.primario, fontWeight: 'bold' }}>Sei un titolare? Registrati ora.</a>
          </div>
        ) : (
          servizi.map((v) => (
            <div key={v.id} style={{ 
              backgroundColor: 'white', padding: '30px', borderRadius: '24px', marginBottom: '20px', 
              border: v.is_top ? `3px solid ${tema.primario}` : '1px solid #e2e8f0',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h2 style={{ margin: '0', color: tema.primario, fontSize: '24px', fontWeight: '800' }}>{v.nome}</h2>
                {v.urgenza_24h && <span style={{ backgroundColor: tema.chiaro, color: tema.primario, padding: '5px 10px', borderRadius: '8px', fontSize: '10px', fontWeight: 'bold', border: `1px solid ${tema.primario}` }}>APERTO H24</span>}
              </div>
              
              <p style={{ color: '#4b5563', fontSize: '17px', margin: '12px 0' }}>
                📍 {v.indirizzo} — <strong style={{ color: tema.primario }}>{v.zona}</strong>
              </p>

              <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: '1.6', margin: '15px 0' }}>
                {v.descrizione || "Servizio sanitario professionale disponibile nel comune di Roma. Contatta per prenotazioni o informazioni sulla disponibilità."}
              </p>

              <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
                <a href={`tel:${v.telefono}`} style={{ flex: 1, backgroundColor: tema.primario, color: 'white', padding: '16px', borderRadius: '16px', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold', fontSize: '16px', boxShadow: `0 4px 10px ${tema.primario}44` }}>Chiama</a>
                {v.whatsapp && (
                  <a href={`https://wa.me/${v.whatsapp.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, backgroundColor: '#22c55e', color: 'white', padding: '16px', borderRadius: '16px', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold', fontSize: '16px' }}>WhatsApp</a>
                )}
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.nome + ' ' + v.indirizzo)}`} target="_blank" rel="noopener noreferrer" style={{ flex: '0.4', backgroundColor: '#f3f4f6', color: '#4b5563', padding: '16px', borderRadius: '16px', textDecoration: 'none', textAlign: 'center', fontWeight: 'bold' }}>📍</a>
              </div>
            </div>
          ))
        )}

        {/* FAQ - STESSO STILE PAGINE PRINCIPALI */}
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '24px', marginTop: '40px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h2 style={{ color: tema.primario, fontSize: '24px', marginBottom: '25px', fontWeight: '800' }}>Domande Frequenti</h2>
          {schemas.faq.mainEntity.slice(0, 3).map((faq, i) => (
            <div key={i} style={{ marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '15px' }}>
              <h3 style={{ fontSize: '18px', color: tema.primario, marginBottom: '8px', fontWeight: '700' }}>{faq.name}</h3>
              <p style={{ color: '#4b5563', fontSize: '15px', lineHeight: '1.6' }}>{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        {/* FOOTER & DISCLAIMER */}
        <footer style={{ marginTop: '60px', paddingBottom: '60px' }}>
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '24px', fontSize: '13px', color: '#6b7280', lineHeight: '1.6', border: '1px solid #e2e8f0' }}>
            <p><strong>Disclaimer:</strong> Le informazioni su orari, turni e servizi possono subire variazioni repentine. ServiziSalute Roma invita sempre l'utente a contattare telefonicamente la struttura prima di recarsi in loco.</p>
            <hr style={{ border: '0', borderTop: '1px solid #f3f4f6', margin: '20px 0' }} />
            <p style={{ textAlign: 'center', fontWeight: 'bold' }}>© 2026 ServiziSalute - Portale Sanitario Roma</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
