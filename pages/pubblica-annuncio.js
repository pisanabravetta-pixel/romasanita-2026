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

  // --- STATO: INVIO COMPLETATO ---
  if (inviato) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
        <div style={{ fontSize: '60px', marginBottom: '20px' }}>✅</div>
        <h1 style={{ color: '#065f46', fontSize: '32px', fontWeight: '800' }}>Richiesta Ricevuta</h1>
        <p style={{ color: '#64748b', fontSize: '18px', maxWidth: '500px', margin: '10px auto 30px auto', lineHeight: '1.6' }}>
          Il tuo profilo professionale è in fase di verifica tecnica e SEO. Sarà visibile online entro 24 ore.
        </p>
        <a href="/" style={{ backgroundColor: '#10b981', color: 'white', padding: '18px 40px', borderRadius: '15px', textDecoration: 'none', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(16, 185, 129, 0.2)' }}>Torna alla Home</a>
      </div>
    );
  }

  // --- STATO: NON AUTENTICATO ---
  if (!sessione) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h2 style={{ color: '#065f46', fontSize: '28px', fontWeight: '800' }}>Area Professionisti</h2>
        <p style={{ color: '#64748b', marginBottom: '30px', maxWidth: '400px' }}>Per garantire la qualità del portale, solo i professionisti registrati possono pubblicare annunci.</p>
        <a href="/login" style={{ background: '#065f46', color: 'white', padding: '15px 35px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>Accedi o Registrati →</a>
        <a href="/" style={{ marginTop: '20px', color: '#64748b', textDecoration: 'none', fontSize: '14px' }}>Torna alla Home</a>
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
          <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '40px', fontSize: '17px' }}>Diventa visibile per i pazienti nei quartieri di Roma.</p>

          <form onSubmit={gestisciInvio} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            
            {/* NOME E CATEGORIA */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '700', fontSize: '14px', color: '#065f46' }}>Nome Struttura o Medico *</label>
                    <input name="nome" type="text" placeholder="Es: Dr. Mario Rossi" style={{ padding: '15px', borderRadius: '14px', border: '1px solid #cbd5e1', fontSize: '15px' }} required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '700', fontSize: '14px', color: '#065f46' }}>Categoria *</label>
                    <select name="categoria" style={{ padding: '15px', borderRadius: '14px', border: '1px solid #cbd5e1', backgroundColor: 'white', fontSize: '15px' }} required>
                        <option value="">Seleziona...</option>
                        <option value="Dentista">Dentista</option>
                        <option value="Cardiologo">Cardiologo</option>
                        <option value="Dermatologo">Dermatologo</option>
                        <option value="Farmacia">Farmacia</option>
                        <option value="Diagnostica">Diagnostica</option>
                        <option value="Domicilio">Assistenza a Domicilio</option>
                        <option value="Medico Specialista">Medico Specialista</option>
                    </select>
                </div>
            </div>

            {/* QUARTIERE E INDIRIZZO */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '700', fontSize: '14px', color: '#065f46' }}>Quartiere (Zona) *</label>
                <select name="zona" style={{ padding: '15px', borderRadius: '14px', border: '1px solid #cbd5e1', backgroundColor: 'white', fontSize: '15px' }} required>
                    <option value="">Scegli zona...</option>
                    {['Centro Storico', 'Prati', 'EUR', 'Parioli', 'San Giovanni', 'Trastevere', 'Ostiense', 'Monteverde', 'Tiburtina', 'Flaminio', 'Nomentano', 'Appio Latino', 'Magliana', 'Cassia'].sort().map(z => (
                        <option key={z} value={z}>{z}</option>
                    ))}
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '700', fontSize: '14px', color: '#065f46' }}>Indirizzo e Civico *</label>
                <input name="indirizzo" type="text" placeholder="Es: Via del Corso, 1" style={{ padding: '15px', borderRadius: '14px', border: '1px solid #cbd5e1', fontSize: '15px' }} required />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: '700', fontSize: '14px', color: '#065f46' }}>WhatsApp / Telefono per Pazienti *</label>
              <input name="whatsapp" type="tel" placeholder="Es: 3331234567" style={{ padding: '15px', borderRadius: '14px', border: '1px solid #cbd5e1', fontSize: '15px' }} required />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: '700', fontSize: '14px', color: '#065f46' }}>Descrizione Breve Professionalità</label>
              <textarea name="descrizione" placeholder="Descrivi i tuoi punti di forza o servizi offerti..." style={{ padding: '15px', borderRadius: '14px', border: '1px solid #cbd5e1', minHeight: '120px', fontSize: '15px', lineHeight: '1.5' }} />
            </div>

            {/* 🏷️ SEZIONE BADGE */}
            <div style={{ backgroundColor: '#f0fdf4', padding: '25px', borderRadius: '20px', border: '1px solid #dcfce7' }}>
              <label style={{ fontWeight: '800', fontSize: '15px', color: '#166534', display: 'block', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Servizi Distintivi (Badge)
              </label>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', cursor: 'pointer', color: '#334155' }}>
                  <input type="checkbox" name="vicino_metro" style={{ width: '20px', height: '20px', accentColor: '#10b981' }} /> 
                  <span>🚇 <strong>Vicino Metro:</strong> Lo studio è facilmente raggiungibile a piedi dalla metro.</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', cursor: 'pointer', color: '#334155' }}>
                  <input type="checkbox" name="urgenza_24h" style={{ width: '20px', height: '20px', accentColor: '#10b981' }} /> 
                  <span>🚨 <strong>H24 / Urgenze:</strong> Gestisco appuntamenti rapidi o urgenze.</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', cursor: 'pointer', color: '#334155' }}>
                  <input type="checkbox" name="primo_sconto" style={{ width: '20px', height: '20px', accentColor: '#10b981' }} /> 
                  <span>✨ <strong>Promo:</strong> Offro una agevolazione per i nuovi pazienti del portale.</span>
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={caricamento}
              style={{ 
                background: caricamento ? '#94a3b8' : '#10b981', color: 'white', padding: '22px', 
                borderRadius: '18px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '18px',
                marginTop: '15px', boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.3)', transition: 'all 0.2s'
              }}
            >
              {caricamento ? 'Elaborazione in corso...' : 'PUBBLICA PROFILO SU ROMA'}
            </button>
          </form>
        </div>
      </main>

      <footer style={{ background: '#1a202c', color: 'white', padding: '60px 0 30px', borderTop: '4px solid #3182ce', marginTop: '80px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            <div>
              <h4 style={{ color: '#63b3ed', marginBottom: '15px' }}>ServiziSalute</h4>
              <p style={{ fontSize: '14px', color: '#a0aec0', lineHeight: '1.6' }}>
                ServiziSalute è il portale di annunci dedicato ai servizi sanitari a Roma. 
                Trova farmacie, dentisti, centri diagnostici e visite specialistiche vicino a te.
              </p>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Per gli utenti</h4>
              <p style={{ fontSize: '12px', color: '#48bb78', marginBottom: '10px', fontWeight: 'bold' }}>● Disponibilità aggiornate: Gennaio 2026</p>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/" style={{ color: '#a0aec0', textDecoration: 'none' }}>Home</a></li>
                <li><a href="/servizi-sanitari-roma" style={{ color: '#63b3ed', fontWeight: 'bold', textDecoration: 'none' }}>📍 Mappa Servizi per Quartiere</a></li>
                <li><a href="/guide/costo-pulizia-denti-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Costo Pulizia Denti</a></li>
                <li><a href="/farmacie-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Farmacie a Roma</a></li>
                <li><a href="/dentisti-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Dentisti a Roma</a></li>
                <li><a href="/diagnostica-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Diagnostica a Roma</a></li>
                <li><a href="/visite-specialistiche-roma" style={{ color: '#a0aec0', textDecoration: 'none' }}>Visite specialistiche</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Per i professionisti</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
                <li><a href="/pubblica-annuncio" style={{ color: '#48bb78', textDecoration: 'none', fontWeight: 'bold' }}>Pubblica il tuo annuncio</a></li>
                <li><a href="/come-funziona" style={{ color: '#a0aec0', textDecoration: 'none' }}>Come funziona</a></li>
                <li><a href="/contatti" style={{ color: '#a0aec0', textDecoration: 'none' }}>Contattaci</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px' }}>Note legali</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5', marginBottom: '15px' }}>
                <li><a href="/chi-siamo" style={{ color: '#a0aec0', textDecoration: 'none' }}>Chi Siamo</a></li>
                <li><a href="/disclaimer" style={{ color: '#a0aec0', textDecoration: 'none' }}>Disclaimer</a></li>
                <li><a href="/privacy-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Privacy Policy</a></li>
                <li><a href="/cookie-policy" style={{ color: '#a0aec0', textDecoration: 'none' }}>Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div style={{ marginTop: '50px', borderTop: '1px solid #2d3748', paddingTop: '20px', textAlign: 'center', fontSize: '12px', color: '#718096' }}>
            © 2026 ServiziSalute – Tutti i diritti riservati
          </div>
        </div>
      </footer>
    </div>
  );
}
