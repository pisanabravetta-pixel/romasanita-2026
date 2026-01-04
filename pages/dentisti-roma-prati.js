import React from 'react';

export default function DentistiRomaPrati() {
  // Dati di esempio del medico (questi poi li cambierai con quelli veri)
  const medici = [
    {
      id: 1,
      nome: "Dr. Roberto Bianchi",
      specializzazione: "Odontoiatria e Protesi Dentaria",
      indirizzo: "Via Cola di Rienzo, 120 - 00192 Roma (Prati)",
      telefono: "+39 06 1234567",
      servizi: ["Carie", "Impianti", "Pulizia dei denti"],
      immagine: "https://via.placeholder.com/100" // Qui andrà la foto del medico
    }
  ];

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <nav style={{ padding: '15px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0' }}>
        <a href="/" style={{ fontWeight: 'bold', color: '#2563eb', textDecoration: 'none' }}>ServiziSalute Roma</a>
      </nav>

      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <h1 style={{ color: '#1e3a8a', fontSize: '32px' }}>Dentisti a Roma Prati</h1>
        <p style={{ color: '#4b5563', marginBottom: '30px' }}>I migliori specialisti selezionati nel quartiere Prati.</p>

        {/* --- INIZIO SCHEDA MEDICO --- */}
        {medici.map((medico) => (
          <div key={medico.id} style={{ 
            backgroundColor: '#fff', 
            borderRadius: '12px', 
            padding: '25px', 
            display: 'flex', 
            gap: '20px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            border: '1px solid #e5e7eb',
            marginBottom: '20px'
          }}>
            {/* Foto Circolare */}
            <div style={{ 
              width: '100px', 
              height: '100px', 
              borderRadius: '50%', 
              backgroundColor: '#e5e7eb',
              overflow: 'hidden',
              flexShrink: 0
            }}>
              <img src={medico.image} alt={medico.nome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Dettagli */}
            <div style={{ flexGrow: 1 }}>
              <h2 style={{ margin: '0 0 5px 0', fontSize: '22px', color: '#1e3a8a' }}>{medico.nome}</h2>
              <p style={{ margin: '0 0 10px 0', color: '#2563eb', fontWeight: 'bold' }}>{medico.specializzazione}</p>
              <p style={{ margin: '0 0 15px 0', color: '#6b7280', fontSize: '14px' }}>📍 {medico.indirizzo}</p>
              
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
                {medico.servizi.map((s, index) => (
                  <span key={index} style={{ backgroundColor: '#eff6ff', color: '#1e40af', padding: '4px 10px', borderRadius: '20px', fontSize: '12px' }}>
                    {s}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <a href={`tel:${medico.telefono}`} style={{ 
                  backgroundColor: '#16a34a', 
                  color: '#fff', 
                  padding: '10px 20px', 
                  borderRadius: '8px', 
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}>
                  📞 Chiama Ora
                </a>
                <button style={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #d1d5db', 
                  padding: '10px 20px', 
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  Vedi Profilo
                </button>
              </div>
            </div>
          </div>
        ))}
        {/* --- FINE SCHEDA MEDICO --- */}

      </div>
    </div>
  );
}
