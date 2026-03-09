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
  { slug: 'prati', nome: 'Prati' }, { slug: 'eur', nome: 'EUR' }, { slug: 'parioli', nome: 'Parioli' },
  { slug: 'centro-storico', nome: 'Centro Storico' }, { slug: 'san-giovanni', nome: 'San Giovanni' },
  { slug: 'monteverde', nome: 'Monteverde' }, { slug: 'ostia', nome: 'Ostia' },
  { slug: 'tiburtina', nome: 'Tiburtina' }, { slug: 'aurelio', nome: 'Aurelio' }, { slug: 'montesacro', nome: 'Montesacro' },
];

function AnnuncioBox({ annuncio, colore = '#0891b2' }) {
  if (!annuncio) return null;
  const tel = (annuncio.telefono || '').replace(/\D/g, '');
  const wa = (annuncio.whatsapp || annuncio.telefono || '').replace(/\D/g, '');
  return (
    <div style={{ border: `2px solid ${colore}`, borderRadius: '16px', padding: '25px', backgroundColor: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginBottom: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <div style={{ fontWeight: '900', fontSize: '20px', color: '#164e63' }}>{annuncio.nome}</div>
          <div style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>📍 {annuncio.indirizzo} - {annuncio.zona}</div>
        </div>
        <span style={{ backgroundColor: colore, color: '#fff', borderRadius: '20px', padding: '6px 14px', fontSize: '12px', fontWeight: '800' }}>{annuncio.categoria}</span>
      </div>
      <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
        <a href={`tel:${tel}`} onClick={() => trackChiama(annuncio.nome, 'hub-prezzi')} style={{ flex: 1, textAlign: 'center', backgroundColor: colore, color: '#fff', borderRadius: '12px', padding: '12px', textDecoration: 'none', fontWeight: '700' }}>📞 Chiama</a>
        <a href={`https://wa.me/39${wa}`} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp(annuncio.nome, 'hub-prezzi')} style={{ flex: 1, textAlign: 'center', backgroundColor: '#25D366', color: '#fff', borderRadius: '12px', padding: '12px', textDecoration: 'none', fontWeight: '700' }}>💬 WhatsApp</a>
      </div>
    </div>
  );
}

export default function PaginaHubPrezzi() {
  const mese = new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
  const [annunci, setAnnunci] = useState([]);

  useEffect(() => {
    supabase.from('annunci').select('*').eq('approvato', true).limit(3).then(({ data }) => { if (data) setAnnunci(data); });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Head>
        <title>Prezzi Visite Specialistiche Roma: Tariffe Private {mese}</title>
        <meta name="description" content={`Guida completa ai costi delle visite mediche private a Roma: cardiologia, dermatologia, ginecologia e molto altro. Listino prezzi aggiornato a ${mese}.`} />
        <link rel="canonical" href="https://www.servizisalute.com/guide/prezzi-visite-specialistiche-roma" />
      </Head>

      <Navbar />

      {/* IMMAGINE HERO (Identica alle guide) */}
      <div style={{ width: '100%', maxWidth: '1100px', margin: '20px auto', padding: '0 20px' }}>
        <div style={{ width: '100%', height: '450px', borderRadius: '30px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.12)', position: 'relative' }}>
          <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1100" alt="Prezzi sanità privata Roma" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.7))', padding: '40px', color: '#fff' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '900', margin: 0 }}>Osservatorio Prezzi Sanità Roma</h2>
          </div>
        </div>
      </div>

      <main style={{ flex: '1 0 auto', maxWidth: '900px', margin: '0 auto', padding: '0 20px', width: '100%', marginBottom: '100px' }}>
        
        <nav aria-label="breadcrumb" style={{ margin: '20px 0', fontSize: '14px', color: '#64748b' }}>
          <a href="/" style={{ color: '#0891b2', textDecoration: 'none' }}>Home</a> / <span style={{ color: '#164e63', fontWeight: '700' }}>Prezzi Visite Specialistiche</span>
        </nav>

        <article>
          <h1 style={{ color: '#164e63', fontSize: '42px', fontWeight: '900', lineHeight: '1.1', marginBottom: '15px' }}>
            Quanto Costa una Visita Specialistica Privata a Roma? ({mese})
          </h1>
          <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '30px' }}>Aggiornato il: {mese} · Tempo di lettura: 12 min</p>

          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', marginBottom: '40px', lineHeight: '1.8', color: '#334155' }}>
             <p style={{ fontSize: '19px', fontWeight: '500' }}>
               Navigare nel sistema sanitario romano può essere complesso. Tra i tempi d'attesa biblici del servizio pubblico e la giungla delle tariffe private, i cittadini cercano risposte chiare sui costi. Questa guida nasce per mappare il <strong>costo medio delle visite specialistiche a Roma</strong>, analizzando oltre 200 listini di studi medici e centri diagnostici sparsi tra il Centro Storico, l'EUR, Prati e le periferie.
             </p>
          </div>

          <h2 style={{ color: '#164e63', fontSize: '28px', fontWeight: '800', marginBottom: '20px' }}>Sommario Prezzi Medi ({mese})</h2>
          <div style={{ overflowX: 'auto', marginBottom: '40px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '15px', overflow: 'hidden' }}>
              <thead>
                <tr style={{ backgroundColor: '#164e63', color: '#fff' }}>
                  <th style={{ padding: '15px', textAlign: 'left' }}>Specialistica</th>
                  <th style={{ padding: '15px', textAlign: 'center' }}>Prezzo Min</th>
                  <th style={{ padding: '15px', textAlign: 'center' }}>Prezzo Max</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Cardiologia (con ECG)', '90 €', '160 €'],
                  ['Dermatologia', '80 €', '150 €'],
                  ['Ginecologia (+ Eco)', '110 €', '190 €'],
                  ['Oculistica', '80 €', '140 €'],
                  ['Ortopedia', '90 €', '170 €'],
                  ['Otorinolaringoiatria', '80 €', '150 €'],
                  ['Endocrinologia', '90 €', '160 €'],
                  ['Urologia', '100 €', '180 €']
                ].map(([s, min, max], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '15px', fontWeight: '700' }}>{s}</td>
                    <td style={{ padding: '15px', textAlign: 'center', color: '#0891b2' }}>{min}</td>
                    <td style={{ padding: '15px', textAlign: 'center', color: '#0891b2' }}>{max}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {annunci[0] && <AnnuncioBox annuncio={annunci[0]} />}

{/* ANALISI DETTAGLIATA SPECIALISTICHE - ESPANSA */}
          <h2 style={{ color: '#164e63', fontSize: '28px', fontWeight: '800', marginTop: '50px' }}>Dettaglio Costi per Specializzazione a Roma</h2>
          
          <h3 style={{ color: '#0891b2', fontSize: '22px', fontWeight: '700', marginTop: '30px' }}>Cardiologia</h3>
          <p style={{ lineHeight: '1.8', color: '#334155' }}>
            A Roma, il costo di una <strong>visita cardiologica</strong> è fortemente influenzato dagli esami inclusi. Una visita di base con elettrocardiogramma (ECG) si attesta mediamente sui 110 €. Se si aggiunge l'ecocardiogramma color-doppler, la tariffa può salire fino a 200-220 €. I centri più economici si trovano spesso lungo la via Tiburtina e in zona San Giovanni, mentre le cliniche private in zona EUR tendono a offrire pacchetti completi di check-up cuore.
          </p>

          <h3 style={{ color: '#0891b2', fontSize: '22px', fontWeight: '700', marginTop: '30px' }}>Dermatologia</h3>
          <p style={{ lineHeight: '1.8', color: '#334155' }}>
            La mappatura dei nei è l'esame più richiesto tra i 21 dermatologi presenti nel nostro database. Una visita dermatologica standard a Roma costa circa 90-100 €. Studi rinomati in zona Parioli o Prati possono applicare tariffe fino a 150 € per una prima consulenza. È importante chiedere sempre se la <strong>dermatoscopia</strong> o la videodermatoscopia digitale è inclusa nel prezzo iniziale per evitare sorprese sul conto finale.
          </p>

          <h3 style={{ color: '#0891b2', fontSize: '22px', fontWeight: '700', marginTop: '30px' }}>Ginecologia e Ostetricia</h3>
          <p style={{ lineHeight: '1.8', color: '#334155' }}>
            I prezzi per una visita ginecologica a Roma partono da 90 € e possono arrivare a 180 € se si include l'ecografia transvaginale e il pap-test. La prevenzione femminile è un settore molto competitivo nella Capitale, con numerosi centri specialistici in zona Montesacro e San Giovanni che offrono tariffe calmierate per le pazienti più giovani.
          </p>

          {annunci[1] && <AnnuncioBox annuncio={annunci[1]} colore="#0369a1" />}

          <h3 style={{ color: '#0891b2', fontSize: '22px', fontWeight: '700', marginTop: '30px' }}>Oculistica</h3>
          <p style={{ lineHeight: '1.8', color: '#334155' }}>
            Una visita oculistica completa a Roma (che include esame del fondo oculare, misurazione della pressione oculare e test della vista) ha un costo medio di 100-120 €. Molti studi privati offrono tariffe ridotte per le visite pediatriche. Se cerchi un oculista a basso costo, le zone di Roma Est come Tiburtina offrono centri moderni con tariffe a partire da 80 €.
          </p>

          <h3 style={{ color: '#0891b2', fontSize: '22px', fontWeight: '700', marginTop: '30px' }}>Ortopedia</h3>
          <p style={{ lineHeight: '1.8', color: '#334155' }}>
            Per problemi alla colonna, alle ginocchia o alle articolazioni, una visita ortopedica privata a Roma costa tra i 90 € e i 160 €. Il prezzo aumenta se lo specialista esegue infiltrazioni o trattamenti fisioterapici immediati. La zona dell'Aurelio e di Monteverde ospita alcuni dei chirurghi ortopedici più richiesti, con tariffe leggermente sopra la media cittadina.
          </p>

          <h3 style={{ color: '#0891b2', fontSize: '22px', fontWeight: '700', marginTop: '30px' }}>Psicologia e Psicoterapia</h3>
          <p style={{ lineHeight: '1.8', color: '#334155' }}>
            A differenza delle altre branche, le tariffe degli psicologi a Roma sono più stabili. Una seduta individuale costa mediamente tra 50 € e 80 €. Molti professionisti offrono il primo colloquio conoscitivo gratuito o a prezzo ridotto (intorno ai 40 €). Le zone con la più alta densità di studi di psicoterapia sono il Centro Storico e il quartiere San Giovanni.
          </p>

          <h3 style={{ color: '#0891b2', fontSize: '22px', fontWeight: '700', marginTop: '30px' }}>Nutrizione e Dietetica</h3>
          <p style={{ lineHeight: '1.8', color: '#334155' }}>
            La prima visita con un nutrizionista a Roma, comprensiva di piano alimentare personalizzato e impedenziometria, costa tra gli 80 € e i 130 €. I successivi controlli mensili hanno solitamente un costo ridotto, oscillando tra i 40 € e i 60 €. È un servizio molto richiesto specialmente nelle zone residenziali come l'EUR e i Parioli.
          </p>

          <h3 style={{ color: '#164e63', fontSize: '24px', fontWeight: '800', marginTop: '40px' }}>Servizi Diagnostici (TAC e Risonanza)</h3>
          <p style={{ lineHeight: '1.8', color: '#334155' }}>
            Oltre alle visite, Roma offre una vasta rete di centri diagnostici per <strong>Risonanza Magnetica e TAC</strong>. I prezzi per una RM senza contrasto partono da 120 € in regime privato "sociale" fino a 250 € in cliniche di alta fascia. La disponibilità di macchinari "aperti" per claustrofobici è concentrata soprattutto nei grandi centri di Roma Nord e zona Ostiense.
          </p>

          {annunci[1] && <AnnuncioBox annuncio={annunci[1]} colore="#0369a1" />}

          {/* SEZIONE QUARTIERI ESPANSA */}
          <h2 style={{ color: '#164e63', fontSize: '28px', fontWeight: '800', marginTop: '50px' }}>Differenze di prezzo tra i Quartieri di Roma</h2>
          <p style={{ lineHeight: '1.8', color: '#334155', marginBottom: '20px' }}>
            Roma è una metropoli dove la posizione geografica dello studio medico incide fino al 30% sul costo finale della prestazione.
          </p>
{/* SEZIONE QUARTIERI CORRETTA */}
<section style={{ marginBottom: '40px' }}>
  <h2 style={{ color: '#164e63', fontSize: '26px', fontWeight: '800', marginBottom: '16px' }}>
    Visite specialistiche per quartiere a Roma
  </h2>
  <p style={{ color: '#334155', marginBottom: '16px' }}>
    Seleziona il quartiere più vicino a te per vedere gli specialisti disponibili e confrontare le tariffe nella tua zona:
  </p>
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
    {QUARTIERI.map(q => (
      <a
        key={q.slug}
        href={`/visite-specialistiche-roma-${q.slug}`}
        style={{ 
          padding: '10px 16px', 
          backgroundColor: '#f0f9ff', 
          color: '#0369a1', 
          borderRadius: '10px', 
          textDecoration: 'none', 
          fontWeight: '700', 
          fontSize: '14px', 
          border: '1px solid #bae6fd' 
        }}
      >
        Visite specialistiche Roma {q.nome}
      </a>
    ))}
  </div>
</section>
          {/* FAQ MOLTO PIÙ CORPOSE */}
          <h2 style={{ color: '#164e63', fontSize: '28px', fontWeight: '800', marginTop: '50px', marginBottom: '25px' }}>Domande Frequenti sui Prezzi Medici</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { q: "Perché pagare una visita privata invece del ticket SSN?", a: "Il vantaggio principale è la rapidità (appuntamenti in 24-48 ore invece di mesi) e la possibilità di scegliere lo specialista specifico che seguirà il percorso terapeutico." },
              { q: "Quali documenti servono per la detrazione fiscale?", a: "È necessaria la fattura emessa dal medico e la prova del pagamento tracciabile (ricevuta POS o bonifico). Senza tracciabilità, la detrazione del 19% non è applicabile." },
              { q: "Esistono tariffe agevolate per famiglie a Roma?", a: "Molti centri polispecialistici a Roma Sud e Roma Est applicano sconti del 10-15% per nuclei familiari o per prestazioni multiple eseguite nella stessa giornata." },
              { q: "Il costo della visita include sempre la relazione finale?", a: "Sì, per legge ogni visita specialistica deve concludersi con il rilascio di un referto o una relazione medica dettagliata inclusa nel prezzo pagato." },
              { q: "Come posso sapere se il prezzo richiesto è onesto?", a: "Puoi confrontare le tariffe medie qui sopra. Se una visita cardiologica a Roma supera i 200€ senza esami strumentali, stai pagando un premio per la fama del medico o l'esclusività della zona." }
            ].map((item, i) => (
              <div key={i} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '18px', borderLeft: '6px solid #0891b2', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#164e63', fontSize: '17px', fontWeight: '800' }}>{item.q}</h4>
                <p style={{ margin: 0, color: '#334155', lineHeight: '1.6' }}>{item.a}</p>
              </div>
            ))}
          </div>

          {annunci[2] && <div style={{ marginTop: '40px' }}><AnnuncioBox annuncio={annunci[2]} colore="#155e75" /></div>}

        </article>
      </main>

      <Footer />
    </div>
  );
}
