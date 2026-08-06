import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { supabase } from '../../lib/supabaseClient';

export default function GestisciScheda() {
  const router = useRouter();
  const { id } = router.query;

  const [annuncio, setAnnuncio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function caricaScheda() {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push('/login');
        return;
      }

      const { data } = await supabase
        .from('annunci')
        .select('*')
        .eq('id', id)
        .eq('user_id', session.user.id)
        .single();

      if (data) {
        setAnnuncio(data);
      }

      setLoading(false);
    }

    caricaScheda();
  }, [id]);


  if (loading) {
    return <div style={{padding:'100px', textAlign:'center'}}>Caricamento...</div>;
  }

  if (!annuncio) {
    return <div style={{padding:'100px', textAlign:'center'}}>
      Scheda non trovata o non autorizzata.
    </div>;
  }


  return (
    <div style={{minHeight:'100vh', background:'#f8fafc'}}>
      <Head>
        <title>Gestisci scheda | ServiziSalute</title>
      </Head>

      <Navbar />

      <main style={{
        maxWidth:'900px',
        margin:'0 auto',
        padding:'40px 20px'
      }}>

        <div style={{
          background:'white',
          padding:'30px',
          borderRadius:'20px'
        }}>

          <h1>Gestisci scheda</h1>

          <h2>{annuncio.nome}</h2>

          <p>
            Qui potrai modificare servizi, prezzi, foto e informazioni della struttura.
          </p>

          <hr />

          <p><b>Indirizzo:</b> {annuncio.indirizzo}</p>

          <p><b>Telefono:</b> {annuncio.telefono}</p>

          <p><b>Zona:</b> {annuncio.zona}</p>

        </div>

      </main>

      <Footer />

    </div>
  );
}
