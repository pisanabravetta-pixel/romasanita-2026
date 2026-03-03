import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { createClient } from '@supabase/supabase-js';
import { trackChiama, trackWhatsApp } from '../../lib/analytics';
import GuideCorrelate from '../../components/GuideCorrelate';

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

const faqItems = [
  { q: 'Quanto costa una TAC privata a Roma?', a: 'Il costo di una TAC privata a Roma varia tra 150 € e 400 €, a seconda del distretto corporeo e se è con o senza mezzo di contrasto. Una TAC cranio/seno paranasale costa 150–220 €; una TAC addome completo con contrasto 250–400 €.' },
  { q: 'Qual è la differenza tra TAC e Risonanza Magnetica?', a: 'La TAC (Tomografia Assiale Computerizzata) usa raggi X per produrre immagini in sezione trasversale. È più rapida (5–15 min), ideale per polmoni, ossa, addome e urgenze. La RM non usa radiazioni ma è più lenta (30–60 min) e superiore per tessuti molli (cervello, legamenti, dischi vertebrali).' },
  { q: 'Si può fare una TAC privata senza ricetta?', a: 'Sì: in regime privato non è necessaria l\'impegnativa del medico. Puoi prenotare autonomamente. L\'impegnativa è obbligatoria solo per le prestazioni in convenzione SSN.' },
  { q: 'La TAC è pericolosa per le radiazioni?', a: 'Una TAC comporta un\'esposizione a radiazioni ionizzanti superiore a una normale radiografia (10–100 volte). I centri privati accreditati limitano la dose al minimo necessario (principio ALARA). Se non strettamente necessaria, il medico può preferire la RM, che non usa radiazioni.' },
  { q: 'Quanto si aspetta per una TAC al SSN a Roma?', a: 'I tempi di attesa per una TAC al SSN a Roma variano da 15 a 60 giorni, a seconda della priorità assegnata. In urgenza (classe U) si esegue entro 72 ore. Privatamente l\'appuntamento si ottiene in 24–48 ore.' },
];

function AnnuncioBox({ annuncio, colore = '#6d28d9' }) {
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
        <span style={{ backgroundColor: colore, color: '#fff', borderRadius: '20px', padding: '4px 12px', fontSize: '12px', fontWeight: '700', whiteSpace: 'nowrap' }}>Diagnostica</span>
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
        {tel && (
          <a href={`tel:${tel}`} onClick={() => trackChiama(annuncio.nome, 'guida-tac')}
            style={{ flex: 1, minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: colore, color: '#fff', borderRadius: '10px', padding: '10px 14px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
            📞 Chiama ora
          </a>
        )}
        {wa && (
          <a href={`https://wa.me/39${wa}?text=Salve%2C+vi+contatto+per+una+TAC+privata+vista+su+ServiziSalute.com`}
            target="_blank" rel="noopener noreferrer"
            onClick={() => trackWhatsApp(annuncio.nome, 'guida-tac')}
            style={{ flex: 1, minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#25D366', color: '#fff', borderRadius: '10px', padding: '10px 14px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
            💬 WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}

export default function GuidaTAC() {
  const mese = new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
  const [annunci, setAnnunci] = useState([]);

  useEffect(() => {
    supabase
      .from('annunci')
      .select('id,nome,telefono,whatsapp,indirizzo,zona,slug')
      .eq('approvato', true)
      .ilike('categoria', '%diagnostic%')
      .limit(3)
      .then(({ data }) => { if (data && data.length) setAnnunci(data); });
  }, []);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Costo TAC Privata Roma: Prezzi per Distretto (${mese})`,
    description: `Guida aggiornata a ${mese} ai costi della TAC privata a Roma: cranio, addome, torace, con o senza contrasto. Confronto SSN vs privato.`,
    url: 'https://www.servizisalute.com/guide/costo-tac-privata-roma',
    publisher: { '@type': 'Organization', name: 'ServiziSalute', url: 'https://www.servizisalute.com' },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>TAC Privata Roma: Costi €150–€400 | Guida {mese}</title>
        <meta name="description" content={`Quanto costa una TAC privata a Roma? Prezzi aggiornati a ${mese}: cranio 150–200 €, addome con contrasto 250–400 €. Senza ricetta, appuntamento in 24–48 ore.`} />
        <link rel="canonical" href="https://www.servizisalute.com/guide/costo-tac-privata-roma" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:title" content={`TAC Privata Roma: Costi €150–€400 | Guida ${mese}`} />
        <meta property="og:description" content={`Prezzi TAC privata a Roma per distretto corporeo. Cranio, addome, torace, colonna. Con e senza mezzo di contrasto.`} />
        <meta property="og:url" content="https://www.servizisalute.com/guide/costo-tac-privata-roma" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://www.servizisalute.com/images/costo-tac-privata-roma.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <Navbar />

      <div style={{ width: '100%', maxWidth: '1100px', margin: '20px auto', padding: '0 20px' }}>
        <div style={{ width: '100%', height: '400px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <img
            src="/images/costo-tac-privata-roma.webp"
            alt="TAC tomografia computerizzata privata a Roma - macchinario CT scanner"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            onError={(e) => { e.target.src = '/images/guida-roma-salute.webp'; }}
          />
        </div>
      </div>

      <main style={{ flex: '1 0 auto', maxWidth: '850px', margin: '0 auto', padding: '0 20px', width: '100%', marginBottom: '80px' }}>

        <nav aria-label="breadcrumb" style={{ marginBottom: '20px', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
          <a href="/" style={{ color: '#0891b2', textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <a href="/guide" style={{ color: '#0891b2', textDecoration: 'none' }}>Guide</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <span style={{ color: '#6d28d9' }}>Costo TAC Privata Roma</span>
        </nav>

        <article itemScope itemType="https://schema.org/Article">
          <h1 itemProp="headline" style={{ color: '#3b0764', fontSize: '36px', fontWeight: '900', lineHeight: '1.2', marginBottom: '10px' }}>
            TAC Privata a Roma: Costi per Distretto, Come Prenotare e Quando Farla ({mese})
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
            Aggiornato: {mese} · Lettura: 4 min
          </p>

          <div style={{ backgroundColor: '#faf5ff', padding: '25px', borderRadius: '20px', borderLeft: '6px solid #6d28d9', marginBottom: '35px' }}>
            <p style={{ margin: 0, color: '#3b0764', fontSize: '18px', lineHeight: '1.7' }}>
              💡 <strong>In breve:</strong> Una TAC privata a Roma costa tra <strong>150 € e 400 €</strong> a seconda del distretto. Non serve la ricetta del medico. L'appuntamento si ottiene in 24–48 ore contro i 15–60 giorni del SSN.
            </p>
          </div>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#3b0764', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Prezzi TAC privata per distretto — {mese}
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#3b0764', color: '#fff' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Tipo di TAC</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center' }}>Privato Roma</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', borderRadius: '0 8px 0 0' }}>SSN (ticket)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['TAC cranio senza contrasto', '150–200 €', '36–72 €'],
                    ['TAC seni paranasali', '150–200 €', '36–72 €'],
                    ['TAC torace', '200–280 €', '36–72 €'],
                    ['TAC addome superiore', '200–280 €', '36–72 €'],
                    ['TAC addome completo', '220–320 €', '36–72 €'],
                    ['TAC addome con contrasto', '280–400 €', '36–72 €'],
                    ['TAC colonna (per segmento)', '180–250 €', '36–72 €'],
                    ['TAC total body', '400–700 €', '–'],
                  ].map(([tipo, priv, ssn], i) => (
                    <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#f8fafc' : '#fff' }}>
                      <td style={{ padding: '10px 16px', color: '#334155', fontWeight: '600' }}>{tipo}</td>
                      <td style={{ padding: '10px 16px', textAlign: 'center', color: '#e53e3e', fontWeight: '700' }}>{priv}</td>
                      <td style={{ padding: '10px 16px', textAlign: 'center', color: '#64748b' }}>{ssn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px', fontStyle: 'italic' }}>
              * Prezzi indicativi di mercato rilevati a Roma nel {mese}. Il ticket SSN richiede impegnativa del medico.
            </p>
          </section>

          {annunci[0] && (
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#3b0764', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🔬 Centro TAC disponibile a Roma
              </h3>
              <AnnuncioBox annuncio={annunci[0]} colore="#6d28d9" />
            </section>
          )}

          <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px', marginBottom: '40px' }}>
            <h2 style={{ color: '#3b0764', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              TAC o Risonanza Magnetica? Come scegliere
            </h2>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li><strong>TAC (CT scan):</strong> ideale per polmoni, ossa, addome (fegato, reni, pancreas), seni paranasali, trauma, urgenze. Più veloce (5–15 min).</li>
              <li><strong>Risonanza Magnetica (MRI):</strong> superiore per cervello, midollo spinale, legamenti, menischi, dischi vertebrali. Senza radiazioni. Più lenta (30–60 min). Non indicata per portatori di pacemaker.</li>
              <li><strong>Ecografia:</strong> prima scelta per organi addominali (fegato, cistifellea, reni), tiroide, muscoli e tendini. Non usa radiazioni ed è economica.</li>
            </ul>
          </section>

          <section style={{ backgroundColor: '#fff7ed', borderRadius: '16px', padding: '24px', marginBottom: '40px', borderLeft: '5px solid #f59e0b' }}>
            <h2 style={{ color: '#92400e', fontSize: '22px', fontWeight: '800', marginBottom: '12px' }}>
              ⚖️ Pubblico vs Privato: TAC senza ricetta
            </h2>
            <p style={{ color: '#334155', lineHeight: '1.8', margin: '0 0 12px 0' }}>
              Con il <strong>SSN</strong> il ticket è di 36–72 €, ma <strong>i tempi di attesa a Roma sono di 15–60 giorni</strong> (classe D e P). Per sospetti urgenti (nodulo polmonare, dolore addominale acuto, trauma) aspettare è spesso inaccettabile.
            </p>
            <p style={{ color: '#334155', lineHeight: '1.8', margin: 0 }}>
              In ambito <strong>privato</strong> l'appuntamento si ottiene in <strong>24–48 ore</strong>, senza impegnativa, con referto del radiologo entro 24 ore.
            </p>
          </section>

          {annunci[1] && (
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#3b0764', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🔬 Altro centro TAC nella tua zona
              </h3>
              <AnnuncioBox annuncio={annunci[1]} colore="#6d28d9" />
            </section>
          )}

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#3b0764', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Centri TAC per quartiere a Roma
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
              {QUARTIERI.map(q => (
                <a key={q.slug} href={`/diagnostica-roma-${q.slug}`}
                  style={{ padding: '10px 16px', backgroundColor: '#faf5ff', color: '#6d28d9', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '14px', border: '1px solid #e9d5ff' }}>
                  Diagnostica {q.nome}
                </a>
              ))}
            </div>
          </section>

          {annunci[2] && (
            <section style={{ marginBottom: '40px' }}>
              <h3 style={{ color: '#3b0764', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🔬 Centro TAC disponibile
              </h3>
              <AnnuncioBox annuncio={annunci[2]} colore="#6d28d9" />
            </section>
          )}

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#3b0764', fontSize: '26px', fontWeight: '800', marginBottom: '20px' }}>
              Domande frequenti (FAQ)
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {faqItems.map((item, i) => (
                <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '18px 20px', borderLeft: '4px solid #6d28d9' }}>
                  <h3 style={{ color: '#3b0764', fontSize: '16px', fontWeight: '800', margin: '0 0 8px 0' }}>{item.q}</h3>
                  <p style={{ color: '#334155', lineHeight: '1.7', margin: 0, fontSize: '15px' }}>{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <div style={{ marginTop: '20px', padding: '40px', backgroundColor: '#3b0764', borderRadius: '24px', color: 'white', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>Prenota la tua TAC privata a Roma</h3>
            <p style={{ opacity: 0.9, marginBottom: '25px' }}>Appuntamento in 24–48 ore. Senza ricetta. Referto del radiologo entro 24 ore.</p>
            <a href="/diagnostica-roma" style={{ display: 'inline-block', backgroundColor: 'white', color: '#3b0764', fontWeight: '800', textDecoration: 'none', padding: '14px 34px', borderRadius: '12px', fontSize: '16px' }}>
              VEDI TUTTI I CENTRI DIAGNOSTICI A ROMA →
            </a>
          </div>
        </article>

        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '15px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#64748b', fontStyle: 'italic' }}>
          <strong>Nota informativa e disclaimer:</strong> I prezzi indicati sono <em>medie di mercato</em> rilevate a Roma nel {mese} e hanno scopo esclusivamente informativo. La TAC comporta esposizione a radiazioni ionizzanti: va eseguita solo su indicazione medica. ServiziSalute.com non effettua prestazioni diagnostiche né mediche. Questo contenuto non costituisce parere medico, diagnosi o terapia.
        </div>

        {/* GUIDE CORRELATE */}
        <GuideCorrelate
          slugCorrente="costo-tac-privata-roma"
          slugCorrelati={["costo-risonanza-magnetica-roma", "costo-ecografia-privata-roma", "costo-visita-ortopedica-roma", "analisi-sangue-private-roma"]}
        />

              </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  return { props: {}, revalidate: 86400 };
}
