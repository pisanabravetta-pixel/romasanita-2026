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
  { q: 'Quanto costa una visita ginecologica privata a Roma?', a: 'Il costo medio di una visita ginecologica privata a Roma è compreso tra 90 € e 160 €. La tariffa varia in base al tipo di visita (prima visita, controllo, colposcopia), all\'esperienza dello specialista e alla zona della città.' },
  { q: 'Il Pap test è incluso nella visita ginecologica privata?', a: 'In genere il Pap test (esame citologico cervicale) non è incluso nella tariffa della visita. Viene eseguito contestualmente ma addebitato separatamente: costo aggiuntivo di circa 25–45 €.' },
  { q: 'Quanto costa un\'ecografia ostetrico-ginecologica privata a Roma?', a: 'Un\'ecografia ginecologica privata a Roma costa in genere tra 80 € e 150 €. Un\'ecografia ostetrica (gravidanza) parte da 100 € e può arrivare a 200 € per la morfologica dettagliata.' },
  { q: 'Quanto si aspetta per una visita ginecologica al SSN a Roma?', a: 'I tempi di attesa per una visita ginecologica al SSN a Roma variano da 30 a 90 giorni. In ambito privato è possibile ottenere un appuntamento entro 2–5 giorni lavorativi.' },
  { q: 'È necessaria l\'impegnativa per una visita ginecologica privata?', a: 'No. Per una visita ginecologica in regime completamente privato non è necessaria alcuna impegnativa del medico di base. Puoi prenotare direttamente contattando la specialista.' },
];

function AnnuncioBox({ annuncio, colore = '#be185d' }) {
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
        <span style={{ backgroundColor: colore, color: '#fff', borderRadius: '20px', padding: '4px 12px', fontSize: '12px', fontWeight: '700', whiteSpace: 'nowrap' }}>Ginecologa</span>
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
        {tel && (
          <a href={`tel:${tel}`} onClick={() => trackChiama(annuncio.nome || annuncio.titolo, 'guida-ginecologia')}
            style={{ flex: 1, minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: colore, color: '#fff', borderRadius: '10px', padding: '10px 14px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
            📞 Chiama ora
          </a>
        )}
        {wa && (
          <a href={`https://wa.me/39${wa}?text=Salve%2C+la+contatto+per+una+visita+ginecologica+vista+su+ServiziSalute.com`}
            target="_blank" rel="noopener noreferrer"
            onClick={() => trackWhatsApp(annuncio.nome || annuncio.titolo, 'guida-ginecologia')}
            style={{ flex: 1, minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#25D366', color: '#fff', borderRadius: '10px', padding: '10px 14px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
            💬 WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}

export default function GuidaGinecologia() {
  const mese = new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
  const [annunci, setAnnunci] = useState([]);

  useEffect(() => {
    supabase
      .from('annunci')
      .select('id,nome,telefono,whatsapp,indirizzo,zona,slug')
      .eq('approvato', true)
      .ilike('categoria', '%ginecolog%')
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
    headline: `Costo Visita Ginecologica Roma: Prezzi e Tariffe Private (${mese})`,
    description: `Guida aggiornata a ${mese} ai costi delle visite ginecologiche private a Roma: tariffe medie, Pap test, ecografia, confronto per quartiere.`,
    url: 'https://www.servizisalute.com/guide/costo-visita-ginecologica-roma',
    publisher: { '@type': 'Organization', name: 'ServiziSalute', url: 'https://www.servizisalute.com' },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>Visita Ginecologica Roma: Costi €90–€160 | Guida {mese}</title>
        <meta name="description" content={`Quanto costa una visita ginecologica privata a Roma? Prezzi ${mese}: da 90 € a 160 €. Pap test, ecografia, colposcopia. Tempi di attesa, dove prenotare nel tuo quartiere.`} />
        <link rel="canonical" href="https://www.servizisalute.com/guide/costo-visita-ginecologica-roma" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:title" content={`Visita Ginecologica Roma: Costi €90–€160 | Guida ${mese}`} />
        <meta property="og:description" content={`Prezzi aggiornati visite ginecologiche private Roma. Pap test, ecografia, colposcopia. Trova la tua specialista.`} />
        <meta property="og:url" content="https://www.servizisalute.com/guide/costo-visita-ginecologica-roma" />
        <meta property="og:image" content="https://www.servizisalute.com/images/costo-visita-ginecologica-roma.png" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <Navbar />

      {/* IMMAGINE PRINCIPALE */}
      <div style={{ width: '100%', maxWidth: '1100px', margin: '20px auto', padding: '0 20px' }}>
        <div style={{ width: '100%', height: '400px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <img
            src="/images/costo-visita-ginecologica-roma.webp"
            alt="Visita ginecologica a Roma - ambulatorio specialistico"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            onError={(e) => { e.target.src = '/images/guida-roma-salute.webp'; }}
          />
        </div>
      </div>

      <main style={{ flex: '1 0 auto', maxWidth: '850px', margin: '0 auto', padding: '0 20px', width: '100%', marginBottom: '80px' }}>

        {/* BREADCRUMB */}
        <nav aria-label="breadcrumb" style={{ marginBottom: '20px', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
          <a href="/" style={{ color: '#be185d', textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <a href="/guide" style={{ color: '#be185d', textDecoration: 'none' }}>Guide</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <span style={{ color: '#9d174d' }}>Costo Visita Ginecologica Roma</span>
        </nav>

        <article itemScope itemType="https://schema.org/Article">
          <h1 itemProp="headline" style={{ color: '#9d174d', fontSize: '36px', fontWeight: '900', lineHeight: '1.2', marginBottom: '10px' }}>
            Visita Ginecologica a Roma: Costi, Prezzi e Dove Prenotare ({mese})
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
            Aggiornato: {mese} · Lettura: 4 min
          </p>

          {/* BOX RIASSUNTO */}
          <div style={{ backgroundColor: '#fdf2f8', padding: '25px', borderRadius: '20px', borderLeft: '6px solid #be185d', marginBottom: '35px' }}>
            <p style={{ margin: 0, color: '#9d174d', fontSize: '18px', lineHeight: '1.7' }}>
              💡 <strong>In breve:</strong> Una visita ginecologica privata a Roma costa mediamente tra <strong>90 € e 160 €</strong>. Con Pap test si aggiungono 25–45 €. Tempi privati: 2–5 giorni vs 30–90 giorni al SSN.
            </p>
          </div>

          {/* TABELLA PREZZI */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#9d174d', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Tariffe aggiornate a {mese}
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#9d174d', color: '#fff' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Prestazione</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center' }}>Privato Roma</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', borderRadius: '0 8px 0 0' }}>SSN (con ticket)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Visita ginecologica base', '90–140 €', '36,15 €'],
                    ['Pap test (cervice uterina)', '25–45 €', '~10 € ticket'],
                    ['Ecografia ginecologica', '80–150 €', '~25 € ticket'],
                    ['Colposcopia', '100–180 €', '–'],
                    ['Ecografia ostetrica I trim.', '100–150 €', '–'],
                    ['Ecografia morfologica', '150–220 €', '–'],
                  ].map(([prest, priv, ssn], i) => (
                    <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#f8fafc' : '#fff' }}>
                      <td style={{ padding: '10px 16px', color: '#334155', fontWeight: '600' }}>{prest}</td>
                      <td style={{ padding: '10px 16px', textAlign: 'center', color: '#be185d', fontWeight: '700' }}>{priv}</td>
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
              <h3 style={{ color: '#9d174d', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🩺 Ginecologa disponibile a Roma
              </h3>
              <AnnuncioBox annuncio={annunci[0]} colore="#be185d" />
            </section>
          )}

          {/* FATTORI DI PREZZO */}
          <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px', marginBottom: '40px' }}>
            <h2 style={{ color: '#9d174d', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Cosa influenza il prezzo della visita ginecologica
            </h2>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li><strong>Prima visita vs controllo:</strong> la prima visita è più lunga; i controlli periodici costano generalmente il 20–30 % in meno.</li>
              <li><strong>Esami inclusi:</strong> il Pap test, l'ecografia transvaginale e la colposcopia sono spesso addebitati separatamente; chiedi al momento della prenotazione.</li>
              <li><strong>Gravidanza:</strong> le ecografie ostetriche (morfologica, biometria, translucenza nucale) hanno tariffe specifiche più elevate rispetto a una visita standard.</li>
              <li><strong>Zona di Roma:</strong> gli studi in Centro, Prati e Parioli hanno listini mediamente superiori del 20–25 % rispetto a EUR, Tiburtina e Ostia.</li>
              <li><strong>Esperienza e titoli:</strong> ginecologi con specializzazioni in oncologia ginecologica, medicina della riproduzione o chirurgia laparoscopica possono applicare tariffe più elevate.</li>
            </ul>
          </section>

          {/* PUBBLICO VS PRIVATO */}
          <section style={{ backgroundColor: '#fff7ed', borderRadius: '16px', padding: '24px', marginBottom: '40px', borderLeft: '5px solid #f59e0b' }}>
            <h2 style={{ color: '#92400e', fontSize: '22px', fontWeight: '800', marginBottom: '12px' }}>
              ⚖️ Pubblico vs Privato: quando conviene il privato?
            </h2>
            <p style={{ color: '#334155', lineHeight: '1.8', margin: '0 0 12px 0' }}>
              Il SSN garantisce lo <strong>screening gratuito</strong> per il Pap test ogni 3 anni e l'HPV test ogni 5 anni per le donne di fascia d'età prevista. Per controlli di routine non urgenti, il <strong>pubblico è la scelta più economica</strong>.
            </p>
            <p style={{ color: '#334155', lineHeight: '1.8', margin: 0 }}>
              Il privato è preferibile per <strong>urgenze</strong> (dolori pelvici acuti, perdite anomale), per <strong>gravidanza</strong> (dove la tempestività delle ecografie è fondamentale) e per <strong>controlli rapidi</strong> senza mesi di attesa.
            </p>
          </section>

          {/* AD BOX 2 */}
          {annunci[1] && (
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#9d174d', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🩺 Un'altra ginecologa nella tua zona
              </h3>
              <AnnuncioBox annuncio={annunci[1]} colore="#be185d" />
            </section>
          )}

          {/* QUANDO FARE LA VISITA */}
          <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px', marginBottom: '40px' }}>
            <h2 style={{ color: '#9d174d', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Quando è necessaria una visita ginecologica?
            </h2>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li>Controllo annuale di routine (consigliato dai 18 anni in poi).</li>
              <li>Dolori pelvici, crampi mestruali intensi, ciclo irregolare o assente.</li>
              <li>Perdite vaginali anomale (colore, odore, quantità).</li>
              <li>Gravidanza: prima visita entro le 8–10 settimane, poi follow-up periodici.</li>
              <li>Pianificazione familiare e contraccezione.</li>
              <li>Controllo in menopausa o post-menopausa.</li>
              <li>Screening HPV e Pap test secondo le linee guida nazionali.</li>
            </ul>
          </section>

          {/* QUARTIERI */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#9d174d', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Ginecologhe per quartiere a Roma
            </h2>
            <p style={{ color: '#334155', marginBottom: '16px' }}>
              Seleziona il quartiere più vicino a te per vedere le ginecologhe disponibili nella tua zona:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
              {QUARTIERI.map(q => (
                <a
                  key={q.slug}
                  href={`/ginecologi-roma-${q.slug}`}
                  style={{ padding: '10px 16px', backgroundColor: '#fdf2f8', color: '#be185d', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '14px', border: '1px solid #fbcfe8' }}
                >
                  Ginecologi {q.nome}
                </a>
              ))}
            </div>
          </section>

          {/* AD BOX 3 */}
          {annunci[2] && (
            <section style={{ marginBottom: '40px' }}>
              <h3 style={{ color: '#9d174d', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🩺 Specialista ginecologica disponibile
              </h3>
              <AnnuncioBox annuncio={annunci[2]} colore="#be185d" />
            </section>
          )}

          {/* FAQ */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#9d174d', fontSize: '26px', fontWeight: '800', marginBottom: '20px' }}>
              Domande frequenti (FAQ)
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {faqItems.map((item, i) => (
                <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '18px 20px', borderLeft: '4px solid #be185d' }}>
                  <h3 style={{ color: '#9d174d', fontSize: '16px', fontWeight: '800', margin: '0 0 8px 0' }}>{item.q}</h3>
                  <p style={{ color: '#334155', lineHeight: '1.7', margin: 0, fontSize: '15px' }}>{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA BOX */}
          <div style={{ marginTop: '20px', padding: '40px', backgroundColor: '#9d174d', borderRadius: '24px', color: 'white', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>Prenota la tua visita ginecologica a Roma</h3>
            <p style={{ opacity: 0.9, marginBottom: '25px' }}>Appuntamento entro 2–5 giorni. Scegli la specialista più vicina a te.</p>
            <a href="/ginecologi-roma" style={{ display: 'inline-block', backgroundColor: 'white', color: '#9d174d', fontWeight: '800', textDecoration: 'none', padding: '14px 34px', borderRadius: '12px', fontSize: '16px' }}>
              VEDI TUTTE LE GINECOLOGHE A ROMA →
            </a>
          </div>
        </article>

        
        {/* GUIDE CORRELATE */}
        <GuideCorrelate
          slugCorrente="costo-visita-ginecologica-roma"
          slugCorrelati={["costo-visita-dermatologica-roma", "costo-ecografia-privata-roma", "analisi-sangue-private-roma", "check-up-completo-roma"]}
        />

        {/* DISCLAIMER LEGALE */}
        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '15px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#64748b', fontStyle: 'italic' }}>
          <strong>Nota informativa e disclaimer:</strong> I prezzi indicati in questa guida sono <em>medie di mercato</em> rilevate a Roma nel {mese} e hanno esclusivamente scopo informativo. Le tariffe effettive dipendono dalla singola struttura, dalla complessità del caso clinico e dagli esami aggiuntivi. ServiziSalute.com non effettua prestazioni mediche e non garantisce la disponibilità dei professionisti. Questo contenuto non costituisce parere medico, diagnosi o terapia.
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  return { props: {}, revalidate: 86400 };
}
