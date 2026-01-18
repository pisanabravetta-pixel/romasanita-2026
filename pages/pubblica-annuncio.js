import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PubblicaAnnuncio() {
  const [caricamento, setCaricamento] = useState(false);
  const [inviato, setInviato] = useState(false);
  const [sessione, setSessione] = useState(null);

  // Elenco quartieri standardizzato per il database
  const quartieriLista = [
    "Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", 
    "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"
  ];

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
          h24_aperto: dati.h24_aperto === 'on',
          test_rapidi: dati.test_rapidi === 'on',
          consegna_domicilio: dati.consegna_domicilio === 'on',
          parcheggio_privato: dati.parcheggio_privato === 'on',
          senza_barriere: dati.senza_barriere === 'on',
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
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ flex: 1, textAlign: 'center', padding: '100px 20px', backgroundColor: '#f8fafc' }}>
          <div style={{ fontSize: '60px', marginBottom: '20px' }}>✅</div>
          <h1 style={{ color: '#065f46', fontSize: '32px', fontWeight: '800' }}>Richiesta Ricevuta</h1>
          <p style={{ color: '#64748b', fontSize: '18px', maxWidth: '500px', margin: '10px auto 30px auto', lineHeight: '1.6' }}>
            Il tuo profilo professionale è in fase di verifica manuale. <br/>Sarà online entro 24 ore.
          </p>
          <a href="/" style={{ backgroundColor: '#10b981', color: 'white', padding: '18px 40px', borderRadius: '15px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block' }}>Torna alla Home</a>
        </div>
        <Footer />
      </div>
    );
  }

  if (!sessione) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ flex: 1, textAlign: 'center', padding: '100px 20px', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <h2 style={{ color: '#065f46', fontSize: '28px', fontWeight: '800' }}>Area Professionisti</h2>
          <p style={{ color: '#64748b', marginBottom: '30px', maxWidth: '400px' }}>Per garantire la sicurezza del portale, effettua il login per pubblicare il tuo annuncio.</p>
          <a href="/login" style={{ background: '#065f46', color: 'white', padding: '15px 35px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>Accedi o Registrati →</a>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
      <Head>
        <title>Pubblica Profilo Sanitario Roma | Area Professionisti</title>
      </Head>

      <Navbar />

      <main style={{ flex: 1, maxWidth: '800px', margin: '0 auto', padding: '40px 20px', width: '100%' }}>
        <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          
          <h1 style={{ color: '#065f46', fontSize: '28px', marginBottom: '10px', textAlign: 'center', fontWeight: '900' }}>Registra il tuo Studio</h1>
          <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '35px' }}>Compila i campi per comparire nelle ricerche dei pazienti a Roma.</p>

          <form onSubmit={gestisciInvio} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '700', fontSize: '13px', color: '#475569' }}>NOME PROFESSIONISTA / CENTRO *</label>
                    <input name="nome" type="text" placeholder="Es: Dr. Rossi - Dermatologo" style={{ padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1' }} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '700', fontSize: '13px', color: '#475569' }}>CATEGORIA *</label>
                    <select name="categoria" style={{ padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', backgroundColor: 'white' }} required>
                        <option value="">Seleziona...</option>
                        <option value="Dentista">Dentista</option>
                        <option value="Dermatologo">Dermatologo</option>
                        <option value="Cardiologo">Cardiologo</option>
                        <option value="Psicologo">Psicologo</option>
                        <option value="Ginecologo">Ginecologo</option>
                        <option value="Ortopedico">Ortopedico</option>
                        <option value="Diagnostica">Centro Diagnostico</option>
                        <option value="Farmacia">Farmacia</option>
                        <option value="Assistenza Domiciliare">Assistenza Domiciliare</option>
                    </select>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '700', fontSize: '13px', color: '#475569' }}>QUARTIERE *</label>
                <select name="zona" style={{ padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', backgroundColor: 'white' }} required>
                    <option value="">Seleziona quartiere...</option>
                    {quartieriLista.sort().map(z => (
                        <option key={z} value={z}>{z}</option>
                    ))}
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '700', fontSize: '13px', color: '#475569' }}>INDIRIZZO COMPLETO *</label>
                <input name="indirizzo" type="text" placeholder="Es: Via Appia Nuova, 45" style={{ padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1' }} required />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: '700', fontSize: '13px', color: '#475569' }}>CONTATTO DIRETTO (TEL/WHATSAPP) *</label>
              <input name="whatsapp" type="tel" placeholder="333 1234567" style={{ padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1' }} required />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: '700', fontSize: '13px', color: '#475569' }}>BREVE DESCRIZIONE SERVIZI</label>
              <textarea name="descrizione" placeholder="Descrivi le tue specializzazioni..." style={{ padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', minHeight: '80px' }} />
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '15px', border: '1px solid #e2e8f0' }}>
              <p style={{ fontWeight: '800', fontSize: '14px', color: '#065f46', marginBottom: '15px' }}>SERVIZI E CARATTERISTICHE:</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {[
                  { n: 'h24_aperto', l: '🏪 Aperto H24' },
                  { n: 'test_rapidi', l: '🧪 Test/Tamponi' },
                  { n: 'consegna_domicilio', l: '📦 Domicilio' },
                  { n: 'parcheggio_privato', l: '🚗 Parcheggio' },
                  { n: 'senza_barriere', l: '♿ Accessibile' },
                  { n: 'vicino_metro', l: '🚇 Vicino Metro' },
                  { n: 'urgenza_24h', l: '🚨 Urgenze' },
                  { n: 'primo_sconto', l: '✨ Promo' }
                ].map(item => (
                  <label key={item.n} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#475569', cursor: 'pointer' }}>
                    <input type="checkbox" name={item.n} style={{ width: '16px', height: '16px' }} /> {item.l}
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" disabled={caricamento} style={{ background: '#10b981', color: 'white', padding: '18px', borderRadius: '12px', border: 'none', fontWeight: '900', cursor: 'pointer', fontSize: '16px', marginTop: '10px' }}>
              {caricamento ? 'INVIO IN CORSO...' : 'CONFERMA E PUBBLICA'}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
