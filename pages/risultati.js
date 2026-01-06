import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Risultati() {
  const router = useRouter();
  const { zona, cerca } = router.query;
  const [lista, setLista] = useState([]);

  // Database finto per il test
  const databaseDati = [
    { id: 1, nome: "Dr. Valerio Rossi", cat: "dentista", zona: "Prati", desc: "Specialista in implantologia e pulizia denti.", tel: "061234567", wa: "3331234567" },
    { id: 2, nome: "Farmacia San Giovanni", cat: "farmacia", zona: "San Giovanni", desc: "Aperta H24. Servizio Holter pressorio.", tel: "06778899", wa: "333998877" },
    { id: 3, nome: "Centro Diagnostico Eur", cat: "diagnostica", zona: "Eur", desc: "Risonanza magnetica e TAC in tempi brevi.", tel: "06554433", wa: "331223344" },
    { id: 4, nome: "Dr.ssa Elena Bianchi", cat: "cardiologo", zona: "Prati", desc: "Dermatologa specializzata in mappatura nei.", tel: "06112233", wa: "339112233" },
  ];

  useEffect(() => {
    if (router.isReady) {
      const filtrati = databaseDati.filter(item => {
        const matchZona = !zona || zona === "Tutta Roma" || item.zona.toLowerCase() === zona.toLowerCase();
        const matchCerca = !cerca || item.cat.toLowerCase().includes(cerca.toLowerCase()) || item.nome.toLowerCase().includes(cerca.toLowerCase());
        return matchZona && matchCerca;
      });
      setLista(filtrati);
    }
  }, [router.isReady, zona, cerca]);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Head><title>Risultati Ricerca | ServiziSalute</title></Head>
      <a href="/" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}>← Nuova ricerca</a>
      <h1 style={{ marginTop: '20px' }}>Risultati per "{cerca}" a {zona}</h1>
      <p style={{ color: '#666' }}>Trovati {lista.length} risultati</p>

      {lista.map(res => (
        <div key={res.id} style={{ border: '1px solid #e2e8f0', padding: '20px', borderRadius: '12px', marginBottom: '15px', background: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: 'bold', textTransform: 'uppercase' }}>{res.cat}</span>
          <h3 style={{ margin: '5px 0' }}>{res.nome}</h3>
          <p style={{ fontSize: '14px', color: '#475569' }}>{res.desc}</p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
             <a href={`tel:${res.tel}`} style={{ background: '#f1f5f9', color: '#1e3a8a', padding: '10px 15px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>Chiama</a>
             <a href={`https://wa.me/${res.wa}`} style={{ background: '#25d366', color: 'white', padding: '10px 15px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>WhatsApp</a>
          </div>
        </div>
      ))}
      
      {lista.length === 0 && <p>Nessun risultato trovato per i criteri inseriti.</p>}
    </div>
  );
}
