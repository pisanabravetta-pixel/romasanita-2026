import React from 'react';
import Head from 'next/head';

export default function PubblicaAnnuncio() {
  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f3f4f6', minHeight: '100vh', padding: '40px 20px' }}>
      <Head>
        <title>Pubblica il tuo profilo sanitario gratis | ServiziSalute Roma</title>
      </Head>

      <main style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#fff', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
        
        <a href="/" style={{ color: '#3182ce', textDecoration: 'none', fontWeight: 'bold' }}>← Torna alla Home</a>

        <div style={{ textAlign: 'center', margin: '30px 0 40px' }}>
          <h1 style={{ color: '#1e3a8a', fontSize: '32px' }}>Raggiungi nuovi pazienti a Roma</h1>
          <p style={{ fontSize: '18px', color: '#4b5563' }}>Inserimento gratuito per i professionisti sanitari.</p>
        </div>

        {/* BOX VANTAGGI - CONVINCONO IL MEDICO A COMPILARE IL FORM */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div style={{ textAlign: 'center', padding: '15px', border: '1px solid #e5e7eb', borderRadius: '12px', background: '#f8fafc' }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>🚀</div>
            <h3 style={{ fontSize: '14px', margin: '0' }}>Visibilità nel Quartiere</h3>
          </div>
          <div style={{ textAlign: 'center', padding: '15px', border: '1px solid #e5e7eb', borderRadius: '12px', background: '#f8fafc' }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>🆓</div>
            <h3 style={{ fontSize: '14px', margin: '0' }}>Sempre Gratuito</h3>
          </div>
          <div style={{ textAlign: 'center', padding: '15px', border: '1px solid #e5e7eb', borderRadius: '12px', background: '#f8fafc' }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>📈</div>
            <h3 style={{ fontSize: '14px', margin: '0' }}>Contatto Diretto</h3>
          </div>
        </div>

        {/* IL TUO FORM ORIGINALE OTTIMIZZATO */}
        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px', background: '#eff6ff', padding: '30px', borderRadius: '12px', border: '1px solid #2563eb' }}>
          
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Nome Struttura o Professionista</label>
            <input type="text" placeholder="Es: Farmacia Centrale, Dr. Rossi..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e0' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Categoria</label>
              <select style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e0' }}>
                <option>Dentista</option>
                <option>Farmacia</option>
                <option>Centro Diagnostico</option>
                <option>Medico Specialista</option>
                <option>Altro</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Zona di Roma</label>
              <input type="text" placeholder="Es: Prati, EUR..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e0' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Descrizione Servizi (Costi, Orari, Specializzazioni)</label>
            <textarea placeholder="Descrivi brevemente cosa offri..." style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e0', minHeight: '100px' }}></textarea>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Numero WhatsApp per i pazienti</label>
            <input type="tel" placeholder="Es: 3331234567" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e0' }} />
          </div>

          <button type="button" onClick={() => alert('Grazie! Richiesta inviata. Ti contatteremo su WhatsApp per confermare la pubblicazione.')} style={{ background: '#2563eb', color: 'white', padding: '18px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '18px', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' }}>
            Invia Annuncio Gratis
          </button>

        </form>

        <p style={{ fontSize: '12px', color: '#a0aec0', marginTop: '20px', textAlign: 'center', fontStyle: 'italic' }}>
          La revisione degli annunci avviene solitamente entro 24 ore.
        </p>
      </main>
    </div>
  );
}
