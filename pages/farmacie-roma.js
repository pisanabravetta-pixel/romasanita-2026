{/* 📱 TASTI AZIONE */}
<div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
  <a href={`tel:${v.whatsapp}`} style={{ flex: 1, minWidth: '100px', textAlign: 'center', background: '#3b82f6', color: 'white', padding: '14px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>
    Chiama
  </a>
  <a href={`https://wa.me/${v.whatsapp}?text=Buongiorno, vorrei informazioni sulla disponibilità di un farmaco.`} style={{ flex: 1, minWidth: '100px', textAlign: 'center', background: '#22c55e', color: 'white', padding: '14px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>
    WhatsApp
  </a>
  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.nome + ' ' + v.indirizzo + ' Roma')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, minWidth: '100px', textAlign: 'center', background: '#f1f5f9', color: '#1e40af', padding: '14px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', border: '1px solid #e2e8f0' }}>
    Mappa
  </a>
</div>
