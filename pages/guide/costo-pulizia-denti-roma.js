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
  { q: 'Quanto costa una pulizia dei denti dal dentista privato a Roma?', a: 'Il costo medio di una seduta di igiene orale professionale (pulizia dei denti + levigatura radicolare) a Roma è compreso tra 70 € e 130 €. La tariffa dipende dallo stato di salute gengivale, dalla presenza di tartaro e dalla zona della città.' },
  { q: 'Con quale frequenza fare la pulizia dei denti?', a: 'Le linee guida odontostomatologiche consigliano una seduta di igiene orale professionale ogni 6 mesi per i pazienti con buona salute gengivale, ogni 3–4 mesi per chi soffre di parodontite o ha implanti dentali.' },
  { q: 'La pulizia dei denti è rimborsata dal SSN?', a: 'In Italia la pulizia dei denti professionale non è inclusa nei LEA (Livelli Essenziali di Assistenza) del SSN per gli adulti, salvo situazioni specifiche (donne in gravidanza, pazienti con patologie sistemiche). Si effettua quasi esclusivamente in regime privato.' },
  { q: 'Quanto costa una prima visita dentistica a Roma?', a: 'Una prima visita dentistica (con compilazione della cartella clinica e OPT panoramica se necessaria) a Roma costa in genere tra 50 € e 100 €, talvolta offerta a prezzo ridotto come "prima visita promozionale" (20–40 €).' },
  { q: 'La pulizia dei denti può fare danni ai denti o alle gengive?', a: 'No. La pulizia professionale eseguita da un igienista dentale o da un dentista con strumenti ad ultrasuoni e smaltatrice è sicura e non danneggia lo smalto né le gengive se eseguita correttamente.' },
];

function AnnuncioBox({ annuncio, colore = '#059669' }) {
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
        <span style={{ backgroundColor: colore, color: '#fff', borderRadius: '20px', padding: '4px 12px', fontSize: '12px', fontWeight: '700', whiteSpace: 'nowrap' }}>Dentista</span>
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
        {tel && (
          <a href={`tel:${tel}`} onClick={() => trackChiama(annuncio.nome || annuncio.titolo, 'guida-dentista')}
            style={{ flex: 1, minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: colore, color: '#fff', borderRadius: '10px', padding: '10px 14px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
            📞 Chiama ora
          </a>
        )}
        {wa && (
          <a href={`https://wa.me/39${wa}?text=Salve%2C+la+contatto+per+una+pulizia+dei+denti+vista+su+ServiziSalute.com`}
            target="_blank" rel="noopener noreferrer"
            onClick={() => trackWhatsApp(annuncio.nome || annuncio.titolo, 'guida-dentista')}
            style={{ flex: 1, minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#25D366', color: '#fff', borderRadius: '10px', padding: '10px 14px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
            💬 WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}

export default function GuidaDentista() {
  const mese = new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
  const [annunci, setAnnunci] = useState([]);

  useEffect(() => {
    supabase
      .from('annunci')
      .select('id,nome,telefono,whatsapp,indirizzo,zona,slug')
      .eq('approvato', true)
      .ilike('categoria', '%dentist%')
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
    headline: `Costo Pulizia Denti Roma: Prezzi e Tariffe Private (${mese})`,
    description: `Guida aggiornata a ${mese} ai costi della pulizia dei denti a Roma: tariffe medie, igiene orale professionale, confronto per quartiere e quando farla.`,
    url: 'https://www.servizisalute.com/guide/costo-pulizia-denti-roma',
    publisher: { '@type': 'Organization', name: 'ServiziSalute', url: 'https://www.servizisalute.com' },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>Pulizia Denti Roma: Costi €70–€130 | Guida {mese}</title>
        <meta name="description" content={`Quanto costa la pulizia dei denti dal dentista a Roma? Prezzi ${mese}: da 70 € a 130 €. Igiene orale professionale, ogni quanto farla, dove prenotare nel tuo quartiere.`} />
        <link rel="canonical" href="https://www.servizisalute.com/guide/costo-pulizia-denti-roma" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:title" content={`Pulizia Denti Roma: Costi €70–€130 | Guida ${mese}`} />
        <meta property="og:description" content={`Prezzi aggiornati pulizia dei denti a Roma. Igiene orale professionale, tartaro, levigatura. Trova il tuo dentista.`} />
        <meta property="og:url" content="https://www.servizisalute.com/guide/costo-pulizia-denti-roma" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <Navbar />

      {/* IMMAGINE */}
      <div style={{ width: '100%', maxWidth: '1100px', margin: '20px auto', padding: '0 20px' }}>
        <div style={{ width: '100%', height: '400px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <img
            src="/images/costo-pulizia-denti-roma.webp"
            alt="Pulizia dei denti dal dentista a Roma - igiene orale professionale"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </div>

      <main style={{ flex: '1 0 auto', maxWidth: '850px', margin: '0 auto', padding: '0 20px', width: '100%', marginBottom: '80px' }}>

        {/* BREADCRUMB */}
        <nav aria-label="breadcrumb" style={{ marginBottom: '20px', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
          <a href="/" style={{ color: '#059669', textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <a href="/guide" style={{ color: '#059669', textDecoration: 'none' }}>Guide</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <span style={{ color: '#064e3b' }}>Costo Pulizia Denti Roma</span>
        </nav>

        <article itemScope itemType="https://schema.org/Article">
          <h1 itemProp="headline" style={{ color: '#064e3b', fontSize: '36px', fontWeight: '900', lineHeight: '1.2', marginBottom: '10px' }}>
            Pulizia dei Denti a Roma: Costi, Prezzi e Dove Prenotare ({mese})
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
            Aggiornato: {mese} · Lettura: 4 min
          </p>

          {/* BOX RIASSUNTO */}
          <div style={{ backgroundColor: '#ecfdf5', padding: '25px', borderRadius: '20px', borderLeft: '6px solid #059669', marginBottom: '35px' }}>
            <p style={{ margin: 0, color: '#064e3b', fontSize: '18px', lineHeight: '1.7' }}>
              💡 <strong>In breve:</strong> La pulizia dei denti (igiene orale professionale) da un dentista privato a Roma costa mediamente tra <strong>70 € e 130 €</strong>. Da fare ogni 6 mesi. Non è coperta dal SSN per gli adulti sani.
            </p>
          </div>

          {/* TABELLA PREZZI */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#064e3b', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Tariffe aggiornate a {mese}
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#064e3b', color: '#fff' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Prestazione</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center' }}>Privato Roma</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', borderRadius: '0 8px 0 0' }}>SSN</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Igiene orale professionale (pulizia)', '70–120 €', 'Non coperto*'],
                    ['Visita dentistica + OPT panoramica', '60–120 €', '–'],
                    ['Levigatura radicolare (per arcata)', '80–150 €', '–'],
                    ['Sbiancamento dentale professionale', '200–400 €', 'Non coperto'],
                    ['Otturazione (composita)', '80–150 €', '~20–40 € ticket'],
                    ['Estrazione semplice', '80–150 €', '~20 € ticket'],
                  ].map(([prest, priv, ssn], i) => (
                    <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#f8fafc' : '#fff' }}>
                      <td style={{ padding: '10px 16px', color: '#334155', fontWeight: '600' }}>{prest}</td>
                      <td style={{ padding: '10px 16px', textAlign: 'center', color: '#059669', fontWeight: '700' }}>{priv}</td>
                      <td style={{ padding: '10px 16px', textAlign: 'center', color: '#64748b' }}>{ssn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px', fontStyle: 'italic' }}>
              * La pulizia dei denti professionale non rientra nei LEA del SSN per gli adulti sani. Prezzi indicativi rilevati a Roma nel {mese}.
            </p>
          </section>

          {/* AD BOX 1 */}
          {annunci[0] && (
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#064e3b', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🦷 Dentista disponibile a Roma
              </h3>
              <AnnuncioBox annuncio={annunci[0]} colore="#059669" />
            </section>
          )}

          {/* FATTORI PREZZO */}
          <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px', marginBottom: '40px' }}>
            <h2 style={{ color: '#064e3b', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Cosa influenza il prezzo della pulizia dei denti
            </h2>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li><strong>Quantità di tartaro:</strong> chi non ha eseguito l'igiene da più di 12 mesi ha più tartaro e la seduta richiede più tempo (+20–40 €).</li>
              <li><strong>Stato gengivale:</strong> in caso di parodontite (gengive infiammate con tasche profonde) si rende necessaria la levigatura radicolare, prestazione separata e più costosa.</li>
              <li><strong>Strumentazione:</strong> gli ultrasuoni abbinati alla smaltatrice e alla lucidatura con polvere di bicarbonato garantiscono migliori risultati.</li>
              <li><strong>Zona di Roma:</strong> gli studi nelle zone centrali (Prati, Parioli, Centro Storico) hanno tariffe mediamente superiori del 15–25 % rispetto a EUR, Tiburtina e Ostia.</li>
              <li><strong>Igienista dentale vs dentista:</strong> la seduta eseguita dall'igienista è spesso meno costosa rispetto a quella condotta direttamente dal dentista.</li>
            </ul>
          </section>

          {/* OGNI QUANTO */}
          <section style={{ backgroundColor: '#f0fdf4', borderRadius: '16px', padding: '24px', marginBottom: '40px', borderLeft: '5px solid #16a34a' }}>
            <h2 style={{ color: '#14532d', fontSize: '22px', fontWeight: '800', marginBottom: '12px' }}>
              🦷 Ogni quanto fare la pulizia dei denti?
            </h2>
            <p style={{ color: '#334155', lineHeight: '1.8', margin: '0 0 12px 0' }}>
              Per i pazienti con buona salute gengivale: <strong>ogni 6 mesi</strong>. Per chi porta apparecchio fisso, implanti o soffre di parodontite: <strong>ogni 3–4 mesi</strong>. Per i pazienti con pochissimo tartaro e ottime abitudini di igiene orale: <strong>annualmente</strong>.
            </p>
            <p style={{ color: '#334155', lineHeight: '1.8', margin: 0 }}>
              Rispettare la cadenza raccomandata dall'igienista riduce il rischio di carie, parodontite e perdita dei denti, abbassando i costi dentistici a lungo termine.
            </p>
          </section>

          {/* AD BOX 2 */}
          {annunci[1] && (
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#064e3b', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🦷 Un altro dentista nella tua zona
              </h3>
              <AnnuncioBox annuncio={annunci[1]} colore="#059669" />
            </section>
          )}

          {/* COSA INCLUDE */}
          <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px', marginBottom: '40px' }}>
            <h2 style={{ color: '#064e3b', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Cosa include una seduta di igiene orale professionale
            </h2>
            <ol style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li><strong>Visita di controllo</strong> – l'igienista o il dentista valuta lo stato di gengive e denti.</li>
              <li><strong>Rimozione del tartaro (detartrasi)</strong> – con strumenti ad ultrasuoni subgengivale e sovragengivale.</li>
              <li><strong>Lucidatura e sbiancamento superficiale</strong> – con polvere abrasiva (air polishing) o pasta lucidante.</li>
              <li><strong>Levigatura radicolare</strong> – se indicata, per rimuovere il biofilm dalle radici.</li>
              <li><strong>Fluoroprofilassi</strong> – applicazione di gel o vernice al fluoro per proteggere lo smalto (non sempre inclusa).</li>
              <li><strong>Istruzione all'igiene orale domiciliare</strong> – indicazioni su spazzolino, filo interdentale, scovolini.</li>
            </ol>
          </section>

          {/* QUARTIERI */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#064e3b', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Dentisti per quartiere a Roma
            </h2>
            <p style={{ color: '#334155', marginBottom: '16px' }}>
              Seleziona il quartiere più vicino a te per vedere i dentisti disponibili nella tua zona:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
              {QUARTIERI.map(q => (
                <a
                  key={q.slug}
                  href={`/dentisti-roma-${q.slug}`}
                  style={{ padding: '10px 16px', backgroundColor: '#ecfdf5', color: '#059669', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '14px', border: '1px solid #a7f3d0' }}
                >
                  Dentisti {q.nome}
                </a>
              ))}
            </div>
          </section>

          {/* AD BOX 3 */}
          {annunci[2] && (
            <section style={{ marginBottom: '40px' }}>
              <h3 style={{ color: '#064e3b', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🦷 Studio dentistico disponibile
              </h3>
              <AnnuncioBox annuncio={annunci[2]} colore="#059669" />
            </section>
          )}

          {/* FAQ */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#064e3b', fontSize: '26px', fontWeight: '800', marginBottom: '20px' }}>
              Domande frequenti (FAQ)
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {faqItems.map((item, i) => (
                <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '18px 20px', borderLeft: '4px solid #059669' }}>
                  <h3 style={{ color: '#064e3b', fontSize: '16px', fontWeight: '800', margin: '0 0 8px 0' }}>{item.q}</h3>
                  <p style={{ color: '#334155', lineHeight: '1.7', margin: 0, fontSize: '15px' }}>{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA BOX */}
          <div style={{ marginTop: '20px', padding: '40px', backgroundColor: '#064e3b', borderRadius: '24px', color: 'white', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>Prenota la pulizia dei denti a Roma</h3>
            <p style={{ opacity: 0.9, marginBottom: '25px' }}>Trova il dentista più vicino a te e prenota subito la seduta di igiene orale.</p>
            <a href="/dentisti-roma" style={{ display: 'inline-block', backgroundColor: 'white', color: '#064e3b', fontWeight: '800', textDecoration: 'none', padding: '14px 34px', borderRadius: '12px', fontSize: '16px' }}>
              VEDI TUTTI I DENTISTI A ROMA →
            </a>
          </div>
        </article>

        
        {/* GUIDE CORRELATE */}
        <GuideCorrelate
          slugCorrente="costo-pulizia-denti-roma"
          slugCorrelati={["check-up-completo-roma", "costo-visita-dermatologica-roma", "trovare-servizio-sanitario-roma", "analisi-sangue-private-roma"]}
        />

        {/* DISCLAIMER LEGALE */}
        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '15px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#64748b', fontStyle: 'italic' }}>
          <strong>Nota informativa e disclaimer:</strong> I prezzi indicati in questa guida sono <em>medie di mercato</em> rilevate a Roma nel {mese} e hanno esclusivamente scopo informativo. Le tariffe effettive dipendono dalla singola struttura, dallo stato di salute del paziente e dagli eventuali trattamenti aggiuntivi. ServiziSalute.com non effettua prestazioni odontoiatriche e non garantisce la disponibilità dei professionisti. Questo contenuto non costituisce parere medico, diagnosi o terapia.
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  return { props: {}, revalidate: 86400 };
}
