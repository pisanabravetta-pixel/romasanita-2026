import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function PubblicaAnnuncio() {
  const [caricamento, setCaricamento] = useState(false);
  const [inviato, setInviato] = useState(false);
  const [sessione, setSessione] = useState(null);

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

    // 🛠️ Salvataggio su Supabase (inclusi i nuovi Badge)
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
          telefono: dati.whatsapp, 
          // Gestione Checkbox (se presente nel form è "on", altrimenti false)
          vicino_metro: dati.vicino_metro === 'on',
          urgenza_24h: dati.urgenza_24h === 'on',
          primo_sconto: dati.primo_sconto === 'on',
          approvato: false, 
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

  if (inviato) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
        <div style={{ fontSize: '60px', marginBottom: '20px' }}>🚀</div>
        <h1 style={{ color: '#1e3a8a', fontSize: '32px' }}>Richiesta in Revisione</h1>
        <p style={{ color: '#64748b', fontSize: '18px', maxWidth: '500px', margin: '10px auto 30px auto' }}>
          Il tuo profilo è in fase di verifica. Sarà visibile online entro 24 ore.
        </p>
        <a href="/" style={{ backgroundColor: '#2563eb', color: 'white', padding: '15px 30px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>Torna alla Home</a>
      </div>
    );
  }

  if (!sessione) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
        <h2 style={{ color: '#1e3a8a' }}>Accesso richiesto</h2>
        <p style={{ color: '#64748b' }}>Devi essere registrato come professionista per pubblicare un annuncio.</p>
        <div style={{ marginTop: '20px' }}>
            <a href="/login" style={{ background: '#2563eb', color: 'white', padding: '12px 25px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold' }}>Vai al Login →</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f1f5f9', minHeight: '100vh' }}>
      <Head>
        <title>Inserisci il tuo Studio Medico | ServiziSalute Roma</title>
      </Head>

      <main style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '30px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
          
          <h1 style={{ color: '#1e3a8a', fontSize: '28px', marginBottom: '8px', textAlign: 'center' }}>Il tuo Profilo Professionale</h1>
          <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '35px' }}>Compila i dettagli del tuo studio a Roma.</p>

          <form onSubmit={gestisciInvio} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: '700', fontSize: '14px', color: '#1e3a8a' }}>Nome Struttura o Medico *</label>
              <input name="nome" type="text" placeholder="Es: Studio Medico Rossi" style={{ padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1' }} required />
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
                <label style={{ fontWeight: '700', fontSize: '14px', color: '#1e3a8a' }}>Quartiere *</label>
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
              <textarea name="descrizione" placeholder="Descrivi le tue specializzazioni..." style={{ padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', minHeight: '100px' }} />
            </div>

            {/* 🏷️ SEZIONE BADGE / SERVIZI EXTRA */}
            <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '15px', border: '1px solid #e2e8f0' }}>
              <label style={{ fontWeight: '700', fontSize: '14px', color: '#1e3a8a', display: 'block', marginBottom: '15px' }}>Servizi Aggiuntivi (Badge)</label>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', cursor: 'pointer' }}>
                  <input type="checkbox" name="vicino_metro" style={{ width: '18px', height: '18px' }} /> 🚇 Vicino alla Metropolitana
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', cursor: 'pointer' }}>
                  <input type="checkbox" name="urgenza_24h" style={{ width: '18px', height: '18px' }} /> 🚨 Gestione Urgenze / Referti H24
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', cursor: 'pointer' }}>
                  <input type="checkbox" name="primo_sconto" style={{ width: '18px', height: '18px' }} /> ✨ Offro promozioni (es. primo consulto scontato)
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={caricamento}
              style={{ 
                background: caricamento ? '#94a3b8' : '#2563eb', color: 'white', padding: '20px', 
                borderRadius: '15px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '17px',
                marginTop: '10px', boxShadow: '0 4px 6px rgba(37, 99, 235, 0.2)'
              }}
            >
              {caricamento ? 'Invio in corso...' : 'PUBBLICA PROFILO'}
            </button>

          </form>
        </div>
      </main>
    </div>
  );
}
