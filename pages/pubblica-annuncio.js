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
          Grazie! Il tuo profilo professionale è in fase di verifica. Sarà visibile online entro 24 ore.
        </p>
        <a href="/" style={{ backgroundColor: '#2563eb', color: 'white', padding: '18px 40px', borderRadius: '15px', textDecoration: 'none', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(37, 99, 235, 0.2)' }}>Torna alla Home</a>
      </div>
    );
  }

  if (!sessione) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
        <h2 style={{ color: '#1e3a8a', fontSize: '28px' }}>Accesso richiesto</h2>
        <p style={{ color: '#64748b', marginBottom: '30px' }}>Devi essere registrato come professionista per pubblicare un annuncio.</p>
        <a href="/login" style={{ background: '#2563eb', color: 'white', padding: '15px 35px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>Vai al Login →</a>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f1f5f9', minHeight: '100vh' }}>
      <Head>
        <title>Inserisci il tuo Studio Medico | ServiziSalute Roma</title>
      </Head>

      <main style={{ maxWidth: '750px', margin: '0 auto', padding: '60px 20px' }}>
        <div style={{ backgroundColor: '#fff', padding: '45px', borderRadius: '35px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
          
          <h1 style={{ color: '#1e3a8a', fontSize: '32px', marginBottom: '10px', textAlign: 'center', fontWeight: '800' }}>Crea il tuo Profilo</h1>
          <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '40px', fontSize: '17px' }}>Inserisci i dettagli per farti trovare dai pazienti a Roma.</p>

          <form onSubmit={gestisciInvio} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            
            {/* NOME E CATEGORIA */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '700', fontSize: '14px', color: '#1e3a8a' }}>Nome Struttura o Medico *</label>
                    <input name="nome" type="text" placeholder="Es: Dr. Mario Rossi" style={{ padding: '15px', borderRadius: '14px', border: '1px solid #cbd5e1', fontSize: '15px' }} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '700', fontSize: '14px', color: '#1e3a8a' }}>Categoria *</label>
                    <select name="categoria" style={{ padding: '15px', borderRadius: '14px', border: '1px solid #cbd5e1', backgroundColor: 'white', fontSize: '15px' }} required>
                        <option value="">Seleziona...</option>
                        <option value="Dentista">Dentista</option>
                        <option value="Cardiologo">Cardiologo</option>
                        <option value="Farmacia">Farmacia</option>
                        <option value="Diagnostica">Diagnostica</option>
                        <option value="Domicilio">Assistenza a Domicilio</option>
                        <option value="Medico Specialista">Medico Specialista</option>
                    </select>
                </div>
            </div>

            {/* QUARTIERE E INDIRIZZO */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '700', fontSize: '14px', color: '#1e3a8a' }}>Quartiere (Zona) *</label>
                <select name="zona" style={{ padding: '15px', borderRadius: '14px', border: '1px solid #cbd5e1', backgroundColor: 'white', fontSize: '15px' }} required>
                    <option value="">Scegli zona...</option>
                    {/* Lista Uniforme a Index.js e Categorie */}
                    {['Centro Storico', 'Prati', 'EUR', 'Parioli', 'San Giovanni', 'Trastevere', 'Ostiense', 'Monteverde', 'Tiburtina', 'Flaminio', 'Nomentano', 'Appio Latino', 'Magliana', 'Cassia'].sort().map(z => (
                        <option key={z} value={z}>{z}</option>
                    ))}
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '700', fontSize: '14px', color: '#1e3a8a' }}>Indirizzo e Civico *</label>
                <input name="indirizzo" type="text" placeholder="Es: Via del Corso, 1" style={{ padding: '15px', borderRadius: '14px', border: '1px solid #cbd5e1', fontSize: '15px' }} required />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: '700', fontSize: '14px', color: '#1e3a8a' }}>WhatsApp / Telefono per Pazienti *</label>
              <input name="whatsapp" type="tel" placeholder="Es: 3331234567" style={{ padding: '15px', borderRadius: '14px', border: '1px solid #cbd5e1', fontSize: '15px' }} required />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: '700', fontSize: '14px', color: '#1e3a8a' }}>Descrizione Breve Professionalità</label>
              <textarea name="descrizione" placeholder="Descrivi brevemente i tuoi punti di forza, esami effettuati o specializzazioni..." style={{ padding: '15px', borderRadius: '14px', border: '1px solid #cbd5e1', minHeight: '120px', fontSize: '15px', lineHeight: '1.5' }} />
            </div>

            {/* 🏷️ SEZIONE BADGE / SERVIZI EXTRA - Uniforme alle card */}
            <div style={{ backgroundColor: '#eff6ff', padding: '25px', borderRadius: '20px', border: '1px solid #dbeafe' }}>
              <label style={{ fontWeight: '800', fontSize: '15px', color: '#1e40af', display: 'block', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Servizi Distintivi (Badge)
              </label>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', cursor: 'pointer', color: '#334155' }}>
                  <input type="checkbox" name="vicino_metro" style={{ width: '20px', height: '20px', accentColor: '#2563eb' }} /> 
                  <span>🚇 <strong>Vicino Metro:</strong> Il mio studio è raggiungibile a piedi dalla metropolitana.</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', cursor: 'pointer', color: '#334155' }}>
                  <input type="checkbox" name="urgenza_24h" style={{ width: '20px', height: '20px', accentColor: '#2563eb' }} /> 
                  <span>🚨 <strong>H24 / Urgenze:</strong> Gestisco urgenze o consegno referti in giornata.</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', cursor: 'pointer', color: '#334155' }}>
                  <input type="checkbox" name="primo_sconto" style={{ width: '20px', height: '20px', accentColor: '#2563eb' }} /> 
                  <span>✨ <strong>Promo:</strong> Offro un vantaggio (es: primo consulto scontato) per chi mi trova qui.</span>
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={caricamento}
              style={{ 
                background: caricamento ? '#94a3b8' : '#2563eb', color: 'white', padding: '22px', 
                borderRadius: '18px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '18px',
                marginTop: '15px', boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)', transition: 'all 0.2s'
              }}
            >
              {caricamento ? 'Elaborazione in corso...' : 'PUBBLICA PROFILO SU ROMA'}
            </button>

            <p style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8', marginTop: '10px' }}>
                Cliccando su pubblica, accetti i nostri Termini di Servizio. Il profilo verrà revisionato manualmente.
            </p>

          </form>
        </div>
      </main>
    </div>
  );
}
