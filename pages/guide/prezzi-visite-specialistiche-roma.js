import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { createClient } from '@supabase/supabase-js';
import { trackChiama, trackWhatsApp } from '../lib/analytics';

const supabase = createClient(
  'https://mkmyadztjcnebrhuzdka.supabase.co',
  'sb_publishable_HetGXnk4p_KXZNOlCAmf3w_SW2iJ_ya'
);

const QUARTIERI = [
  { slug: 'prati', nome: 'Prati' },
  { slug: 'eur', nome: 'EUR' },
  { slug: 'parioli', nome: 'Parioli' },
  { slug: 'centro-storico', nome: 'Centro Storico' },
  { slug: 'san-giovanni', nome: 'San Giovanni' },
  { slug: 'monteverde', nome: 'Monteverde' },
  { slug: 'ostia', nome: 'Ostia' },
  { slug: 'tiburtina', nome: 'Tiburtina' },
  { slug: 'aurelio', nome: 'Aurelio' },
  { slug: 'montesacro', nome: 'Montesacro' },
];

function AnnuncioBox({ annuncio, colore = '#0891b2' }) {
  if (!annuncio) return null;
  const tel = (annuncio.telefono || '').replace(/\D/g, '');
  const wa = (annuncio.whatsapp || annuncio.telefono || '').replace(/\D/g, '');
  return (
    <div style={{ border: `2px solid ${colore}`, borderRadius: '16px', padding: '20px', backgroundColor: '#fff', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <div style={{ fontWeight: '800', fontSize: '17px', color: '#1a202c' }}>{annuncio.nome}</div>
          {annuncio.indirizzo && <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>📍 {annuncio.indirizzo}{annuncio.zona ? ` - ${annuncio.zona}` : ''}</div>}
        </div>
        <span style={{ backgroundColor: colore, color: '#fff', borderRadius: '20px', padding: '4px 12px', fontSize: '12px', fontWeight: '700', whiteSpace: 'nowrap' }}>{annuncio.categoria || 'Specialista'}</span>
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
        {tel && (
          <a href={`tel:${tel}`} onClick={() => trackChiama(annuncio.nome, 'hub-prezzi')}
            style={{ flex: 1, minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: colore, color: '#fff', borderRadius: '10px', padding: '10px 14px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
            📞 Chiama ora
          </a>
        )}
        {wa && (
          <a href={`https://wa.me/39${wa}`} target="_blank" rel="noopener noreferrer"
            onClick={() => trackWhatsApp(annuncio.nome, 'hub-prezzi')}
            style={{ flex: 1, minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#25D366', color: '#fff', borderRadius: '10px', padding: '10px 14px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
            💬 WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}

export default function PaginaHubPrezzi() {
  const mese = new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
  const [annunci, setAnnunci] = useState([]);

  useEffect(() => {
    supabase
      .from('annunci')
      .select('id,nome,telefono,whatsapp,indirizzo,zona,categoria,slug')
      .eq('approvato', true)
      .limit(3)
      .then(({ data }) => { if (data) setAnnunci(data); });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>Prezzi Visite Specialistiche Roma: Tariffe Medie {mese}</title>
        <meta name="description" content={`Guida completa ai prezzi delle visite mediche private a Roma aggiornata a ${mese}. Confronta le tariffe di cardiologi, dermatologi e altri specialisti.`} />
        <link rel="canonical" href="https://www.servizisalute.com/guide/prezzi-visite-specialistiche-roma" />
      </Head>

      <Navbar />

      {/* IMMAGINE PRINCIPALE */}
      <div style={{ width: '100%', maxWidth: '1100px', margin: '20px auto', padding: '0 20px' }}>
        <div style={{ width: '100%', height: '400px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <img
            src="/images/prezzi-medici-roma.webp" 
            alt="Centri medici e studi specialistici a Roma"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>

      <main style={{ flex: '1 0 auto', maxWidth: '850px', margin: '0 auto', padding: '0 20px', width: '100%', marginBottom: '80px' }}>
        
        <nav aria-label="breadcrumb" style={{ marginBottom: '20px', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
          <a href="/" style={{ color: '#0891b2', textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <a href="/guide" style={{ color: '#0891b2', textDecoration: 'none' }}>Guide</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <span style={{ color: '#164e63' }}>Prezzi Visite Specialistiche</span>
        </nav>

        <article itemScope itemType="https://schema.org/Article">
          <h1 itemProp="headline" style={{ color: '#164e63', fontSize: '36px', fontWeight: '900', lineHeight: '1.2', marginBottom: '10px' }}>
            Prezzi Visite Specialistiche a Roma: Guida alle Tariffe Private ({mese})
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
            Aggiornato: {mese} · Lettura: 5 min
          </p>

          <div style={{ backgroundColor: '#ecfeff', padding: '25px', borderRadius: '20px', borderLeft: '6px solid #0891b2', marginBottom: '35px' }}>
            <p style={{ margin: 0, color: '#164e63', fontSize: '18px', lineHeight: '1.7' }}>
              💡 <strong>In breve:</strong> A Roma, una visita specialistica privata costa mediamente tra <strong>70 € e 160 €</strong>. I prezzi variano in base al quartiere e all'esperienza del medico. Prenotando online è possibile confrontare le tariffe e abbattere i tempi d'attesa del SSN.
            </p>
          </div>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#164e63', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>Listino prezzi medi a Roma</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#164e63', color: '#fff' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Specialista</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center' }}>Prezzo Minimo</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', borderRadius: '0 8px 0 0' }}>Prezzo Massimo</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Cardiologo', '80 €', '160 €'],
                    ['Dermatologo', '70 €', '150 €'],
                    ['Oculista', '80 €', '140 €'],
                    ['Ginecologo', '90 €', '180 €'],
                    ['Ortopedico', '90 €', '160 €'],
                    ['Psicologo', '50 €', '100 €'],
                    ['Nutrizionista', '60 €', '120 €'],
                  ].map(([spec, min, max], i) => (
                    <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#f8fafc' : '#fff' }}>
                      <td style={{ padding: '12px 16px', color: '#334155', fontWeight: '600' }}>{spec}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', color: '#164e63', fontWeight: '700' }}>{min}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', color: '#164e63', fontWeight: '700' }}>{max}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {annunci[0] && <AnnuncioBox annuncio={annunci[0]} />}

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#164e63', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>Approfondimenti per branca</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
              {[
                { t: 'Costi Cardiologia', l: '/guide/costo-visita-cardiologica-roma' },
                { t: 'Costi Dermatologia', l: '/guide/costo-visita-dermatologica-roma' },
                { t: 'Costi Oculistica', l: '/guide/costo-visita-oculistica-roma' },
                { t: 'Costi Ginecologia', l: '/guide/costo-visita-ginecologica-roma' },
              ].map((g, i) => (
                <a key={i} href={g.l} style={{ padding: '15px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', textDecoration: 'none', color: '#0891b2', fontWeight: '700', textAlign: 'center' }}>
                  {g.t} →
                </a>
              ))}
            </div>
          </section>

          {annunci[1] && <AnnuncioBox annuncio={annunci[1]} />}

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#164e63', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>Cerca per Quartiere</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {QUARTIERI.map(q => (
                <a key={q.slug} href={`/quartieri-roma/${q.slug}`} style={{ padding: '10px 16px', backgroundColor: '#f0f9ff', color: '#0369a1', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '14px', border: '1px solid #bae6fd' }}>
                  Medici a {q.nome}
                </a>
              ))}
            </div>
          </section>

          {annunci[2] && <AnnuncioBox annuncio={annunci[2]} />}

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#164e63', fontSize: '26px', fontWeight: '800', marginBottom: '20px' }}>Domande Frequenti (FAQ)</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '18px 20px', borderLeft: '4px solid #0891b2' }}>
                <h3 style={{ color: '#164e63', fontSize: '16px', fontWeight: '800', margin: '0 0 8px 0' }}>La visita privata è detraibile?</h3>
                <p style={{ color: '#334155', lineHeight: '1.7', margin: 0, fontSize: '15px' }}>Sì, le spese mediche specialistiche sono detraibili al 19% se pagate con metodi tracciabili.</p>
              </div>
              <div style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '18px 20px', borderLeft: '4px solid #0891b2' }}>
                <h3 style={{ color: '#164e63', fontSize: '16px', fontWeight: '800', margin: '0 0 8px 0' }}>Come risparmiare sulle visite a Roma?</h3>
                <p style={{ color: '#334155', lineHeight: '1.7', margin: 0, fontSize: '15px' }}>Cercare centri diagnostici in zone meno centrali o acquistare pacchetti "prevenzione" che includono più esami.</p>
              </div>
            </div>
          </section>

          <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '15px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#64748b', fontStyle: 'italic' }}>
            <strong>Disclaimer:</strong> Prezzi medi rilevati a Roma nel {mese}. Contattare lo specialista per confermare le tariffe.
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
