import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';

export default function ServiziDomicilioRoma() {
  const [medici, setMedici] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDocs() {
      const { data } = await supabase
        .from('annunci')
        .select('*')
        .eq('approvato', true)
        .ilike('categoria', '%domicilio%') // Becca "Servizi a Domicilio" correttamente
        .order('is_top', { ascending: false });
      if (data) setMedici(data);
      setLoading(false);
    }
    fetchDocs();
  }, []);

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <Head><title>Servizi a Domicilio Roma</title></Head>

      {/* BARRA SUPERIORE */}
      <div style={{ backgroundColor: '#111827', color: 'white', padding: '12px', textAlign: 'center' }}>
        <strong>🏠 ASSISTENZA SANITARIA A DOMICILIO ROMA — GENNAIO 2026</strong>
      </div>

      {/* HEADER */}
      <div style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <Link href="/tutte-le-specialistiche" style={{ color: '#d97706', textDecoration: 'none', fontWeight: 'bold' }}>← TORNA A TUTTE LE SPECIALISTICHE</Link>
        <h1 style={{ fontSize: '36px', marginTop: '15px' }}>Servizi a Domicilio a Roma</h1>
        <p>Assistenza professionale direttamente a casa tua.</p>
      </div>

      {/* QUARTIERI */}
      <div style={{ padding: '30px 20px', maxWidth: '1000px', margin: 'auto' }}>
        <h3>Cerca per Quartiere</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '15px' }}>
          {["Prati", "Eur", "Parioli", "San Giovanni"].map(q => (
            <Link key={q} href={`#`} style={{ padding: '10px 20px', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '8px', textDecoration: 'none', color: '#374151' }}>{q}</Link>
          ))}
        </div>
      </div>

      {/* LISTA MEDICI */}
      <div style={{ padding: '20px', maxWidth: '1000px', margin: 'auto' }}>
        {medici.map(m => (
          <div key={m.id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', marginBottom: '20px', border: m.is_top ? '2px solid #d97706' : '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: '20px' }}>{m.titolo}</h2>
            <p>📍 {m.indirizzo} — <strong>{m.zona_quartiere}</strong></p>
          </div>
        ))}
      </div>

      {/* FOOTER ORIGINALE (Con Ad e CTA Box piccoli) */}
      <footer style={{ backgroundColor: '#111827', color: 'white', padding: '40px 20px', marginTop: '60px' }}>
        <div style={{ maxWidth: '1000px', margin: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div><strong>Diagnostica Roma</strong></div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ width: '100px', height: '50px', border: '1px solid #374151', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>AD BOX</div>
            <div style={{ width: '100px', height: '50px', border: '1px solid #374151', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>CTA BOX</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
