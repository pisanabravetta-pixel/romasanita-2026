import React from 'react';

export default function DentistiRomaPrati() {
  // Dati di esempio del medico
  const medici = [
    {
      id: 1,
      nome: "Dr. Roberto Bianchi",
      specializzazione: "Odontoiatria e Protesi Dentaria",
      indirizzo: "Via Cola di Rienzo, 120 - 00192 Roma (Prati)",
      telefono: "+39061234567", // Numero senza spazi per il tasto chiama
      servizi: ["Carie", "Impianti", "Pulizia dei denti"],
      // Ho inserito una foto reale di un medico
      immagine: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop" 
    }
  ];

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh', paddingBottom: '40px' }}>
      {/* Barra di Navigazione */}
      <nav style={{ padding: '15px 20px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', marginBottom: '30px' }}>
        <a href="/" style={{ fontWeight: 'bold', color: '#2563eb', textDecoration: 'none' }}>ServiziSalute Roma</a>
      </nav>

      <div style={{ maxWidth: '800px', margin: 'auto', padding: '0 20px' }}>
        <h1 style={{ color: '#1e3a8a', fontSize: '32px', marginBottom: '10px' }}>Dentisti a Roma Prati</h1>
        <p style={{ color: '#4b5563', marginBottom: '30px' }}>I migliori specialisti selezionati nel quartiere Prati.</p>

        {/* --- SCHEDA MEDICO --- */}
        {medici.map((medico) => (
          <div key={medico.id} style={{ 
            backgroundColor: '#fff', 
            borderRadius: '16px', 
            padding: '25px', 
            display: 'flex', 
            gap: '25px',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb',
            alignItems: 'center',
            flexWrap: 'wrap' // Per farlo vedere bene anche sul cellulare
          }}>
            
            {/* Foto del Medico */}
            <div style={{ 
              width: '120px', 
              height: '120px', 
              borderRadius: '60px', 
              overflow: 'hidden',
              border: '3px solid #eff6ff',
              flexShrink: 0
            }}>
              <img 
                src={medico.immagine} 
                alt={medico.nome} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>

            {/* Dettagli del Medico */}
            <div style={{ flex: '1 1 300px' }}>
              <h2 style={{ margin: '0 0 5px 0', fontSize: '24px', color: '#1e3a8a' }}>{medico.nome}</h2>
              <p style={{ margin: '0 0 10px 0', color: '#2563eb', fontWeight: 'bold', fontSize: '16px' }}>
                {medico.specializzazione}
              </p>
              <p style={{ margin: '0 0 15px 0', color: '#6b7280', fontSize: '14px' }}>
                📍 {medico.indirizzo}
              </p>
              
              {/* Tag dei Servizi */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                {medico.servizi.map((s, index) => (
                  <span key={index} style={{ 
                    backgroundColor: '#eff6ff', 
                    color: '#1e40af', 
                    padding: '5px 12px', 
                    borderRadius: '20px', 
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {s}
                  </span>
                ))}
              </div>

              {/* Pulsanti Azione */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <a href={`tel:${medico.telefono}`} style={{ 
                  backgroundColor: '#16a34a', 
                  color: '#fff', 
                  padding: '12px 20px', 
                  borderRadius: '10px', 
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  display: 'inline-block'
                }}>
                  📞 Chiama
                </a>
                <a href={`https://wa.me/${medico.telefono.replace('+', '')}?text=Salve, vorrei informazioni`} 
                   target="_blank" 
                   rel="noreferrer"
                   style={{ 
                  backgroundColor: '#25d366', 
                  color: '#fff', 
                  padding: '12px 20px', 
                  borderRadius: '10px', 
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  display: 'inline-block'
                }}>
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </div>
        ))}

        <div style={{ marginTop: '40px', textAlign: 'center' }}>
           <a href="/" style={{ color: '#64748b', textDecoration: 'none' }}>← Torna alla ricerca</a>
        </div>
      </div>
    </div>
  );
}
