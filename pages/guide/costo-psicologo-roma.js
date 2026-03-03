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
  { q: 'Quanto costa uno psicologo privato a Roma?', a: 'Il costo medio di una seduta dallo psicologo privato a Roma è compreso tra 60 € e 120 € per seduta. I professionisti con laurea magistrale e specializzazione possono applicare tariffe fino a 150 €.' },
  { q: 'Quante sedute servono con lo psicologo?', a: 'Dipende dal percorso: per un supporto psicologico breve bastano 5–10 sedute; per una psicoterapia strutturata si parla in genere di 20–50+ incontri nel corso di alcuni mesi.' },
  { q: 'C\'è un contributo del SSN per andare dallo psicologo?', a: 'Il Bonus Psicologo (decreto-legge 228/2021) offre un contributo fino a 1.500 € per sessioni con psicologo convenzionato. Verifica i requisiti su inps.it. Alcune ASL offrono servizi di psicologia clinica con lunghi tempi di attesa.' },
  { q: 'Qual è la differenza tra psicologo e psichiatra?', a: 'Lo psicologo è laureato in psicologia e lavora con psicoterapia e colloqui; non prescrive farmaci. Lo psichiatra è medico e può prescrivere farmaci. Per disturbi dell\'umore o ansia, spesso è utile un approccio integrato.' },
  { q: 'È necessaria l\'impegnativa per andare dallo psicologo privato?', a: 'No: puoi prenotare direttamente senza impegnativa. Il pagamento avviene in forma privata. Conserva le ricevute: alcune spese psicologiche sono detraibili al 19% nella dichiarazione dei redditi.' },
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
        <span style={{ backgroundColor: colore, color: '#fff', borderRadius: '20px', padding: '4px 12px', fontSize: '12px', fontWeight: '700', whiteSpace: 'nowrap' }}>Psicologo</span>
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
        {tel && (
          <a href={`tel:${tel}`} onClick={() => trackChiama(annuncio.nome, 'guida-psicologia')}
            style={{ flex: 1, minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: colore, color: '#fff', borderRadius: '10px', padding: '10px 14px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
            📞 Chiama ora
          </a>
        )}
        {wa && (
          <a href={`https://wa.me/39${wa}?text=Salve%2C+la+contatto+per+una+consulenza+psicologica+vista+su+ServiziSalute.com`}
            target="_blank" rel="noopener noreferrer"
            onClick={() => trackWhatsApp(annuncio.nome, 'guida-psicologia')}
            style={{ flex: 1, minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#25D366', color: '#fff', borderRadius: '10px', padding: '10px 14px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
            💬 WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}

export default function GuidaPsicologo() {
  const mese = new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
  const [annunci, setAnnunci] = useState([]);

  useEffect(() => {
    supabase
      .from('annunci')
      .select('id,nome,telefono,whatsapp,indirizzo,zona,slug')
      .eq('approvato', true)
      .ilike('categoria', '%psicolog%')
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
    headline: `Costo Psicologo Privato Roma: Prezzi e Tariffe (${mese})`,
    description: `Guida aggiornata a ${mese} ai costi delle sedute dallo psicologo privato a Roma: tariffe medie, bonus psicologo SSN e dove trovare il professionista giusto.`,
    url: 'https://www.servizisalute.com/guide/costo-psicologo-roma',
    publisher: { '@type': 'Organization', name: 'ServiziSalute', url: 'https://www.servizisalute.com' },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>Psicologo a Roma: Costi €60–€120 a Seduta | Guida {mese}</title>
        <meta name="description" content={`Quanto costa uno psicologo privato a Roma? Prezzi aggiornati a ${mese}: da 60 € a 120 € a seduta. Bonus psicologo SSN, differenza psicologo/psichiatra e dove prenotare.`} />
        <link rel="canonical" href="https://www.servizisalute.com/guide/costo-psicologo-roma" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:title" content={`Psicologo a Roma: Costi €60–€120 a Seduta | Guida ${mese}`} />
        <meta property="og:description" content={`Prezzi aggiornati dei professionisti in psicologia a Roma. Scopri le tariffe per quartiere e il bonus psicologo.`} />
        <meta property="og:url" content="https://www.servizisalute.com/guide/costo-psicologo-roma" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://www.servizisalute.com/images/costo-psicologo-roma.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <Navbar />

      {/* IMMAGINE PRINCIPALE */}
      <div style={{ width: '100%', maxWidth: '1100px', margin: '20px auto', padding: '0 20px' }}>
        <div style={{ width: '100%', height: '400px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <img
            src="/images/costo-psicologo-roma.png"
            alt="Seduta psicologica a Roma - psicologo e paziente in uno studio professionale"
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
          <span style={{ color: '#7c3aed' }}>Costo Psicologo Roma</span>
        </nav>

        <article itemScope itemType="https://schema.org/Article">
          <h1 itemProp="headline" style={{ color: '#4c1d95', fontSize: '36px', fontWeight: '900', lineHeight: '1.2', marginBottom: '10px' }}>
            Psicologo a Roma: Costi, Prezzi per Seduta e Come Trovarne Uno ({mese})
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
            Aggiornato: {mese} · Lettura: 5 min
          </p>

          <div style={{ backgroundColor: '#f5f3ff', padding: '25px', borderRadius: '20px', borderLeft: '6px solid #7c3aed', marginBottom: '35px' }}>
            <p style={{ margin: 0, color: '#4c1d95', fontSize: '18px', lineHeight: '1.7' }}>
              💡 <strong>In breve:</strong> Una seduta con uno psicologo privato a Roma costa in media tra <strong>60 € e 120 €</strong>. Il Bonus Psicologo SSN copre fino a 1.500 € per redditi bassi. I primi appuntamenti si ottengono in genere entro 3–7 giorni.
            </p>
          </div>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#4c1d95', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Tariffe aggiornate a {mese}
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#4c1d95', color: '#fff' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Tipologia</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center' }}>Privato Roma</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', borderRadius: '0 8px 0 0' }}>SSN / Bonus</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Primo colloquio valutativo', '60–100 €', 'Bonus psicologo'],
                    ['Seduta individuale standard', '70–120 €', 'Bonus psicologo'],
                    ['Seduta con psicoterapeuta', '80–150 €', '–'],
                    ['Terapia di coppia', '80–130 €', '–'],
                    ['Seduta online (video)', '50–90 €', 'Bonus psicologo'],
                    ['Psicoterapia cognitivo-comportamentale', '80–130 €', '–'],
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
              * Prezzi indicativi di mercato rilevati a Roma nel {mese}. Le tariffe variano per professionista e percorso terapeutico.
            </p>
          </section>

          {annunci[0] && (
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#4c1d95', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🧠 Psicologo disponibile a Roma
              </h3>
              <AnnuncioBox annuncio={annunci[0]} colore="#7c3aed" />
            </section>
          )}

          <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px', marginBottom: '40px' }}>
            <h2 style={{ color: '#4c1d95', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Il Bonus Psicologo: come funziona
            </h2>
            <p>Il Bonus Psicologo è un contributo statale che copre il costo delle sedute con psicologi iscritti all'Albo. L'importo massimo è <strong>1.500 € per persona</strong> (modulato in base all'ISEE). Per ottenerlo:</p>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li>Presentare domanda sul sito INPS durante le finestre di apertura (verificare le date su inps.it).</li>
              <li>Il professionista deve essere iscritto alla piattaforma INPS dedicata.</li>
              <li>Il contributo viene scalato direttamente dalla parcella: non devi pagare la quota coperta.</li>
            </ul>
            <p style={{ backgroundColor: '#f5f3ff', padding: '12px 16px', borderRadius: '10px', marginTop: '12px', fontWeight: '600', color: '#4c1d95' }}>
              💡 Anche senza Bonus, le spese psicologiche sono detraibili al 19% se il professionista rilascia regolare ricevuta.
            </p>
          </section>

          <section style={{ backgroundColor: '#fff7ed', borderRadius: '16px', padding: '24px', marginBottom: '40px', borderLeft: '5px solid #f59e0b' }}>
            <h2 style={{ color: '#92400e', fontSize: '22px', fontWeight: '800', marginBottom: '12px' }}>
              ⚖️ Pubblico vs Privato: differenze concrete
            </h2>
            <p style={{ color: '#334155', lineHeight: '1.8', margin: '0 0 12px 0' }}>
              I Servizi di Salute Mentale del <strong>SSN</strong> offrono psicologi e psichiatri a costo zero (o con ticket ridotto), ma <strong>i tempi di attesa a Roma possono superare i 3–6 mesi</strong> per il primo appuntamento. Le sedute successive possono avere frequenza mensile o bimestrale.
            </p>
            <p style={{ color: '#334155', lineHeight: '1.8', margin: 0 }}>
              In ambito <strong>privato</strong> il primo appuntamento si ottiene in genere entro <strong>3–7 giorni</strong>, con cadenza settimanale o bisettimanale per un percorso efficace.
            </p>
          </section>

          {annunci[1] && (
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#4c1d95', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🧠 Uno psicologo nella tua zona
              </h3>
              <AnnuncioBox annuncio={annunci[1]} colore="#7c3aed" />
            </section>
          )}

          <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px', marginBottom: '40px' }}>
            <h2 style={{ color: '#4c1d95', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Quando rivolgersi a uno psicologo?
            </h2>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li>Ansia persistente, attacchi di panico o fobie che limitano la quotidianità.</li>
              <li>Depressione, tristezza prolungata, perdita di interesse nelle attività.</li>
              <li>Difficoltà nelle relazioni sentimentali, familiari o lavorative.</li>
              <li>Stress post-traumatico (lutto, separazione, incidente).</li>
              <li>Disturbi del sonno legati a preoccupazioni mentali.</li>
              <li>Difficoltà di apprendimento o attenzione in bambini e adolescenti.</li>
            </ul>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#4c1d95', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Psicologi per quartiere a Roma
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
              {QUARTIERI.map(q => (
                <a key={q.slug} href={`/psicologi-roma-${q.slug}`}
                  style={{ padding: '10px 16px', backgroundColor: '#f5f3ff', color: '#6d28d9', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '14px', border: '1px solid #ddd6fe' }}>
                  Psicologi {q.nome}
                </a>
              ))}
            </div>
          </section>

          {annunci[2] && (
            <section style={{ marginBottom: '40px' }}>
              <h3 style={{ color: '#4c1d95', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🧠 Psicologo disponibile
              </h3>
              <AnnuncioBox annuncio={annunci[2]} colore="#7c3aed" />
            </section>
          )}

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

          <div style={{ marginTop: '20px', padding: '40px', backgroundColor: '#4c1d95', borderRadius: '24px', color: 'white', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>Trova uno psicologo a Roma</h3>
            <p style={{ opacity: 0.9, marginBottom: '25px' }}>Primo appuntamento entro 3–7 giorni. Scegli il professionista più vicino a te.</p>
            <a href="/psicologi-roma" style={{ display: 'inline-block', backgroundColor: 'white', color: '#4c1d95', fontWeight: '800', textDecoration: 'none', padding: '14px 34px', borderRadius: '12px', fontSize: '16px' }}>
              VEDI TUTTI I PSICOLOGI A ROMA →
            </a>
          </div>
        </article>

        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '15px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#64748b', fontStyle: 'italic' }}>
          <strong>Nota informativa e disclaimer:</strong> I prezzi indicati in questa guida sono <em>medie di mercato</em> rilevate a Roma nel {mese} e hanno esclusivamente scopo informativo. ServiziSalute.com non effettua prestazioni mediche, non è un'agenzia di intermediazione sanitaria e non garantisce la disponibilità dei professionisti. Per emergenze psicologiche/psichiatriche chiamare il 118 o recarsi al Pronto Soccorso. Questo contenuto non costituisce parere medico, diagnosi o terapia.
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  return { props: {}, revalidate: 86400 };
}
