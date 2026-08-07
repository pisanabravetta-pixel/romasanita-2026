import { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';

export default function Dashboard() {

  const [sessione, setSessione] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [annunci, setAnnunci] = useState([]);
  const [richieste, setRichieste] = useState([]);
  const [loading, setLoading] = useState(true);


  async function caricaDati() {

    const { data:{session} } = await supabase.auth.getSession();

    setSessione(session);


    if(!session){
      setLoading(false);
      return;
    }


    // controllo amministratore

    const { data:admin } = await supabase
      .from('admin')
      .select('email')
      .eq('email', session.user.email)
      .single();


    if(admin){
      setIsAdmin(true);
    }



    // schede professionista

    const { data: mieSchede } = await supabase
      .from('annunci')
      .select('id,nome,slug,stato,approvato')
      .eq('user_id', session.user.id)
      .order('id',{ascending:false});


    setAnnunci(mieSchede || []);




    // richieste per amministratore

    if(admin){

      const { data: richiesteAdmin } = await supabase
        .from('richieste_rivendicazione')
        .select(`
          id,
          annuncio_id,
          user_id,
          email,
          messaggio,
          stato,
          created_at,
          annunci (
            nome
          )
        `)
        .order('created_at',{ascending:false});


      setRichieste(richiesteAdmin || []);

    }


    setLoading(false);

  }



  useEffect(()=>{

    caricaDati();

  },[]);





  async function approvaRichiesta(richiesta){


    const {error:erroreAnnuncio}=await supabase
      .from('annunci')
      .update({
        user_id: richiesta.user_id
      })
      .eq('id', richiesta.annuncio_id);



    if(erroreAnnuncio){

      alert("Errore assegnazione scheda");
      console.log(erroreAnnuncio);
      return;

    }




    const {error}=await supabase
      .from('richieste_rivendicazione')
      .update({
        stato:'approvata',
        reviewed_at:new Date()
      })
      .eq('id', richiesta.id);



    if(error){

      alert("Errore aggiornamento richiesta");
      console.log(error);

    }else{

      alert("Richiesta approvata");

      caricaDati();

    }

  }





  async function rifiutaRichiesta(id){


    const {error}=await supabase
      .from('richieste_rivendicazione')
      .update({
        stato:'rifiutata',
        reviewed_at:new Date()
      })
      .eq('id',id);



    if(error){

      alert("Errore rifiuto");

    }else{

      alert("Richiesta rifiutata");

      caricaDati();

    }


  }




  if(loading){

    return (
      <div style={{padding:'100px',textAlign:'center'}}>
        Caricamento...
      </div>
    );

  }





return (

<div style={{
minHeight:'100vh',
background:'#f8fafc'
}}>


<Head>
<title>Dashboard | ServiziSalute</title>
</Head>


<Navbar />


<main style={{
maxWidth:'1000px',
margin:'0 auto',
padding:'40px 20px'
}}>


{!sessione ? (

<div style={{
background:'white',
padding:'30px',
borderRadius:'20px',
textAlign:'center'
}}>

<h1>Accedi area professionista</h1>

<a href="/login">
Accedi
</a>

</div>


) : isAdmin ? (


<>

<div style={{
background:'#dcfce7',
padding:'20px',
borderRadius:'16px'
}}>

<h1>👑 Pannello amministratore</h1>

<p>
Gestione ServiziSalute
</p>

</div>




<h2 style={{marginTop:'35px'}}>
Richieste rivendicazione
</h2>



{richieste.length===0 ? (

<div style={{
background:'white',
padding:'20px',
borderRadius:'15px'
}}>
Nessuna richiesta presente.
</div>


) : (

richieste.map((r)=>(


<div key={r.id}
style={{
background:'white',
padding:'20px',
marginBottom:'15px',
borderRadius:'15px',
border:'1px solid #e2e8f0'
}}>


<h3>
{r.annunci?.nome}
</h3>


<p>
Email: {r.email}
</p>


<p>
Messaggio: {r.messaggio || 'Nessun messaggio'}
</p>


<p>
Stato: {r.stato || 'in attesa'}
</p>



<button
onClick={()=>approvaRichiesta(r)}
style={{
background:'#16a34a',
color:'white',
padding:'10px 15px',
border:0,
borderRadius:'10px',
marginRight:'10px'
}}
>
Approva
</button>


<button
onClick={()=>rifiutaRichiesta(r.id)}
style={{
background:'#dc2626',
color:'white',
padding:'10px 15px',
border:0,
borderRadius:'10px'
}}
>
Rifiuta
</button>


</div>


))

)}


</>



) : (


<>

<h1>
Le tue schede
</h1>


{annunci.length===0 ? (

<div style={{
background:'white',
padding:'25px',
borderRadius:'15px'
}}>

Non hai ancora schede assegnate.

</div>


) : (

annunci.map(a=>(

<div key={a.id}
style={{
background:'white',
padding:'20px',
marginBottom:'15px',
borderRadius:'15px'
}}>

<h2>
{a.nome}
</h2>

<p>
Stato: {a.stato || 'pubblicata'}
</p>


<a href={`/dashboard/${a.id}`}>
Gestisci scheda →
</a>


</div>


))

)}


</>

)}



</main>


<Footer />


</div>

)

}
