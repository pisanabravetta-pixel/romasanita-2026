import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import Footer from '../components/Footer';

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
          // Checkbox convertite in Boolean
          vicino_metro: dati.vicino_metro === 'on',
          urgenza_24h: dati.urgenza_24h === 'on',
          primo_sconto: dati.primo_sconto === 'on',
          h24_aperto: dati.h24_aperto === 'on',
          test_rapidi: dati.test_rapidi === 'on',
          consegna_domicilio: dati.consegna_domicilio === 'on',
          parcheggio_privato: dati.parcheggio_privato === 'on',
          senza_barriere: dati.senza_barriere === 'on',
          // Campi di controllo
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
        <div style={{ fontSize: '60px', marginBottom: '20px' }}>✅</div>
        <h1 style={{ color: '#065f46', fontSize: '32px', fontWeight: '800' }}>Richiesta Ricevuta</h1>
        <p style={{ color: '#64748b', fontSize: '18px', maxWidth: '500px', margin: '10px auto 30px auto', lineHeight: '1.6' }}>
          Il tuo profilo professionale è in fase di verifica. Sarà visibile online entro 24 ore.
        </p>
        <a href="/" style={{ backgroundColor: '#10b981', color: 'white', padding: '18px 40px', borderRadius: '15px', textDecoration: 'none', fontWeight: 'bold' }}>Torna alla Home</a>
      </div>
    );
  }

  if (!sessione) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h2 style={{ color: '#065f46', fontSize: '28px', fontWeight: '800' }}>Area Professionisti</h2>
        <p style={{ color: '#64748b', marginBottom: '30px', maxWidth: '400px' }}>Per garantire la qualità del portale, solo i professionisti registrati possono pubblicare annunci.</p>
        <a href="/login" style={{ background: '#065f46', color: 'white', padding: '15px 35px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>Accedi o Registrati →</a>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: '-apple-system, system-ui, sans-serif', backgroundColor: '#f1f5f9', minHeight: '100vh' }}>
      <Head>
        <title>Pubblica il tuo Profilo Sanitario | ServiziSalute Roma</title>
      </Head>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px' }}>
        <div style={{ backgroundColor: '#fff', padding: '45px', borderRadius: '35px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
          
          <h1 style={{ color: '#065f46', fontSize: '32px', marginBottom: '10px', textAlign: 'center', fontWeight: '800' }}>Crea il tuo Profilo</h1>
          <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '40px', fontSize: '17px' }}>Inserisci i dettagli della tua attività a Roma.</p>

          <form onSubmit={gestisciInvio} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '700', fontSize: '14px', color: '#065f46' }}>Nome Struttura o Medico *</label>
                    <input name="nome" type="text" placeholder="Es: Dr. Mario Rossi" style={{ padding: '15px', borderRadius: '14px', border: '1px solid #cbd5e1' }} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '700', fontSize: '14px', color: '#065f46' }}>Categoria *</label>
                    <select name="categoria" style={{ padding: '15px', borderRadius: '14px', border: '1px solid #cbd5e1', backgroundColor: 'white' }} required>
                        <option value="">Seleziona...</option>
                        <option value="Dentista">Dentista</option>
                        <option value="Dermatologo">Dermatologo</option>
                        <option value="Farmacia">Farmacia</option>
                        <option value="Cardiologo">Cardiologo</option>
                        <option value="Medico Specialista">Medico Specialista</option>
                    </select>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '700', fontSize: '14px', color: '#065f46' }}>Quartiere *</label>
                <select name="zona" style={{ padding: '15px', borderRadius: '14px', border: '1px solid #cbd5e1', backgroundColor: 'white' }} required>
                    <option value="">Scegli zona...</option>
                    {['Centro Storico', 'Prati', 'EUR', 'Parioli', 'San Giovanni', 'Ostiense', 'Cassia', 'Monteverde'].sort().map(z => (
                        <option key={z} value={z}>{z}</option>
                    ))}
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '700', fontSize: '14px', color: '#065f46' }}>Indirizzo *</label>
                <input name="indirizzo" type="text" placeholder="Es: Via Roma, 10" style={{ padding: '15px', borderRadius: '14px', border: '1px solid #cbd5e1' }} required />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: '700', fontSize: '14px', color: '#065f46' }}>WhatsApp / Telefono *</label>
              <input name="whatsapp" type="tel" placeholder="3331234567" style={{ padding: '15px', borderRadius: '14px', border: '1px solid #cbd5e1' }} required />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: '700', fontSize: '14px', color: '#065f46' }}>Descrizione</label>
              <textarea name="descrizione" style={{ padding: '15px', borderRadius: '14px', border: '1px solid #cbd5e1', minHeight: '100px' }} />
            </div>

            {/* --- NUOVA SEZIONE BADGE AGGIORNATA --- */}
            <div style={{ backgroundColor: '#f0fdf4', padding: '25px', borderRadius: '20px', border: '1px solid #dcfce7' }}>
              <label style={{ fontWeight: '800', fontSize: '15px', color: '#166534', display: 'block', marginBottom: '15px' }}>
                SERVIZI E CARATTERISTICHE
              </label>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                  <input type="checkbox" name="h24_aperto" /> 🏪 Aperto H24
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                  <input type="checkbox" name="test_rapidi" /> 🧪 Test/Tamponi
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                  <input type="checkbox" name="consegna_domicilio" /> 📦 Consegna a Casa
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                  <input type="checkbox" name="parcheggio_privato" /> 🚗 Parcheggio
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                  <input type="checkbox" name="senza_barriere" /> ♿ Accessibile
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                  <input type="checkbox" name="vicino_metro" /> 🚇 Vicino Metro
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                  <input type="checkbox" name="urgenza_24h" /> 🚨 Urgenze
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                  <input type="checkbox" name="primo_sconto" /> ✨ Promo Portale
                </label>
              </div>
            </div>

            <button type="submit" disabled={caricamento} style={{ background: '#10b981', color: 'white', padding: '20px', borderRadius: '15px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}>
              {caricamento ? 'Salvataggio...' : 'PUBBLICA ORA'}
            </button>
          </form>
        </div>
      </main>

   <Footer />
    </div>
  );
}
