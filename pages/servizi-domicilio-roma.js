import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';
import { getSchemas } from '../lib/seo-logic';

export default function ServiziDomicilioRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const schemas = getSchemas('servizi-domicilio', 'roma');
  const quartieri = ["Prati", "Eur", "Parioli", "San Giovanni", "Trastevere", "Monteverde", "Ostiense", "Cassia", "Flaminio", "Talenti", "Tiburtina", "Appia"];

  useEffect(() => {
    async function fetchDocs() {
      // Usiamo ILIKE per beccare "Servizi a Domicilio" senza errori di maiuscole
      const { data } = await supabase
        .from('annunci')
        .select('*')
        .eq('approvato', true)
        .ilike('categoria', '%domicilio%')
        .order('is_top', { ascending: false });
      
      if (data) setMedici(data);
      setLoading(false);
    }
    fetchDocs();
  }, []);

  return (
    <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <Head>
        <title>Servizi a Domicilio Roma - Assistenza Sanitaria H24</title>
        <meta name="description" content="Trova assistenza sanitaria a domicilio a Roma: infermieri, fisioterapisti e medici." />
        <script type="application/ld+json">{JSON.stringify(schemas.medical)}</script>
        <script type="application/ld+json">{JSON.stringify(schemas.faq)}</script>
      </Head>

      {/* TOP BAR */}
      <div style={{ backgroundColor: '#111827', color: 'white', padding: '12px', textAlign: 'center', fontSize: '14px' }}>
        <strong>🏠 ASSISTENZA SANITARIA A DOMICILIO ROMA — GENNAIO 2026</strong>
      </div>

      {/* HEADER */}
      <div style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <Link href="/tutte-le-specialistiche" style={{ color: '#d97706', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
          ← TUTTE LE SPECIALISTICHE
        </Link>
        <h1 style={{ fontSize: '36px', marginTop: '10px', color: '#111827' }}>Servizi a Domicilio a Roma</h1>
        <p style={{ color: '#4b5563', maxWidth: '700px', margin: '15px auto', fontSize: '18px' }}>
          Assistenza professionale direttamente a casa tua: medicazioni, fisioterapia e visite specialistiche.
        </p>
      </div>

      {/* QUARTIERI */}
      <div style={{ padding: '30px 20px', maxWidth: '1100px', margin: 'auto' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>Cerca per Quartiere</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '10px' }}>
          {quartieri.map(q => (
            <Link key={q} href={`/servizi-domicilio-roma-${q.toLowerCase()}`} 
                  style={{ padding: '10px', border: '1px solid #e5e7eb', borderRadius: '8px', textAlign: 'center', textDecoration: 'none', color: '#374151', backgroundColor: 'white' }}>
              {q}
            </Link>
          ))}
        </div>
      </div>

      {/* LISTA */}
      <div style={{ padding: '20px', maxWidth: '1100px', margin: 'auto' }}>
        {loading ? <p>Caricamento...</p> : medici.map(m => (
          <div key={m.id} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '15px', marginBottom: '20px', border: m.is_top ? '2px solid #d97706' : '1px solid #e5e7eb' }}>
            <span style={{ backgroundColor: '#d97706', color: 'white', padding: '4px 10px', borderRadius: '4px', fontSize: '12px' }}>DOMICILIO</span>
            <h3 style={{ fontSize: '22px', margin: '10px 0' }}>{m.titolo}</h3>
            <p>📍 {m.indirizzo} — <strong>{m.zona_quartiere}</strong></p>
          </div>
        ))}
      </div>

      {/* ALTRE CATEGORIE - QUI NE METTIAMO 4 COME VOLEVI */}
      <div style={{ padding: '40px 20px', backgroundColor: 'white', marginTop: '40px' }}>
        <div style={{ maxWidth: '1100px', margin: 'auto' }}>
          <h2 style={{ marginBottom: '20px', fontSize: '22px' }}>Altre Specialistiche a Roma</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
            <Link href="/cardiologi-roma" style={{ padding: '20px', border: '1px solid #e5e7eb', borderRadius: '10px', textDecoration: 'none', color: 'black', textAlign: 'center' }}>Cardiologi</Link>
            <Link href="/dermatologi-roma" style={{ padding: '20px', border: '1px solid #e5e7eb', borderRadius: '10px', textDecoration: 'none', color: 'black', textAlign: 'center' }}>Dermatologi</Link>
            <Link href="/oculisti-roma" style={{ padding: '20px', border: '1px solid #e5e7eb', borderRadius: '10px', textDecoration: 'none', color: 'black', textAlign: 'center' }}>Oculisti</Link>
            <Link href="/diagnostica-roma" style={{ padding: '20px', border: '1px solid #e5e7eb', borderRadius: '10px', textDecoration: 'none', color: 'black', textAlign: 'center' }}>Diagnostica</Link>
          </div>
        </div>
      </div>

      {/* FOOTER IDENTICO ALLA HOME */}
      <footer style={{ backgroundColor: '#111827', color: 'white', padding: '40px 20px', marginTop: '60px' }}>
        <div style={{ maxWidth: '1100px', margin: 'auto', display: 'grid', gridTemplateColumns: '1fr 150px 150px', gap: '20px' }}>
          <div><strong>Diagnostica Roma</strong><p>Il portale della salute.</p></div>
          <div style={{ backgroundColor: '#1f2937', height: '60px', borderRadius: '4px', fontSize: '10px', padding: '5px' }}>AD BOX</div>
          <div style={{ backgroundColor: '#1f2937', height: '60px', borderRadius: '4px', fontSize: '10px', padding: '5px' }}>CTA BOX</div>
        </div>
      </footer>
    </div>
  );
}
