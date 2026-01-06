import React, { useState } from 'react';
import Head from 'next/head';
import { supabase } from '../supabaseClient'; // Assicurati che il file sia nella cartella principale

export default function PubblicaAnnuncio() {
  const [caricamento, setCaricamento] = useState(false);
  const [inviato, setInviato] = useState(false);

  const gestisciInvio = async (e) => {
    e.preventDefault();
    setCaricamento(true);

    // Recuperiamo i dati dal form
    const formData = new FormData(e.target);
    const dati = Object.fromEntries(formData);

    // Invio a Supabase
    const { error } = await supabase
      .from('annunci')
      .insert([
        { 
          nome: dati.nome, 
          categoria: dati.categoria, 
          zona: dati.zona, 
          descrizione: dati.descrizione,
          whatsapp: dati.whatsapp,
          approvato: false // Rimane nascosto finché non lo attivi tu su Supabase
        }
      ]);

    setCaricamento(false);

    if (error) {
      alert("Errore tecnico: " + error.message);
    } else {
      setInviato(true);
    }
  };

  if (inviato) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: 'sans-serif' }}>
        <h1 style={{ color: '#2563eb' }}>🚀 Richiesta Ricevuta!</h1>
        <p>Grazie! Il tuo profilo è in fase di revisione. Sarà online entro 24 ore.</p>
        <a href="/" style={{ color: '#2563eb', fontWeight: 'bold' }}>Torna alla Home</a>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      <Head>
        <title>Pubblica il tuo profilo sanitario gratis | ServiziSalute Roma</title>
      </Head>

      <header style={{ background: 'white', padding: '15px 20px', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <a href="/" style={{ fontWeight: '800', color: '#2563eb', textDecoration: 'none', fontSize: '20px' }}>ServiziSalute</a>
           <a href="/" style={{ fontSize: '13px', color: '#64748b', textDecoration: 'none' }}>Torna alla Home</a>
        </div>
      </header>

      <main style={{ maxWidth: '700px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ color: '#1e3a8a', fontSize: '32px', marginBottom: '10px' }}>Raggiungi nuovi pazienti a Roma</h1>
            <p style={{ fontSize: '17px', color: '#4b5563' }}>Inserimento gratuito per i professionisti sanitari.</p>
          </div>

          {/* BOX VANTAGGI FLASH */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '40px' }}>
            <div style={{ textAlign: 'center', padding: '15px', border: '1px solid #f1f5f9', borderRadius: '12px', background: '#f8fafc' }}>
              <div style={{ fontSize: '24px', marginBottom: '5px' }}>🚀</div>
              <h3 style={{ fontSize: '12px', color: '#1e3a8a', margin: '0', fontWeight: '800' }}>VISIBILITÀ</h3>
            </div>
            <div style={{ textAlign: 'center', padding: '15px', border: '1px solid #f1f5f9', borderRadius: '12px', background: '#f8fafc' }}>
              <div style={{ fontSize: '24px', marginBottom: '5px' }}>🆓</div>
              <h3 style={{ fontSize: '12px', color: '#1e3a8a', margin: '0', fontWeight: '800' }}>GRATIS</h3>
            </div>
            <div style={{ textAlign: 'center', padding: '15px', border: '1px solid #f1f5f9', borderRadius: '12px', background: '#f8fafc' }}>
              <div style={{ fontSize: '24px', marginBottom: '5px' }}>📈</div>
              <h3 style={{ fontSize: '12px', color: '#1e3a8a', margin: '0', fontWeight: '800' }}>DIRETTO</h3>
            </div>
          </div>

          {/* FORM DI ISCRIZIONE */}
          <form onSubmit={gestisciInvio} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: '700', fontSize: '14px', color: '#1e3a8a' }}>Nome Struttura o Professionista</label>
              <input name="nome" type="text" placeholder="Es: Farmacia Centrale, Dr. Mario Rossi..." style={{ padding:
