import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
        emailRedirectTo: typeof window !== 'undefined' ? window.location.origin + '/pubblica-annuncio' : '',
      },
    });

    if (error) {
      alert("Errore: " + error.message);
    } else {
      setMessaggio("Controlla la tua email! Ti abbiamo inviato il link per accedere in sicurezza.");
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Head>
        <title>Accedi | ServiziSalute Roma</title>
        <meta name="description" content="Accedi alla tua area professionale su ServiziSalute Roma." />
      </Head>
      
      <Navbar />

      <main style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '32px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)', maxWidth: '450px', width: '100%', textAlign: 'center', border: '1px solid #e2e8f0' }}>
          
          <div style={{ fontSize: '40px', marginBottom: '20px' }}>🔐</div>
          
          <h1 style={{ color: '#0f172a', marginBottom: '10px', fontSize: '28px', fontWeight: '900', letterSpacing: '-1px' }}>Area Professionisti</h1>
          <p style={{ color: '#64748b', marginBottom: '30px', fontWeight: '500', lineHeight: '1.5' }}>
            Inserisci la tua email professionale. Ti invieremo un link magico per accedere senza password.
          </p>

          {messaggio ? (
            <div style={{ padding: '25px', backgroundColor: '#f0fdf4', color: '#166534', borderRadius: '20px', fontWeight: '700', border: '1px solid #bbf7d0', lineHeight: '1.4' }}>
              {messaggio}
            </div>
          ) : (
            <form onSubmit={gestisciLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input 
                type="email" 
                placeholder="nome@studio-medico.it" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ 
                  padding: '18px', 
                  borderRadius: '15px', 
                  border: '2px solid #e2e8f0', 
                  fontSize: '16px', 
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                required 
              />
              <button 
                type="submit" 
                disabled={loading}
                style={{ 
                  background: '#2563eb', 
                  color: 'white', 
                  padding: '18px', 
                  borderRadius: '15px', 
                  border: 'none', 
                  fontWeight: '800', 
                  cursor: 'pointer', 
                  fontSize: '16px',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
                  transition: 'transform 0.1s'
                }}
              >
                {loading ? 'Invio in corso...' : 'RICEVI LINK DI ACCESSO'}
              </button>
            </form>
          )}

          <div style={{ marginTop: '30px', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
              <a href="/per-i-professionisti" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>
                Non sei ancora iscritto? <span style={{ color: '#2563eb' }}>Scopri i vantaggi</span>
              </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
