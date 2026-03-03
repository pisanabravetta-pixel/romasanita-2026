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
  { q: 'Quanto costa un\'ecografia privata a Roma?', a: 'Il costo di un\'ecografia privata a Roma varia tra 50 € e 180 €, a seconda del distretto esaminato. Un\'ecografia addome completo costa 80–120 €; quella tiroidea 60–80 €; quella muscolo-tendinea 70–100 €.' },
  { q: 'Serve la ricetta del medico per fare un\'ecografia privata?', a: 'In regime privato non è necessaria l\'impegnativa del medico di base. Puoi prenotare direttamente la prestazione che ti serve. Se vuoi farla in convenzione SSN, l\'impegnativa è obbligatoria.' },
  { q: 'Quanto costa un\'ecografia in SSN a Roma?', a: 'Con impegnativa del medico di base, il ticket SSN per un\'ecografia varia da 14 € a 36 € a seconda della tipologia. I tempi di attesa a Roma superano spesso i 60–90 giorni.' },
  { q: 'Come ci si prepara a un\'ecografia addominale?', a: 'Per l\'ecografia addome completo è necessario essere a digiuno da almeno 6 ore e aver limitato gas e flatulenza nei giorni precedenti (no legumi, no bibite gassate). Per l\'ecografia pelvica la vescica deve essere piena.' },
  { q: 'Quanto dura un\'ecografia?', a: 'La durata varia in base al distretto: 10–15 minuti per tiroide o testicoli; 20–30 minuti per addome completo; 30–45 minuti per eco-color-doppler dei vasi.' },
];

function AnnuncioBox({ annuncio, colore = '#0891b2' }) {
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
        <span style={{ backgroundColor: colore, color: '#fff', borderRadius: '20px', padding: '4px 12px', fontSize: '12px', fontWeight: '700', whiteSpace: 'nowrap' }}>Diagnostica</span>
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
        {tel && (
          <a href={`tel:${tel}`} onClick={() => trackChiama(annuncio.nome, 'guida-ecografia')}
            style={{ flex: 1, minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: colore, color: '#fff', borderRadius: '10px', padding: '10px 14px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
            📞 Chiama ora
          </a>
        )}
        {wa && (
          <a href={`https://wa.me/39${wa}?text=Salve%2C+vi+contatto+per+un%27ecografia+vista+su+ServiziSalute.com`}
            target="_blank" rel="noopener noreferrer"
            onClick={() => trackWhatsApp(annuncio.nome, 'guida-ecografia')}
            style={{ flex: 1, minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#25D366', color: '#fff', borderRadius: '10px', padding: '10px 14px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
            💬 WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}

export default function GuidaEcografia() {
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
    headline: `Costo Ecografia Privata Roma: Prezzi per Distretto (${mese})`,
    description: `Guida aggiornata a ${mese} ai costi delle ecografie private a Roma: addome, tiroide, ginecologica, muscolo-tendinea. Confronto SSN e preparazione.`,
    url: 'https://www.servizisalute.com/guide/costo-ecografia-privata-roma',
    publisher: { '@type': 'Organization', name: 'ServiziSalute', url: 'https://www.servizisalute.com' },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>Ecografia Privata Roma: Costi €50–€180 | Guida {mese}</title>
        <meta name="description" content={`Quanto costa un'ecografia privata a Roma? Prezzi aggiornati a ${mese}: addome 80–120 €, tiroide 60–80 €, pelvica 70–100 €. Senza ricetta, appuntamento in 24–48 ore.`} />
        <link rel="canonical" href="https://www.servizisalute.com/guide/costo-ecografia-privata-roma" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:title" content={`Ecografia Privata Roma: Costi €50–€180 | Guida ${mese}`} />
        <meta property="og:description" content={`Prezzi ecografie private a Roma per distretto corporeo. Addome, tiroide, muscolo-tendinea, ginecologica.`} />
        <meta property="og:url" content="https://www.servizisalute.com/guide/costo-ecografia-privata-roma" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://www.servizisalute.com/images/costo-ecografia-privata-roma.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <Navbar />

      <div style={{ width: '100%', maxWidth: '1100px', margin: '20px auto', padding: '0 20px' }}>
        <div style={{ width: '100%', height: '400px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <img
            src="/images/costo-ecografia-privata-roma.png"
            alt="Ecografia addominale privata a Roma - sonda ecografica su addome"
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
          <span style={{ color: '#0891b2' }}>Costo Ecografia Privata Roma</span>
        </nav>

        <article itemScope itemType="https://schema.org/Article">
          <h1 itemProp="headline" style={{ color: '#164e63', fontSize: '36px', fontWeight: '900', lineHeight: '1.2', marginBottom: '10px' }}>
            Ecografia Privata a Roma: Costi per Distretto e Come Prenotare ({mese})
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
            Aggiornato: {mese} · Lettura: 4 min
          </p>

          <div style={{ backgroundColor: '#ecfeff', padding: '25px', borderRadius: '20px', borderLeft: '6px solid #0891b2', marginBottom: '35px' }}>
            <p style={{ margin: 0, color: '#164e63', fontSize: '18px', lineHeight: '1.7' }}>
              💡 <strong>In breve:</strong> Un'ecografia privata a Roma costa tra <strong>50 € e 180 €</strong> a seconda del tipo. Non serve la ricetta del medico. L'appuntamento si ottiene in 24–48 ore contro i 60–90 giorni del SSN.
            </p>
          </div>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#164e63', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Prezzi per tipo di ecografia — {mese}
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#164e63', color: '#fff' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Tipo di Ecografia</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center' }}>Privato Roma</th>
                    <th style={{ padding: '12px 16px', textAlign: 'center', borderRadius: '0 8px 0 0' }}>SSN (ticket)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Ecografia addome completo', '80–120 €', '14–36 €'],
                    ['Ecografia addome superiore', '60–90 €', '14–30 €'],
                    ['Ecografia tiroide e paratiroidi', '60–80 €', '14–30 €'],
                    ['Ecografia ginecologica pelvica', '70–100 €', '14–36 €'],
                    ['Ecografia mammaria', '60–90 €', '14–36 €'],
                    ['Ecografia muscolo-tendinea', '70–100 €', '14–36 €'],
                    ['Eco-color-doppler tronchi sovra-aortici', '90–150 €', '~36 €'],
                    ['Ecografia testicolare', '60–80 €', '14–30 €'],
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
              * Prezzi indicativi di mercato rilevati a Roma nel {mese}. Le tariffe SSN richiedono impegnativa del medico di base.
            </p>
          </section>

          {annunci[0] && (
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#164e63', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🔬 Centro diagnostico disponibile a Roma
              </h3>
              <AnnuncioBox annuncio={annunci[0]} colore="#0891b2" />
            </section>
          )}

          <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px', marginBottom: '40px' }}>
            <h2 style={{ color: '#164e63', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Come prepararsi all'ecografia
            </h2>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li><strong>Ecografia addome completo:</strong> digiuno di 6 ore, evitare legumi e bibite gassate 24 ore prima.</li>
              <li><strong>Ecografia pelvica/ginecologica (sovrapubica):</strong> vescica piena (bere 1 litro d'acqua 1 ora prima, senza urinare).</li>
              <li><strong>Ecografia ginecologica transvaginale:</strong> vescica vuota.</li>
              <li><strong>Ecografia tiroide, mammaria, muscolo-tendinea:</strong> nessuna preparazione richiesta.</li>
              <li><strong>Eco-doppler arti inferiori:</strong> calze o gambaletti da rimuovere prima dell'esame.</li>
            </ul>
          </section>

          <section style={{ backgroundColor: '#fff7ed', borderRadius: '16px', padding: '24px', marginBottom: '40px', borderLeft: '5px solid #f59e0b' }}>
            <h2 style={{ color: '#92400e', fontSize: '22px', fontWeight: '800', marginBottom: '12px' }}>
              ⚖️ Pubblico vs Privato: ecografia senza ricetta
            </h2>
            <p style={{ color: '#334155', lineHeight: '1.8', margin: '0 0 12px 0' }}>
              Con il <strong>SSN</strong> il ticket è economico (14–36 €), ma <strong>i tempi di attesa a Roma superano spesso i 60–90 giorni</strong> anche per prestazioni urgenti in classe D (differibile 30 giorni). Se hai un problema urgente da monitorare (nodulo tiroideo, dolore addominale acuto), aspettare mesi non è accettabile.
            </p>
            <p style={{ color: '#334155', lineHeight: '1.8', margin: 0 }}>
              In ambito <strong>privato</strong> l'appuntamento si ottiene in <strong>24–48 ore</strong>, senza impegnativa, con referto consegnato in giornata.
            </p>
          </section>

          {annunci[1] && (
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#164e63', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🔬 Altro centro diagnostico nella tua zona
              </h3>
              <AnnuncioBox annuncio={annunci[1]} colore="#0891b2" />
            </section>
          )}

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#164e63', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Centri ecografia per quartiere a Roma
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
              {QUARTIERI.map(q => (
                <a key={q.slug} href={`/diagnostica-roma-${q.slug}`}
                  style={{ padding: '10px 16px', backgroundColor: '#ecfeff', color: '#0e7490', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '14px', border: '1px solid #a5f3fc' }}>
                  Diagnostica {q.nome}
                </a>
              ))}
            </div>
          </section>

          {annunci[2] && (
            <section style={{ marginBottom: '40px' }}>
              <h3 style={{ color: '#164e63', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🔬 Centro diagnostico disponibile
              </h3>
              <AnnuncioBox annuncio={annunci[2]} colore="#0891b2" />
            </section>
          )}

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#164e63', fontSize: '26px', fontWeight: '800', marginBottom: '20px' }}>
              Domande frequenti (FAQ)
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {faqItems.map((item, i) => (
                <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '18px 20px', borderLeft: '4px solid #0891b2' }}>
                  <h3 style={{ color: '#164e63', fontSize: '16px', fontWeight: '800', margin: '0 0 8px 0' }}>{item.q}</h3>
                  <p style={{ color: '#334155', lineHeight: '1.7', margin: 0, fontSize: '15px' }}>{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <div style={{ marginTop: '20px', padding: '40px', backgroundColor: '#164e63', borderRadius: '24px', color: 'white', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>Prenota la tua ecografia privata a Roma</h3>
            <p style={{ opacity: 0.9, marginBottom: '25px' }}>Appuntamento in 24–48 ore. Senza ricetta. Referto in giornata.</p>
            <a href="/diagnostica-roma" style={{ display: 'inline-block', backgroundColor: 'white', color: '#164e63', fontWeight: '800', textDecoration: 'none', padding: '14px 34px', borderRadius: '12px', fontSize: '16px' }}>
              VEDI TUTTI I CENTRI DIAGNOSTICI A ROMA →
            </a>
          </div>
        </article>

        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '15px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#64748b', fontStyle: 'italic' }}>
          <strong>Nota informativa e disclaimer:</strong> I prezzi indicati in questa guida sono <em>medie di mercato</em> rilevate a Roma nel {mese} e hanno esclusivamente scopo informativo. ServiziSalute.com non effettua prestazioni diagnostiche né mediche e non garantisce la disponibilità dei centri. Questo contenuto non costituisce parere medico, diagnosi o terapia.
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  return { props: {}, revalidate: 86400 };
}
