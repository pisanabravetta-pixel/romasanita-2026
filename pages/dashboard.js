import { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';

export default function Dashboard() {

  const [sessione, setSessione] = useState(null);
  const [annunci, setAnnunci] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {

    async function carica() {

      const { data: { session } } = await supabase.auth.getSession();

      setSessione(session);


      if(session){

        const { data: admin } = await supabase
          .from('admin')
          .select('email')
          .eq('email', session.user.email)
          .single();


        if(admin){
          setIsAdmin(true);
        }



        const { data } = await supabase
          .from('annunci')
          .select('id, nome, slug, stato, approvato')
          .eq('user_id', session.user.id)
          .order('id', { ascending:false });


        setAnnunci(data || []);

      }


      setLoading(false);

    }


    carica();

  },[]);



  if(loading){

    return (
      <div style={{padding:'100px',textAlign:'center'}}>
        Caricamento…
      </div>
    );

  }



  return (

    <div style={{
      display:'flex',
      flexDirection:'column',
      minHeight:'100vh',
      background:'#f8fafc'
    }}>


      <Head>
        <title>Area professionista | ServiziSalute Roma</title>
      </Head>


      <Navbar />


      <main style={{
        flex:1,
        maxWidth:'900px',
        width:'100%',
        margin:'0 auto',
        padding:'48px 20px'
      }}>



      {!sessione ? (

        <div style={{
          background:'white',
          padding:'32px',
          borderRadius:'20px',
          textAlign:'center'
        }}>

          <h1>Accedi alla tua area professionista</h1>

          <a
          href="/login?returnTo=%2Fdashboard"
          style={{
            color:'white',
            background:'#0284c7',
            padding:'14px 20px',
            borderRadius:'12px',
            fontWeight:800,
            textDecoration:'none'
          }}>
          Accedi con email
          </a>

        </div>


      ) : isAdmin ? (


        <>

        <div style={{
          background:'#dcfce7',
          padding:'20px',
          borderRadius:'15px',
          marginBottom:'25px'
        }}>

          <h2>👑 Amministratore</h2>

          <p>
          Sei entrato come amministratore di ServiziSalute.
          </p>

        </div>


        <h1>
          Pannello Amministratore
        </h1>


        <div style={{
          background:'white',
          padding:'25px',
          borderRadius:'16px'
        }}>

          <h2>
          Richieste rivendicazione
          </h2>

          <p>
          Qui gestirai le richieste dei professionisti.
          </p>


        </div>


        </>


      ) : (


        <>

        <h1 style={{
          color:'#0f172a'
        }}>
          Le tue schede
        </h1>


        <p style={{
          color:'#64748b'
        }}>
          Qui troverai le strutture che hai rivendicato.
        </p>



        {annunci.length === 0 ? (

          <div style={{
            background:'white',
            padding:'28px',
            borderRadius:'16px'
          }}>

            <p>
            Non hai ancora schede assegnate.
            </p>

            <a href="/pubblica-annuncio">
            Crea una nuova scheda
            </a>


          </div>


        ) : (


        <div style={{
          display:'grid',
          gap:'14px'
        }}>


        {annunci.map((annuncio)=>(


        <div key={annuncio.id}
        style={{
          background:'white',
          border:'1px solid #e2e8f0',
          padding:'20px',
          borderRadius:'16px'
        }}>


        <h2>
        {annuncio.nome}
        </h2>


        <p>
        Stato: {annuncio.stato || (annuncio.approvato ? 'pubblicato':'in revisione')}
        </p>


        <a href={`/dashboard/${annuncio.id}`}>
        Gestisci scheda →
        </a>


        </div>


        ))}


        </div>


        )}


        </>


      )}



      </main>


      <Footer />


    </div>

  );

}
