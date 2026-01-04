import React from 'react';

export default function FarmacieRoma() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333', lineHeight: '1.6' }}>
      {/* Header */}
      <nav style={{ padding: '15px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ fontWeight: 'bold', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute Roma</a>
        <a href="/pubblica-annuncio" style={{ backgroundColor: '#48bb78', color: '#fff', padding: '8px 15px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>Inserisci Farmacia</a>
      </nav>

      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px' }}>
        {/* H1 SEO */}
        <h1 style={{ color: '#1a365d', fontSize: '32px', marginBottom: '10px', fontWeight: '800' }}>Farmacie a Roma: Servizi, Orari e Turni</h1>
        <p style={{ fontSize: '18px', color: '#4a5568', marginBottom: '30px' }}>Trova la farmacia più vicina a te nella Capitale. Cerca per zona, disponibilità h24 e servizi di autoanalisi.</p>

        {/* TESTO SEO (Strategia Step 2) */}
        <div style={{ lineHeight: '1.8', color: '#4a5568', backgroundColor: '#f0fff4', padding: '25px', borderRadius: '12px', marginBottom: '40px', border: '1px solid #c6f6d5' }}>
          <h2 style={{ fontSize: '22px', color: '#2f855a', marginBottom: '15px' }}>Guida alle Farmacie di Roma</h2>
          <p>
            Roma dispone di una rete capillare di farmacie e parafarmacie distribuite in tutti i municipi. Dalle storiche <strong>farmacie del Centro Storico</strong> (Piazza del Popolo, Via del Corso) alle moderne strutture dei quartieri residenziali come <strong>Eur, Talenti e Monteverde</strong>.
          </p>
          <p>
            Oggi le <strong>farmacie a Roma</strong> non offrono solo medicinali, ma sono veri presidi sanitari dove è possibile effettuare: <strong>test streptococco, misurazione della pressione, autoanalisi del sangue, foratura lobi, e prenotazioni tramite CUP</strong>. Se cerchi una farmacia di turno a Roma, il nostro portale ti aiuta a individuare i professionisti più vicini con orario continuato.
          </p>
        </div>

        {/* LISTA ESEMPI */}
        <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '700' }}>Farmacie in primo piano:</h2>
        
        <div style={{ display: 'grid', gap: '20px' }}>
          <div style={{ border: '1px solid #e2e8f0', padding: '20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff' }}>
            <div>
              <h3 style={{ margin: '0 0 5px 0', color: '#2563eb', fontSize: '19px' }}>Farmacia Internazionale Piazza Barberini</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>📍 Roma Centro - Piazza Barberini (Aperta h24)</p>
              <span style={{ fontSize: '11px', background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '20px', fontWeight: '600', marginTop: '8px', display: 'inline-block' }}>SERVIZIO NOTTURNO</span>
            </div>
            <button style={{ backgroundColor: '#48bb78', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '8px', fontWeight: 'bold' }}>Contatta</button>
          </div>
        </div>

        {/* CTA PER TITOLARI (Step 3) */}
        <div style={{ marginTop: '60px', textAlign: 'center', backgroundColor: '#2f855a', color: '#fff', padding: '40px', borderRadius: '20px' }}>
          <h2 style={{ fontSize: '26px' }}>Gestisci una Farmacia a Roma?</h2>
          <p style={{ opacity: '0.9', marginBottom: '25px' }}>Rendi visibili i tuoi servizi di analisi e i tuoi orari. La pubblicazione è gratuita per i primi 12 mesi.</p>
          <a href="/pubblica-annuncio" style={{ backgroundColor: '#fff', color: '#2f855a', padding: '16px 35px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px' }}>
            Aggiungi la tua Farmacia ora
          </a>
        </div>
      </div>
    </div>
  );
}
