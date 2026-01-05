import React from 'react';
import Head from 'next/head';

export default function GuidaCostoDenti() {
  return (
    <article style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif', lineHeight: '1.8', color: '#333' }}>
      <Head>
        <title>Quanto costa la Pulizia dei Denti a Roma? | Prezzi Medi 2026</title>
        <meta name="description" content="Scopri il costo medio di una pulizia dei denti professionale a Roma. Guida ai prezzi nei quartieri e consigli su come scegliere il miglior studio dentistico." />
      </Head>

      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#1e3a8a', fontSize: '32px', lineHeight: '1.2' }}>Quanto costa una pulizia dei denti professionale a Roma?</h1>
        <p style={{ fontStyle: 'italic', color: '#666' }}>Ultimo aggiornamento: Gennaio 2026 • Redazione ServiziSalute Roma</p>
      </header>

      {/* BOX DISCLAIMER - IMPORTANTE PER L'AUTORITÀ */}
      <section style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '10px', borderLeft: '5px solid #2563eb', marginBottom: '30px' }}>
        <p style={{ margin: 0 }}><strong>Nota Informativa:</strong> Le informazioni contenute in questa guida hanno scopo puramente informativo e non sostituiscono in alcun modo il parere o la diagnosi di un medico professionista.</p>
      </section>

      <p>Mantenere un'igiene orale corretta è fondamentale per prevenire patologie più gravi. La detartrasi (comunemente chiamata pulizia dei denti) è l'intervento di prevenzione più richiesto. Ma qual è il <strong>prezzo medio negli studi dentistici di Roma</strong>?</p>

      <h2 style={{ color: '#1e3a8a' }}>Prezzi medi per zona a Roma (2026)</h2>
      <p>A Roma, il costo di una seduta di igiene professionale può variare sensibilmente a seconda del posizionamento dello studio e delle tecnologie offerte:</p>
      <ul style={{ paddingLeft: '20px' }}>
        <li><strong>Roma Centro (Prati, Monti, Centro Storico):</strong> 80€ - 130€</li>
        <li><strong>Roma Nord (Parioli, Flaminio, Cassia):</strong> 90€ - 140€</li>
        <li><strong>Roma Sud (EUR, Garbatella, San Giovanni):</strong> 70€ - 110€</li>
        <li><strong>Zone Periferiche:</strong> 55€ - 85€</li>
      </ul>

      <h2 style={{ color: '#1e3a8a', marginTop: '30px' }}>Cosa include solitamente la seduta?</h2>
      <p>Oltre alla rimozione del tartaro tramite ultrasuoni, molti studi a Roma includono nel prezzo:</p>
      <ul style={{ paddingLeft: '20px' }}>
        <li><strong>Air-flow:</strong> Un getto di aria, acqua e bicarbonato per rimuovere le macchie superficiali.</li>
        <li><strong>Lucidatura (Polishing):</strong> Applicazione di una pasta specifica per rendere i denti lisci.</li>
        <li><strong>Screening carie:</strong> Un controllo visivo per identificare eventuali problemi futuri.</li>
      </ul>

      {/* BOX CALL TO ACTION - TRASFORMA IL LETTORE IN UTENTE */}
      <div style={{ marginTop: '40px', padding: '30px', backgroundColor: '#eff6ff', borderRadius: '15px', textAlign: 'center', border: '2px dashed #2563eb' }}>
        <h3 style={{ marginTop: 0, color: '#1e3a8a' }}>Hai bisogno di una pulizia dei denti?</h3>
        <p>Trova lo studio dentistico più vicino a te nei quartieri di Roma e prenota una visita.</p>
        <a href="/dentisti-roma" style={{ display: 'inline-block', padding: '15px 30px', backgroundColor: '#2563eb', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px' }}>
          Vedi i Dentisti disponibili a Roma
        </a>
      </div>

      <footer style={{ marginTop: '60px', paddingTop: '20px', borderTop: '1px solid #eee', fontSize: '13px', color: '#777', textAlign: 'justify' }}>
        <p><strong>Disclaimer:</strong> ServiziSalute Roma è un portale di annunci e informazione sanitaria. Non siamo una struttura medica e non eroghiamo direttamente prestazioni sanitarie. I prezzi indicati sono stime basate su medie di mercato e possono variare in base al singolo professionista.</p>
      </footer>
    </article>
  );
}
