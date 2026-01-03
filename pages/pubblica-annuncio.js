import Head from 'next/head';
import { useState } from 'react';

export default function PubblicaAnnuncio() {
  const zoneRoma = [
    "Centro Storico", "Testaccio", "Trastevere", "Monti", "San Lorenzo", "Pigneto", "Garbatella", 
    "Ostiense", "Tiburtino", "San Giovanni", "Prati", "Villa Borghese", "Nomentano", "Parioli", 
    "Portuense", "Gianicolense", "Trionfale", "Popolo", "Eur", "Monteverde", "Flaminio"
  ];

  const categorie = ["Farmacia", "Dentista", "Centro Diagnostico", "Visita Specialistica", "Servizio a Domicilio"];

  return (
    <div style={{ backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <Head>
        <title>Pubblica Annuncio Gratis - ServiziSalute Roma</title>
      </Head>

      {/* HEADER SEMPLICE */}
      <header style={{ background: 'white', padding: '15px 0', borderBottom: '1px solid #eee', textAlign: 'center' }}>
        <div style={{ fontSize: '24px', fontWeight: '800', color: '#0070f3' }}>ServiziSalute</div>
      </header>

      <main style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          
          <h1 style={{ fontSize: '24px', marginBottom: '10px', color: '#333' }}>Pubblica il tuo annuncio gratis</h1>
          <p style={{ color: '#666', marginBottom: '30px', fontSize: '15px' }}>
            Raggiungi nuovi pazienti a Roma. La pubblicazione è gratuita e i contatti sono diretti.
          </p>

          <form>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>Nome Struttura o Professionista</label>
              <input type="text" placeholder="Es: Studio Medico Rossi" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>Categoria</label>
              <select style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}>
                {categorie.map(cat => <option key={cat}>{cat}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>Quartiere di Roma</label>
              <select style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}>
                {zoneRoma.map(zona => <option key={zona}>{zona}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>Numero di Telefono (per chiamate dirette)</label>
              <input type="tel" placeholder="Es: 06 1234567" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>WhatsApp (opzionale)</label>
              <input type="tel" placeholder="Es: 333 1234567" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>Descrizione del Servizio</label>
              <textarea placeholder="Descrivi brevemente cosa offri..." rows="4" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}></textarea>
            </div>

            <button type="button" style={{ 
              width: '100%', 
              backgroundColor: '#28a745', 
              color: 'white', 
              padding: '16px', 
              borderRadius: '8px', 
              border: 'none', 
              fontWeight: 'bold', 
              fontSize: '16px',
              cursor: 'pointer'
            }}>
              INVIA ANNUNCIO GRATIS
            </button>
          </form>

          <p style={{ marginTop: '20px', fontSize: '12px', color: '#999', textAlign: 'center' }}>
            Cliccando su invia, accetti i termini di servizio di ServiziSalute Roma.
          </p>
        </div>
      </main>
    </div>
  );
}
