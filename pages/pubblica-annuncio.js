import React from 'react';

export default function PubblicaAnnuncio() {
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '600px', margin: '50px auto', padding: '0 20px', lineHeight: '1.6', color: '#333' }}>
      <a href="/" style={{ color: '#3182ce', textDecoration: 'none', fontWeight: 'bold' }}>← Torna alla Home</a>
      
      <h1 style={{ marginTop: '30px', color: '#2c5282' }}>Pubblica il tuo Annuncio</h1>
      <p style={{ color: '#718096', marginBottom: '30px' }}>Inserisci i dati della tua attività sanitaria a Roma. La pubblicazione è gratuita.</p>

      <form style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: '#f7fafc', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Nome Struttura o Professionista</label>
          <input type="text" placeholder="Es: Farmacia Centrale, Dr. Rossi..." style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #cbd5e0' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Categoria</label>
          <select style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #cbd5e0' }}>
            <option>Farmacia</option>
            <option>Dentista</option>
            <option>Centro Diagnostico</option>
            <option>Medico Specialista</option>
            <option>Altro</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Zona di Roma</label>
          <input type="text" placeholder="Es: Prati, EUR, Trastevere..." style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #cbd5e0' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Descrizione Servizio</label>
          <textarea placeholder="Descrivi brevemente cosa offri..." style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #cbd5e0', minHeight: '100px' }}></textarea>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Numero WhatsApp (per i contatti)</label>
          <input type="tel" placeholder="Es: 3331234567" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #cbd5e0' }} />
        </div>

        <button type="button" onClick={() => alert('Grazie! Il tuo annuncio è stato inviato per la revisione.')} style={{ background: '#48bb78', color: 'white', padding: '15px', borderRadius: '5px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', marginTop: '10px' }}>
          Invia Annuncio Gratis
        </button>

      </form>

      <p style={{ fontSize: '12px', color: '#a0aec0', marginTop: '20px', textAlign: 'center' }}>
        Cliccando su invia, accetti i termini del servizio e il disclaimer di ServiziSalute.
      </p>
    </div>
  );
}
