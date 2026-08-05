import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { supabase } from '../../lib/supabaseClient';

export default function RivendicaScheda() {
  const router = useRouter();
  const { slug } = router.query;
  const [sessione, setSessione] = useState(null);
  const [scheda, setScheda] = useState(null);
  const [messaggio, setMessaggio] = useState('');
  const [loading, setLoading] = useState(true);
  const [inviando, setInviando] = useState(false);
  const [esito, setEsito] = useState('');

  useEffect(() => {
    if (!slug) return;
    async function carica() {
      const [{ data: { session } }, { data, error }] = await Promise.all([
        supabase.auth.getSession(),
        supabase.from('annunci').select('id, nome, slug, user_id').eq('slug', slug).single(),
      ]);
      setSessione(session);
      if (!error && data) setScheda(data);
      setLoading(false);
    }
    carica();
  }, [slug]);

  const inviaRichiesta = async (event) => {
    event.preventDefault();
    if (!sessione) {
      router.push(`/login?returnTo=${encodeURIComponent(`/rivendica/${slug}`)}`);
      return;
    }
    if (!scheda || scheda.user_id) return;

    setInviando(true);
    const { error } = await supabase.from('richieste_rivendicazione').insert({
      annuncio_id: scheda.id,
      user_id: sessione.user.id,
      email: sessione.user.email,
      messaggio: messaggio.trim() || null,
    });
    setInviando(false);
    if (error) {
      setEsito('Non siamo riusciti a inviare la richiesta. Riprova tra poco.');
      return;
    }
    setEsito('Richiesta inviata. Controlleremo i dati e ti avviseremo via email.');
  };

  if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Caricamento…</div>;
  if (!scheda) return <div style={{ padding: '100px', textAlign: 'center' }}>Scheda non trovata.</div>;

  const giaTua = scheda.user_id && sessione?.user?.id === scheda.user_id;
  const giaRivendicata = scheda.user_id && !giaTua;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Head><title>Rivendica {scheda.nome} | ServiziSalute Roma</title></Head>
      <Navbar />
      <main style={{ flex: 1, maxWidth: '680px', width: '100%', margin: '0 auto', padding: '48px 20px' }}>
        <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,.06)' }}>
          <p style={{ margin: 0, color: '#0284c7', fontWeight: 800, fontSize: '13px', textTransform: 'uppercase' }}>Scheda professionale</p>
          <h1 style={{ color: '#0f172a', margin: '8px 0 12px', fontSize: '30px' }}>Rivendica {scheda.nome}</h1>
          <p style={{ color: '#475569', lineHeight: 1.6 }}>I dati iniziali sono stati estratti da fonti pubbliche. Se gestisci questa struttura, richiedi gratuitamente l’accesso per aggiornarli.</p>

          {giaTua ? <a href="/dashboard" style={{ display: 'inline-block', background: '#065f46', color: 'white', padding: '14px 20px', borderRadius: '12px', fontWeight: 800, textDecoration: 'none' }}>Gestisci la tua scheda →</a> :
           giaRivendicata ? <p style={{ background: '#fef3c7', color: '#92400e', padding: '14px', borderRadius: '12px' }}>Questa scheda è già stata rivendicata. Se ritieni sia un errore, contattaci a info@servizisalute.com.</p> :
           esito ? <p style={{ background: '#f0fdf4', color: '#166534', padding: '14px', borderRadius: '12px', fontWeight: 700 }}>{esito}</p> :
           <form onSubmit={inviaRichiesta} style={{ display: 'grid', gap: '16px', marginTop: '24px' }}>
             {!sessione && <p style={{ background: '#eff6ff', color: '#1d4ed8', padding: '14px', borderRadius: '12px', margin: 0 }}>Per inviare la richiesta ti chiederemo di accedere con la tua email professionale.</p>}
             <label style={{ display: 'grid', gap: '8px', color: '#334155', fontWeight: 700 }}>
               Un breve messaggio per confermare il tuo ruolo <span style={{ color: '#64748b', fontWeight: 400 }}>(facoltativo)</span>
               <textarea value={messaggio} onChange={(e) => setMessaggio(e.target.value)} placeholder="Es. Sono il responsabile della struttura…" rows="4" style={{ padding: '12px', border: '1px solid #cbd5e1', borderRadius: '10px', font: 'inherit', resize: 'vertical' }} />
             </label>
             <button disabled={inviando} type="submit" style={{ background: '#0284c7', color: 'white', border: 0, padding: '15px', borderRadius: '12px', fontWeight: 900, cursor: 'pointer', fontSize: '16px' }}>{inviando ? 'Invio in corso…' : sessione ? 'INVIA RICHIESTA' : 'ACCEDI E RIVENDICA'}</button>
           </form>}
        </div>
      </main>
      <Footer />
    </div>
  );
}

