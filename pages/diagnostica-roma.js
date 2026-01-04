import React from 'react';

export default function DiagnosticaRoma() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', lineHeight: '1.6' }}>
      {/* Header */}
      <nav style={{ padding: '15px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ fontWeight: 'bold', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute Roma</a>
        <a href="/pubblica-annuncio" style={{ backgroundColor: '#48bb78', color: '#fff', padding: '8px 15px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>Inserisci Centro</a>
      </nav>

      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        {/* H1 SEO */}
        <h1 style={{ color: '#1a365d', fontSize: '32px', marginBottom: '10px', fontWeight: '800' }}>Centri Diagnostici e Analisi a Roma</h1>
        <p style={{ fontSize: '18px', color: '#4a5568', marginBottom: '30px' }}>Trova i migliori laboratori di analisi, centri di radiologia e diagnostica per immagini nella Capitale.</p>

        {/* TESTO SEO (Strategia Step 2) */}
        <div style={{ lineHeight: '1.8', color: '#4a5568', backgroundColor: '#fdf2f2', padding: '25px', borderRadius: '12px', marginBottom: '40px', border: '1px solid #fed7d7' }}>
          <h2 style={{ fontSize: '22px', color: '#c53030', marginBottom: '15px' }}>Esami Diagnostici e Laboratori a Roma</h2>
          <p>
            Effettuare esami in tempi brevi è fondamentale per la salute. A Roma esistono numerosi <strong>centri diagnostici d'eccellenza</strong> convenzionati e privati distribuiti tra <strong>Roma Sud (Eur, Laurentina), Roma Nord (Corso Francia, Flaminio) e il Centro Storico</strong>.
          </p>
          <p>
            Sia che tu debba prenotare una <strong>Risonanza Magnetica, una TAC, un'Ecografia</strong> o semplici <strong>analisi del sangue</strong>, il nostro portale ti aiuta a trovare la struttura più vicina con le liste d'attesa più brevi. Molti centri a Roma offrono anche il servizio di <strong>referti online</strong> per consultare i risultati comodamente da casa.
          </p>
        </div>

        {/* LISTA ESEMPI */}
        <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '700' }}>Centri in evidenza:</h2>
        
        <div style={{ display: 'grid', gap: '20px' }}>
          <div style={{ border: '1px solid #e2e8f0', padding: '20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff' }}>
            <div>
              <h3 style={{ margin: '0 0 5px 0', color: '#2563eb', fontSize: '19px' }}>Centro Analisi Trastevere</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>📍 Roma (Trastevere) - Viale di Trastevere</p>
              <span style={{ fontSize: '11px', background: '#fed7d7', color: '#c53030', padding: '4px 10px', borderRadius: '20px', fontWeight: '600', marginTop: '8px', display: 'inline-block' }}>RISULTATI IN 24H</span>
            </div>
            <button style={{ backgroundColor: '#48bb78', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '8px', fontWeight: 'bold' }}>Prenota</button>
          </div>
        </div>

        {/* CTA PER TITOLARI (Step 3) */}
        <div style={{ marginTop: '60px', textAlign: 'center', backgroundColor: '#c53030', color: '#fff', padding: '40px', borderRadius: '20px' }}>
          <h2 style={{ fontSize: '26px' }}>Dirigi un Centro Diagnostico a Roma?</h2>
          <p style={{ opacity: '0.9', marginBottom: '25px' }}>Riduci le liste d'attesa e ricevi prenotazioni dirette. Posizionati nelle ricerche locali della Capitale.</p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#fff', color: '#c53030', padding: '16px 35px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px' }}>
            Inserisci la tua struttura
          </a>
        </div>
      </div>
    </div>
  );
}
