/**
 * BoxAnnunciGuida.js
 * Box annunci dinamici da Supabase per le pagine Guide.
 * Mostra 3 annunci reali della categoria richiesta con bottoni Chiama + WhatsApp.
 * Tracciamento GA4 incluso via lib/analytics.js
 */
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { buildCategoriaOr, getDBQuery } from '../lib/seo-logic';
import { trackChiama, trackWhatsApp } from '../lib/analytics';

export default function BoxAnnunciGuida({ categoria, colore = '#0891b2', titolo }) {
  const [annunci, setAnnunci] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnnunci() {
      try {
        const q = getDBQuery(categoria);
        const orStr = buildCategoriaOr(q.termini);
        if (!orStr) { setLoading(false); return; }
        const { data } = await supabase
          .from('annunci')
          .select('id, nome, indirizzo, zona, telefono, whatsapp, slug, is_top')
          .eq('approvato', true)
          .or(orStr)
          .order('is_top', { ascending: false })
          .limit(3);
        setAnnunci(data || []);
      } catch (e) {
        console.error('BoxAnnunciGuida:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchAnnunci();
  }, [categoria]);

  if (loading) return null;
  if (!annunci.length) return null;

  const waLink = (a) => {
    const num = a.whatsapp
      ? String(a.whatsapp).replace(/\D/g, '').replace(/^0039/, '').replace(/^39/, '')
      : '';
    return num
      ? `https://wa.me/39${num}?text=${encodeURIComponent('Salve, la contatto tramite ServiziSalute.com')}`
      : null;
  };

  return (
    <div style={{ margin: '40px 0', padding: '24px', backgroundColor: '#f8fafc', borderRadius: '20px', border: `2px solid ${colore}30` }}>

      {/* Intestazione box */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <span style={{ fontSize: '22px' }}>🩺</span>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: '#0f172a' }}>
          {titolo || `Professionisti disponibili a Roma`}
        </h3>
      </div>

      {/* Lista annunci */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {annunci.map((a) => (
          <div
            key={a.id}
            style={{
              backgroundColor: '#fff',
              borderRadius: '14px',
              padding: '16px 18px',
              border: `1.5px solid ${colore}40`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}
          >
            {/* Info annuncio */}
            <div style={{ flex: '1', minWidth: '180px' }}>
              <div style={{ fontWeight: '800', fontSize: '15px', color: '#1a2b4a', marginBottom: '3px' }}>
                {a.slug
                  ? <a href={`/scheda/${a.slug}`} style={{ color: '#1a2b4a', textDecoration: 'none' }}>{a.nome}</a>
                  : a.nome}
              </div>
              <div style={{ fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span>📍</span>
                <span>{a.indirizzo ? `${a.indirizzo}, ` : ''}{a.zona || 'Roma'}</span>
              </div>
            </div>

            {/* Bottoni CTA */}
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              {a.telefono && (
                <a
                  href={`tel:${a.telefono}`}
                  onClick={() => trackChiama(a.nome, categoria, a.zona)}
                  style={{
                    padding: '9px 16px', backgroundColor: '#2563eb', color: '#fff',
                    borderRadius: '9px', fontWeight: '800', fontSize: '13px',
                    textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  📞 Chiama
                </a>
              )}
              {waLink(a) && (
                <a
                  href={waLink(a)}
                  target="_blank" rel="noopener noreferrer"
                  onClick={() => trackWhatsApp(a.nome, categoria, a.zona)}
                  style={{
                    padding: '9px 16px', backgroundColor: '#25d366', color: '#fff',
                    borderRadius: '9px', fontWeight: '800', fontSize: '13px',
                    textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  💬 WhatsApp
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Link alla hub categoria */}
      <div style={{ marginTop: '18px', textAlign: 'center' }}>
        <a
          href={`/${categoria}-roma`}
          style={{
            color: colore, fontWeight: '800', fontSize: '14px',
            textDecoration: 'none', borderBottom: `2px solid ${colore}`,
          }}
        >
          → Vedi tutti i professionisti a Roma
        </a>
      </div>

      {/* Disclaimer mini */}
      <p style={{ margin: '14px 0 0 0', fontSize: '11px', color: '#94a3b8', fontStyle: 'italic', textAlign: 'center' }}>
        Dati estratti da fonti pubbliche — aggiornati a {new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })}.
        I prezzi sono indicativi. Contatta direttamente la struttura per conferma.
      </p>
    </div>
  );
}
