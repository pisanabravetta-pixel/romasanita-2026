import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { createClient } from '@supabase/supabase-js';
import { trackChiama, trackWhatsApp } from '../../lib/analytics';

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
  { q: 'Quanto costa una risonanza magnetica privata a Roma?', a: 'Il costo medio di una risonanza magnetica (RM) privata a Roma varia tra 100 € e 250 € a seconda del distretto anatomico esaminato (ginocchio, colonna, encefalo, ecc.) e della struttura. La RM con mezzo di contrasto costa di più (+40–80 €).' },
  { q: 'Quanto si aspetta per una risonanza magnetica al SSN a Roma?', a: 'I tempi di attesa per una risonanza magnetica tramite SSN a Roma possono superare i 60–120 giorni per le classi di urgenza bassa (codice D o P). In ambito privato si ottiene un appuntamento in genere entro 24–72 ore.' },
  { q: 'È necessaria l\'impegnativa del medico di base per la risonanza magnetica privata?', a: 'No. Per una risonanza magnetica in regime privato non è necessaria l\'impegnativa. Puoi prenotare direttamente il centro di diagnostica per immagini.' },
  { q: 'Qual è la differenza tra RM con e senza mezzo di contrasto?', a: 'Il mezzo di contrasto (gadolinio) viene iniettato in vena per evidenziare meglio lesioni, vasi sanguigni o infiammazioni. Non tutte le RM richiedono il contrasto: il medico prescrivente indica se necessario. Il costo aggiuntivo è di circa 40–80 €.' },
  { q: 'La risonanza magnetica è pericolosa? Emette radiazioni?', a: 'No. La risonanza magnetica utilizza campi magnetici e onde radio, non radiazioni ionizzanti (a differenza di TAC e radiografie). È considerata sicura per la maggior parte delle persone; fare attenzione in caso di protesi metalliche o pacemaker.' },
];

function AnnuncioBox({ annuncio, colore = '#0369a1' }) {
  if (!annuncio) return null;
  const tel = (annuncio.telefono || '').replace(/\D/g, '');
  const wa = (annuncio.whatsapp || annuncio.telefono || '').replace(/\D/g, '');
  return (
    <div style={{ border: `2px solid ${colore}`, borderRadius: '16px', padding: '20px', backgroundColor: '#fff', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <div style={{ fontWeight: '800', fontSize: '17px', color: '#1a202c' }}>{annuncio.nome || annuncio.titolo}</div>
          {annuncio.indirizzo && <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>📍 {annuncio.indirizzo}{annuncio.citta ? `, ${annuncio.citta}` : ''}</div>}
        </div>
        <span style={{ backgroundColor: colore, color: '#fff', borderRadius: '20px', padding: '4px 12px', fontSize: '12px', fontWeight: '700', whiteSpace: 'nowrap' }}>Centro Diagnostico</span>
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
        {tel && (
          <a href={`tel:${tel}`} onClick={() => trackChiama(annuncio.nome || annuncio.titolo, 'guida-risonanza')}
            style={{ flex: 1, minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: colore, color: '#fff', borderRadius: '10px', padding: '10px 14px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
            📞 Chiama ora
          </a>
        )}
        {wa && (
          <a href={`https://wa.me/39${wa}?text=Salve%2C+vi+contatto+per+una+risonanza+magnetica+vista+su+ServiziSalute.com`}
            target="_blank" rel="noopener noreferrer"
            onClick={() => trackWhatsApp(annuncio.nome || annuncio.titolo, 'guida-risonanza')}
            style={{ flex: 1, minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#25D366', color: '#fff', borderRadius: '10px', padding: '10px 14px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
            💬 WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}

export default function GuidaRisonanza() {
  const mese = new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
  const [annunci, setAnnunci] = useState([]);

  useEffect(() => {
    supabase
      .from('annunci')
      .select('id,nome,titolo,telefono,whatsapp,indirizzo,citta,slug')
      .eq('approvato', true)
      .or('categoria.ilike.%diagnostica%,categoria.ilike.%radiolog%,titolo.ilike.%diagnostica%,specializzazione.ilike.%diagnostica%')
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
    headline: `Costo Risonanza Magnetica Roma: Prezzi Privati (${mese})`,
    description: `Guida aggiornata a ${mese} ai costi della risonanza magnetica privata a Roma: tariffe per distretto, con e senza contrasto, confronto SSN e dove prenotare.`,
    url: 'https://www.servizisalute.com/guide/costo-risonanza-magnetica-roma',
    publisher: { '@type': 'Organization', name: 'ServiziSalute', url: 'https://www.servizisalute.com' },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>Risonanza Magnetica Roma: Costi €100–€250 | Guida {mese}</title>
        <meta name="description" content={`Quanto costa una risonanza magnetica privata a Roma? Prezzi ${mese}: da 100 € a 250 €. Ginocchio, colonna, encefalo, con/senza contrasto. Tempi 24–72h vs 60–120gg SSN.`} />
        <link rel="canonical" href="https://www.servizisalute.com/guide/costo-risonanza-magnetica-roma" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:title" content={`Risonanza Magnetica Roma: Costi €100–€250 | Guida ${mese}`} />
        <meta property="og:description" content={`Prezzi aggiornati risonanza magnetica privata Roma. Confronto SSN, tempi di attesa, dove prenotare.`} />
        <meta property="og:url" content="https://www.servizisalute.com/guide/costo-risonanza-magnetica-roma" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <Navbar />

      {/* IMMAGINE */}
      <div style={{ width: '100%', maxWidth: '1100px', margin: '20px auto', padding: '0 20px' }}>
        <div style={{ width: '100%', height: '400px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <img
            src="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1200"
            alt="Macchinario per risonanza magnetica a Roma - centro diagnostico privato"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>

      <main style={{ flex: '1 0 auto', maxWidth: '850px', margin: '0 auto', padding: '0 20px', width: '100%', marginBottom: '80px' }}>

        {/* BREADCRUMB */}
        <nav aria-label="breadcrumb" style={{ marginBottom: '20px', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
          <a href="/" style={{ color: '#0369a1', textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <a href="/guide" style={{ color: '#0369a1', textDecoration: 'none' }}>Guide</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <span style={{ color: '#0c4a6e' }}>Costo Risonanza Magnetica Roma</span>
        </nav>

        <article itemScope itemType="https://schema.org/Article">
          <h1 itemProp="headline" style={{ color: '#0c4a6e', fontSize: '36px', fontWeight: '900', lineHeight: '1.2', marginBottom: '10px' }}>
            Risonanza Magnetica a Roma: Costi, Prezzi per Distretto e Dove Prenotare ({mese})
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
            Aggiornato: {mese} · Lettura: 5 min
          </p>

          {/* BOX RIASSUNTO */}
          <div style={{ backgroundColor: '#f0f9ff', padding: '25px', borderRadius: '20px', borderLeft: '6px solid #0369a1', marginBottom: '35px' }}>
            <p style={{ margin: 0, color: '#0c4a6e', fontSize: '18px', lineHeight: '1.7' }}>
              💡 <strong>In breve:</strong> Una risonanza magnetica privata a Roma costa mediamente tra <strong>100 € e 250 €</strong>, a seconda del distretto e del centro. Disponibilità in 24–72 ore, contro i 60–120 giorni del SSN.
            </p>
          </div>

          {/* TABELLA PREZZI */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#0c4a6e', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Tariffe aggiornate a {mese} per distretto anatomico
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0c4a6e', color: '#fff' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Tipo di RM</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center' }}>Privato Roma</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', borderRadius: '0 8px 0 0' }}>SSN (ticket)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['RM Ginocchio / Caviglia / Spalla', '100–160 €', '~36–50 €'],
                    ['RM Colonna vertebrale (1 tratto)', '110–170 €', '~36–50 €'],
                    ['RM Encefalo / Cervello', '130–200 €', '~36–50 €'],
                    ['RM Addome / Pelvi', '140–210 €', '~50 €'],
                    ['RM con mezzo di contrasto (+)', '+40–80 €', '–'],
                    ['RM Cuore (cardiaca)', '200–350 €', '–'],
                  ].map(([tipo, priv, ssn], i) => (
                    <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#f8fafc' : '#fff' }}>
                      <td style={{ padding: '10px 16px', color: '#334155', fontWeight: '600' }}>{tipo}</td>
                      <td style={{ padding: '10px 16px', textAlign: 'center', color: '#0369a1', fontWeight: '700' }}>{priv}</td>
                      <td style={{ padding: '10px 16px', textAlign: 'center', color: '#64748b' }}>{ssn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px', fontStyle: 'italic' }}>
              * Prezzi indicativi di mercato rilevati a Roma nel {mese}. Le tariffe variano per centro e tipo di macchinario (Tesla).
            </p>
          </section>

          {/* AD BOX 1 */}
          {annunci[0] && (
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#0c4a6e', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🏥 Centro diagnostico disponibile a Roma
              </h3>
              <AnnuncioBox annuncio={annunci[0]} colore="#0369a1" />
            </section>
          )}

          {/* SSN VS PRIVATO */}
          <section style={{ backgroundColor: '#fff7ed', borderRadius: '16px', padding: '24px', marginBottom: '40px', borderLeft: '5px solid #f59e0b' }}>
            <h2 style={{ color: '#92400e', fontSize: '22px', fontWeight: '800', marginBottom: '12px' }}>
              ⚖️ SSN vs Privato: quando scegliere il privato?
            </h2>
            <p style={{ color: '#334155', lineHeight: '1.8', margin: '0 0 12px 0' }}>
              Con il SSN il costo è molto basso (ticket 36–50 €) ma l'attesa è spesso <strong>60–120 giorni</strong>. In molti casi questo non è compatibile con la situazione clinica: dolore persistente, sospetta lesione, preparazione a intervento chirurgico imminente.
            </p>
            <p style={{ color: '#334155', lineHeight: '1.8', margin: 0 }}>
              Il privato garantisce disponibilità in <strong>24–72 ore</strong>, referto consegnato in 24–48 ore, scelta del centro con macchinario ad alto campo (3 Tesla) e possibilità di prenotare orari flessibili.
            </p>
          </section>

          {/* AD BOX 2 */}
          {annunci[1] && (
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#0c4a6e', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🏥 Un altro centro diagnostico nella tua zona
              </h3>
              <AnnuncioBox annuncio={annunci[1]} colore="#0369a1" />
            </section>
          )}

          {/* COSA ASPETTARSI */}
          <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px', marginBottom: '40px' }}>
            <h2 style={{ color: '#0c4a6e', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Cosa aspettarsi durante una risonanza magnetica
            </h2>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li><strong>Durata:</strong> da 20 a 60 minuti a seconda del distretto e della necessità di contrasto.</li>
              <li><strong>Preparazione:</strong> per RM addominali è spesso richiesto il digiuno di 4–6 ore; per altre sedi non è necessario.</li>
              <li><strong>Claustrofobia:</strong> se soffri di claustrofobia, comunica al centro prima dell'esame. Esistono macchinari "open" (meno potenti) o protocolli con ansiolitico.</li>
              <li><strong>Metallo e dispositivi medici:</strong> pacemaker, neurostimolatori, alcune protesi metalliche e clips vascolari sono controindicazioni; informa sempre il radiologo.</li>
              <li><strong>Referto:</strong> i centri privati consegnano il referto radiologico in genere entro 24–48 ore dall'esame.</li>
            </ul>
          </section>

          {/* QUARTIERI */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#0c4a6e', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Centri diagnostici per quartiere a Roma
            </h2>
            <p style={{ color: '#334155', marginBottom: '16px' }}>
              Seleziona il quartiere più vicino a te per vedere i centri di diagnostica disponibili:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
              {QUARTIERI.map(q => (
                <a
                  key={q.slug}
                  href={`/diagnostica-roma-${q.slug}`}
                  style={{ padding: '10px 16px', backgroundColor: '#f0f9ff', color: '#0369a1', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '14px', border: '1px solid #bae6fd' }}
                >
                  Diagnostica {q.nome}
                </a>
              ))}
            </div>
          </section>

          {/* AD BOX 3 */}
          {annunci[2] && (
            <section style={{ marginBottom: '40px' }}>
              <h3 style={{ color: '#0c4a6e', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🏥 Centro diagnostico disponibile
              </h3>
              <AnnuncioBox annuncio={annunci[2]} colore="#0369a1" />
            </section>
          )}

          {/* FAQ */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#0c4a6e', fontSize: '26px', fontWeight: '800', marginBottom: '20px' }}>
              Domande frequenti (FAQ)
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {faqItems.map((item, i) => (
                <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '18px 20px', borderLeft: '4px solid #0369a1' }}>
                  <h3 style={{ color: '#0c4a6e', fontSize: '16px', fontWeight: '800', margin: '0 0 8px 0' }}>{item.q}</h3>
                  <p style={{ color: '#334155', lineHeight: '1.7', margin: 0, fontSize: '15px' }}>{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA BOX */}
          <div style={{ marginTop: '20px', padding: '40px', backgroundColor: '#0c4a6e', borderRadius: '24px', color: 'white', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>Prenota la tua risonanza magnetica a Roma</h3>
            <p style={{ opacity: 0.9, marginBottom: '25px' }}>Disponibilità in 24–72 ore. Scegli il centro diagnostico più vicino a te.</p>
            <a href="/diagnostica-roma" style={{ display: 'inline-block', backgroundColor: 'white', color: '#0c4a6e', fontWeight: '800', textDecoration: 'none', padding: '14px 34px', borderRadius: '12px', fontSize: '16px' }}>
              VEDI CENTRI DIAGNOSTICI A ROMA →
            </a>
          </div>
        </article>

        {/* DISCLAIMER LEGALE */}
        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '15px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#64748b', fontStyle: 'italic' }}>
          <strong>Nota informativa e disclaimer:</strong> I prezzi indicati in questa guida sono <em>medie di mercato</em> rilevate a Roma nel {mese} e hanno esclusivamente scopo informativo. Le tariffe effettive dipendono dalla struttura, dal campo magnetico del macchinario e dalla complessità dell'esame. ServiziSalute.com non effettua prestazioni diagnostiche e non garantisce la disponibilità dei centri. Questo contenuto non costituisce parere medico, diagnosi o terapia. Per la corretta prescrizione e interpretazione della RM consultare sempre un medico.
        </div>
      </main>

      <Footer />
    </div>
  );
}
