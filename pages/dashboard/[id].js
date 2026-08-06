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

  const [nome, setNome] = useState('');
  const [telefono, setTelefono] = useState('');
  const [indirizzo, setIndirizzo] = useState('');
  const [zona, setZona] = useState('');



  useEffect(() => {

    if (!id) return;


    async function caricaScheda() {

      const { data:{session} } = await supabase.auth.getSession();


      if (!session) {
        router.push('/login');
        return;
      }


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

        setNome(data.nome || '');
        setTelefono(data.telefono || '');
        setIndirizzo(data.indirizzo || '');
        setZona(data.zona || '');

      }


      setLoading(false);

    }


    caricaScheda();


  },[id]);





async function salvaModifiche(){


 const { data:{session} } = await supabase.auth.getSession();


 if(!session){
   router.push('/login');
   return;
 }



 const {error}= await supabase
 .from('annunci')
 .update({

   nome:nome,
   telefono:telefono,
   indirizzo:indirizzo,
   zona:zona

 })
 .eq('id',id)
 .eq('user_id',session.user.id);



 if(error){

   console.error(error);
   alert("Errore nel salvataggio");

 }else{


   setAnnuncio({

     ...annuncio,
     nome:nome,
     telefono:telefono,
     indirizzo:indirizzo,
     zona:zona

   });


   alert("Modifiche salvate correttamente");

 }


}





if(loading){

 return(
 <div style={{
 padding:'100px',
 textAlign:'center'
 }}>
 Caricamento...
 </div>
 );

}





if(!annuncio){

return(
<div style={{
padding:'100px',
textAlign:'center'
}}>
Scheda non trovata o non autorizzata.
</div>
)

}





return (

<div style={{
minHeight:'100vh',
background:'#f8fafc'
}}>


<Head>

<title>
Gestisci scheda | ServiziSalute
</title>

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


<h1>
Gestisci scheda
</h1>


<h2>
{nome}
</h2>



<p style={{
color:'#64748b'
}}>
Modifica le informazioni della tua struttura.
</p>




<div style={{
marginTop:'30px'
}}>



<label>
Nome struttura
</label>

<input

value={nome}

onChange={(e)=>setNome(e.target.value)}

style={{

width:'100%',
padding:'12px',
marginBottom:'20px',
borderRadius:'10px',
border:'1px solid #cbd5e1'

}}

/>





<label>
Telefono
</label>


<input

value={telefono}

onChange={(e)=>setTelefono(e.target.value)}

style={{

width:'100%',
padding:'12px',
marginBottom:'20px',
borderRadius:'10px',
border:'1px solid #cbd5e1'

}}

/>






<label>
Indirizzo
</label>


<input

value={indirizzo}

onChange={(e)=>setIndirizzo(e.target.value)}

style={{

width:'100%',
padding:'12px',
marginBottom:'20px',
borderRadius:'10px',
border:'1px solid #cbd5e1'

}}

/>






<label>
Zona
</label>


<input

value={zona}

onChange={(e)=>setZona(e.target.value)}

style={{

width:'100%',
padding:'12px',
marginBottom:'20px',
borderRadius:'10px',
border:'1px solid #cbd5e1'

}}

/>





<button

onClick={salvaModifiche}

style={{

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



</div>





<div style={{

marginTop:'40px',
paddingTop:'25px',
borderTop:'1px solid #e2e8f0'

}}>



<h3>
Anteprima informazioni
</h3>



<p>
📍 <b>Indirizzo:</b> {annuncio.indirizzo}
</p>


<p>
📞 <b>Telefono:</b> {annuncio.telefono}
</p>


<p>
📌 <b>Zona:</b> {annuncio.zona}
</p>



</div>




</div>


</main>



<Footer />


</div>

);


}
