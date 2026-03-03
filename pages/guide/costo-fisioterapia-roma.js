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
  { q: 'Quanto costa una seduta di fisioterapia privata a Roma?', a: 'Il costo medio di una seduta di fisioterapia privata a Roma è compreso tra 40 € e 90 €. Una seduta standard di 45–60 minuti costa 50–70 €; sedute con terapie avanzate (tecar, onde d\'urto, laser) costano 60–90 €.' },
  { q: 'Quante sedute di fisioterapia servono?', a: 'Dipende dal problema: una lombalgia acuta richiede in genere 5–10 sedute; un recupero post-chirurgico (es. ricostruzione LCA) richiede 20–40 sedute nell\'arco di 3–6 mesi; una cervicalgia cronica beneficia di cicli di 10 sedute ogni 3–6 mesi.' },
  { q: 'La fisioterapia privata è detraibile fiscalmente?', a: 'Sì: le spese di fisioterapia sono detraibili al 19% se il fisioterapista emette fattura con il proprio codice fiscale sanitario. Il fisioterapista deve essere iscritto all\'albo TSRM PSTRP.' },
  { q: 'Qual è la differenza tra fisioterapista e osteopata?', a: 'Il fisioterapista è un professionista sanitario laureato che tratta patologie muscolo-scheletriche con esercizi, terapie fisiche e manuali. L\'osteopata usa tecniche manipolative osteopatiche; in Italia non è ancora un professionista sanitario regolamentato al pari del fisioterapista.' },
  { q: 'La fisioterapia è disponibile anche a domicilio a Roma?', a: 'Sì: molti fisioterapisti romani offrono il servizio domiciliare per pazienti con difficoltà motorie, anziani o post-operati. Il costo è in genere superiore del 20–40% rispetto alla seduta in studio (60–120 €).' },
];

function AnnuncioBox({ annuncio, colore = '#ea580c' }) {
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
        <span style={{ backgroundColor: colore, color: '#fff', borderRadius: '20px', padding: '4px 12px', fontSize: '12px', fontWeight: '700', whiteSpace: 'nowrap' }}>Fisioterapista</span>
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
        {tel && (
          <a href={`tel:${tel}`} onClick={() => trackChiama(annuncio.nome, 'guida-fisioterapia')}
            style={{ flex: 1, minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: colore, color: '#fff', borderRadius: '10px', padding: '10px 14px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
            📞 Chiama ora
          </a>
        )}
        {wa && (
          <a href={`https://wa.me/39${wa}?text=Salve%2C+la+contatto+per+fisioterapia+vista+su+ServiziSalute.com`}
            target="_blank" rel="noopener noreferrer"
            onClick={() => trackWhatsApp(annuncio.nome, 'guida-fisioterapia')}
            style={{ flex: 1, minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#25D366', color: '#fff', borderRadius: '10px', padding: '10px 14px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
            💬 WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}

export default function GuidaFisioterapia() {
  const mese = new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
  const [annunci, setAnnunci] = useState([]);

  useEffect(() => {
    supabase
      .from('annunci')
      .select('id,nome,telefono,whatsapp,indirizzo,zona,slug')
      .eq('approvato', true)
      .ilike('categoria', '%fisioterap%')
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
    headline: `Costo Fisioterapia Roma: Prezzi per Seduta (${mese})`,
    description: `Guida aggiornata a ${mese} ai costi della fisioterapia privata a Roma: seduta standard, tecar, onde d'urto, massaggio terapeutico e fisioterapia domiciliare.`,
    url: 'https://www.servizisalute.com/guide/costo-fisioterapia-roma',
    publisher: { '@type': 'Organization', name: 'ServiziSalute', url: 'https://www.servizisalute.com' },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>Fisioterapia Roma: Costi €40–€90 a Seduta | Guida {mese}</title>
        <meta name="description" content={`Quanto costa la fisioterapia privata a Roma? Prezzi aggiornati a ${mese}: seduta standard 50–70 €, tecar e onde d'urto 60–90 €. Quante sedute servono e dove prenotare.`} />
        <link rel="canonical" href="https://www.servizisalute.com/guide/costo-fisioterapia-roma" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:title" content={`Fisioterapia Roma: Costi €40–€90 a Seduta | Guida ${mese}`} />
        <meta property="og:description" content={`Prezzi fisioterapia privata a Roma. Sedute standard, tecar, onde d'urto, laser, massaggio terapeutico e domiciliare.`} />
        <meta property="og:url" content="https://www.servizisalute.com/guide/costo-fisioterapia-roma" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://www.servizisalute.com/images/costo-fisioterapia-roma.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <Navbar />

      <div style={{ width: '100%', maxWidth: '1100px', margin: '20px auto', padding: '0 20px' }}>
        <div style={{ width: '100%', height: '400px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <img
            src="/images/costo-fisioterapia-roma.png"
            alt="Seduta di fisioterapia a Roma - fisioterapista che tratta la schiena di un paziente"
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
          <span style={{ color: '#ea580c' }}>Costo Fisioterapia Roma</span>
        </nav>

        <article itemScope itemType="https://schema.org/Article">
          <h1 itemProp="headline" style={{ color: '#7c2d12', fontSize: '36px', fontWeight: '900', lineHeight: '1.2', marginBottom: '10px' }}>
            Fisioterapia a Roma: Costi per Seduta, Terapie e Come Trovare il Fisioterapista Giusto ({mese})
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
            Aggiornato: {mese} · Lettura: 5 min
          </p>

          <div style={{ backgroundColor: '#fff7ed', padding: '25px', borderRadius: '20px', borderLeft: '6px solid #ea580c', marginBottom: '35px' }}>
            <p style={{ margin: 0, color: '#7c2d12', fontSize: '18px', lineHeight: '1.7' }}>
              💡 <strong>In breve:</strong> Una seduta di fisioterapia privata a Roma costa tra <strong>40 € e 90 €</strong>. Le terapie strumentali (tecar, onde d'urto) costano di più. La fisioterapia domiciliare prevede un supplemento del 20–40%.
            </p>
          </div>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#7c2d12', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Tariffe fisioterapia aggiornate a {mese}
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#7c2d12', color: '#fff' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Tipologia</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center' }}>Privato Roma</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', borderRadius: '0 8px 0 0' }}>SSN (ticket)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Seduta fisioterapia (45–60 min)', '50–70 €', '~36 € ticket'],
                    ['Tecarterapia (TECAR)', '60–90 €', '–'],
                    ['Onde d\'urto focali', '70–100 €', '–'],
                    ['Laserterapia', '50–80 €', '–'],
                    ['Massaggio terapeutico (decontratturante)', '45–70 €', '–'],
                    ['Taping neuromuscolare (Kinesio tape)', '30–50 €', '–'],
                    ['Pacchetto 10 sedute', '400–600 €', '–'],
                    ['Fisioterapia domiciliare', '70–120 €', '~50 € ticket'],
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
              * Prezzi indicativi di mercato rilevati a Roma nel {mese}. Le tariffe variano per studio e complessità del trattamento.
            </p>
          </section>

          {annunci[0] && (
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#7c2d12', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                💪 Fisioterapista disponibile a Roma
              </h3>
              <AnnuncioBox annuncio={annunci[0]} colore="#ea580c" />
            </section>
          )}

          <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px', marginBottom: '40px' }}>
            <h2 style={{ color: '#7c2d12', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Quante sedute servono? Guida per problema
            </h2>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li><strong>Lombalgia acuta:</strong> 5–10 sedute in 2–3 settimane.</li>
              <li><strong>Cervicalgia/torcicollo:</strong> 6–12 sedute in 3–4 settimane.</li>
              <li><strong>Tendinite/tendinopatia:</strong> 8–15 sedute in 4–6 settimane, spesso con onde d'urto.</li>
              <li><strong>Post-chirurgia LCA/spalla:</strong> 20–40 sedute nell'arco di 3–6 mesi.</li>
              <li><strong>Frattura/gesso rimosso:</strong> 10–20 sedute per recupero funzionale.</li>
              <li><strong>Ernia del disco in fase acuta:</strong> 8–12 sedute, poi esercizi domiciliari.</li>
            </ul>
          </section>

          <section style={{ backgroundColor: '#fff7ed', borderRadius: '16px', padding: '24px', marginBottom: '40px', borderLeft: '5px solid #f59e0b' }}>
            <h2 style={{ color: '#92400e', fontSize: '22px', fontWeight: '800', marginBottom: '12px' }}>
              ⚖️ Pubblico vs Privato: quando scegliere il fisioterapista privato?
            </h2>
            <p style={{ color: '#334155', lineHeight: '1.8', margin: '0 0 12px 0' }}>
              Il <strong>SSN</strong> offre fisioterapia con ticket ridotto, ma <strong>i tempi di attesa a Roma possono superare i 30–90 giorni</strong>. Per problemi acuti (schiena bloccata, tendinite, post-operatorio), aspettare mesi vanifica il trattamento.
            </p>
            <p style={{ color: '#334155', lineHeight: '1.8', margin: 0 }}>
              Il <strong>fisioterapista privato</strong> garantisce appuntamento entro <strong>24–72 ore</strong>, sedute più lunghe (45–60 min vs i 20–30 min del SSN), piano di trattamento personalizzato e continuità terapeutica.
            </p>
          </section>

          {annunci[1] && (
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#7c2d12', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                💪 Fisioterapista nella tua zona
              </h3>
              <AnnuncioBox annuncio={annunci[1]} colore="#ea580c" />
            </section>
          )}

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#7c2d12', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Fisioterapisti per quartiere a Roma
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
              {QUARTIERI.map(q => (
                <a key={q.slug} href={`/servizi-sanitari-roma-${q.slug}`}
                  style={{ padding: '10px 16px', backgroundColor: '#fff7ed', color: '#c2410c', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '14px', border: '1px solid #fed7aa' }}>
                  Fisioterapia {q.nome}
                </a>
              ))}
            </div>
          </section>

          {annunci[2] && (
            <section style={{ marginBottom: '40px' }}>
              <h3 style={{ color: '#7c2d12', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                💪 Fisioterapista disponibile
              </h3>
              <AnnuncioBox annuncio={annunci[2]} colore="#ea580c" />
            </section>
          )}

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#7c2d12', fontSize: '26px', fontWeight: '800', marginBottom: '20px' }}>
              Domande frequenti (FAQ)
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {faqItems.map((item, i) => (
                <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '18px 20px', borderLeft: '4px solid #ea580c' }}>
                  <h3 style={{ color: '#7c2d12', fontSize: '16px', fontWeight: '800', margin: '0 0 8px 0' }}>{item.q}</h3>
                  <p style={{ color: '#334155', lineHeight: '1.7', margin: 0, fontSize: '15px' }}>{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <div style={{ marginTop: '20px', padding: '40px', backgroundColor: '#7c2d12', borderRadius: '24px', color: 'white', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>Prenota la tua seduta di fisioterapia a Roma</h3>
            <p style={{ opacity: 0.9, marginBottom: '25px' }}>Appuntamento entro 24–72 ore. Scegli il fisioterapista più vicino a te.</p>
            <a href="/servizi-sanitari-roma" style={{ display: 'inline-block', backgroundColor: 'white', color: '#7c2d12', fontWeight: '800', textDecoration: 'none', padding: '14px 34px', borderRadius: '12px', fontSize: '16px' }}>
              VEDI TUTTI I SERVIZI SANITARI A ROMA →
            </a>
          </div>
        </article>

        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '15px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#64748b', fontStyle: 'italic' }}>
          <strong>Nota informativa e disclaimer:</strong> I prezzi indicati in questa guida sono <em>medie di mercato</em> rilevate a Roma nel {mese} e hanno esclusivamente scopo informativo. ServiziSalute.com non effettua prestazioni sanitarie e non garantisce la disponibilità dei professionisti. Il numero di sedute necessarie varia per caso: concordare sempre il piano terapeutico con il fisioterapista. Questo contenuto non costituisce parere medico, diagnosi o terapia.
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  return { props: {}, revalidate: 86400 };
}
