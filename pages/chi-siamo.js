import React from 'react';

export default function ChiSiamo() {
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: '50px auto', padding: '0 20px', lineHeight: '1.6', color: '#333' }}>
      <a href="/" style={{ color: '#3182ce', textDecoration: 'none', fontWeight: 'bold' }}>← Torna alla Home</a>
      
      <h1 style={{ marginTop: '30px', borderBottom: '2px solid #3182ce', paddingBottom: '10px', color: '#2c5282' }}>Chi Siamo</h1>
      
      <p style={{ fontSize: '18px', color: '#4a5568' }}>
        <strong>ServiziSalute</strong> è il primo portale di annunci indipendente dedicato interamente al settore sanitario nella città di <strong>Roma</strong>.
      </p>

      <h3 style={{ color: '#2c5282', marginTop: '30px' }}>La nostra missione</h3>
      <p>
        Nasciamo con un obiettivo chiaro: semplificare l'incontro tra i cittadini romani e i professionisti della salute. 
        Spesso trovare una farmacia di turno, un dentista specializzato o un centro diagnostico in una zona specifica di Roma può essere complicato. 
        ServiziSalute centralizza queste informazioni in un'unica piattaforma facile da usare.
      </p>

      <h3 style={{ color: '#2c5282', marginTop: '30px' }}>Cosa offriamo</h3>
      <ul>
        <li><strong>Per i cittadini:</strong> Uno strumento gratuito per trovare velocemente servizi sanitari vicino a casa (Prati, Eur, Trastevere, Centro, ecc.).</li>
        <li><strong>Per i professionisti:</strong> Una vetrina dedicata e gratuita per aumentare la propria visibilità locale e raggiungere nuovi pazienti a Roma.</li>
      </ul>

      <div style={{ backgroundColor: '#ebf8ff', padding: '20px', borderRadius: '8px', marginTop: '40px', border: '1px solid #bee3f8' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#2b6cb0' }}>Nota Importante</h4>
        <p style={{ margin: 0, fontSize: '14px' }}>
          ServiziSalute è una piattaforma di annunci informativi. Non siamo una struttura sanitaria e non eroghiamo visite mediche. 
          Il nostro compito è connettere chi cerca un servizio con chi lo offre, garantendo la massima trasparenza.
        </p>
      </div>

      <footer style={{ marginTop: '60px', paddingTop: '20px', borderTop: '1px solid #eee', fontSize: '12px', color: '#777', textAlign: 'center' }}>
        © 2026 ServiziSalute – Il portale sanitario di Roma
      </footer>
    </div>
  );
}
