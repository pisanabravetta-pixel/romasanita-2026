import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function PubblicaAnnuncio() {
  const [caricamento, setCaricamento] = useState(false);
  const [inviato, setInviato] = useState(false);
  const [sessione, setSessione] = useState(null);

  // 1. Controllo sessione all'avvio
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSessione(session);
    });
  }, []);

  const gestisciInvio = async (e) => {
    e.preventDefault();
    setCaricamento(true);

    if (!sessione) {
      alert("Devi effettuare l'accesso per pubblicare un annuncio.");
      setCaricamento(false);
      return;
    }

    const formData = new FormData(e.target);
    const dati = Object.fromEntries(formData);

    // 2. Salvataggio su Supabase
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
          telefono: dati.whatsapp, // Salviamo lo stesso numero per entrambi i campi
          approvato: false, // Necessita di revisione manuale
          is_top: false,
          user_id: sessione.user.id 
        }
      ]);

    setCaricamento(false);

    if (error) {
      alert("Errore durante l'invio: " + error.message);
    } else {
      setInviato(true);
      window.scrollTo(0, 0);
    }
  };

  // Schermata di successo
  if (inviato) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
        <div style={{ fontSize: '60px', marginBottom: '20px' }}>🚀</div>
        <h1 style={{ color: '#1e3a8a', fontSize: '32px' }}>Richiesta in Revisione</h1>
        <p style={{ color: '#64748b', fontSize: '18px', maxWidth: '500px', margin: '10px auto 30px auto' }}>
          Grazie! Il tuo profilo professionale è stato inviato. Verrà verificato dal nostro team e pubblicato entro 24 ore.
        </p>
        <a href="/" style={{ backgroundColor: '#2563eb', color: 'white', padding: '15px 30px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>Torna alla Home</a>
      </div>
    );
  }

  // Schermata se NON loggato
  if (!sessione) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: 'sans-serif' }}>
        <h2>Accesso richiesto</h2>
        <p>Devi essere registrato per pubblicare un annuncio.</p>
        <a href="/login" style={{ color: '#2563eb', fontWeight: 'bold' }}>Vai al Login →</a>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f1f5f9', minHeight: '100vh' }}>
      <Head>
        <title>Inserisci il tuo Studio Medico | ServiziSalute Roma</title>
      </Head>

      <header style={{ background: 'white', padding: '15px 20px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <a href="/" style={{ fontWeight: '800', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute</a>
           <span style={{ fontSize: '13px', color: '#64748b' }}>Area Professionisti</span>
        </div>
      </header>

      <main style={{ maxWidth: '700px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
          
          <h1 style={{ color: '#1e3a8a', fontSize: '28px', marginBottom: '30px', textAlign: 'center' }}>Crea il tuo Profilo Professionale</h1>

          <form onSubmit={gestisciInvio} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: '700', fontSize: '14px', color: '#1e3a8a' }}>Nome Struttura o Medico *</label>
              <input name="nome" type="text" placeholder="Es: Studio Dentistico Rossi" style={{ padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1' }} required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '700', fontSize: '14px', color: '#1e3a8a' }}>Categoria *</label>
                <select name="categoria" style={{ padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', backgroundColor: 'white' }} required>
                  <option value="">Seleziona...</option>
                  <option value="Dentista">Dentista</option>
                  <option value="Cardiologo">Cardiologo</option>
                  <option value="Farmacia">Farmacia</option>
                  <option value="Diagnostica">Diagnostica / Laboratorio</option>
                  <option value="Domicilio">Servizi a Domicilio</option>
                  <option value="Medico Specialista">Altro Specialista</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '700', fontSize: '14px', color: '#1e3a8a' }}>Quartiere / Zona *</label>
                <select name="zona" style={{ padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', backgroundColor: 'white' }} required>
                    <option value="">Scegli zona...</option>
                    <option value="Prati">Prati / Ottaviano</option>
                    <option value="EUR">EUR / Laurentina</option>
                    <option value="Centro">Centro Storico</option>
                    <option value="Parioli">Parioli / Flaminio</option>
                    <option value="San Giovanni">San Giovanni / Appio</option>
                    <option value="Trastevere">Trastevere / Testaccio</option>
                    <option value="Ostiense">Ostiense / Garbatella</option>
                    <option value="Monteverde">Monteverde</option>
                    <option value="Tiburtina">Tiburtina / Nomentana</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: '700', fontSize: '14px', color: '#1e3a8a' }}>Indirizzo Completo *</label>
              <input name="indirizzo" type="text" placeholder="Es: Via Giulio Cesare, 10" style={{ padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1' }} required />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: '700', fontSize: '14px', color: '#1e3a8a' }}>WhatsApp / Cellulare *</label>
              <input name="whatsapp" type="tel" placeholder="Es: 3330000000" style={{ padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1' }} required />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: '700', fontSize: '14px', color: '#1e3a8a' }}>Descrizione Servizi</label>
              <textarea name="descrizione" placeholder="Descrivi brevemente specializzazioni o orari..." style={{ padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', minHeight: '100px' }} />
            </div>

            <button 
              type="submit" 
              disabled={caricamento}
              style={{ 
                background: caricamento ? '#94a3b8' : '#2563eb', color: 'white', padding: '18px', 
                borderRadius: '15px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px'
              }}
            >
              {caricamento ? 'Invio in corso...' : 'INVIA PER APPROVAZIONE'}
            </button>

          </form>
        </div>
      </main>
    </div>
  );
}
