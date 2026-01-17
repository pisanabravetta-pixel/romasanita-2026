import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function HubLayout({ 
  titolo, colore, badgeSpec, testoTopBar, descrizioneMeta, testoMiniSEO, 
  medici, loading, quartieri, schemas, altreSpecialistiche, categoria 
}) {
  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <Head>
        <title>{titolo} a Roma - ServiziSalute</title>
        <meta name="description" content={descrizioneMeta} />
        {schemas?.medical && <script type="application/ld+json">{JSON.stringify(schemas.medical)}</script>}
        {schemas?.faq && <script type="application/ld+json">{JSON.stringify(schemas.faq)}</script>}
      </Head>

      {/* TOP BAR BOLD */}
      <div style={{ backgroundColor: '#111827', color: 'white', padding: '12px', textAlign: 'center', fontSize: '14px' }}>
        <strong>{testoTopBar}</strong>
      </div>

      {/* HEADER HUB - STRUTTURA PERFETTA */}
      <div style={{ padding: '50px 20px', textAlign: 'center', backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <Link href="/tutte-le-specialistiche" style={{ color: colore, textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>
          ← TORNA A TUTTE LE SPECIALISTICHE
        </Link>
        <h1 style={{ fontSize: '42px', fontWeight: '800', marginTop: '20px', color: '#111827' }}>{titolo} a Roma</h1>
        <p style={{ color: '#4b5563', maxWidth: '800px', margin: '20px auto', fontSize: '18px', lineHeight: '1.6' }}>
          {testoMiniSEO}
        </p>
      </div>

      {/* CERCA PER QUARTIERE */}
      <div style={{ padding: '40px 20px', maxWidth: '1100px', margin: 'auto' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Cerca per Quartiere</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '10px' }}>
          {quartieri?.map(q => (
            <Link key={q} href={`/${categoria}-roma-${q.toLowerCase().replace(/\s+/g, '-')}`} 
                  style={{ padding: '12px', border: '1px solid #d1d5db', borderRadius: '10px', textAlign: 'center', textDecoration: 'none', color: '#374151', backgroundColor: 'white', fontWeight: '600' }}>
              {q}
            </Link>
          ))}
        </div>
      </div>

      {/* LISTA MEDICI */}
      <div style={{ padding: '20px', maxWidth: '1000px', margin: 'auto' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '30px' }}>Professionisti Disponibili</h2>
        {loading ? (
          <p>Caricamento...</p>
        ) : medici.length > 0 ? (
          medici.map(m => (
            <div key={m.id} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', marginBottom: '25px', border: m.is_top ? `2px solid ${colore}` : '1px solid #e5e7eb', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <span style={{ backgroundColor: colore, color: 'white', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold' }}>{badgeSpec}</span>
                {m.is_top && <span style={{ color: colore, fontWeight: 'bold' }}>⭐ RACCOMANDATO</span>}
              </div>
              <h3 style={{ fontSize: '26px', fontWeight: '800', color: '#111827' }}>{m.titolo}</h3>
              <p style={{ color: '#4b5563', fontSize: '17px', marginTop: '5px' }}>📍 {m.indirizzo} — <strong>{m.zona_quartiere}</strong></p>
              <button style={{ marginTop: '20px', backgroundColor: colore, color: 'white', border: 'none', padding: '14px 28px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>VAI AL PROFILO</button>
            </div>
          ))
        ) : (
          <p>Nessun professionista trovato in questa categoria.</p>
        )}
      </div>

      {/* FAQ DAL SCHEMA */}
      {schemas?.faq?.mainEntity && (
        <div style={{ padding: '60px 20px', maxWidth: '1000px', margin: 'auto' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '30px' }}>Domande Frequenti</h2>
          {schemas.faq.mainEntity.map((f, i) => (
            <div key={i} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '15px', marginBottom: '15px', border: '1px solid #e5e7eb' }}>
              <p style={{ fontWeight: 'bold', color: '#111827' }}>{f.name}</p>
              <p style={{ marginTop: '10px', color: '#4b5563' }}>{f.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* CROSS-LINKING */}
      <div style={{ padding: '60px 20px', backgroundColor: 'white', marginTop: '60px' }}>
        <div style={{ maxWidth: '1100px', margin: 'auto' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '30px' }}>Altre Specialistiche a Roma</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '15px' }}>
            {altreSpecialistiche?.map(s => (
              <Link key={s.nome} href={s.link} style={{ color: '#111827', textDecoration: 'none', padding: '20px', border: '1px solid #e5e7eb', borderRadius: '12px', textAlign: 'center', fontWeight: '700', backgroundColor: '#f9fafb' }}>
                {s.nome}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER IDENTICO ALLA HOME (Box piccoli) */}
      <footer style={{ backgroundColor: '#111827', color: 'white', padding: '60px 20px' }}>
        <div style={{ maxWidth: '1100px', margin: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ fontSize: '22px', fontWeight: 'bold' }}>Diagnostica Roma</h4>
            <p style={{ color: '#9ca3af' }}>Il portale della salute a Roma.</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ width: '100px', height: '50px', border: '1px solid #374151', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#9ca3af' }}>AD BOX</div>
            <div style={{ width: '100px', height: '50px', border: '1px solid #374151', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#9ca3af' }}>CTA BOX</div>
          </div>
        </div>
        <p style={{ textAlign: 'center', marginTop: '40px', color: '#6b7280', fontSize: '14px' }}>© 2026 Diagnostica Roma - Tutti i diritti riservati</p>
      </footer>
    </div>
  );
}
