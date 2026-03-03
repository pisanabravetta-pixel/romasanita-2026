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
  { q: 'Quanto costa una visita cardiologica privata a Roma?', a: 'Il costo medio di una visita cardiologica privata a Roma è compreso tra 80 € e 160 €. Il prezzo varia in base al quartiere, all\'esperienza dello specialista e agli esami inclusi (ECG, ecocardiogramma).' },
  { q: 'L\'ECG è incluso nella visita cardiologica?', a: 'In molti studi privati romani l\'elettrocardiogramma (ECG) è incluso nel costo della visita. Verifica sempre prima della prenotazione: alcune strutture addebitano il tracciato separatamente (20–40 €).' },
  { q: 'Quanto costa un ecocardiogramma privato a Roma?', a: 'Un ecocardiogramma privato a Roma costa in genere tra 120 € e 200 €, a seconda della struttura e del tipo (eco-color-doppler cardiaco, eco da sforzo).' },
  { q: 'È necessaria l\'impegnativa del medico di base per una visita cardiologica privata?', a: 'Per una visita cardiologica in regime privato non è richiesta l\'impegnativa del medico di famiglia. Puoi prenotare direttamente contattando lo specialista.' },
  { q: 'Quanto si aspetta per una visita cardiologica al SSN (pubblico) a Roma?', a: 'I tempi di attesa per una visita cardiologica tramite SSN a Roma possono superare i 60–90 giorni. In ambito privato si ottiene generalmente un appuntamento entro 24–72 ore.' },
];

function AnnuncioBox({ annuncio, colore = '#e53e3e' }) {
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
        <span style={{ backgroundColor: colore, color: '#fff', borderRadius: '20px', padding: '4px 12px', fontSize: '12px', fontWeight: '700', whiteSpace: 'nowrap' }}>Cardiologo</span>
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
        {tel && (
          <a href={`tel:${tel}`} onClick={() => trackChiama(annuncio.nome || annuncio.titolo, 'guida-cardiologia')}
            style={{ flex: 1, minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: colore, color: '#fff', borderRadius: '10px', padding: '10px 14px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
            📞 Chiama ora
          </a>
        )}
        {wa && (
          <a href={`https://wa.me/39${wa}?text=Salve%2C+la+contatto+per+una+visita+cardiologica+vista+su+ServiziSalute.com`}
            target="_blank" rel="noopener noreferrer"
            onClick={() => trackWhatsApp(annuncio.nome || annuncio.titolo, 'guida-cardiologia')}
            style={{ flex: 1, minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#25D366', color: '#fff', borderRadius: '10px', padding: '10px 14px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
            💬 WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}

export default function GuidaCardiologia() {
  const mese = new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
  const [annunci, setAnnunci] = useState([]);

  useEffect(() => {
    supabase
      .from('annunci')
      .select('id,nome,telefono,whatsapp,indirizzo,zona,slug')
      .eq('approvato', true)
      .ilike('categoria', '%cardiolog%')
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
    headline: `Costo Visita Cardiologica Roma: Prezzi e Tariffe Private (${mese})`,
    description: `Guida aggiornata a ${mese} ai costi delle visite cardiologiche private a Roma: tariffe medie, confronto per quartiere e cosa include la visita.`,
    url: 'https://www.servizisalute.com/guide/costo-visita-cardiologica-roma',
    publisher: { '@type': 'Organization', name: 'ServiziSalute', url: 'https://www.servizisalute.com' },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>Visita Cardiologica Roma: Costi €80–€160 | Guida {mese}</title>
        <meta name="description" content={`Quanto costa una visita cardiologica privata a Roma? Prezzi aggiornati a ${mese}: da 80 € a 160 €. Confronto per quartiere, ECG incluso o no, tempi di attesa e dove prenotare.`} />
        <link rel="canonical" href="https://www.servizisalute.com/guide/costo-visita-cardiologica-roma" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:title" content={`Visita Cardiologica Roma: Costi €80–€160 | Guida ${mese}`} />
        <meta property="og:description" content={`Prezzi aggiornati delle visite cardiologiche private a Roma. Scopri le tariffe per quartiere e prenota il tuo specialista.`} />
        <meta property="og:url" content="https://www.servizisalute.com/guide/costo-visita-cardiologica-roma" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <Navbar />

      {/* IMMAGINE PRINCIPALE */}
      <div style={{ width: '100%', maxWidth: '1100px', margin: '20px auto', padding: '0 20px' }}>
        <div style={{ width: '100%', height: '400px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <img
            src="/images/costo-visita-cardiologica-roma.png"
            alt="Tracciato elettrocardiografico ECG con panorama di Roma"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>

      <main style={{ flex: '1 0 auto', maxWidth: '850px', margin: '0 auto', padding: '0 20px', width: '100%', marginBottom: '80px' }}>

        {/* BREADCRUMB */}
        <nav aria-label="breadcrumb" style={{ marginBottom: '20px', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
          <a href="/" style={{ color: '#0891b2', textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <a href="/guide" style={{ color: '#0891b2', textDecoration: 'none' }}>Guide</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <span style={{ color: '#164e63' }}>Costo Visita Cardiologica Roma</span>
        </nav>

        <article itemScope itemType="https://schema.org/Article">
          <h1 itemProp="headline" style={{ color: '#164e63', fontSize: '36px', fontWeight: '900', lineHeight: '1.2', marginBottom: '10px' }}>
            Visita Cardiologica a Roma: Costi, Prezzi e Dove Prenotare ({mese})
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
            Aggiornato: {mese} · Lettura: 4 min
          </p>

          {/* BOX RIASSUNTO */}
          <div style={{ backgroundColor: '#ecfeff', padding: '25px', borderRadius: '20px', borderLeft: '6px solid #0891b2', marginBottom: '35px' }}>
            <p style={{ margin: 0, color: '#164e63', fontSize: '18px', lineHeight: '1.7' }}>
              💡 <strong>In breve:</strong> Una visita cardiologica privata a Roma costa mediamente tra <strong>80 € e 160 €</strong>. Con ECG incluso si arriva a 100–130 €. I tempi di attesa privati sono 24–72 ore, contro i 60–90 giorni del SSN.
            </p>
          </div>

          {/* TABELLA PREZZI */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#164e63', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Tariffe aggiornate a {mese}
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#164e63', color: '#fff' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Prestazione</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center' }}>Privato Roma</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', borderRadius: '0 8px 0 0' }}>SSN (con ticket)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Visita cardiologica base', '80–120 €', '36,15 €'],
                    ['Visita + ECG', '100–140 €', '–'],
                    ['Ecocardiogramma color-doppler', '120–200 €', '~50 € ticket'],
                    ['Visita cardiologica + eco', '200–300 €', '–'],
                    ['ECG da sforzo (stress test)', '150–250 €', '–'],
                    ['Holter cardiaco 24h', '100–180 €', '–'],
                  ].map(([prest, priv, ssn], i) => (
                    <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#f8fafc' : '#fff' }}>
                      <td style={{ padding: '10px 16px', color: '#334155', fontWeight: '600' }}>{prest}</td>
                      <td style={{ padding: '10px 16px', textAlign: 'center', color: '#e53e3e', fontWeight: '700' }}>{priv}</td>
                      <td style={{ padding: '10px 16px', textAlign: 'center', color: '#64748b' }}>{ssn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px', fontStyle: 'italic' }}>
              * Prezzi indicativi di mercato rilevati a Roma nel {mese}. Le tariffe variano per struttura e caso clinico.
            </p>
          </section>

          {/* AD BOX 1 */}
          {annunci[0] && (
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#164e63', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🩺 Cardiologo disponibile a Roma
              </h3>
              <AnnuncioBox annuncio={annunci[0]} colore="#e53e3e" />
            </section>
          )}

          {/* SEZIONE FATTORI PREZZO */}
          <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px', marginBottom: '40px' }}>
            <h2 style={{ color: '#164e63', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Cosa determina il prezzo di una visita cardiologica
            </h2>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li><strong>ECG incluso o separato:</strong> molte strutture private includono il tracciato (risparmio di 20–40 €); verifica prima di prenotare.</li>
              <li><strong>Tipo di visita:</strong> una prima visita è più lunga (e costosa) rispetto a un controllo di follow-up.</li>
              <li><strong>Strumentazione avanzata:</strong> ecografo di ultima generazione, Holter cardiaco, monitoraggio pressorio 24h influiscono sul listino.</li>
              <li><strong>Esperienza del cardiologo:</strong> specialisti universitari o con doppio incarico possono applicare tariffe più elevate.</li>
              <li><strong>Quartiere di Roma:</strong> i centri nelle zone centrali (Prati, Parioli, Centro Storico) hanno costi mediamente superiori del 15–25 % rispetto alle zone periferiche.</li>
            </ul>
          </section>

          {/* DIFFERENZA PUBBLICO/PRIVATO */}
          <section style={{ backgroundColor: '#fff7ed', borderRadius: '16px', padding: '24px', marginBottom: '40px', borderLeft: '5px solid #f59e0b' }}>
            <h2 style={{ color: '#92400e', fontSize: '22px', fontWeight: '800', marginBottom: '12px' }}>
              ⚖️ Pubblico vs Privato: quando conviene andare privatamente?
            </h2>
            <p style={{ color: '#334155', lineHeight: '1.8', margin: '0 0 12px 0' }}>
              Il <strong>SSN</strong> prevede un ticket di circa 36 € per la visita cardiologica, ma i <strong>tempi di attesa a Roma sono spesso superiori ai 60–90 giorni</strong>. In caso di sintomi acuti (dolore toracico, palpitazioni persistenti, mancanza di respiro) non è consigliabile aspettare.
            </p>
            <p style={{ color: '#334155', lineHeight: '1.8', margin: 0 }}>
              In ambito <strong>privato</strong> l'appuntamento si ottiene in genere entro <strong>24–72 ore</strong>, ed è possibile scegliere lo specialista e la struttura in base alla propria zona di residenza.
            </p>
          </section>

          {/* AD BOX 2 */}
          {annunci[1] && (
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#164e63', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🩺 Un altro cardiologo nella tua zona
              </h3>
              <AnnuncioBox annuncio={annunci[1]} colore="#e53e3e" />
            </section>
          )}

          {/* QUANDO FARE LA VISITA */}
          <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px', marginBottom: '40px' }}>
            <h2 style={{ color: '#164e63', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Quando è necessaria una visita cardiologica?
            </h2>
            <p>
              Una visita cardiologica è indicata in presenza di uno o più di questi segnali:
            </p>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li>Dolore o fastidio al petto, anche transitorio.</li>
              <li>Palpitazioni, battito irregolare o tachicardia.</li>
              <li>Dispnea (mancanza di fiato) a riposo o sotto sforzo.</li>
              <li>Svenimenti o presincopi.</li>
              <li>Familiarità con malattie cardiovascolari (infarto, ictus) sotto i 55 anni.</li>
              <li>Ipertensione arteriosa da monitorare o da diagnosticare.</li>
              <li>Controllo periodico dai 50 anni in poi, o prima in presenza di fattori di rischio (fumo, diabete, obesità).</li>
            </ul>
            <p style={{ color: '#dc2626', fontWeight: '700', backgroundColor: '#fef2f2', padding: '12px 16px', borderRadius: '10px', marginTop: '12px' }}>
              ⚠️ In caso di dolore acuto al petto, chiama subito il 118. La visita cardiologica privata non sostituisce il Pronto Soccorso in emergenza.
            </p>
          </section>

          {/* QUARTIERI */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#164e63', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Cardiologi per quartiere a Roma
            </h2>
            <p style={{ color: '#334155', marginBottom: '16px' }}>
              Seleziona il quartiere più vicino a te per vedere i cardiologi disponibili nella tua zona:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
              {QUARTIERI.map(q => (
                <a
                  key={q.slug}
                  href={`/cardiologi-roma-${q.slug}`}
                  style={{ padding: '10px 16px', backgroundColor: '#f0f9ff', color: '#0369a1', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '14px', border: '1px solid #bae6fd' }}
                >
                  Cardiologi {q.nome}
                </a>
              ))}
            </div>
          </section>

          {/* AD BOX 3 */}
          {annunci[2] && (
            <section style={{ marginBottom: '40px' }}>
              <h3 style={{ color: '#164e63', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🩺 Specialista cardiologico disponibile
              </h3>
              <AnnuncioBox annuncio={annunci[2]} colore="#e53e3e" />
            </section>
          )}

          {/* FAQ */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#164e63', fontSize: '26px', fontWeight: '800', marginBottom: '20px' }}>
              Domande frequenti (FAQ)
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {faqItems.map((item, i) => (
                <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '18px 20px', borderLeft: '4px solid #0891b2' }}>
                  <h3 style={{ color: '#164e63', fontSize: '16px', fontWeight: '800', margin: '0 0 8px 0' }}>{item.q}</h3>
                  <p style={{ color: '#334155', lineHeight: '1.7', margin: 0, fontSize: '15px' }}>{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA BOX */}
          <div style={{ marginTop: '20px', padding: '40px', backgroundColor: '#164e63', borderRadius: '24px', color: 'white', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>Prenota la tua visita cardiologica a Roma</h3>
            <p style={{ opacity: 0.9, marginBottom: '25px' }}>Appuntamento entro 24–72 ore. Scegli lo specialista più vicino a te.</p>
            <a href="/cardiologi-roma" style={{ display: 'inline-block', backgroundColor: 'white', color: '#164e63', fontWeight: '800', textDecoration: 'none', padding: '14px 34px', borderRadius: '12px', fontSize: '16px' }}>
              VEDI TUTTI I CARDIOLOGI A ROMA →
            </a>
          </div>
        </article>

        {/* DISCLAIMER LEGALE */}
        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '15px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#64748b', fontStyle: 'italic' }}>
          <strong>Nota informativa e disclaimer:</strong> I prezzi indicati in questa guida sono <em>medie di mercato</em> rilevate a Roma nel {mese} e hanno esclusivamente scopo informativo. Le tariffe effettive dipendono dalla singola struttura, dalla complessità del caso clinico e dagli esami aggiuntivi. ServiziSalute.com non effettua prestazioni mediche, non è un'agenzia di intermediazione sanitaria e non garantisce la disponibilità dei professionisti. Per urgenze cardiologiche chiamare il 118. Questo contenuto non costituisce parere medico, diagnosi o terapia.
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  return { props: {}, revalidate: 86400 };
}
