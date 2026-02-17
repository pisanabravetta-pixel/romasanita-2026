import React from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function GuidaCostoRisonanza() {
  const dataCorrente = new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>Costo Risonanza Magnetica Roma | Prezzi {dataCorrente}</title>
        <meta name="description" content="Quanto costa una risonanza magnetica a Roma? Scoprilo nella guida ai prezzi per ginocchio, schiena e colonna nei centri privati." />
        <meta name="robots" content="max-image-preview:large" />
      </Head>

      <Navbar />

      <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        <div style={{ width: '100%', height: '400px', overflow: 'hidden', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <img 
            src="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1200" 
             alt="Apparecchiatura per risonanza magnetica moderna in un centro diagnostico a Roma"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
      </div>

      <main style={{ flex: '1 0 auto', maxWidth: '850px', margin: '20px auto', padding: '0 20px', width: '100%' }}>
        <div style={{ marginBottom: '20px', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
          <a href="/" style={{ color: '#2563eb', textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <a href="/guide" style={{ color: '#2563eb', textDecoration: 'none' }}>Guide</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <span style={{ color: '#1e3a8a' }}>Costo Risonanza Magnetica</span>
        </div>

        <article>
          <h1 style={{ color: '#1e3a8a', fontSize: '36px', fontWeight: '900', lineHeight: '1.2', marginBottom: '25px' }}>
            Quanto costa una risonanza magnetica privata a Roma?
          </h1>

          <div style={{ backgroundColor: '#eff6ff', padding: '25px', borderRadius: '20px', borderLeft: '6px solid #2563eb', marginBottom: '35px' }}>
            <p style={{ margin: 0, color: '#1e40af', fontSize: '18px', lineHeight: '1.6' }}>
              La risonanza magnetica (RM) è uno degli esami diagnostici più cercati a Roma, specialmente per problemi a ginocchio e schiena. Ecco i costi medi aggiornati.
            </p>
          </div>

          <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px' }}>
            <h2 style={{ color: '#1e3a8a', fontSize: '24px', fontWeight: '800', marginTop: '40px' }}>Prezzi medi per tipologia di esame</h2>
            <p>
              A Roma, i prezzi per una risonanza magnetica segmentaria (un solo distretto) variano sensibilmente tra i centri convenzionati e quelli puramente privati.
            </p>
            <ul style={{ paddingLeft: '20px' }}>
              <li><strong>RM Ginocchio / Spalla / Caviglia:</strong> 100€ - 160€</li>
              <li><strong>RM Colonna Vertebrale (un tratto):</strong> 110€ - 170€</li>
              <li><strong>RM Encefalo:</strong> 130€ - 200€</li>
              <li><strong>RM con Mezzo di Contrasto:</strong> supplemento di 50€ - 80€</li>
            </ul>

            <h2 style={{ color: '#1e3a8a', fontSize: '24px', fontWeight: '800', marginTop: '40px' }}>Perché scegliere il privato a Roma?</h2>
            <p>
              Il motivo principale è la tempistica. Mentre nel settore pubblico i tempi d'attesa possono superare i 60 giorni, nei centri diagnostici privati di Roma è spesso possibile eseguire l'esame entro 24-48 ore con consegna del referto immediata o in pochi giorni.
            </p>
            
            <h2 style={{ color: '#1e3a8a', fontSize: '24px', fontWeight: '800', marginTop: '40px' }}>Dove effettuare l'esame nei quartieri</h2>
            <p>
              Roma offre una vastissima scelta di centri di eccellenza. Se cerchi disponibilità immediata, ti consigliamo di controllare i centri in zona 
              <strong> <a href="/diagnostica-roma?quartiere=EUR" style={{ color: '#2563eb', textDecoration: 'none' }}>EUR</a></strong>, 
              <strong> <a href="/diagnostica-roma?quartiere=San%20Giovanni" style={{ color: '#2563eb', textDecoration: 'none' }}>San Giovanni</a></strong> e 
              <strong> <a href="/diagnostica-roma?quartiere=Prati" style={{ color: '#2563eb', textDecoration: 'none' }}>Prati</a></strong>.
            </p>
            
            <p>
              Altre opzioni valide con macchinari di ultima generazione (anche "aperti" per chi soffre di claustrofobia) si trovano a 
              <strong> <a href="/diagnostica-roma?quartiere=Aurelio" style={{ color: '#2563eb', textDecoration: 'none' }}>Aurelio</a></strong>, 
              <strong> <a href="/diagnostica-roma?quartiere=Tiburtina" style={{ color: '#2563eb', textDecoration: 'none' }}>Tiburtina</a></strong> e 
              <strong> <a href="/diagnostica-roma?quartiere=Ostia" style={{ color: '#2563eb', textDecoration: 'none' }}>Ostia</a></strong>.
            </p>
          </section>

          <div style={{ marginTop: '50px', padding: '30px', backgroundColor: '#1e3a8a', borderRadius: '20px', color: 'white', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Hai bisogno di una risonanza urgente?</h3>
            <p style={{ opacity: 0.8, marginBottom: '20px' }}>Trova i centri diagnostici di Roma con disponibilità immediata.</p>
            <a href="/diagnostica-roma" style={{ color: 'white', fontWeight: '800', textDecoration: 'none', border: '2px solid white', padding: '10px 20px', borderRadius: '10px' }}>
              VEDI CENTRI DIAGNOSTICI
            </a>
          </div>
        </article>
      </main>

      <div style={{ maxWidth: '850px', margin: '0 auto 40px auto', padding: '0 20px', width: '100%' }}>
        <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '15px', border: '1px solid #e2e8f0', fontSize: '14px', color: '#64748b', fontStyle: 'italic' }}>
          <strong>Nota Informativa:</strong> I prezzi indicati sono medie di mercato basate sui listini dei principali centri diagnostici privati di Roma nel {dataCorrente}.
        </div>
      </div>

      <Footer />
    </div>
  );
}
