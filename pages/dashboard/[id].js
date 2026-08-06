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

  const [form, setForm] = useState({
    nome: '',
    categoria: '',
    indirizzo: '',
    zona: '',
    telefono: '',
    whatsapp: '',
    email_contatto: '',
    sito_web: '',
    descrizione: '',
    urgenza_24h: false,
    h24_aperto: false,
    test_rapidi: false,
    consegna_domicilio: false,
    parcheggio_privato: false,
    senza_barriere: false,
    vicino_metro: false
  });


  useEffect(() => {

    if (!id) return;

    async function caricaScheda() {

      const { data:{session} } = await supabase.auth.getSession();

      if (!session) {
        router.push('/login');
        return;
      }
alert(JSON.stringify(form));

      const { data, error } = await supabase
        .from('annunci')
        .select('*')
        .eq('id', id)
        .eq('user_id', session.user.id)
        .single();


      if(error){
        console.error(error);
      }


      if(data){

        setAnnuncio(data);

        setForm({
          nome: data.nome || '',
          categoria: data.categoria || '',
          indirizzo: data.indirizzo || '',
          zona: data.zona || '',
          telefono: data.telefono || '',
          whatsapp: data.whatsapp || '',
          email_contatto: data.email_contatto || '',
          sito_web: data.sito_web || '',
          descrizione: data.descrizione || '',
          urgenza_24h: data.urgenza_24h || false,
          h24_aperto: data.h24_aperto || false,
          test_rapidi: data.test_rapidi || false,
          consegna_domicilio: data.consegna_domicilio || false,
          parcheggio_privato: data.parcheggio_privato || false,
          senza_barriere: data.senza_barriere || false,
          vicino_metro: data.vicino_metro || false
        });

      }


      setLoading(false);

    }


    caricaScheda();

  },[id]);



function cambiaCampo(e){

  const {name,value,type,checked}=e.target;

  setForm((prev)=>({
    ...prev,
    [name]: type === 'checkbox' ? checked : value
  }));

}



async function salvaModifiche(){

 const { data:{session} } = await supabase.auth.getSession();
alert("TEST SALVATAGGIO");
  alert(JSON.stringify(form));
 if(!session){
   router.push('/login');
   return;
 }


const { data, error } = await supabase
  .from('annunci')
  .update(form)
  .eq('id', id)
  .eq('user_id', session.user.id)
  .select();
if(error){

   console.error(error);
   alert("Errore nel salvataggio");

}else if(!data || data.length === 0){

   alert("Nessun dato aggiornato dal database");

}else{

   setAnnuncio({
     ...annuncio,
     ...form
   });

   alert("Scheda aggiornata correttamente");

}

}



if(loading){

 return <div style={{padding:'100px',textAlign:'center'}}>
 Caricamento...
 </div>

}



if(!annuncio){

 return <div style={{padding:'100px',textAlign:'center'}}>
 Scheda non trovata o non autorizzata.
 </div>

}



function Campo({label,name}){

return(
<div style={{marginBottom:'20px'}}>

<label style={{
display:'block',
fontWeight:'700',
marginBottom:'8px'
}}>
{label}
</label>

<input
name={name}
value={form[name]}
onChange={cambiaCampo}
style={{
width:'100%',
padding:'12px',
borderRadius:'10px',
border:'1px solid #cbd5e1'
}}
/>

</div>
)

}



function Check({label,name}){

return(
<label style={{
display:'block',
marginBottom:'12px'
}}>

<input
type="checkbox"
name={name}
checked={form[name]}
onChange={cambiaCampo}
/>

<span style={{marginLeft:'10px'}}>
{label}
</span>

</label>
)

}



return (

<div style={{
minHeight:'100vh',
background:'#f8fafc'
}}>

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

<h2>{form.nome}</h2>


<p>
Modifica le informazioni della tua struttura.
</p>



<Campo label="Nome struttura" name="nome"/>

<Campo label="Categoria" name="categoria"/>

<Campo label="Indirizzo" name="indirizzo"/>

<Campo label="Zona" name="zona"/>

<Campo label="Telefono" name="telefono"/>

<Campo label="WhatsApp" name="whatsapp"/>

<Campo label="Email contatto" name="email_contatto"/>

<Campo label="Sito web" name="sito_web"/>


<label style={{
display:'block',
fontWeight:'700',
marginBottom:'8px'
}}>
Descrizione
</label>

<textarea
name="descrizione"
value={form.descrizione}
onChange={cambiaCampo}
style={{
width:'100%',
minHeight:'120px',
padding:'12px',
borderRadius:'10px',
border:'1px solid c-bd5e1'
}}
/>



<h3 style={{marginTop:'30px'}}>
Servizi disponibili
</h3>


<Check label="Urgenza 24 ore" name="urgenza_24h"/>

<Check label="Aperto H24" name="h24_aperto"/>

<Check label="Test rapidi" name="test_rapidi"/>

<Check label="Consegna domicilio" name="consegna_domicilio"/>

<Check label="Parcheggio privato" name="parcheggio_privato"/>

<Check label="Senza barriere" name="senza_barriere"/>

<Check label="Vicino metro" name="vicino_metro"/>



<button
onClick={salvaModifiche}
style={{
marginTop:'30px',
background:'#0284c7',
color:'white',
border:'none',
padding:'14px 25px',
borderRadius:'12px',
fontWeight:'800',
cursor:'pointer'
}}
>
Salva modifiche
</button>



<div style={{
marginTop:'40px',
paddingTop:'25px',
borderTop:'1px solid #e2e8f0'
}}>

<h3>Anteprima</h3>

<p>📍 {form.indirizzo}</p>

<p>📞 {form.telefono}</p>

<p>💬 {form.whatsapp}</p>

<p>{form.descrizione}</p>

</div>


</div>

</main>


<Footer />

</div>

)

}
