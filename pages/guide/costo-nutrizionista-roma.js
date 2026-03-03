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
  { q: 'Quanto costa una visita nutrizionistica privata a Roma?', a: 'Il costo medio di una visita nutrizionistica privata a Roma è compreso tra 60 € e 120 €. La prima visita è più lunga e costosa (80–120 €); i controlli successivi costano meno (40–70 €).' },
  { q: 'Qual è la differenza tra nutrizionista e dietologo?', a: 'Il nutrizionista è un professionista laureato in scienze della nutrizione (non medico). Il dietologo è un medico con specializzazione in scienza dell\'alimentazione e può prescrivere farmaci. Per la sola dieta, entrambe le figure sono valide.' },
  { q: 'Quante visite servono per un percorso nutrizionale?', a: 'In media 4–6 visite per un percorso di dimagrimento o ricomposizione corporea: una prima visita di assessment, 2–4 controlli mensili e una visita di mantenimento. I controlli periodici ogni 3–6 mesi aiutano a mantenere i risultati.' },
  { q: 'La visita nutrizionistica è detraibile fiscalmente?', a: 'Sì: le visite del dietologo (medico) sono detraibili al 19% come spesa sanitaria. Le visite del nutrizionista (non medico) sono detraibili solo se il professionista emette fattura con codice fiscale sanitario appropriato.' },
  { q: 'Il SSN offre visite nutrizionistiche gratuite?', a: 'Alcune ASL romane offrono consulenze nutrizionali tramite centri di dietetica, con impegnativa e ticket di circa 36 €, ma i tempi di attesa superano spesso i 90–120 giorni. La visita privata garantisce appuntamento in 1–2 settimane.' },
];

function AnnuncioBox({ annuncio, colore = '#16a34a' }) {
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
        <span style={{ backgroundColor: colore, color: '#fff', borderRadius: '20px', padding: '4px 12px', fontSize: '12px', fontWeight: '700', whiteSpace: 'nowrap' }}>Nutrizionista</span>
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
        {tel && (
          <a href={`tel:${tel}`} onClick={() => trackChiama(annuncio.nome, 'guida-nutrizione')}
            style={{ flex: 1, minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: colore, color: '#fff', borderRadius: '10px', padding: '10px 14px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
            📞 Chiama ora
          </a>
        )}
        {wa && (
          <a href={`https://wa.me/39${wa}?text=Salve%2C+la+contatto+per+una+visita+nutrizionistica+vista+su+ServiziSalute.com`}
            target="_blank" rel="noopener noreferrer"
            onClick={() => trackWhatsApp(annuncio.nome, 'guida-nutrizione')}
            style={{ flex: 1, minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#25D366', color: '#fff', borderRadius: '10px', padding: '10px 14px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
            💬 WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}

export default function GuidaNutrizionista() {
  const mese = new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
  const [annunci, setAnnunci] = useState([]);

  useEffect(() => {
    supabase
      .from('annunci')
      .select('id,nome,telefono,whatsapp,indirizzo,zona,slug')
      .eq('approvato', true)
      .ilike('categoria', '%nutrizi%')
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
    headline: `Costo Nutrizionista Roma: Prezzi e Tariffe (${mese})`,
    description: `Guida aggiornata a ${mese} ai costi delle visite nutrizionistiche private a Roma: prima visita, controlli e differenza tra nutrizionista e dietologo.`,
    url: 'https://www.servizisalute.com/guide/costo-nutrizionista-roma',
    publisher: { '@type': 'Organization', name: 'ServiziSalute', url: 'https://www.servizisalute.com' },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>Nutrizionista a Roma: Costi €60–€120 | Guida {mese}</title>
        <meta name="description" content={`Quanto costa un nutrizionista privato a Roma? Prezzi aggiornati a ${mese}: prima visita da 80 € a 120 €, controlli da 40 €. Differenza nutrizionista/dietologo e dove prenotare.`} />
        <link rel="canonical" href="https://www.servizisalute.com/guide/costo-nutrizionista-roma" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:title" content={`Nutrizionista a Roma: Costi €60–€120 | Guida ${mese}`} />
        <meta property="og:description" content={`Prezzi aggiornati delle visite nutrizionistiche a Roma. Prima visita, piano alimentare e controlli.`} />
        <meta property="og:url" content="https://www.servizisalute.com/guide/costo-nutrizionista-roma" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://www.servizisalute.com/images/costo-nutrizionista-roma.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <Navbar />

      <div style={{ width: '100%', maxWidth: '1100px', margin: '20px auto', padding: '0 20px' }}>
        <div style={{ width: '100%', height: '400px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <img
            src="/images/costo-nutrizionista-roma.png"
            alt="Visita nutrizionistica a Roma - analisi composizione corporea e piano alimentare"
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
          <span style={{ color: '#15803d' }}>Costo Nutrizionista Roma</span>
        </nav>

        <article itemScope itemType="https://schema.org/Article">
          <h1 itemProp="headline" style={{ color: '#14532d', fontSize: '36px', fontWeight: '900', lineHeight: '1.2', marginBottom: '10px' }}>
            Nutrizionista a Roma: Costi, Prezzi e Come Scegliere il Professionista Giusto ({mese})
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
            Aggiornato: {mese} · Lettura: 4 min
          </p>

          <div style={{ backgroundColor: '#f0fdf4', padding: '25px', borderRadius: '20px', borderLeft: '6px solid #16a34a', marginBottom: '35px' }}>
            <p style={{ margin: 0, color: '#14532d', fontSize: '18px', lineHeight: '1.7' }}>
              💡 <strong>In breve:</strong> Una prima visita nutrizionistica privata a Roma costa tra <strong>80 € e 120 €</strong>. I controlli successivi costano 40–70 €. Puoi usare il SSN con ticket e lunga attesa, o affidarti a un professionista privato con appuntamento in 1–2 settimane.
            </p>
          </div>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#14532d', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Tariffe aggiornate a {mese}
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#14532d', color: '#fff' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Prestazione</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center' }}>Privato Roma</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', borderRadius: '0 8px 0 0' }}>SSN (con ticket)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Prima visita nutrizionistica', '80–120 €', '36,15 €'],
                    ['Visita + piano alimentare personalizzato', '100–150 €', '–'],
                    ['Controllo mensile', '40–70 €', '–'],
                    ['Analisi composizione corporea (BIA)', '30–60 €', '–'],
                    ['Visita dietetica (dietologo medico)', '100–180 €', '~36 €'],
                    ['Percorso completo 3 mesi (4–6 visite)', '250–500 €', '–'],
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
              * Prezzi indicativi di mercato rilevati a Roma nel {mese}.
            </p>
          </section>

          {annunci[0] && (
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#14532d', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🥗 Nutrizionista disponibile a Roma
              </h3>
              <AnnuncioBox annuncio={annunci[0]} colore="#16a34a" />
            </section>
          )}

          <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px', marginBottom: '40px' }}>
            <h2 style={{ color: '#14532d', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Nutrizionista o Dietologo? Le differenze
            </h2>
            <p>Spesso confuse, le due figure sono distinte per legge in Italia:</p>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li><strong>Nutrizionista:</strong> laureato in scienze della nutrizione umana (L‑SNT/1 o LM‑61). Non è medico, non prescrive farmaci, ma elabora piani alimentari personalizzati.</li>
              <li><strong>Biologo nutrizionista:</strong> laureato in biologia con specializzazione in nutrizione. Può effettuare analisi metaboliche più approfondite.</li>
              <li><strong>Dietologo:</strong> medico specializzato in scienza dell'alimentazione. Può prescrivere farmaci e gestire patologie metaboliche complesse (diabete, celiachia, obesità grave).</li>
              <li><strong>Dietista:</strong> professionista sanitario laureato (L‑SNT/3), collabora con il medico e attua piani dietetici terapeutici.</li>
            </ul>
          </section>

          <section style={{ backgroundColor: '#fff7ed', borderRadius: '16px', padding: '24px', marginBottom: '40px', borderLeft: '5px solid #f59e0b' }}>
            <h2 style={{ color: '#92400e', fontSize: '22px', fontWeight: '800', marginBottom: '12px' }}>
              ⚖️ Quando vale la pena andare privatamente?
            </h2>
            <p style={{ color: '#334155', lineHeight: '1.8', margin: 0 }}>
              Se il tuo obiettivo è perdere peso, migliorare le performance sportive o gestire intolleranze alimentari senza patologie gravi, un nutrizionista privato garantisce appuntamento rapido (1–2 settimane), piano personalizzato e monitoraggio frequente. Il SSN è indicato per patologie metaboliche diagnosticate (obesità grave, diabete, celiachia) dove è richiesta supervisione medica.
            </p>
          </section>

          {annunci[1] && (
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#14532d', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🥗 Nutrizionista nella tua zona
              </h3>
              <AnnuncioBox annuncio={annunci[1]} colore="#16a34a" />
            </section>
          )}

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#14532d', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Nutrizionisti per quartiere a Roma
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
              {QUARTIERI.map(q => (
                <a key={q.slug} href={`/nutrizionisti-roma-${q.slug}`}
                  style={{ padding: '10px 16px', backgroundColor: '#f0fdf4', color: '#15803d', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '14px', border: '1px solid #bbf7d0' }}>
                  Nutrizionisti {q.nome}
                </a>
              ))}
            </div>
          </section>

          {annunci[2] && (
            <section style={{ marginBottom: '40px' }}>
              <h3 style={{ color: '#14532d', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🥗 Specialista in nutrizione disponibile
              </h3>
              <AnnuncioBox annuncio={annunci[2]} colore="#16a34a" />
            </section>
          )}

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#14532d', fontSize: '26px', fontWeight: '800', marginBottom: '20px' }}>
              Domande frequenti (FAQ)
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {faqItems.map((item, i) => (
                <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '18px 20px', borderLeft: '4px solid #16a34a' }}>
                  <h3 style={{ color: '#14532d', fontSize: '16px', fontWeight: '800', margin: '0 0 8px 0' }}>{item.q}</h3>
                  <p style={{ color: '#334155', lineHeight: '1.7', margin: 0, fontSize: '15px' }}>{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <div style={{ marginTop: '20px', padding: '40px', backgroundColor: '#14532d', borderRadius: '24px', color: 'white', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>Prenota il tuo nutrizionista a Roma</h3>
            <p style={{ opacity: 0.9, marginBottom: '25px' }}>Appuntamento in 1–2 settimane. Scegli il professionista nella tua zona.</p>
            <a href="/nutrizionisti-roma" style={{ display: 'inline-block', backgroundColor: 'white', color: '#14532d', fontWeight: '800', textDecoration: 'none', padding: '14px 34px', borderRadius: '12px', fontSize: '16px' }}>
              VEDI TUTTI I NUTRIZIONISTI A ROMA →
            </a>
          </div>
        </article>

        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '15px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#64748b', fontStyle: 'italic' }}>
          <strong>Nota informativa e disclaimer:</strong> I prezzi indicati in questa guida sono <em>medie di mercato</em> rilevate a Roma nel {mese} e hanno esclusivamente scopo informativo. ServiziSalute.com non effettua prestazioni sanitarie e non garantisce la disponibilità dei professionisti. Questo contenuto non costituisce parere medico, diagnosi o terapia.
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  return { props: {}, revalidate: 86400 };
}
