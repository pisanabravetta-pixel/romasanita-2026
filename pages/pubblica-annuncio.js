import React, { useState } from 'react';
import Head from 'next/head';
import { supabase } from '../supabaseClient'; 

export default function PubblicaAnnuncio() {
  const [caricamento, setCaricamento] = useState(false);
  const [inviato, setInviato] = useState(false);

  const gestisciInvio = async (e) => {
    e.preventDefault();
    setCaricamento(true);

    const formData = new FormData(e.target);
    const dati = Object.fromEntries(formData);

    const { error } = await supabase
      .from('annunci')
      .insert([
        { 
          nome: dati.nome, 
          categoria: dati.categoria, 
          zona: dati.zona, 
          descrizione: dati.descrizione,
          whatsapp: dati.whatsapp,
          approvato: false 
        }
      ]);

    setCaricamento(false);

    if (error) {
      alert("Errore tecnico: " + error.message);
    } else {
      setInviato(true);
    }
  };

  if (inviato) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: 'sans-serif' }}>
        <h1 style={{ color: '#2563eb' }}>🚀 Richiesta Ricevuta!</h1>
        <p>Grazie! Il tuo profilo è in fase di revisione. Sarà online entro 24 ore.</p>
        <a href="/" style={{ color: '#2563eb', fontWeight: 'bold' }}>Torna alla Home</a>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      <Head>
        <title>Pubblica il tuo profilo sanitario gratis | ServiziSalute Roma</title>
      </Head>

      <header style={{ background: 'white', padding: '15px 20px', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <a href="/" style={{ fontWeight: '800', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute</a>
           <a href="/" style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none' }}>Torna alla Home</a>
        </div>
      </header>

      <main style={{ maxWidth: '700px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ color: '#1e3a8a', fontSize: '32px', marginBottom: '10px' }}>Raggiungi nuovi pazienti a Roma</h1>
            <p style={{ fontSize: '17px', color: '#4b5563' }}>Inserimento gratuito per i professionisti sanitari.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '40px' }}>
            <div style={{ textAlign: 'center', padding: '15px', border: '1px solid #f1f5f9', borderRadius: '12px', background: '#f8fafc' }}>
              <div style={{ fontSize: '24px', marginBottom: '5px' }}>🚀</div>
              <h3 style={{ fontSize: '12px', color: '#1e3a8a', margin: '0', fontWeight: '800' }}>VISIBILITÀ</h3>
            </div>
            <div style={{ textAlign: 'center', padding: '15px', border: '1px solid #f1f5f9', borderRadius: '12px', background: '#f8fafc' }}>
              <div style={{ fontSize: '24px', marginBottom: '5px' }}>🆓</div>
              <h3 style={{ fontSize: '12px', color: '#1e3a8a', margin: '0', fontWeight: '800' }}>GRATIS</h3>
            </div>
            <div style={{ textAlign: 'center', padding: '15px', border: '1px solid #f1f5f9', borderRadius: '12px', background: '#f8fafc' }}>
              <div style={{ fontSize: '24px', marginBottom: '5px' }}>📈</div>
              <h3 style={{ fontSize: '12px', color: '#1e3a8a', margin: '0', fontWeight: '800' }}>DIRETTO</h3>
            </div>
          </div>

          <form onSubmit={gestisciInvio} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: '700', fontSize: '14px', color: '#1e3a8a' }}>Nome Struttura o Professionista</label>
              <input name="nome" type="text" placeholder="Es: Farmacia Centrale..." style={{ padding: '14px', borderRadius: '10px', border: '1px solid #cbd5e1' }} required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '700', fontSize: '14px', color: '#1e3a8a' }}>Categoria</label>
                <select name="categoria" style={{ padding: '14px', borderRadius: '10px', border: '1px solid #cbd5e1', backgroundColor: 'white' }}>
                  <option value="Dentista">Dentista</option>
                  <option value="Farmacia">Farmacia</option>
                  <option value="Centro Diagnostico">Centro Diagnostico</option>
                  <option value="Medico Specialista">Medico Specialista</option>
                  <option value="Assistenza Domiciliare">Assistenza Domiciliare</option>
                  <option value="Altro">Altro</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '700', fontSize: '14px', color: '#1e3a8a' }}>Zona di Roma</label>
                <input name="zona" type="text" placeholder="Es: Prati..." style={{ padding: '14px', borderRadius: '10px', border: '1px solid #cbd5e1' }} required />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: '700', fontSize: '14px', color: '#1e3a8a' }}>Descrizione Servizi</label>
              <textarea name="descrizione" placeholder="Descrivi brevemente..." style={{ padding: '14px', borderRadius: '10px', border: '1px solid #cbd5e1', minHeight: '120px', fontFamily: 'inherit' }}></textarea>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: '700', fontSize: '14px', color: '#1e3a8a' }}>Cellulare/WhatsApp</label>
              <input name="whatsapp" type="tel" placeholder="Es: 3331234567" style={{ padding: '14px', borderRadius: '10px', border: '1px solid #cbd5e1' }} required />
            </div>

            <div style={{ marginTop: '10px' }}>
               <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#64748b', cursor: 'pointer' }}>
                 <input type="checkbox" required />
                 Accetto la Privacy Policy.
               </label>
            </div>

            <button 
              type="submit" 
              disabled={caricamento}
              style={{ 
                background: caricamento ? '#94a3b8' : '#2563eb', 
                color: 'white', padding: '18px', borderRadius: '12px', border: 'none', fontWeight: '800', cursor: 'pointer', fontSize: '16px'
              }}
            >
              {caricamento ? 'Invio in corso...' : 'PUBBLICA ANNUNCIO GRATIS'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
