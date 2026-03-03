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
  { q: 'Quanto costano le analisi del sangue private a Roma?', a: 'Un esame emocromocitometrico completo privato a Roma costa 15–25 €. Un profilo metabolico base (emocromo + glicemia + colesterolo + trigliceridi + creatinina + uricemia) costa 40–80 €. Esami specialistici come il TSH o la ferritina costano 15–30 € l\'uno.' },
  { q: 'Si possono fare analisi del sangue senza ricetta a Roma?', a: 'Sì: in un laboratorio privato puoi prenotare e pagare autonomamente qualsiasi esame senza impegnativa. Alcune strutture offrono anche il prelievo domiciliare a domicilio con supplemento di 20–30 €.' },
  { q: 'Quanto costano le analisi al SSN?', a: 'Con impegnativa del medico di base il ticket SSN è di circa 36,15 € per ricetta, indipendentemente dal numero di esami prescritti. È il metodo più economico se hai tempo: i tempi di attesa a Roma sono in genere 3–7 giorni.' },
  { q: 'Quando è meglio fare le analisi del sangue?', a: 'Le analisi del sangue si effettuano di mattina, a digiuno da almeno 8–12 ore. È consigliato evitare sforzi fisici intensi nelle 24 ore precedenti e sospendere eventuali farmaci solo su indicazione del medico.' },
  { q: 'I risultati delle analisi private sono validi come quelli del SSN?', a: 'Sì: i laboratori privati accreditati seguono gli stessi standard di qualità del SSN (ISO 15189). I referti sono riconosciuti da tutti i medici e specialisti.' },
];

function AnnuncioBox({ annuncio, colore = '#dc2626' }) {
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
        <span style={{ backgroundColor: colore, color: '#fff', borderRadius: '20px', padding: '4px 12px', fontSize: '12px', fontWeight: '700', whiteSpace: 'nowrap' }}>Laboratorio</span>
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
        {tel && (
          <a href={`tel:${tel}`} onClick={() => trackChiama(annuncio.nome, 'guida-analisi')}
            style={{ flex: 1, minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: colore, color: '#fff', borderRadius: '10px', padding: '10px 14px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
            📞 Chiama ora
          </a>
        )}
        {wa && (
          <a href={`https://wa.me/39${wa}?text=Salve%2C+vi+contatto+per+analisi+del+sangue+viste+su+ServiziSalute.com`}
            target="_blank" rel="noopener noreferrer"
            onClick={() => trackWhatsApp(annuncio.nome, 'guida-analisi')}
            style={{ flex: 1, minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#25D366', color: '#fff', borderRadius: '10px', padding: '10px 14px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
            💬 WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}

export default function GuidaAnalisiSangue() {
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
    headline: `Analisi del Sangue Private Roma: Prezzi e Laboratori (${mese})`,
    description: `Guida aggiornata a ${mese} ai costi delle analisi del sangue private a Roma. Prezzi emocromo, profilo metabolico, esami specialistici. Senza ricetta, risultati in giornata.`,
    url: 'https://www.servizisalute.com/guide/analisi-sangue-private-roma',
    publisher: { '@type': 'Organization', name: 'ServiziSalute', url: 'https://www.servizisalute.com' },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>Analisi del Sangue Private Roma: Prezzi €15–€80 | Guida {mese}</title>
        <meta name="description" content={`Quanto costano le analisi del sangue private a Roma? Prezzi a ${mese}: emocromo da 15 €, profilo metabolico 40–80 €. Senza ricetta, risultati in giornata.`} />
        <link rel="canonical" href="https://www.servizisalute.com/guide/analisi-sangue-private-roma" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:title" content={`Analisi del Sangue Private Roma: Prezzi €15–€80 | Guida ${mese}`} />
        <meta property="og:description" content={`Prezzi analisi del sangue private a Roma, senza ricetta. Emocromo, colesterolo, glicemia, TSH e molto altro.`} />
        <meta property="og:url" content="https://www.servizisalute.com/guide/analisi-sangue-private-roma" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://www.servizisalute.com/images/analisi-sangue-private-roma.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <Navbar />

      <div style={{ width: '100%', maxWidth: '1100px', margin: '20px auto', padding: '0 20px' }}>
        <div style={{ width: '100%', height: '400px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <img
            src="/images/analisi-sangue-private-roma.png"
            alt="Prelievo di sangue in laboratorio privato a Roma"
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
          <span style={{ color: '#dc2626' }}>Analisi del Sangue Private Roma</span>
        </nav>

        <article itemScope itemType="https://schema.org/Article">
          <h1 itemProp="headline" style={{ color: '#7f1d1d', fontSize: '36px', fontWeight: '900', lineHeight: '1.2', marginBottom: '10px' }}>
            Analisi del Sangue Private a Roma: Prezzi, Laboratori e Come Farlo Senza Ricetta ({mese})
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
            Aggiornato: {mese} · Lettura: 4 min
          </p>

          <div style={{ backgroundColor: '#fef2f2', padding: '25px', borderRadius: '20px', borderLeft: '6px solid #dc2626', marginBottom: '35px' }}>
            <p style={{ margin: 0, color: '#7f1d1d', fontSize: '18px', lineHeight: '1.7' }}>
              💡 <strong>In breve:</strong> Un emocromo privato a Roma costa <strong>15–25 €</strong>. Un profilo metabolico completo 40–80 €. Puoi farlo senza ricetta in qualsiasi laboratorio privato, con risultati disponibili in giornata o entro 24 ore.
            </p>
          </div>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#7f1d1d', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Prezzi esami del sangue — {mese}
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#7f1d1d', color: '#fff' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Esame</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center' }}>Privato Roma</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', borderRadius: '0 8px 0 0' }}>SSN (ticket)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Emocromo completo (CBC)', '15–25 €', '~36 € (ricetta)'],
                    ['Glicemia a digiuno', '8–15 €', 'incluso nel ticket'],
                    ['Colesterolo totale + HDL + LDL', '20–35 €', 'incluso nel ticket'],
                    ['Profilo metabolico base (8–10 esami)', '40–80 €', '36 € max/ricetta'],
                    ['TSH (tiroide)', '15–30 €', 'incluso nel ticket'],
                    ['Ferritina + sideremia', '20–35 €', 'incluso nel ticket'],
                    ['PSA (prostata)', '20–35 €', 'incluso nel ticket'],
                    ['Vitamina D (25-OH)', '25–45 €', 'incluso nel ticket'],
                    ['Profilo coagulazione (INR + PTT)', '20–35 €', 'incluso nel ticket'],
                    ['Tampone molecolare/antigenico', '30–80 €', 'gratuito in alcuni casi'],
                  ].map(([esame, priv, ssn], i) => (
                    <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#f8fafc' : '#fff' }}>
                      <td style={{ padding: '10px 16px', color: '#334155', fontWeight: '600' }}>{esame}</td>
                      <td style={{ padding: '10px 16px', textAlign: 'center', color: '#e53e3e', fontWeight: '700' }}>{priv}</td>
                      <td style={{ padding: '10px 16px', textAlign: 'center', color: '#64748b' }}>{ssn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px', fontStyle: 'italic' }}>
              * Prezzi indicativi di mercato rilevati a Roma nel {mese}. Il ticket SSN è per ricetta (indipendentemente dal numero di esami prescritti nella stessa ricetta).
            </p>
          </section>

          {annunci[0] && (
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#7f1d1d', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🧪 Laboratorio disponibile a Roma
              </h3>
              <AnnuncioBox annuncio={annunci[0]} colore="#dc2626" />
            </section>
          )}

          <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px', marginBottom: '40px' }}>
            <h2 style={{ color: '#7f1d1d', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Come fare le analisi del sangue senza ricetta a Roma
            </h2>
            <p>È semplice e non richiede il medico di base:</p>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li>Scegli un laboratorio privato nella tua zona (vedi la lista qui sotto per quartiere).</li>
              <li>Contatta il laboratorio per prenotare il prelievo (spesso disponibile anche al mattino presto, dalle 7:30).</li>
              <li>Presentati a digiuno da almeno 8–12 ore.</li>
              <li>Paga direttamente al laboratorio; conserva la ricevuta per la detrazione fiscale.</li>
              <li>I risultati sono disponibili in giornata (prelievo mattutino) o entro 24 ore.</li>
            </ul>
          </section>

          <section style={{ backgroundColor: '#fff7ed', borderRadius: '16px', padding: '24px', marginBottom: '40px', borderLeft: '5px solid #f59e0b' }}>
            <h2 style={{ color: '#92400e', fontSize: '22px', fontWeight: '800', marginBottom: '12px' }}>
              ⚖️ Privato vs SSN: quale scegliere?
            </h2>
            <p style={{ color: '#334155', lineHeight: '1.8', margin: '0 0 12px 0' }}>
              Il <strong>SSN</strong> è il più economico: con un'impegnativa del medico di base paghi massimo <strong>36,15 € per ricetta</strong>, anche se contiene molti esami. I tempi di attesa sono brevi (3–7 giorni) rispetto a visite specialistiche.
            </p>
            <p style={{ color: '#334155', lineHeight: '1.8', margin: 0 }}>
              Il <strong>laboratorio privato</strong> è ideale quando: non hai il medico di base disponibile, vuoi fare esami non prescrivibili (check preventivo personale), hai bisogno del risultato il giorno stesso, o vuoi evitare file e burocrazia.
            </p>
          </section>

          {annunci[1] && (
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#7f1d1d', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🧪 Altro laboratorio nella tua zona
              </h3>
              <AnnuncioBox annuncio={annunci[1]} colore="#dc2626" />
            </section>
          )}

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#7f1d1d', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Laboratori per quartiere a Roma
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
              {QUARTIERI.map(q => (
                <a key={q.slug} href={`/diagnostica-roma-${q.slug}`}
                  style={{ padding: '10px 16px', backgroundColor: '#fef2f2', color: '#b91c1c', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '14px', border: '1px solid #fecaca' }}>
                  Diagnostica {q.nome}
                </a>
              ))}
            </div>
          </section>

          {annunci[2] && (
            <section style={{ marginBottom: '40px' }}>
              <h3 style={{ color: '#7f1d1d', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🧪 Laboratorio disponibile
              </h3>
              <AnnuncioBox annuncio={annunci[2]} colore="#dc2626" />
            </section>
          )}

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#7f1d1d', fontSize: '26px', fontWeight: '800', marginBottom: '20px' }}>
              Domande frequenti (FAQ)
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {faqItems.map((item, i) => (
                <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '18px 20px', borderLeft: '4px solid #dc2626' }}>
                  <h3 style={{ color: '#7f1d1d', fontSize: '16px', fontWeight: '800', margin: '0 0 8px 0' }}>{item.q}</h3>
                  <p style={{ color: '#334155', lineHeight: '1.7', margin: 0, fontSize: '15px' }}>{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <div style={{ marginTop: '20px', padding: '40px', backgroundColor: '#7f1d1d', borderRadius: '24px', color: 'white', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>Trova un laboratorio vicino a te</h3>
            <p style={{ opacity: 0.9, marginBottom: '25px' }}>Risultati in giornata. Senza ricetta. Prenota subito.</p>
            <a href="/diagnostica-roma" style={{ display: 'inline-block', backgroundColor: 'white', color: '#7f1d1d', fontWeight: '800', textDecoration: 'none', padding: '14px 34px', borderRadius: '12px', fontSize: '16px' }}>
              VEDI TUTTI I CENTRI DIAGNOSTICI A ROMA →
            </a>
          </div>
        </article>

        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '15px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#64748b', fontStyle: 'italic' }}>
          <strong>Nota informativa e disclaimer:</strong> I prezzi indicati in questa guida sono <em>medie di mercato</em> rilevate a Roma nel {mese} e hanno esclusivamente scopo informativo. ServiziSalute.com non effettua prestazioni sanitarie e non garantisce la disponibilità dei laboratori. Questo contenuto non costituisce parere medico, diagnosi o terapia. Per interpretare i risultati delle analisi rivolgersi sempre al proprio medico.
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  return { props: {}, revalidate: 86400 };
}
