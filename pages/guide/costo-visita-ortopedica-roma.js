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
  { q: 'Quanto costa una visita ortopedica privata a Roma?', a: 'Il costo medio di una visita ortopedica privata a Roma è compreso tra 80 € e 180 €. Il prezzo varia in base al quartiere, all\'esperienza dello specialista e alla complessità della visita.' },
  { q: 'La visita ortopedica privata include le radiografie?', a: 'In genere no: le radiografie vengono prescritte e pagate separatamente (20–60 €). Alcune strutture all-inclusive le includono nella tariffa: verificare prima della prenotazione.' },
  { q: 'Quanto costa una visita ortopedica al SSN (pubblico) a Roma?', a: 'Con impegnativa del medico di base, il ticket per la visita ortopedica SSN è circa 36,15 €, ma i tempi di attesa a Roma spesso superano i 60–120 giorni.' },
  { q: 'Per quali problemi si va dall\'ortopedico?', a: 'Dolori alla schiena, ginocchio, anca, spalla, caviglia; ernie del disco; fratture; tendiniti; artrosi; scoliosi; problemi ai legamenti e ai menischi.' },
  { q: 'È necessaria l\'impegnativa per una visita ortopedica privata?', a: 'No: in regime privato puoi prenotare direttamente senza ricetta del medico di base. L\'impegnativa è necessaria solo per le prestazioni SSN.' },
];

function AnnuncioBox({ annuncio, colore = '#2563eb' }) {
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
        <span style={{ backgroundColor: colore, color: '#fff', borderRadius: '20px', padding: '4px 12px', fontSize: '12px', fontWeight: '700', whiteSpace: 'nowrap' }}>Ortopedico</span>
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
        {tel && (
          <a href={`tel:${tel}`} onClick={() => trackChiama(annuncio.nome, 'guida-ortopedia')}
            style={{ flex: 1, minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: colore, color: '#fff', borderRadius: '10px', padding: '10px 14px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
            📞 Chiama ora
          </a>
        )}
        {wa && (
          <a href={`https://wa.me/39${wa}?text=Salve%2C+la+contatto+per+una+visita+ortopedica+vista+su+ServiziSalute.com`}
            target="_blank" rel="noopener noreferrer"
            onClick={() => trackWhatsApp(annuncio.nome, 'guida-ortopedia')}
            style={{ flex: 1, minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#25D366', color: '#fff', borderRadius: '10px', padding: '10px 14px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
            💬 WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}

export default function GuidaOrtopedia() {
  const mese = new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
  const [annunci, setAnnunci] = useState([]);

  useEffect(() => {
    supabase
      .from('annunci')
      .select('id,nome,telefono,whatsapp,indirizzo,zona,slug')
      .eq('approvato', true)
      .ilike('categoria', '%ortoped%')
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
    headline: `Costo Visita Ortopedica Roma: Prezzi e Tariffe Private (${mese})`,
    description: `Guida aggiornata a ${mese} ai costi delle visite ortopediche private a Roma: tariffe medie, confronto per quartiere e cosa include la visita.`,
    url: 'https://www.servizisalute.com/guide/costo-visita-ortopedica-roma',
    publisher: { '@type': 'Organization', name: 'ServiziSalute', url: 'https://www.servizisalute.com' },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>Visita Ortopedica Roma: Costi €80–€180 | Guida {mese}</title>
        <meta name="description" content={`Quanto costa una visita ortopedica privata a Roma? Prezzi aggiornati a ${mese}: da 80 € a 180 €. Confronto per quartiere, tempi di attesa SSN vs privato e dove prenotare.`} />
        <link rel="canonical" href="https://www.servizisalute.com/guide/costo-visita-ortopedica-roma" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:title" content={`Visita Ortopedica Roma: Costi €80–€180 | Guida ${mese}`} />
        <meta property="og:description" content={`Prezzi aggiornati delle visite ortopediche private a Roma. Scopri le tariffe per quartiere e prenota il tuo specialista.`} />
        <meta property="og:url" content="https://www.servizisalute.com/guide/costo-visita-ortopedica-roma" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://www.servizisalute.com/images/costo-visita-ortopedica-roma.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <Navbar />

      {/* IMMAGINE PRINCIPALE */}
      <div style={{ width: '100%', maxWidth: '1100px', margin: '20px auto', padding: '0 20px' }}>
        <div style={{ width: '100%', height: '400px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <img
            src="/images/costo-visita-ortopedica-roma.webp"
            alt="Visita ortopedica a Roma - specialista che esamina la spalla di un paziente"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            onError={(e) => { e.target.src = '/images/guida-roma-salute.webp'; }}
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
          <span style={{ color: '#1e3a8a' }}>Costo Visita Ortopedica Roma</span>
        </nav>

        <article itemScope itemType="https://schema.org/Article">
          <h1 itemProp="headline" style={{ color: '#1e3a8a', fontSize: '36px', fontWeight: '900', lineHeight: '1.2', marginBottom: '10px' }}>
            Visita Ortopedica a Roma: Costi, Prezzi e Dove Prenotare ({mese})
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
            Aggiornato: {mese} · Lettura: 4 min
          </p>

          {/* BOX RIASSUNTO */}
          <div style={{ backgroundColor: '#eff6ff', padding: '25px', borderRadius: '20px', borderLeft: '6px solid #2563eb', marginBottom: '35px' }}>
            <p style={{ margin: 0, color: '#1e3a8a', fontSize: '18px', lineHeight: '1.7' }}>
              💡 <strong>In breve:</strong> Una visita ortopedica privata a Roma costa mediamente tra <strong>80 € e 180 €</strong>. I tempi di attesa privati sono 24–72 ore, contro i 60–120 giorni del SSN.
            </p>
          </div>

          {/* TABELLA PREZZI */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#1e3a8a', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Tariffe aggiornate a {mese}
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#1e3a8a', color: '#fff' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Prestazione</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center' }}>Privato Roma</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', borderRadius: '0 8px 0 0' }}>SSN (con ticket)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Visita ortopedica base', '80–140 €', '36,15 €'],
                    ['Prima visita + referto scritto', '100–180 €', '–'],
                    ['Visita + ecografia muscolo-tendinea', '150–250 €', '–'],
                    ['Infiltrazione articolare', '80–200 €', '–'],
                    ['Controllo post-operatorio', '60–100 €', '–'],
                    ['Visita per certificato sportivo agonistico', '80–130 €', '–'],
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
              <h3 style={{ color: '#1e3a8a', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🦴 Ortopedico disponibile a Roma
              </h3>
              <AnnuncioBox annuncio={annunci[0]} colore="#2563eb" />
            </section>
          )}

          {/* FATTORI PREZZO */}
          <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px', marginBottom: '40px' }}>
            <h2 style={{ color: '#1e3a8a', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Cosa determina il prezzo di una visita ortopedica
            </h2>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li><strong>Tipo di problema:</strong> una prima visita per dolore acuto è più lunga e costosa di un controllo di follow-up.</li>
              <li><strong>Esami aggiuntivi:</strong> ecografia, radiografie e risonanza magnetica vengono in genere pagati separatamente.</li>
              <li><strong>Infiltrazioni e procedure:</strong> terapie come le infiltrazioni di acido ialuronico o di cortisone hanno tariffe specifiche.</li>
              <li><strong>Esperienza dello specialista:</strong> ortopedici universitari o con sub-specialità (spalla, ginocchio) applicano tariffe superiori.</li>
              <li><strong>Quartiere di Roma:</strong> le strutture in zone centrali (Prati, Parioli) costano mediamente il 20% in più rispetto alle periferie.</li>
            </ul>
          </section>

          {/* PUBBLICO VS PRIVATO */}
          <section style={{ backgroundColor: '#fff7ed', borderRadius: '16px', padding: '24px', marginBottom: '40px', borderLeft: '5px solid #f59e0b' }}>
            <h2 style={{ color: '#92400e', fontSize: '22px', fontWeight: '800', marginBottom: '12px' }}>
              ⚖️ Pubblico vs Privato: quando conviene andare privatamente?
            </h2>
            <p style={{ color: '#334155', lineHeight: '1.8', margin: '0 0 12px 0' }}>
              Il <strong>SSN</strong> prevede un ticket di circa 36 € per la visita ortopedica, ma <strong>i tempi di attesa a Roma superano spesso i 60–120 giorni</strong>. In caso di trauma, dolore acuto o limitazione funzionale importante, attendere così a lungo è spesso impossibile.
            </p>
            <p style={{ color: '#334155', lineHeight: '1.8', margin: 0 }}>
              In ambito <strong>privato</strong> l'appuntamento si ottiene in genere entro <strong>24–72 ore</strong>, con la possibilità di scegliere lo specialista più adatto per la propria problematica.
            </p>
          </section>

          {/* AD BOX 2 */}
          {annunci[1] && (
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#1e3a8a', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🦴 Un altro ortopedico nella tua zona
              </h3>
              <AnnuncioBox annuncio={annunci[1]} colore="#2563eb" />
            </section>
          )}

          {/* QUANDO FARE LA VISITA */}
          <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px', marginBottom: '40px' }}>
            <h2 style={{ color: '#1e3a8a', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Quando è necessaria una visita ortopedica?
            </h2>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li>Dolore persistente a schiena, ginocchio, anca, spalla o caviglia.</li>
              <li>Trauma sportivo o caduta con sospetta frattura o lesione legamentosa.</li>
              <li>Sensazione di "blocco" o instabilità articolare.</li>
              <li>Dolore notturno alle articolazioni che disturba il sonno.</li>
              <li>Scoliosi o alterazioni posturali in bambini e adolescenti.</li>
              <li>Artrosi diagnosticata: follow-up periodico ogni 6–12 mesi.</li>
            </ul>
            <p style={{ color: '#dc2626', fontWeight: '700', backgroundColor: '#fef2f2', padding: '12px 16px', borderRadius: '10px', marginTop: '12px' }}>
              ⚠️ In caso di frattura sospetta o trauma importante con gonfiore rapido, recarsi al Pronto Soccorso. La visita ortopedica privata non è un'alternativa al PS per emergenze.
            </p>
          </section>

          {/* QUARTIERI */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#1e3a8a', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Ortopedici per quartiere a Roma
            </h2>
            <p style={{ color: '#334155', marginBottom: '16px' }}>
              Seleziona il quartiere più vicino a te per vedere gli ortopedici disponibili nella tua zona:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
              {QUARTIERI.map(q => (
                <a key={q.slug} href={`/ortopedici-roma-${q.slug}`}
                  style={{ padding: '10px 16px', backgroundColor: '#eff6ff', color: '#1d4ed8', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '14px', border: '1px solid #bfdbfe' }}>
                  Ortopedici {q.nome}
                </a>
              ))}
            </div>
          </section>

          {/* AD BOX 3 */}
          {annunci[2] && (
            <section style={{ marginBottom: '40px' }}>
              <h3 style={{ color: '#1e3a8a', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🦴 Specialista ortopedico disponibile
              </h3>
              <AnnuncioBox annuncio={annunci[2]} colore="#2563eb" />
            </section>
          )}

          {/* FAQ */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#1e3a8a', fontSize: '26px', fontWeight: '800', marginBottom: '20px' }}>
              Domande frequenti (FAQ)
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {faqItems.map((item, i) => (
                <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '18px 20px', borderLeft: '4px solid #2563eb' }}>
                  <h3 style={{ color: '#1e3a8a', fontSize: '16px', fontWeight: '800', margin: '0 0 8px 0' }}>{item.q}</h3>
                  <p style={{ color: '#334155', lineHeight: '1.7', margin: 0, fontSize: '15px' }}>{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA BOX */}
          <div style={{ marginTop: '20px', padding: '40px', backgroundColor: '#1e3a8a', borderRadius: '24px', color: 'white', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>Prenota la tua visita ortopedica a Roma</h3>
            <p style={{ opacity: 0.9, marginBottom: '25px' }}>Appuntamento entro 24–72 ore. Scegli lo specialista più vicino a te.</p>
            <a href="/ortopedici-roma" style={{ display: 'inline-block', backgroundColor: 'white', color: '#1e3a8a', fontWeight: '800', textDecoration: 'none', padding: '14px 34px', borderRadius: '12px', fontSize: '16px' }}>
              VEDI TUTTI GLI ORTOPEDICI A ROMA →
            </a>
          </div>
        </article>

        
        {/* GUIDE CORRELATE */}
        <GuideCorrelate
          slugCorrente="costo-visita-ortopedica-roma"
          slugCorrelati={["costo-fisioterapia-roma", "costo-risonanza-magnetica-roma", "costo-tac-privata-roma", "check-up-completo-roma"]}
        />

        {/* DISCLAIMER LEGALE */}
        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '15px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#64748b', fontStyle: 'italic' }}>
          <strong>Nota informativa e disclaimer:</strong> I prezzi indicati in questa guida sono <em>medie di mercato</em> rilevate a Roma nel {mese} e hanno esclusivamente scopo informativo. Le tariffe effettive dipendono dalla singola struttura, dalla complessità del caso clinico e dagli esami aggiuntivi. ServiziSalute.com non effettua prestazioni mediche, non è un'agenzia di intermediazione sanitaria e non garantisce la disponibilità dei professionisti. Per urgenze traumatologiche recarsi al Pronto Soccorso. Questo contenuto non costituisce parere medico, diagnosi o terapia.
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  return { props: {}, revalidate: 86400 };
}
