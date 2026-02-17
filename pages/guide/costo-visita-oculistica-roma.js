import React from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function GuidaCostoOculistica() {
  const dataCorrente = new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>Quanto costa una visita oculistica a Roma? | Prezzi {dataCorrente}</title>
        <meta name="description" content="Guida ai prezzi medi per una visita oculistica a Roma. Scopri i costi per il controllo della vista e del fondo oculare nei vari quartieri." />
        <meta name="robots" content="max-image-preview:large" />
      </Head>

      <Navbar />

      <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
        <div style={{ width: '100%', height: '400px', overflow: 'hidden', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <img 
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200" 
             alt="Esame della vista professionale presso studio oculistico a Roma"
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
          <span style={{ color: '#1e3a8a' }}>Costo Visita Oculistica</span>
        </div>

        <article>
          <h1 style={{ color: '#1e3a8a', fontSize: '36px', fontWeight: '900', lineHeight: '1.2', marginBottom: '25px' }}>
            Quanto costa una visita oculistica privata a Roma?
          </h1>

          <div style={{ backgroundColor: '#eff6ff', padding: '25px', borderRadius: '20px', borderLeft: '6px solid #2563eb', marginBottom: '35px' }}>
            <p style={{ margin: 0, color: '#1e40af', fontSize: '18px', lineHeight: '1.6' }}>
              La prevenzione visiva è fondamentale, ma i tempi d'attesa nel pubblico portano molti romani a scegliere il privato. Ecco le tariffe medie attuali.
            </p>
          </div>

          <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '17px' }}>
            <h2 style={{ color: '#1e3a8a', fontSize: '24px', fontWeight: '800', marginTop: '40px' }}>I prezzi medi a Roma</h2>
            <p>
              A Roma, una visita oculistica completa in regime privato ha un costo medio che oscilla tra gli <strong>80€ e i 150€</strong>.
            </p>
            <ul style={{ paddingLeft: '20px' }}>
              <li><strong>Roma Centro / Prati:</strong> 100€ - 160€</li>
              <li><strong>Roma Nord (Parioli):</strong> 110€ - 180€</li>
              <li><strong>Altre Zone (Appio/Tuscolano/Ostia):</strong> 80€ - 120€</li>
            </ul>

            <h2 style={{ color: '#1e3a8a', fontSize: '24px', fontWeight: '800', marginTop: '40px' }}>Cosa comprende la visita</h2>
            <p>
              Una visita standard a Roma include generalmente: test della refrazione (misurazione della vista), esame del segmento anteriore, tonometria (pressione oculare) ed esame del fondo oculare.
            </p>
            
            <h2 style={{ color: '#1e3a8a', fontSize: '24px', fontWeight: '800', marginTop: '40px' }}>Dove prenotare nei quartieri</h2>
            <p>
              Puoi trovare eccellenti studi oculistici in tutta la città. Per chi cerca strutture di alto livello, le zone di 
              <strong> <a href="/oculisti-roma?quartiere=Prati" style={{ color: '#2563eb', textDecoration: 'none' }}>Prati</a></strong> e 
              <strong> <a href="/oculisti-roma?quartiere=Parioli" style={{ color: '#2563eb', textDecoration: 'none' }}>Parioli</a></strong> offrono la più alta densità di specialisti.
            </p>
            
            <p>
              Strutture moderne e facilmente raggiungibili sono presenti anche all' 
              <strong> <a href="/oculisti-roma?quartiere=EUR" style={{ color: '#2563eb', textDecoration: 'none' }}>EUR</a></strong>, a 
              <strong> <a href="/oculisti-roma?quartiere=San%20Giovanni" style={{ color: '#2563eb', textDecoration: 'none' }}>San Giovanni</a></strong> e nel quartiere 
              <strong> <a href="/oculisti-roma?quartiere=Aurelio" style={{ color: '#2563eb', textDecoration: 'none' }}>Aurelio</a></strong>. 
              Per chi vive nel quadrante est o sud, ottime opzioni sono disponibili a 
              <strong> <a href="/oculisti-roma?quartiere=Tiburtina" style={{ color: '#2563eb', textDecoration: 'none' }}>Tiburtina</a></strong> e 
              <strong> <a href="/oculisti-roma?quartiere=Ostia" style={{ color: '#2563eb', textDecoration: 'none' }}>Ostia</a></strong>.
            </p>
          </section>

          <div style={{ marginTop: '50px', padding: '30px', backgroundColor: '#1e3a8a', borderRadius: '20px', color: 'white', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Cerchi un oculista a Roma?</h3>
            <p style={{ opacity: 0.8, marginBottom: '20px' }}>Trova i migliori specialisti vicino al tuo quartiere.</p>
            <a href="/oculisti-roma" style={{ color: 'white', fontWeight: '800', textDecoration: 'none', border: '2px solid white', padding: '10px 20px', borderRadius: '10px' }}>
              VEDI OCULISTI A ROMA
            </a>
          </div>
        </article>
      </main>

      <div style={{ maxWidth: '850px', margin: '0 auto 40px auto', padding: '0 20px', width: '100%' }}>
        <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '15px', border: '1px solid #e2e8f0', fontSize: '14px', color: '#64748b', fontStyle: 'italic' }}>
          <strong>Nota Informativa:</strong> I prezzi indicati sono medie di mercato rilevate a Roma nel {dataCorrente}. Le tariffe possono variare in base alla complessità della visita e alla tecnologia utilizzata.
        </div>
      </div>

      <Footer />
    </div>
  );
}
