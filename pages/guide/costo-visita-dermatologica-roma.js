import React from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function GuidaDermatologia() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>Quanto costa una visita dermatologica a Roma? | Prezzi 2026</title>
        <meta name="description" content="Tutte le tariffe medie per visite dermatologiche a Roma." />
      </Head>

      <Navbar />

      {/* BOX IMMAGINE OTTIMIZZATO - NON TAGLIA IL SOGGETTO */}
      <div style={{ width: '100%', maxWidth: '1100px', margin: '20px auto', padding: '0 20px' }}>
        <div style={{ 
          width: '100%', 
          height: '400px', 
          backgroundColor: '#f8fafc', // Sfondo neutro se l'immagine è più stretta
          borderRadius: '24px', 
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img 
            src="/images/costo-visita-dermatologica-roma.png" 
            alt="Dermatologo Roma"
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain', // <--- Fondamentale: mostra tutta l'immagine senza tagliarla
              backgroundColor: '#f8fafc' 
            }} 
          />
        </div>
      </div>

      <main style={{ flex: '1 0 auto', maxWidth: '850px', margin: '0 auto', padding: '0 20px', width: '100%' }}>
        <article>
          <h1 style={{ color: '#164e63', fontSize: '32px', fontWeight: '900', marginBottom: '25px', textAlign: 'center' }}>
            Costi Visita Dermatologica Roma: Guida Completa 2026
          </h1>

          <div style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px' }}>
            <p>
              Cercare un dermatologo a Roma può generare confusione sui prezzi. In media, il costo per una 
              prima visita privata si attesta sui <strong>110€</strong>, ma vediamo il dettaglio per prestazione:
            </p>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', margin: '30px 0', backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <thead>
                <tr style={{ backgroundColor: '#164e63', color: 'white', textAlign: 'left' }}>
                  <th style={{ padding: '15px' }}>Prestazione</th>
                  <th style={{ padding: '15px' }}>Prezzo Medio Roma</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '15px' }}>Visita Dermatologica</td>
                  <td style={{ padding: '15px' }}>90€ - 130€</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '15px' }}>Mappatura Nei</td>
                  <td style={{ padding: '15px' }}>120€ - 160€</td>
                </tr>
                <tr>
                  <td style={{ padding: '15px' }}>Visita + Crioterapia</td>
                  <td style={{ padding: '15px' }}>150€ - 200€</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
