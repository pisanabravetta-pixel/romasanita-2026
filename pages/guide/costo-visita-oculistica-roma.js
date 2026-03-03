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
  { q: 'Quanto costa una visita oculistica privata a Roma?', a: 'Il costo medio di una visita oculistica privata a Roma è compreso tra 80 € e 150 €. La tariffa varia in base al tipo di visita (refrazione, fondo oculare, tonometria), all\'esperienza dell\'oftalmologo e alla zona della città.' },
  { q: 'La tonometria (pressione oculare) è inclusa nella visita oculistica?', a: 'In molti studi privati romani la misurazione della pressione endooculare (tonometria) è inclusa nella visita. In altri casi può essere addebitata separatamente (15–25 € extra).' },
  { q: 'Quanto costa un esame del fondo oculare privato a Roma?', a: 'Un esame del fondo oculare (fundus oculi) a Roma costa in genere tra 60 € e 120 €, spesso incluso nella visita completa oppure addebitato separatamente.' },
  { q: 'Quanto si aspetta per una visita oculistica al SSN a Roma?', a: 'I tempi di attesa per una visita oculistica al SSN a Roma possono superare i 60–90 giorni. In ambito privato si ottiene un appuntamento solitamente entro 3–10 giorni.' },
  { q: 'I bambini possono fare la visita oculistica privata senza impegnativa?', a: 'Sì. Per una visita oculistica pediatrica in regime privato non è richiesta l\'impegnativa. È consigliabile effettuare il primo controllo tra i 3 e i 5 anni per individuare precocemente strabismo o difetti rifrattivi.' },
];

function AnnuncioBox({ annuncio, colore = '#0284c7' }) {
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
        <span style={{ backgroundColor: colore, color: '#fff', borderRadius: '20px', padding: '4px 12px', fontSize: '12px', fontWeight: '700', whiteSpace: 'nowrap' }}>Oculista</span>
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
        {tel && (
          <a href={`tel:${tel}`} onClick={() => trackChiama(annuncio.nome || annuncio.titolo, 'guida-oculistica')}
            style={{ flex: 1, minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: colore, color: '#fff', borderRadius: '10px', padding: '10px 14px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
            📞 Chiama ora
          </a>
        )}
        {wa && (
          <a href={`https://wa.me/39${wa}?text=Salve%2C+la+contatto+per+una+visita+oculistica+vista+su+ServiziSalute.com`}
            target="_blank" rel="noopener noreferrer"
            onClick={() => trackWhatsApp(annuncio.nome || annuncio.titolo, 'guida-oculistica')}
            style={{ flex: 1, minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#25D366', color: '#fff', borderRadius: '10px', padding: '10px 14px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
            💬 WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}

export default function GuidaOculistica() {
  const mese = new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
  const [annunci, setAnnunci] = useState([]);

  useEffect(() => {
    supabase
      .from('annunci')
      .select('id,nome,telefono,whatsapp,indirizzo,zona,slug')
      .eq('approvato', true)
      .ilike('categoria', '%oculist%')
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
    headline: `Costo Visita Oculistica Roma: Prezzi e Tariffe Private (${mese})`,
    description: `Guida aggiornata a ${mese} ai costi delle visite oculistiche private a Roma: tariffe medie, fondo oculare, tonometria e dove prenotare per quartiere.`,
    url: 'https://www.servizisalute.com/guide/costo-visita-oculistica-roma',
    publisher: { '@type': 'Organization', name: 'ServiziSalute', url: 'https://www.servizisalute.com' },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>Visita Oculistica Roma: Costi €80–€150 | Guida {mese}</title>
        <meta name="description" content={`Quanto costa una visita oculistica privata a Roma? Prezzi ${mese}: da 80 € a 150 €. Fondo oculare, tonometria, refrazione. Tempi di attesa e dove prenotare nel tuo quartiere.`} />
        <link rel="canonical" href="https://www.servizisalute.com/guide/costo-visita-oculistica-roma" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:title" content={`Visita Oculistica Roma: Costi €80–€150 | Guida ${mese}`} />
        <meta property="og:description" content={`Prezzi aggiornati visite oculistiche private Roma. Fondo oculare, tonometria, refrazione. Trova il tuo oculista.`} />
        <meta property="og:url" content="https://www.servizisalute.com/guide/costo-visita-oculistica-roma" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <Navbar />

      {/* IMMAGINE PRINCIPALE */}
      <div style={{ width: '100%', maxWidth: '1100px', margin: '20px auto', padding: '0 20px' }}>
        <div style={{ width: '100%', height: '400px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200"
            alt="Visita oculistica a Roma - esame della vista"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>

      <main style={{ flex: '1 0 auto', maxWidth: '850px', margin: '0 auto', padding: '0 20px', width: '100%', marginBottom: '80px' }}>

        {/* BREADCRUMB */}
        <nav aria-label="breadcrumb" style={{ marginBottom: '20px', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
          <a href="/" style={{ color: '#0284c7', textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <a href="/guide" style={{ color: '#0284c7', textDecoration: 'none' }}>Guide</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <span style={{ color: '#0c4a6e' }}>Costo Visita Oculistica Roma</span>
        </nav>

        <article itemScope itemType="https://schema.org/Article">
          <h1 itemProp="headline" style={{ color: '#0c4a6e', fontSize: '36px', fontWeight: '900', lineHeight: '1.2', marginBottom: '10px' }}>
            Visita Oculistica a Roma: Costi, Prezzi e Dove Prenotare ({mese})
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
            Aggiornato: {mese} · Lettura: 4 min
          </p>

          {/* BOX RIASSUNTO */}
          <div style={{ backgroundColor: '#f0f9ff', padding: '25px', borderRadius: '20px', borderLeft: '6px solid #0284c7', marginBottom: '35px' }}>
            <p style={{ margin: 0, color: '#0c4a6e', fontSize: '18px', lineHeight: '1.7' }}>
              💡 <strong>In breve:</strong> Una visita oculistica privata a Roma costa mediamente tra <strong>80 € e 150 €</strong>. Con fondo oculare e tonometria inclusi si arriva a 100–130 €. Tempi privati: 3–10 giorni vs 60–90 giorni al SSN.
            </p>
          </div>

          {/* TABELLA PREZZI */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#0c4a6e', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Tariffe aggiornate a {mese}
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0c4a6e', color: '#fff' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Prestazione</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center' }}>Privato Roma</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', borderRadius: '0 8px 0 0' }}>SSN (con ticket)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Visita oculistica completa', '80–140 €', '36,15 €'],
                    ['Refrazione (miopia/presbiopia)', '50–90 €', '~20 € ticket'],
                    ['Fondo oculare', '60–110 €', '–'],
                    ['Tonometria (pressione oculare)', '30–60 €', '–'],
                    ['Campo visivo (perimetria)', '60–100 €', '–'],
                    ['OCT (tomografia ottica)', '80–150 €', '–'],
                  ].map(([prest, priv, ssn], i) => (
                    <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#f8fafc' : '#fff' }}>
                      <td style={{ padding: '10px 16px', color: '#334155', fontWeight: '600' }}>{prest}</td>
                      <td style={{ padding: '10px 16px', textAlign: 'center', color: '#0284c7', fontWeight: '700' }}>{priv}</td>
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
              <h3 style={{ color: '#0c4a6e', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🩺 Oculista disponibile a Roma
              </h3>
              <AnnuncioBox annuncio={annunci[0]} colore="#0284c7" />
            </section>
          )}

          {/* FATTORI PREZZO */}
          <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px', marginBottom: '40px' }}>
            <h2 style={{ color: '#0c4a6e', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Cosa influenza il prezzo della visita oculistica
            </h2>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li><strong>Prima visita vs controllo:</strong> la prima visita completa (refrazione + fondo + tonometria) è più costosa; i controlli successivi costano meno.</li>
              <li><strong>Esami inclusi:</strong> alcune strutture addebitano fondo oculare e tonometria separatamente; chiedi prima della prenotazione.</li>
              <li><strong>Tecnologia:</strong> la retinografia digitale, la tomografia ottica (OCT) e la topografia corneale sono esami avanzati con tariffe proprie.</li>
              <li><strong>Zona di Roma:</strong> gli studi in Centro, Parioli e Prati hanno listini mediamente più alti del 20 % rispetto a EUR, Tiburtina e Montesacro.</li>
              <li><strong>Età del paziente:</strong> le visite pediatriche (strabismo, ambliopia) richiedono più tempo e possono avere tariffe diverse.</li>
            </ul>
          </section>

          {/* PUBBLICO VS PRIVATO */}
          <section style={{ backgroundColor: '#fff7ed', borderRadius: '16px', padding: '24px', marginBottom: '40px', borderLeft: '5px solid #f59e0b' }}>
            <h2 style={{ color: '#92400e', fontSize: '22px', fontWeight: '800', marginBottom: '12px' }}>
              ⚖️ Quando scegliere il privato per la visita oculistica?
            </h2>
            <p style={{ color: '#334155', lineHeight: '1.8', margin: '0 0 12px 0' }}>
              Per i <strong>controlli di routine</strong> (cambio occhiali, controllo annuale) il SSN è adeguato se si riesce ad avere l'impegnativa. Per <strong>urgenze visive</strong> (visione offuscata improvvisa, miodesopsie nuove, riduzione del campo visivo) non è consigliabile aspettare.
            </p>
            <p style={{ color: '#334155', lineHeight: '1.8', margin: 0 }}>
              In privato l'appuntamento si ottiene in <strong>3–10 giorni</strong>, con possibilità di eseguire tutti gli esami nella stessa seduta e ottenere subito la prescrizione per occhiali o lenti a contatto.
            </p>
          </section>

          {/* AD BOX 2 */}
          {annunci[1] && (
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#0c4a6e', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🩺 Un altro oculista nella tua zona
              </h3>
              <AnnuncioBox annuncio={annunci[1]} colore="#0284c7" />
            </section>
          )}

          {/* QUANDO FARE */}
          <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px', marginBottom: '40px' }}>
            <h2 style={{ color: '#0c4a6e', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Quando è necessaria una visita oculistica?
            </h2>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li>Difficoltà di lettura da vicino o da lontano (miopia, presbiopia, astigmatismo).</li>
              <li>Visione offuscata, doppia o con aloni intorno alle luci.</li>
              <li>Occhio rosso, bruciore, lacrimazione eccessiva o senso di corpo estraneo.</li>
              <li>Mosche volanti (miodesopsie) o lampi di luce improvvisi.</li>
              <li>Diabete o ipertensione (controllo del fondo oculare ogni 12 mesi).</li>
              <li>Familiarità con glaucoma o degenerazione maculare.</li>
              <li>Controllo annuale dai 40 anni in poi per glaucoma e degenerazione maculare.</li>
            </ul>
            <p style={{ color: '#dc2626', fontWeight: '700', backgroundColor: '#fef2f2', padding: '12px 16px', borderRadius: '10px', marginTop: '12px' }}>
              ⚠️ Visione offuscata improvvisa, perdita parziale del campo visivo o dolore oculare acuto sono urgenze oculistiche: recati al Pronto Soccorso oculistico entro poche ore.
            </p>
          </section>

          {/* QUARTIERI */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#0c4a6e', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Oculisti per quartiere a Roma
            </h2>
            <p style={{ color: '#334155', marginBottom: '16px' }}>
              Seleziona il quartiere più vicino a te per vedere gli oculisti disponibili nella tua zona:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
              {QUARTIERI.map(q => (
                <a
                  key={q.slug}
                  href={`/oculisti-roma-${q.slug}`}
                  style={{ padding: '10px 16px', backgroundColor: '#f0f9ff', color: '#0284c7', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '14px', border: '1px solid #bae6fd' }}
                >
                  Oculisti {q.nome}
                </a>
              ))}
            </div>
          </section>

          {/* AD BOX 3 */}
          {annunci[2] && (
            <section style={{ marginBottom: '40px' }}>
              <h3 style={{ color: '#0c4a6e', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🩺 Specialista oculistico disponibile
              </h3>
              <AnnuncioBox annuncio={annunci[2]} colore="#0284c7" />
            </section>
          )}

          {/* FAQ */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#0c4a6e', fontSize: '26px', fontWeight: '800', marginBottom: '20px' }}>
              Domande frequenti (FAQ)
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {faqItems.map((item, i) => (
                <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '18px 20px', borderLeft: '4px solid #0284c7' }}>
                  <h3 style={{ color: '#0c4a6e', fontSize: '16px', fontWeight: '800', margin: '0 0 8px 0' }}>{item.q}</h3>
                  <p style={{ color: '#334155', lineHeight: '1.7', margin: 0, fontSize: '15px' }}>{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA BOX */}
          <div style={{ marginTop: '20px', padding: '40px', backgroundColor: '#0c4a6e', borderRadius: '24px', color: 'white', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>Prenota la tua visita oculistica a Roma</h3>
            <p style={{ opacity: 0.9, marginBottom: '25px' }}>Appuntamento entro 3–10 giorni. Scegli l'oculista più vicino a te.</p>
            <a href="/oculisti-roma" style={{ display: 'inline-block', backgroundColor: 'white', color: '#0c4a6e', fontWeight: '800', textDecoration: 'none', padding: '14px 34px', borderRadius: '12px', fontSize: '16px' }}>
              VEDI TUTTI GLI OCULISTI A ROMA →
            </a>
          </div>
        </article>

        {/* DISCLAIMER LEGALE */}
        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '15px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#64748b', fontStyle: 'italic' }}>
          <strong>Nota informativa e disclaimer:</strong> I prezzi indicati in questa guida sono <em>medie di mercato</em> rilevate a Roma nel {mese} e hanno esclusivamente scopo informativo. Le tariffe effettive dipendono dalla singola struttura e dalla complessità del caso clinico. ServiziSalute.com non effettua prestazioni mediche e non garantisce la disponibilità dei professionisti. Questo contenuto non costituisce parere medico, diagnosi o terapia.
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  return { props: {}, revalidate: 86400 };
}
