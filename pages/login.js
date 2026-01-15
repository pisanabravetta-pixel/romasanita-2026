import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Head from 'next/head';
import Navbar from '../components/Navbar'; // AGGIUNTO
import Footer from '../components/Footer'; // AGGIUNTO

export default function Login() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [messaggio, setMessaggio] = useState('');

  const gestisciLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: window.location.origin + '/pubblica-annuncio',
      },
    });

    if (error) {
      alert("Errore: " + error.message);
    } else {
      setMessaggio("Controlla la tua email! Ti abbiamo inviato il link per accedere.");
    }
    setLoading(false);
  };

  return (
    /* AGGIUNTA FLEX-COLUMN PER FAR STARE IL FOOTER IN FONDO */
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
      <Head>
        <title>Accedi | ServiziSalute Roma</title>
      </Head>
      
      <Navbar /> {/* AGGIUNTA NAVBAR PER COERENZA */}

      {/* CONTENITORE CENTRALE CHE SPINGE IL FOOTER IN BASSO */}
      <main style={{ flex: '1 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
          <h1 style={{ color: '#1e3a8a', marginBottom: '10px' }}>Accedi</h1>
          <p style={{ color: '#64748b', marginBottom: '30px' }}>Riceverai un link di accesso via email.</p>

          {messaggio ? (
            <div style={{ padding: '20px', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '12px', fontWeight: 'bold' }}>
              {messaggio}
            </div>
          ) : (
            <form onSubmit={gestisciLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <input 
                type="email" 
                placeholder="La tua email professionale" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ padding: '15px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '16px' }}
                required 
              />
              <button 
                type="submit" 
                disabled={loading}
                style={{ background: '#2563eb', color: 'white', padding: '15px', borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}
              >
                {loading ? 'Invio in corso...' : 'Invia Link di Accesso'}
              </button>
            </form>
          )}
          <div style={{ marginTop: '20px' }}>
              <a href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px' }}>← Torna alla Home</a>
          </div>
        </div>
      </main>

      <Footer /> {/* AGGIUNTO FOOTER MASTER */}
    </div>
  );
}
