import React from 'react';
import Head from 'next/head';

export default function GuidaDermatologia() {
  return (
    <article style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif', lineHeight: '1.8', color: '#333' }}>
      <Head>
        <title>Costo Visita Dermatologica a Roma: Tariffe Medie 2026</title>
        <meta name="robots" content="index, follow" />
      </Head>

      {/* DISCLAIMER LEGALE INIZIALE */}
      <div style={{ backgroundColor: '#fff4f4', border: '1px solid #feb2b2', padding: '15px', borderRadius: '8px', marginBottom: '30px', fontSize: '14px', color: '#9b2c2c' }}>
        <strong>AVVERTENZA LEGALE:</strong> Le informazioni contenute in questa pagina hanno carattere puramente informativo e descrittivo dei prezzi medi di mercato. <strong>Non costituiscono in alcun modo parere medico, diagnosi o suggerimento terapeutico.</strong> Per qualsiasi problema di salute, si consiglia di consultare un medico professionista.
      </div>

      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#1e3a8a', fontSize: '32px' }}>Analisi dei costi: Visita Dermatologica a Roma</h1>
        <p style={{ color: '#666' }}>Rilevazione tariffe medie del settore privato - Gennaio 2026</p>
      </header>

      <section style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '10px', borderLeft: '5px solid #2563eb', marginBottom: '30px' }}>
        <p>In base alla nostra analisi degli studi dermatologici romani, il costo per una prima visita privata oscilla mediamente tra <strong>90€ e 160€</strong>.</p>
      </section>

      <h2 style={{ color: '#1e3a8a' }}>Variabili che influenzano la tariffa</h2>
      <p>Il prezzo comunicato dalle strutture può variare in base a:</p>
      <ul>
        <li><strong>Esami complementari:</strong> Come la mappatura dei nei (dermoscopia).</li>
        <li><strong>Ubicazione dello studio:</strong> Tariffe differenziate tra i vari quartieri di Roma.</li>
        <li><strong>Specializzazione:</strong> Dermatologia clinica, estetica o oncologica.</li>
      </ul>

      <div style={{ marginTop: '40px', padding: '30px', backgroundColor: '#eff6ff', borderRadius: '15px', textAlign: 'center' }}>
        <h3>Trova un Dermatologo a Roma</h3>
        <p>Consulta l'elenco dei professionisti sanitari nel tuo quartiere.</p>
        <a href="/visite-specialistiche-roma" style={{ display: 'inline-block', padding: '12px 25px', backgroundColor: '#2563eb', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
          Vedi Specialisti
        </a>
      </div>

      {/* FOOTER LEGALE RIGOROSO */}
      <footer style={{ marginTop: '60px', paddingTop: '20px', borderTop: '2px solid #eee', fontSize: '12px', color: '#666', textAlign: 'justify' }}>
        <p><strong>Note:</strong> ServiziSalute Roma non è un centro medico e non fornisce prestazioni sanitarie. I prezzi indicati sono frutto di medie statistiche fornite a puro titolo di orientamento al cittadino. Il portale non si assume responsabilità per variazioni di prezzo o per l'operato dei medici elencati nelle directory.</p>
        <a href="/" style={{ color: '#1e3a8a', textDecoration: 'none', fontWeight: 'bold' }}>← Torna alla Home del Portale</a>
      </footer>
    </article>
  );
}
