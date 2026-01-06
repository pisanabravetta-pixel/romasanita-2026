import React, { useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function PubblicaAnnuncio() {
  const [caricamento, setCaricamento] = useState(false);
  const [inviato, setInviato] = useState(false);

  const gestisciInvio = async (e) => {
    e.preventDefault();
    setCaricamento(true);

    const formData = new FormData(e.target);
    const dati = Object.fromEntries(formData);

    // Salvataggio su Supabase
    const { error } = await supabase
      .from('annunci')
      .insert([
        { 
          nome: dati.nome, 
          categoria: dati.categoria, 
          zona: dati.zona, 
          indirizzo: dati.indirizzo,
          descrizione: dati.descrizione,
          whatsapp: dati.whatsapp,
          telefono: dati.whatsapp, // Usiamo lo stesso numero per chiamate e WA come default
          approvato: false // Resta invisibile finché non lo approvi tu manualmente su Supabase
        }
      ]);

    setCaricamento(false);

    if (error) {
      alert("Errore tecnico: " + error.message);
    } else {
      setInviato(true);
      window.scrollTo(0, 0);
    }
  };

  if (inviato) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
        <div style={{ fontSize: '60px', marginBottom: '20px' }}>🚀</div>
        <h1 style={{ color: '#1e3a8a', fontSize: '32px' }}>Richiesta Ricevuta!</h1>
        <p style={{ color: '#64748b', fontSize: '18px', maxWidth: '500px', margin: '10px auto 30px auto' }}>
          Grazie per esserti unito a <strong>ServiziSalute Roma</strong>. Il tuo profilo è in fase di revisione tecnica e sarà online entro poche ore.
        </p>
        <a href="/" style={{ backgroundColor: '#2563eb', color: 'white', padding: '15px 30px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>
          Torna alla Home
        </a>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f1f5f9', minHeight: '100vh' }}>
      <Head>
        <title>Pubblica il tuo profilo sanitario gratis | ServiziSalute Roma</title>
        <meta name="description" content="Sei un medico, un farmacista o un fisioterapista a Roma? Iscriviti gratis al portale ServiziSalute e raggiungi nuovi pazienti nel tuo quartiere." />
      </Head>

      <header style={{ background: 'white', padding: '15px 20px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <a href="/" style={{ fontWeight: '800', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute</a>
           <a href="/" style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none', fontWeight: 'bold' }}>← Esci</a>
        </div>
      </header>

      <main style={{ maxWidth: '700px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ color: '#1e3a8a', fontSize: '28px', marginBottom: '10px' }}>Unisciti al Network Sanitario</h1>
            <p style={{ fontSize: '16px', color: '#64748b' }}>Inserimento gratuito per medici e strutture di Roma.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '40px' }}>
            <div style={{ textAlign: 'center', padding: '10px', border: '1px solid #f1f5f9', borderRadius: '12px', background: '#f8fafc' }}>
              <div style={{ fontSize: '20px' }}>🎯</div>
              <h3 style={{ fontSize: '10px', color: '#1e3a8a', margin: '5px 0 0 0', fontWeight: '900' }}>TARGET LOCALE</h3>
            </div>
            <div style={{ textAlign: 'center', padding: '10px', border: '1px solid #f1f5f9', borderRadius: '12px', background: '#f8fafc' }}>
              <div style={{ fontSize: '20px' }}>⚡</div>
              <h3 style={{ fontSize: '10px', color: '#1e3a8a', margin: '5px 0 0 0', fontWeight: '900' }}>CONTATTO DIRETTO</h3>
            </div>
            <div style={{ textAlign: 'center', padding: '10px', border: '1px solid #f1f5f9', borderRadius: '12px', background: '#f8fafc' }}>
              <div style={{ fontSize: '20px' }}>💰</div>
              <h3 style={{ fontSize: '10px', color: '#1e3a8a', margin: '5px 0 0 0', fontWeight: '900' }}>100% GRATIS</h3>
            </div>
          </div>

          <form onSubmit={gestisciInvio} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: '700', fontSize: '14px', color: '#1e3a8a' }}>Nome Struttura o Professionista *</label>
              <input name="nome" type="text" placeholder="Esempio: Dr. Mario Rossi / Farmacia Trastevere" style={{ padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '16px' }} required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '700', fontSize: '14px', color: '#1e3a8a' }}>Categoria *</label>
                <select name="categoria" style={{ padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', backgroundColor: 'white', fontSize: '16px' }} required>
                  <option value="">Seleziona...</option>
                  <option value="Medico Specialista">Medico Specialista</option>
                  <option value="Farmacia">Farmacia</option>
                  <option value="Dentista">Dentista</option>
                  <option value="Centro Diagnostico">Centro Diagnostico</option>
                  <option value="Assistenza Domiciliare">Assistenza Domiciliare</option>
                  <option value="Fisioterapista">Fisioterapista</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '700', fontSize: '14px', color: '#1e3a8a' }}>Zona di Roma *</label>
                <input name="zona" type="text" placeholder="Es: EUR, Prati, Centro..." style={{ padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '16px' }} required />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: '700', fontSize: '14px', color: '#1e3a8a' }}>Indirizzo Completo *</label>
              <input name="indirizzo" type="text" placeholder="Via, Piazza, Numero Civico..." style={{ padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '16px' }} required />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: '700', fontSize: '14px', color: '#1e3a8a' }}>Descrizione Professionalità / Servizi</label>
              <textarea name="descrizione" placeholder="Descrivi i tuoi servizi, orari o specializzazioni..." style={{ padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', minHeight: '120px', fontFamily: 'inherit', fontSize: '16px' }}></textarea>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: '700', fontSize: '14px', color: '#1e3a8a' }}>Cellulare / WhatsApp (Per contatti diretti) *</label>
              <input name="whatsapp" type="tel" placeholder="Es: 3331234567" style={{ padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '16px' }} required />
              <small style={{ color: '#64748b', fontSize: '12px' }}>Verrà utilizzato per permettere ai pazienti di scriverti su WhatsApp.</small>
            </div>

            <div style={{ marginTop: '10px', padding: '15px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
               <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#475569', cursor: 'pointer' }}>
                 <input type="checkbox" required style={{ width: '18px', height: '18px' }} />
                 <span>Autorizzo il trattamento dei dati e confermo la veridicità delle informazioni.</span>
               </label>
            </div>

            <button 
              type="submit" 
              disabled={caricamento}
              style={{ 
                background: caricamento ? '#94a3b8' : '#2563eb', 
                color: 'white', padding: '20px', borderRadius: '15px', border: 'none', fontWeight: '800', cursor: 'pointer', fontSize: '18px', boxShadow: '0 4px 14px 0 rgba(37,99,235,0.39)', transition: 'all 0.2s'
              }}
            >
              {caricamento ? 'Elaborazione in corso...' : 'PUBBLICA PROFILO ORA'}
            </button>
            <p style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8' }}>Nessuna carta di credito richiesta. Il servizio è gratuito.</p>
          </form>
        </div>
      </main>

      <footer style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8', fontSize: '13px' }}>
        © 2026 ServiziSalute Roma — Area Professionisti
      </footer>
    </div>
  );
}
