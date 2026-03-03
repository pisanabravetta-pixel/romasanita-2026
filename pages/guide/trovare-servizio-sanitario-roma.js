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

const categoriePrincipali = [
  { slug: 'cardiologi-roma', nome: 'Cardiologi', emoji: '❤️' },
  { slug: 'dermatologi-roma', nome: 'Dermatologi', emoji: '🩺' },
  { slug: 'ginecologi-roma', nome: 'Ginecologi', emoji: '👩‍⚕️' },
  { slug: 'oculisti-roma', nome: 'Oculisti', emoji: '👁️' },
  { slug: 'dentisti-roma', nome: 'Dentisti', emoji: '🦷' },
  { slug: 'psicologi-roma', nome: 'Psicologi', emoji: '🧠' },
  { slug: 'nutrizionisti-roma', nome: 'Nutrizionisti', emoji: '🥗' },
  { slug: 'ortopedici-roma', nome: 'Ortopedici', emoji: '🦴' },
  { slug: 'diagnostica-roma', nome: 'Diagnostica', emoji: '🔬' },
  { slug: 'farmacie-roma', nome: 'Farmacie', emoji: '💊' },
];

const faqItems = [
  { q: 'Come trovare un medico specialista privato a Roma vicino a casa?', a: 'Il modo più rapido è utilizzare un portale come ServiziSalute.com che aggrega specialisti per quartiere a Roma. Puoi filtrare per categoria (cardiologo, dermatologo, ginecologo, ecc.) e per zona, vedendo subito recapito telefonico, WhatsApp e mappa.' },
  { q: 'Come prenotare una visita specialistica privata a Roma senza impegnativa?', a: 'In regime privato non è necessaria l\'impegnativa del medico di base. Puoi contattare direttamente lo specialista tramite telefono o WhatsApp e concordare data e orario.' },
  { q: 'Qual è la differenza tra visita in intramoenia e visita privata a Roma?', a: 'L\'intramoenia (libera professione intramuraria) è una visita effettuata dal medico del SSN nei locali dell\'ospedale in orario privato. I costi sono simili al privato ma è necessaria prenotazione attraverso il CUP dell\'ASL.' },
  { q: 'Come trovare una farmacia di turno notturno a Roma?', a: 'Le farmacie di turno a Roma si trovano sul sito di Federfarma Roma (farmacieaperte.it), oppure cercando su ServiziSalute.com la sezione Farmacie con filtro per quartiere. Il numero unico informativo è 1500.' },
  { q: 'Come scegliere il giusto specialista a Roma?', a: 'Verifica la specializzazione universitaria e il curriculum del professionista, leggi eventuali recensioni, controlla se la struttura è accreditata SSN o solo privata, e valuta la vicinanza geografica per evitare spostamenti lunghi.' },
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
        <span style={{ backgroundColor: colore, color: '#fff', borderRadius: '20px', padding: '4px 12px', fontSize: '12px', fontWeight: '700', whiteSpace: 'nowrap' }}>Professionista</span>
      </div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
        {tel && (
          <a href={`tel:${tel}`} onClick={() => trackChiama(annuncio.nome || annuncio.titolo, 'guida-trovare-sanitario')}
            style={{ flex: 1, minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: colore, color: '#fff', borderRadius: '10px', padding: '10px 14px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
            📞 Chiama ora
          </a>
        )}
        {wa && (
          <a href={`https://wa.me/39${wa}?text=Salve%2C+vi+contatto+per+un+servizio+sanitario+visto+su+ServiziSalute.com`}
            target="_blank" rel="noopener noreferrer"
            onClick={() => trackWhatsApp(annuncio.nome || annuncio.titolo, 'guida-trovare-sanitario')}
            style={{ flex: 1, minWidth: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: '#25D366', color: '#fff', borderRadius: '10px', padding: '10px 14px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
            💬 WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}

export default function GuidaTrovareSanitario() {
  const mese = new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
  const [annunci, setAnnunci] = useState([]);

  useEffect(() => {
    supabase
      .from('annunci')
      .select('id,nome,telefono,whatsapp,indirizzo,zona,slug')
      .eq('approvato', true)
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
    headline: `Come Trovare un Servizio Sanitario a Roma: Guida Completa (${mese})`,
    description: `Guida aggiornata a ${mese} su come trovare medici, specialisti, farmacie e centri diagnostici a Roma nel tuo quartiere, senza lunghe attese.`,
    url: 'https://www.servizisalute.com/guide/trovare-servizio-sanitario-roma',
    publisher: { '@type': 'Organization', name: 'ServiziSalute', url: 'https://www.servizisalute.com' },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>Come Trovare Medici e Specialisti a Roma | Guida {mese}</title>
        <meta name="description" content={`Come trovare medici, specialisti, farmacie e centri diagnostici a Roma per quartiere. Guida aggiornata ${mese}: consigli pratici, come prenotare, differenze pubblico/privato.`} />
        <link rel="canonical" href="https://www.servizisalute.com/guide/trovare-servizio-sanitario-roma" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:title" content={`Come Trovare Medici e Specialisti a Roma | Guida ${mese}`} />
        <meta property="og:description" content={`Trova medici, specialisti, farmacie e diagnostica a Roma vicino a te. Guida pratica aggiornata ${mese}.`} />
        <meta property="og:url" content="https://www.servizisalute.com/guide/trovare-servizio-sanitario-roma" />
        <meta property="og:image" content="https://www.servizisalute.com/images/trovare-servizio-sanitario-roma.png" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <Navbar />

      {/* IMMAGINE */}
      <div style={{ width: '100%', maxWidth: '1100px', margin: '20px auto', padding: '0 20px' }}>
        <div style={{ width: '100%', height: '400px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <img
            src="/images/trovare-servizio-sanitario-roma.webp"
            alt="Come trovare servizi sanitari a Roma - medici e specialisti per quartiere"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            onError={(e) => { e.target.src = '/images/guida-roma-salute.webp'; }}
          />
        </div>
      </div>

      <main style={{ flex: '1 0 auto', maxWidth: '850px', margin: '0 auto', padding: '0 20px', width: '100%', marginBottom: '80px' }}>

        {/* BREADCRUMB */}
        <nav aria-label="breadcrumb" style={{ marginBottom: '20px', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
          <a href="/" style={{ color: '#2563eb', textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <a href="/guide" style={{ color: '#2563eb', textDecoration: 'none' }}>Guide</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <span style={{ color: '#1e3a8a' }}>Trovare Servizi Sanitari Roma</span>
        </nav>

        <article itemScope itemType="https://schema.org/Article">
          <h1 itemProp="headline" style={{ color: '#1e3a8a', fontSize: '36px', fontWeight: '900', lineHeight: '1.2', marginBottom: '10px' }}>
            Come Trovare Medici, Specialisti e Farmacie a Roma per Quartiere ({mese})
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
            Aggiornato: {mese} · Lettura: 5 min
          </p>

          {/* BOX RIASSUNTO */}
          <div style={{ backgroundColor: '#eff6ff', padding: '25px', borderRadius: '20px', borderLeft: '6px solid #2563eb', marginBottom: '35px' }}>
            <p style={{ margin: 0, color: '#1e3a8a', fontSize: '18px', lineHeight: '1.7' }}>
              💡 <strong>In breve:</strong> Roma ha oltre <strong>1.500 professionisti sanitari privati</strong> nelle 10 zone principali. Trovare lo specialista giusto nel tuo quartiere richiede sapere dove cercare. Questa guida ti spiega come farlo in meno di 5 minuti.
            </p>
          </div>

          {/* CATEGORIE */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#1e3a8a', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Tutte le categorie di specialisti a Roma
            </h2>
            <p style={{ color: '#334155', marginBottom: '16px' }}>
              Clicca sulla categoria che ti serve per vedere tutti i professionisti disponibili a Roma:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px' }}>
              {categoriePrincipali.map(cat => (
                <a
                  key={cat.slug}
                  href={`/${cat.slug}`}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 12px', backgroundColor: '#eff6ff', color: '#1e3a8a', borderRadius: '12px', textDecoration: 'none', fontWeight: '700', fontSize: '14px', border: '1px solid #bfdbfe', textAlign: 'center', transition: 'background 0.2s' }}
                >
                  <span style={{ fontSize: '24px', marginBottom: '6px' }}>{cat.emoji}</span>
                  {cat.nome}
                </a>
              ))}
            </div>
          </section>

          {/* AD BOX 1 */}
          {annunci[0] && (
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#1e3a8a', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🩺 Professionista disponibile a Roma
              </h3>
              <AnnuncioBox annuncio={annunci[0]} colore="#2563eb" />
            </section>
          )}

          {/* COME CERCARE */}
          <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px', marginBottom: '40px' }}>
            <h2 style={{ color: '#1e3a8a', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Come cercare un medico specialista a Roma: 3 metodi
            </h2>

            <div style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '20px', marginBottom: '16px', borderLeft: '4px solid #2563eb' }}>
              <h3 style={{ color: '#1e3a8a', margin: '0 0 8px 0', fontSize: '18px' }}>① Portale online per quartiere (più veloce)</h3>
              <p style={{ margin: 0, lineHeight: '1.7' }}>
                Usa ServiziSalute.com: inserisci la categoria (es. "cardiologo"), seleziona il quartiere e ottieni subito telefono, WhatsApp e mappa del professionista. Nessuna registrazione richiesta.
              </p>
            </div>

            <div style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '20px', marginBottom: '16px', borderLeft: '4px solid #16a34a' }}>
              <h3 style={{ color: '#064e3b', margin: '0 0 8px 0', fontSize: '18px' }}>② CUP e sito della tua ASL (SSN)</h3>
              <p style={{ margin: 0, lineHeight: '1.7' }}>
                Per le prestazioni in convenzione SSN, contatta il CUP della tua ASL di appartenenza (ASL Roma 1–6) oppure utilizza il Fascicolo Sanitario Elettronico (FSE) della Regione Lazio. Tempi di attesa variabili (30–120 giorni).
              </p>
            </div>

            <div style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '20px', marginBottom: '0', borderLeft: '4px solid #f59e0b' }}>
              <h3 style={{ color: '#92400e', margin: '0 0 8px 0', fontSize: '18px' }}>③ Passaparola e recensioni online</h3>
              <p style={{ margin: 0, lineHeight: '1.7' }}>
                Chiedi al medico di base un riferimento, oppure verifica le recensioni su Google Maps. Attenzione: le valutazioni possono essere influenzate da fattori non sanitari (parcheggio, attesa in sala, ecc.).
              </p>
            </div>
          </section>

          {/* COSA VERIFICARE */}
          <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px', marginBottom: '40px' }}>
            <h2 style={{ color: '#1e3a8a', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Cosa verificare prima di prenotare
            </h2>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li><strong>Specializzazione:</strong> controlla che la specializzazione universitaria corrisponda alla prestazione di cui hai bisogno.</li>
              <li><strong>Iscrizione all'Ordine:</strong> puoi verificare l'iscrizione all'Ordine dei Medici di Roma e Provincia sul portale FNOMCeO (fnomceo.it).</li>
              <li><strong>Accreditamento SSN:</strong> alcune strutture private sono accreditate SSN e accettano sia pazienti in convenzione che privati.</li>
              <li><strong>Costo della visita:</strong> chiedi sempre il tariffario prima di prenotare, incluse eventuali prestazioni aggiuntive (ECG, ecografia, ecc.).</li>
              <li><strong>Accessibilità:</strong> verifica parcheggio, fermata metro/autobus e, se necessario, accesso per disabili.</li>
            </ul>
          </section>

          {/* AD BOX 2 */}
          {annunci[1] && (
            <section style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#1e3a8a', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🩺 Un altro professionista nella tua zona
              </h3>
              <AnnuncioBox annuncio={annunci[1]} colore="#2563eb" />
            </section>
          )}

          {/* QUARTIERI */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#1e3a8a', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
              Cerca per quartiere a Roma
            </h2>
            <p style={{ color: '#334155', marginBottom: '16px' }}>
              Seleziona il tuo quartiere per vedere tutti i professionisti sanitari disponibili nella tua zona:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
              {QUARTIERI.map(q => (
                <a
                  key={q.slug}
                  href={`/visite-specialistiche-roma-${q.slug}`}
                  style={{ padding: '10px 16px', backgroundColor: '#eff6ff', color: '#2563eb', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '14px', border: '1px solid #bfdbfe' }}
                >
                  Specialisti {q.nome}
                </a>
              ))}
            </div>
          </section>

          {/* AD BOX 3 */}
          {annunci[2] && (
            <section style={{ marginBottom: '40px' }}>
              <h3 style={{ color: '#1e3a8a', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                🩺 Specialista disponibile
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
            <h3 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>Trova il tuo specialista a Roma adesso</h3>
            <p style={{ opacity: 0.9, marginBottom: '25px' }}>Oltre 1.500 professionisti in 10 quartieri di Roma. Contatto diretto, nessuna intermediazione.</p>
            <a href="/" style={{ display: 'inline-block', backgroundColor: 'white', color: '#1e3a8a', fontWeight: '800', textDecoration: 'none', padding: '14px 34px', borderRadius: '12px', fontSize: '16px' }}>
              CERCA SPECIALISTA A ROMA →
            </a>
          </div>
        </article>

        
        {/* GUIDE CORRELATE */}
        <GuideCorrelate
          slugCorrente="trovare-servizio-sanitario-roma"
          slugCorrelati={["check-up-completo-roma", "analisi-sangue-private-roma", "costo-visita-cardiologica-roma", "costo-visita-ginecologica-roma"]}
        />

        {/* DISCLAIMER LEGALE */}
        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '15px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#64748b', fontStyle: 'italic' }}>
          <strong>Nota informativa e disclaimer:</strong> ServiziSalute.com è un portale di annunci che mette in contatto utenti e professionisti sanitari a Roma. Non effettua prestazioni mediche, non è un'agenzia di intermediazione sanitaria e non garantisce la disponibilità dei professionisti. Le informazioni contenute in questa guida hanno scopo puramente informativo. Per emergenze sanitarie chiamare il 118. Questo contenuto non costituisce parere medico, diagnosi o terapia. Per verificare l'iscrizione all'Ordine di un medico, consultare il portale ufficiale FNOMCeO (fnomceo.it).
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  return { props: {}, revalidate: 86400 };
}
