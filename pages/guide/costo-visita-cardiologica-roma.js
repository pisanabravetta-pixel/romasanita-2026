// pages/guide/costo-visita-cardiologica-roma.js
import React from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function GuidaCardiologica() {
  const dataAttuale = new Date();
  const mesi = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
  const dataStringa = `${mesi[dataAttuale.getMonth()]} ${dataAttuale.getFullYear()}`;

  const quartieri = [
    { slug: 'prati', nome: 'Prati' },
    { slug: 'eur', nome: 'EUR' },
    { slug: 'ostia', nome: 'Ostia' },
    { slug: 'trastevere', nome: 'Trastevere' },
    { slug: 'monti', nome: 'Monti' },
    { slug: 'garbatella', nome: 'Garbatella' },
    { slug: 'testaccio', nome: 'Testaccio' },
    { slug: 'tiburtina', nome: 'Tiburtina' },
    { slug: 'balduina', nome: 'Balduina' },
    { slug: 'eur-torrino', nome: 'EUR Torrino' }
  ];

  return (
    <>
      <Head>
        <title>Costo visita cardiologica a Roma | ServiziSalute</title>
        <meta name="description" content={`Guida aggiornata su quanto costa una visita cardiologica a Roma. Contatti diretti dei professionisti e indirizzi per il quartiere scelto, aggiornati a ${dataStringa}.`} />
        <link rel="canonical" href="https://www.servizisalute.com/guide/costo-visita-cardiologica-roma" />
      </Head>

      <Navbar />

      <main style={{ padding: '20px', maxWidth:'800px', margin:'0 auto' }}>
        <h1>Costo visita cardiologica a Roma</h1>
        <p>Se stai cercando informazioni su <strong>quanto costa una visita cardiologica a Roma</strong>, sei nella pagina giusta. Qui troverai indicazioni sui prezzi medi, contatti diretti dei cardiologi e link alle strutture presenti nei principali quartieri della città, aggiornati a <strong>{dataStringa}</strong>.</p>

        <h2>Prezzi indicativi delle visite cardiologiche</h2>
        <ul>
          <li>Visita cardiologica privata: 80€ – 150€</li>
          <li>Elettrocardiogramma (ECG): 30€ – 60€</li>
          <li>Ecocardiogramma: 60€ – 120€</li>
          <li>Holter cardiaco: 80€ – 130€</li>
        </ul>

        <p>I costi possono variare in base alla struttura, alla zona e all’esperienza del medico. Ti consigliamo di contattare direttamente la struttura per confermare disponibilità e prezzi aggiornati.</p>

        <h2>Cardiologi nei principali quartieri di Roma</h2>
        <p>Seleziona il quartiere di tuo interesse per vedere i cardiologi disponibili:</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
          {quartieri.map(q => (
            <a 
              key={q.slug} 
              href={`/cardiologi-roma-${q.slug}`} 
              style={{ 
                padding: '8px 12px', 
                backgroundColor: '#f0f9ff', 
                color: '#0369a1', 
                borderRadius: '8px', 
                textDecoration: 'none', 
                fontWeight: '700', 
                fontSize: '14px' 
              }}
            >
              {q.nome}
            </a>
          ))}
        </div>

        <h2>Come prenotare una visita cardiologica a Roma</h2>
        <p>Per prenotare una visita cardiologica puoi:</p>
        <ul>
          <li>Contattare direttamente il medico o la struttura tramite telefono o WhatsApp.</li>
          <li>Verificare la disponibilità online se la struttura offre prenotazioni digitali.</li>
          <li>Consultare la mappa per individuare la struttura più vicina a te nel quartiere di interesse.</li>
        </ul>

        <h2>Domande frequenti</h2>
        <h3>Quanto dura una visita cardiologica?</h3>
        <p>Di solito tra 20 e 40 minuti, a seconda degli esami richiesti.</p>

        <h3>Serve la ricetta del medico di base?</h3>
        <p>Per visite private non serve, per visite in convenzione con il SSN sì.</p>

        <h3>Posso pagare con carta o solo contanti?</h3>
        <p>Molti centri accettano pagamenti elettronici; verifica sempre con la struttura prima della visita.</p>

        <p>Per avere una panoramica completa dei cardiologi in città, puoi <a href="/cardiologi-roma" style={{ color: '#059669', fontWeight: '700', textDecoration: 'underline' }}>tornare alla lista generale di cardiologi a Roma</a>.</p>

      </main>

      <Footer />
    </>
  );
}
