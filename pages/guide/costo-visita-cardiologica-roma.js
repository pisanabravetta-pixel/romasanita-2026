import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function GuidaCardiologia() {
  const dataCorrente = new Date().toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
  const [cardiologi, setCardiologi] = useState([]);

  useEffect(() => {
    async function fetchCardiologi() {
      const { data, error } = await supabase
        .from('cardiologi')
        .select('nome, quartiere, link, telefono')
        .eq('in_annuncio', true)
        .limit(3);
      if (error) console.log('Errore Supabase:', error);
      else setCardiologi(data);
    }

    fetchCardiologi();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fdfdfd' }}>
      <Head>
        <title>Quanto Costa una Visita Cardiologica a Roma? Tariffe {dataCorrente}</title>
        <meta name="description" content="Scopri i costi medi di una visita cardiologica privata a Roma. Leggi la guida completa e prenota uno specialista vicino a te." />
      </Head>

      <Navbar />

      {/* IMMAGINE PRINCIPALE */}
      <div style={{ width: '100%', maxWidth: '1100px', margin: '20px auto', padding: '0 20px' }}>
        <div style={{ width: '100%', height: '400px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <img 
            src="/images/costo-visita-cardiologica-roma.png" 
            alt="Elettrocardiogramma ECG su tablet con panorama di Roma" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} 
          />
        </div>
      </div>

      <main style={{ flex: '1 0 auto', maxWidth: '850px', margin: '0 auto', padding: '0 20px', width: '100%', marginBottom: '80px' }}>
        
        {/* BREADCRUMB */}
        <div style={{ marginBottom: '20px', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
          <a href="/" style={{ color: '#0891b2', textDecoration: 'none' }}>Home</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <a href="/guide" style={{ color: '#0891b2', textDecoration: 'none' }}>Guide</a>
          <span style={{ margin: '0 8px' }}>&gt;</span>
          <span style={{ color: '#164e63' }}>Costo Cardiologia</span>
        </div>

        <article>
          <h1 style={{ color: '#164e63', fontSize: '36px', fontWeight: '900', lineHeight: '1.2', marginBottom: '25px' }}>
            Quanto Costa una Visita Cardiologica a Roma? Guida {dataCorrente}
          </h1>

          <div style={{ backgroundColor: '#ecfeff', padding: '25px', borderRadius: '20px', borderLeft: '6px solid #0891b2', marginBottom: '35px' }}>
            <p style={{ margin: 0, color: '#164e63', fontSize: '18px', lineHeight: '1.6' }}>
              Una visita cardiologica privata a Roma ha un prezzo medio tra <strong>80€ e 150€</strong>. Scopri cosa incide sulla tariffa finale e come scegliere lo specialista giusto.
            </p>
          </div>

          {/* BOX DINAMICI CARDIOLOGI */}
          {cardiologi.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', marginTop: '30px' }}>
              {cardiologi.map((doc, index) => (
                <div key={index} style={{ border: '1px solid #e2e8f0', borderRadius: '15px', padding: '20px', backgroundColor: '#f8fafc' }}>
                  <h3 style={{ margin: 0, color: '#164e63' }}>{doc.nome}</h3>
                  <p style={{ margin: '5px 0', color: '#334155' }}>Quartiere: {doc.quartiere}</p>
                  <p style={{ margin: '5px 0', color: '#334155' }}>Tel: {doc.telefono}</p>
                  <a href={doc.link} style={{ display: 'inline-block', marginTop: '10px', backgroundColor: '#0891b2', color: 'white', textDecoration: 'none', padding: '10px 20px', borderRadius: '12px' }}>
                    Vedi Scheda
                  </a>
                </div>
              ))}
            </div>
          )}

        </article>

        {/* CTA FINALE */}
        <div style={{ marginTop: '50px', padding: '40px', backgroundColor: '#164e63', borderRadius: '24px', color: 'white', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>Cerchi un Cardiologo a Roma?</h3>
          <p style={{ opacity: 0.9, marginBottom: '25px' }}>Trova i migliori specialisti nei quartieri della Capitale e prenota la tua visita.</p>
          <a href="/cardiologi-roma" style={{ display: 'inline-block', backgroundColor: 'white', color: '#164e63', fontWeight: '800', textDecoration: 'none', padding: '12px 30px', borderRadius: '12px' }}>
            VEDI CARDIOLOGI A ROMA
          </a>
        </div>

        {/* DISCLAIMER */}
        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '15px', border: '1px solid #e2e8f0', fontSize: '14px', color: '#64748b', fontStyle: 'italic' }}>
          <strong>Nota Informativa:</strong> I prezzi indicati in questa guida sono frutto di una media di mercato rilevata a Roma nel {dataCorrente} e hanno scopo puramente informativo. Le tariffe possono variare in base alla complessità del caso clinico e alla strumentazione utilizzata. Questo contenuto non costituisce in alcun modo parere medico o diagnosi.
        </div>

      </main>

      <Footer />
    </div>
  );
}
