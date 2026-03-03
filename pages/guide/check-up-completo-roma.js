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
  { q: 'Quanto costa un check-up completo privato a Roma?', a: 'Un check-up completo privato a Roma costa tra 150 € e 400 €, a seconda degli esami inclusi. Un pacchetto base (analisi del sangue + ECG + visita internistica) costa 150–250 €; un check-up avanzato con eco addome e spirometria può arrivare a 350–500 €.' },
  { q: 'Cosa include un check-up completo?', a: 'Un check-up completo tipicamente include: emocromo + profilo biochimico (glicemia, colesterolo, trigliceridi, funzionalità renale/epatica), ECG a riposo, visita internistica, esame urine. Le versioni avanzate aggiungono ecografia addominale, spirometria, DEXA o densitometria ossea.' },
  { q: 'Con quale frequenza fare il check-up?', a: 'Sotto i 40 anni, un check-up ogni 2–3 anni è generalmente sufficiente. Tra i 40 e i 60 anni è consigliato annualmente. Dopo i 60 anni, o in presenza di fattori di rischio (ipertensione, diabete, fumo, familiarità), è indicato ogni 6–12 mesi.' },
  { q: 'Il check-up medico è detraibile fiscalmente?', a: 'Sì: le spese per visite mediche e analisi sono detraibili al 19% nella dichiarazione dei redditi, purché il professionista o la struttura emetta regolare fattura o ricevuta fiscale.' },
  { q: 'È necessaria la preparazione per il check-up?', a: 'Sì: per le analisi del sangue è necessario il digiuno di 8–12 ore. Per alcune strutture è richiesto di non fare attività fisica intensa nelle 24 ore precedenti. Portare i referti medici precedenti per il confronto con il medico internista.' },
];

function AnnuncioBox({ annuncio, colore = '#0369a1' }) {
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
        <span style={{ backgroundColor: colore, color: '#fff', borderRadius: '20px', padding: '4px 12px', fontSize: '12px', fontWeight: '700', whiteSpace: 'nowrap' }}>Check-Up</span>
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
        {tel && (
          <a href={`tel:${tel}`} onClick={() => trackChiama(annuncio.nome, 'guida-checkup')}
            style={{ flex: 1, minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: colore, color: '#fff', borderRadius: '10px', padding: '10px 14px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
            📞 Chiama ora
          </a>
        )}
        {wa && (
          <a href={`https://wa.me/39${wa}?text=Salve%2C+vi+contatto+per+un+check-up+completo+visto+su+ServiziSalute.com`}
            target="_blank" rel="noopener noreferrer"
            onClick={() => trackWhatsApp(annuncio.nome, 'guida-checkup')}
            style={{ flex: 1, minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#25D366', color: '#fff', borderRadius: '10px', padding: '10px 14px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
            💬 WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}

export default function GuidaCheckUp() {
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
    headline: `Check-Up Completo Roma: Costi e Cosa Include (${mese})`,
    description: `Guida aggiornata a ${mese} ai costi del check-up medico completo privato a Roma: cosa include, quanto si paga e con quale frequenza farlo.`,
    url: 'https://www.servizisalute.com/guide/check-up-completo-roma',
    publisher: { '@type': 'Organization', name: 'ServiziSalute', url: 'https://www.servizisalute.com' },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>Check-Up Completo Roma: Costi €150–€400 | Guida {mese}</title>
        <meta name="description" content={`Quanto costa un check-up completo a Roma? Prezzi aggiornati a ${mese}: pacchetto base da 150 €, completo fino a 400 €. Cosa include, frequenza consigliata e dove prenotare.`} />
        <link rel="canonical" href="https://www.servizisalute.com/guide/check-up-completo-roma" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:title" content={`Check-Up Completo Roma: Costi €150–€400 | Guida ${mese}`} />
        <meta property="og:description" content={`Prezzi check-up medico completo a Roma: analisi sangue, ECG, visita internistica. Scopri cosa include.`} />
        <meta property="og:url" content="https://www.servizisalute.com/guide/check-up-completo-roma" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://www.servizisalute.com/images/check-up-completo-roma.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <Navbar />

      <div style={{ width: '100%', maxWidth: '1100px', margin: '20px auto', padding: '0 20px' }}>
        <div style={{ width: '100%', height: '400px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <img
            src="/images/check-up-completo-roma.png"
            alt="Check-up medico completo a Roma - medico che esegue visita internistica"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            onError={(e) => { e.target.src = '/images/guida-roma-salute.png'; }}
          />
        </div>
      </div>

      <main style={{ flex: '1 0 auto', maxWidth: '850px', margin: '0 auto', padding: '0 20px', width: '100%', marginBottom: '80px' }}>

        <nav aria-label="breadcrumb" style={{ marginBottom: '20px', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
          <a href="/" style={{ color: '#0891b2', textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <a href="/guide" style={{ color: '#0891b2', textDecoration: 'none' }}>Guide</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <span style={{ color: '#0369a1' }}>Check-Up Completo Roma</span>
        </nav>

        <article itemScope itemType="https://schema.org/Article">
          <h1 itemProp="headline" style={{ color: '#0c4a6e', fontSize: '36px', fontWeight: '900', lineHeight: '1.2', marginBottom: '10px' }}>
            Check-Up Medico Completo a Roma: Costi, Cosa Include e Con Quale Frequenza ({mese})
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
            Aggiornato: {mese} · Lettura: 5 min
          </p>

          <div style={{ backgroundColor: '#f0f9ff', padding: '25px', borderRadius: '20px', borderLeft: '6px solid #0369a1', marginBottom: '35px' }}>
            <p style={{ margin: 0, color: '#0c4a6e', fontSize: '18px', lineHeight: '1.7' }}>
              💡 <strong>In breve:</strong> Un check-up base privato a Roma costa tra <strong>150 € e 250 €</strong>; uno completo (con eco addome + ECG + analisi) arriva a <strong>300–400 €</strong>. Consigliato annualmente dopo i 40 anni, o ogni 2–3 anni per chi è più giovane e sano.
            </p>
          </div>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#0c4a6e', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Pacchetti check-up e prezzi — {mese}
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0c4a6e', color: '#fff' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Pacchetto</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left' }}>Cosa include</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', borderRadius: '0 8px 0 0' }}>Prezzo Roma</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Check-up Base', 'Emocromo + profilo biochimico + esame urine', '80–150 €'],
                    ['Check-up Standard', 'Base + ECG a riposo + visita internistica', '150–250 €'],
                    ['Check-up Completo', 'Standard + eco addome + spirometria', '250–400 €'],
                    ['Check-up Cardiovascolare', 'ECG + ecocardiogramma + visita cardiologica', '200–350 €'],
                    ['Check-up Donna (40+)', 'Standard + mammografia + MOC + pap-test', '300–500 €'],
                    ['Check-up Uomo (50+)', 'Standard + eco prostata + PSA + visita urologica', '300–450 €'],
                  ].map(([pacco, cosa, prezzo], i) => (
                    <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#f8fafc' : '#fff' }}>
                      <td style={{ padding: '10px 16px', color: '#0c4a6e', fontWeight: '700' }}>{pacco}</td>
                      <td style={{ padding: '10px 16px', color: '#475569', fontSize: '14px' }}>{cosa}</td>
                      <td style={{ padding: '10px 16px', textAlign: 'center', color: '#e53e3e', fontWeight: '700' }}>{prezzo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px', fontStyle: 'italic' }}>
              * Prezzi indicativi di mercato rilevati a Roma nel {mese}. Le tariffe variano per struttura e composizione del pacchetto.
            </p>
          </section>

          {annunci[0] && (
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#0c4a6e', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🏥 Centro check-up disponibile a Roma
              </h3>
              <AnnuncioBox annuncio={annunci[0]} colore="#0369a1" />
            </section>
          )}

          <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px', marginBottom: '40px' }}>
            <h2 style={{ color: '#0c4a6e', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Con quale frequenza fare il check-up?
            </h2>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li><strong>Meno di 30 anni, sano:</strong> ogni 3–5 anni è sufficiente un controllo base.</li>
              <li><strong>30–40 anni:</strong> ogni 2–3 anni; aggiungere ECG se pratica sport o ha familiarità con malattie cardiovascolari.</li>
              <li><strong>40–60 anni:</strong> annualmente; check-up completo con eco addome e valutazione cardiovascolare.</li>
              <li><strong>Oltre 60 anni:</strong> ogni 6–12 mesi, con attenzione a prostata (uomini), mammografia e osteoporosi (donne), diabete e pressione arteriosa.</li>
              <li><strong>Fattori di rischio:</strong> con ipertensione, diabete, fumo o obesità, concordare la frequenza con il medico di base.</li>
            </ul>
          </section>

          <section style={{ backgroundColor: '#fff7ed', borderRadius: '16px', padding: '24px', marginBottom: '40px', borderLeft: '5px solid #f59e0b' }}>
            <h2 style={{ color: '#92400e', fontSize: '22px', fontWeight: '800', marginBottom: '12px' }}>
              ⚖️ Check-up privato vs esami SSN singoli
            </h2>
            <p style={{ color: '#334155', lineHeight: '1.8', margin: '0 0 12px 0' }}>
              Fare i singoli esami tramite <strong>SSN</strong> con diverse impegnative è più economico ma richiede più tempo e visite separate. Con <strong>un pacchetto privato</strong> tutto viene fatto in un'unica mattina, con un medico internista che integra i risultati e fornisce un referto globale. Per chi non ha tempo, il check-up privato è la soluzione più efficiente.
            </p>
          </section>

          {annunci[1] && (
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#0c4a6e', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🏥 Altro centro check-up nella tua zona
              </h3>
              <AnnuncioBox annuncio={annunci[1]} colore="#0369a1" />
            </section>
          )}

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#0c4a6e', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Centri check-up per quartiere a Roma
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
              {QUARTIERI.map(q => (
                <a key={q.slug} href={`/visite-specialistiche-roma-${q.slug}`}
                  style={{ padding: '10px 16px', backgroundColor: '#f0f9ff', color: '#0369a1', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '14px', border: '1px solid #bae6fd' }}>
                  Specialisti {q.nome}
                </a>
              ))}
            </div>
          </section>

          {annunci[2] && (
            <section style={{ marginBottom: '40px' }}>
              <h3 style={{ color: '#0c4a6e', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🏥 Centro check-up disponibile
              </h3>
              <AnnuncioBox annuncio={annunci[2]} colore="#0369a1" />
            </section>
          )}

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

          <div style={{ marginTop: '20px', padding: '40px', backgroundColor: '#0c4a6e', borderRadius: '24px', color: 'white', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>Prenota il tuo check-up medico a Roma</h3>
            <p style={{ opacity: 0.9, marginBottom: '25px' }}>Tutto in una mattina. Analisi, ECG, visita internistica e referto completo.</p>
            <a href="/visite-specialistiche-roma" style={{ display: 'inline-block', backgroundColor: 'white', color: '#0c4a6e', fontWeight: '800', textDecoration: 'none', padding: '14px 34px', borderRadius: '12px', fontSize: '16px' }}>
              VEDI TUTTI GLI SPECIALISTI A ROMA →
            </a>
          </div>
        </article>

        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '15px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#64748b', fontStyle: 'italic' }}>
          <strong>Nota informativa e disclaimer:</strong> I prezzi indicati in questa guida sono <em>medie di mercato</em> rilevate a Roma nel {mese} e hanno esclusivamente scopo informativo. ServiziSalute.com non effettua prestazioni sanitarie e non garantisce la disponibilità dei centri. I pacchetti check-up variano per struttura. Questo contenuto non costituisce parere medico, diagnosi o terapia.
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  return { props: {}, revalidate: 86400 };
}
