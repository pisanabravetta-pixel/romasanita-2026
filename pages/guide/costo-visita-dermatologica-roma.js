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
  { q: 'Quanto costa una visita dermatologica privata a Roma?', a: 'Il costo medio di una visita dermatologica privata a Roma è compreso tra 80 € e 150 €. La tariffa dipende dal tipo di visita (prima visita, follow-up, dermatoscopia), dall\'esperienza dello specialista e dalla zona della città.' },
  { q: 'Quanto costa la mappatura dei nei (dermatoscopia) a Roma?', a: 'La mappatura dei nei (esame dermatoscopico digitale) a Roma costa in genere tra 100 € e 180 €, a seconda del numero di nei mappati e della tecnologia utilizzata.' },
  { q: 'È necessaria l\'impegnativa del medico per una visita dermatologica privata?', a: 'No. Per una visita dermatologica in regime privato non è richiesta l\'impegnativa del medico di base. Puoi prenotare direttamente contattando lo specialista.' },
  { q: 'Quanto si aspetta per una visita dermatologica al SSN a Roma?', a: 'I tempi di attesa per una visita dermatologica presso strutture pubbliche a Roma possono superare i 90–120 giorni. In privato si ottiene un appuntamento solitamente entro 3–7 giorni.' },
  { q: 'La crioterapia per verruche o nevi è inclusa nella visita?', a: 'In genere no. La crioterapia (azoto liquido per verruche, cheratosi, ecc.) è una prestazione separata che costa mediamente tra 50 € e 120 € a seconda dell\'estensione del trattamento.' },
];

function AnnuncioBox({ annuncio, colore = '#7c3aed' }) {
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
        <span style={{ backgroundColor: colore, color: '#fff', borderRadius: '20px', padding: '4px 12px', fontSize: '12px', fontWeight: '700', whiteSpace: 'nowrap' }}>Dermatologo</span>
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
        {tel && (
          <a href={`tel:${tel}`} onClick={() => trackChiama(annuncio.nome || annuncio.titolo, 'guida-dermatologia')}
            style={{ flex: 1, minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: colore, color: '#fff', borderRadius: '10px', padding: '10px 14px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
            📞 Chiama ora
          </a>
        )}
        {wa && (
          <a href={`https://wa.me/39${wa}?text=Salve%2C+la+contatto+per+una+visita+dermatologica+vista+su+ServiziSalute.com`}
            target="_blank" rel="noopener noreferrer"
            onClick={() => trackWhatsApp(annuncio.nome || annuncio.titolo, 'guida-dermatologia')}
            style={{ flex: 1, minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#25D366', color: '#fff', borderRadius: '10px', padding: '10px 14px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
            💬 WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}

export default function GuidaDermatologia() {
  const mese = new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
  const [annunci, setAnnunci] = useState([]);

  useEffect(() => {
    supabase
      .from('annunci')
      .select('id,nome,telefono,whatsapp,indirizzo,zona,slug')
      .eq('approvato', true)
      .ilike('categoria', '%dermatolog%')
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
    headline: `Costo Visita Dermatologica Roma: Prezzi e Tariffe Private (${mese})`,
    description: `Guida aggiornata a ${mese} ai costi delle visite dermatologiche private a Roma: tariffe medie, mappatura nei, crioterapia e confronto per quartiere.`,
    url: 'https://www.servizisalute.com/guide/costo-visita-dermatologica-roma',
    publisher: { '@type': 'Organization', name: 'ServiziSalute', url: 'https://www.servizisalute.com' },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>Visita Dermatologica Roma: Costi €80–€150 | Guida {mese}</title>
        <meta name="description" content={`Quanto costa una visita dermatologica privata a Roma? Prezzi ${mese}: da 80 € a 150 €. Mappatura nei, crioterapia, tempi di attesa e dove prenotare nel tuo quartiere.`} />
        <link rel="canonical" href="https://www.servizisalute.com/guide/costo-visita-dermatologica-roma" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:title" content={`Visita Dermatologica Roma: Costi €80–€150 | Guida ${mese}`} />
        <meta property="og:description" content={`Prezzi aggiornati delle visite dermatologiche private a Roma. Mappatura nei, crioterapia, dermatoscopia. Trova il tuo specialista.`} />
        <meta property="og:url" content="https://www.servizisalute.com/guide/costo-visita-dermatologica-roma" />
        <meta property="og:image" content="https://www.servizisalute.com/images/costo-visita-dermatologica-roma.png" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <Navbar />

      {/* IMMAGINE PRINCIPALE */}
      <div style={{ width: '100%', maxWidth: '1100px', margin: '20px auto', padding: '0 20px' }}>
        <div style={{ width: '100%', height: '400px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <img
            src="/images/costo-visita-dermatologica-roma.webp"
            alt="Visita dermatologica a Roma - esame della pelle"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            onError={(e) => { e.target.src = '/images/guida-roma-salute.webp'; }}
          />
        </div>
      </div>

      <main style={{ flex: '1 0 auto', maxWidth: '850px', margin: '0 auto', padding: '0 20px', width: '100%', marginBottom: '80px' }}>

        {/* BREADCRUMB */}
        <nav aria-label="breadcrumb" style={{ marginBottom: '20px', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
          <a href="/" style={{ color: '#7c3aed', textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <a href="/guide" style={{ color: '#7c3aed', textDecoration: 'none' }}>Guide</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <span style={{ color: '#4c1d95' }}>Costo Visita Dermatologica Roma</span>
        </nav>

        <article itemScope itemType="https://schema.org/Article">
          <h1 itemProp="headline" style={{ color: '#4c1d95', fontSize: '36px', fontWeight: '900', lineHeight: '1.2', marginBottom: '10px' }}>
            Visita Dermatologica a Roma: Costi, Prezzi e Dove Prenotare ({mese})
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
            Aggiornato: {mese} · Lettura: 4 min
          </p>

          {/* BOX RIASSUNTO */}
          <div style={{ backgroundColor: '#f5f3ff', padding: '25px', borderRadius: '20px', borderLeft: '6px solid #7c3aed', marginBottom: '35px' }}>
            <p style={{ margin: 0, color: '#4c1d95', fontSize: '18px', lineHeight: '1.7' }}>
              💡 <strong>In breve:</strong> Una visita dermatologica privata a Roma costa mediamente tra <strong>80 € e 150 €</strong>. La mappatura dei nei parte da <strong>100 €</strong>. I tempi privati: 3–7 giorni vs 90–120 giorni al SSN.
            </p>
          </div>

          {/* TABELLA PREZZI */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#4c1d95', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Tariffe aggiornate a {mese}
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#4c1d95', color: '#fff' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Prestazione</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center' }}>Privato Roma</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', borderRadius: '0 8px 0 0' }}>SSN (con ticket)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Visita dermatologica base', '80–130 €', '36,15 €'],
                    ['Mappatura dei nei (dermatoscopia)', '100–180 €', '–'],
                    ['Crioterapia (verruche/cheratosi)', '50–120 €', '–'],
                    ['Biopsia cutanea', '80–150 €', '–'],
                    ['Visita acne / trattamento', '90–140 €', '–'],
                    ['Peeling chimico superficiale', '100–200 €', '–'],
                  ].map(([prest, priv, ssn], i) => (
                    <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#f8fafc' : '#fff' }}>
                      <td style={{ padding: '10px 16px', color: '#334155', fontWeight: '600' }}>{prest}</td>
                      <td style={{ padding: '10px 16px', textAlign: 'center', color: '#7c3aed', fontWeight: '700' }}>{priv}</td>
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
              <h3 style={{ color: '#4c1d95', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🩺 Dermatologo disponibile a Roma
              </h3>
              <AnnuncioBox annuncio={annunci[0]} colore="#7c3aed" />
            </section>
          )}

          {/* FATTORI DI PREZZO */}
          <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px', marginBottom: '40px' }}>
            <h2 style={{ color: '#4c1d95', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Cosa influenza il prezzo della visita dermatologica
            </h2>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li><strong>Prima visita vs controllo:</strong> la prima visita è più lunga e quindi più costosa (generalmente 30–45 min); i controlli di follow-up costano meno (50–80 €).</li>
              <li><strong>Dermatoscopia inclusa:</strong> alcuni studi includono l'esame strumentale dei nei nel costo della visita; altri la addebitano separatamente.</li>
              <li><strong>Tipologia di patologia:</strong> acne, psoriasi, dermatite atopica, tumori cutanei, infezioni fungine richiedono approcci diversi e possono influire sulla tariffa.</li>
              <li><strong>Zona di Roma:</strong> i quartieri centrali (Prati, Parioli, Centro Storico) hanno tariffe mediamente superiori del 20 % rispetto alle zone periferiche.</li>
              <li><strong>Piccola chirurgia:</strong> l'asportazione di nevi o lesioni cutanee prevede un costo aggiuntivo rispetto alla sola visita.</li>
            </ul>
          </section>

          {/* PUBBLICO VS PRIVATO */}
          <section style={{ backgroundColor: '#fff7ed', borderRadius: '16px', padding: '24px', marginBottom: '40px', borderLeft: '5px solid #f59e0b' }}>
            <h2 style={{ color: '#92400e', fontSize: '22px', fontWeight: '800', marginBottom: '12px' }}>
              ⚖️ Pubblico vs Privato: quando scegliere il privato?
            </h2>
            <p style={{ color: '#334155', lineHeight: '1.8', margin: '0 0 12px 0' }}>
              Per una <strong>lesione sospetta</strong> o un neo che cambia forma/colore, aspettare 90–120 giorni al SSN può essere rischioso. In ambito privato si ottiene un appuntamento in <strong>3–7 giorni</strong>, con la possibilità di eseguire mappatura digitale e, se necessario, asportazione nella stessa seduta.
            </p>
            <p style={{ color: '#334155', lineHeight: '1.8', margin: 0 }}>
              Per patologie croniche come psoriasi o dermatite, il <strong>SSN</strong> è preferibile per i trattamenti a lungo termine (piani terapeutici, farmaci biologici coperti dal SSN).
            </p>
          </section>

          {/* AD BOX 2 */}
          {annunci[1] && (
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#4c1d95', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🩺 Un altro dermatologo nella tua zona
              </h3>
              <AnnuncioBox annuncio={annunci[1]} colore="#7c3aed" />
            </section>
          )}

          {/* QUANDO FARE LA VISITA */}
          <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px', marginBottom: '40px' }}>
            <h2 style={{ color: '#4c1d95', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Quando è necessaria una visita dermatologica?
            </h2>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li>Nei o macchie che cambiano forma, colore o dimensioni.</li>
              <li>Prurito persistente, arrossamenti o eruzioni cutanee di origine sconosciuta.</li>
              <li>Acne moderata-grave che non risponde ai trattamenti da banco.</li>
              <li>Psoriasi, dermatite atopica, eczema da controllare o impostare terapia.</li>
              <li>Verruche plantari o genitali, molluschi contagiosi, micosi ungueali.</li>
              <li>Caduta dei capelli (alopecia) o alterazioni ungueali.</li>
              <li>Controllo annuale della pelle dai 30 anni in poi, o prima in caso di fototipo chiaro, familiarità per melanoma, esposizioni solari intensive.</li>
            </ul>
            <p style={{ color: '#dc2626', fontWeight: '700', backgroundColor: '#fef2f2', padding: '12px 16px', borderRadius: '10px', marginTop: '12px' }}>
              ⚠️ Un neo che cambia rapidamente o sanguina è una potenziale urgenza dermatologica: non rimandare la visita oltre 7–10 giorni.
            </p>
          </section>

          {/* QUARTIERI */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#4c1d95', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Dermatologi per quartiere a Roma
            </h2>
            <p style={{ color: '#334155', marginBottom: '16px' }}>
              Seleziona il quartiere più vicino a te per vedere i dermatologi disponibili nella tua zona:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
              {QUARTIERI.map(q => (
                <a
                  key={q.slug}
                  href={`/dermatologi-roma-${q.slug}`}
                  style={{ padding: '10px 16px', backgroundColor: '#f5f3ff', color: '#7c3aed', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '14px', border: '1px solid #ddd6fe' }}
                >
                  Dermatologi {q.nome}
                </a>
              ))}
            </div>
          </section>

          {/* AD BOX 3 */}
          {annunci[2] && (
            <section style={{ marginBottom: '40px' }}>
              <h3 style={{ color: '#4c1d95', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🩺 Specialista dermatologo disponibile
              </h3>
              <AnnuncioBox annuncio={annunci[2]} colore="#7c3aed" />
            </section>
          )}

          {/* FAQ */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#4c1d95', fontSize: '26px', fontWeight: '800', marginBottom: '20px' }}>
              Domande frequenti (FAQ)
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {faqItems.map((item, i) => (
                <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '18px 20px', borderLeft: '4px solid #7c3aed' }}>
                  <h3 style={{ color: '#4c1d95', fontSize: '16px', fontWeight: '800', margin: '0 0 8px 0' }}>{item.q}</h3>
                  <p style={{ color: '#334155', lineHeight: '1.7', margin: 0, fontSize: '15px' }}>{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA BOX */}
          <div style={{ marginTop: '20px', padding: '40px', backgroundColor: '#4c1d95', borderRadius: '24px', color: 'white', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>Prenota la tua visita dermatologica a Roma</h3>
            <p style={{ opacity: 0.9, marginBottom: '25px' }}>Appuntamento entro 3–7 giorni. Scegli il dermatologo più vicino a te.</p>
            <a href="/dermatologi-roma" style={{ display: 'inline-block', backgroundColor: 'white', color: '#4c1d95', fontWeight: '800', textDecoration: 'none', padding: '14px 34px', borderRadius: '12px', fontSize: '16px' }}>
              VEDI TUTTI I DERMATOLOGI A ROMA →
            </a>
          </div>
        </article>

        
        {/* GUIDE CORRELATE */}
        <GuideCorrelate
          slugCorrente="costo-visita-dermatologica-roma"
          slugCorrelati={["costo-visita-oculistica-roma", "check-up-completo-roma", "costo-visita-ginecologica-roma", "analisi-sangue-private-roma"]}
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
