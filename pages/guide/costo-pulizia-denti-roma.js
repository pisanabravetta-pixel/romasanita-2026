import React from 'react';
import Head from 'next/head';

export default function GuidaDentista() {
  return (
    <article style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif', lineHeight: '1.8', color: '#333' }}>
      <Head>
        <title>Costo Pulizia Denti Roma: Prezzi Medi e Tariffe 2026</title>
      </Head>

      <div style={{ backgroundColor: '#fff4f4', border: '1px solid #feb2b2', padding: '15px', borderRadius: '8px', marginBottom: '30px', fontSize: '14px', color: '#9b2c2c' }}>
        <strong>AVVERTENZA LEGALE:</strong> Le informazioni contenute in questa pagina sono puramente informative sui prezzi medi di mercato. <strong>Non costituiscono parere medico o diagnosi.</strong> Consultare sempre un odontoiatra professionista.
      </div>

      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#1e3a8a', fontSize: '32px' }}>Quanto costa una Pulizia dei Denti a Roma?</h1>
        <p style={{ color: '#666' }}>Analisi tariffe medie odontoiatriche - Gennaio 2026</p>
      </header>

      <section style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '10px', borderLeft: '5px solid #2563eb', marginBottom: '30px' }}>
        <p>Il costo medio per una seduta di igiene orale professionale (ablazione tartaro) a Roma varia solitamente tra <strong>70€ e 120€</strong>.</p>
      </section>

      <h2 style={{ color: '#1e3a8a' }}>Fattori che influenzano il prezzo</h2>
      <ul>
        <li>Utilizzo di tecnologie come l'Airflow (getto di bicarbonato).</li>
        <li>Eventuale applicazione di fluoro o paste lucidanti.</li>
        <li>Ubicazione dello studio dentistico.</li>
      </ul>

      <div style={{ marginTop: '40px', padding: '30px', backgroundColor: '#eff6ff', borderRadius: '15px', textAlign: 'center' }}>
        <h3>Cerchi un Dentista a Roma?</h3>
        <a href="/dentisti-roma" style={{ display: 'inline-block', padding: '12px 25px', backgroundColor: '#2563eb', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
          Vedi l'elenco completo
        </a>
      </div>

      <footer style={{ marginTop: '60px', paddingTop: '20px', borderTop: '2px solid #eee', fontSize: '12px', color: '#666' }}>
        <p><strong>Note:</strong> ServiziSalute Roma è un portale informativo e non eroga prestazioni sanitarie. I prezzi sono stime basate su medie di mercato.</p>
        <a href="/" style={{ color: '#1e3a8a', textDecoration: 'none' }}>← Torna alla Home</a>
      </footer>
    </article>
  );
}
