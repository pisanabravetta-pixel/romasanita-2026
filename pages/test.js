import Head from 'next/head';

export default function Home() {
  const zoneRoma = [
    "Centro Storico", "Testaccio", "Trastevere", "Monti", "San Lorenzo", "Pigneto", "Garbatella", 
    "Ostiense", "Tiburtino", "San Giovanni", "Prati", "Villa Borghese", "Nomentano", "Parioli", 
    "Portuense", "Gianicolense", "Trionfale", "Popolo", "Eur", "Monteverde", "Flaminio"
  ];

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: "#f8f9fa" }}>
      <Head>
        <title>ServiziSalute - Il Portale della Sanità a Roma</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </Head>

      {/* TOP BAR */}
      <div style={{ background: "#2c3e50", color: "#fff", padding: "10px", textAlign: "center", fontSize: "14px", fontWeight: "500" }}>
        🚀 Il primo portale di annunci per servizi sanitari a Roma - Pubblica Gratis
      </div>

      {/* HEADER */}
      <header style={{ background: "#fff", padding: "15px 0", boxShadow: "0 2px 10px rgba(0,0,0,.05)", position: "sticky", top: 0, zIndex: 100 }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <h2 style={{ color: "#27ae60", margin: 0, fontWeight: "800", fontSize: "26px" }}>ServiziSalute</h2>
          <nav style={{ display: "flex", gap: "25px", fontWeight: "600", fontSize: "15px", color: "#444" }}>
            <a href="#" style={{ textDecoration: "none", color: "inherit" }}>Farmacie</a>
            <a href="#" style={{ textDecoration: "none", color: "inherit" }}>Diagnostica</a>
            <a href="#" style={{ textDecoration: "none", color: "inherit" }}>Dentisti</a>
            <a href="#" style={{ textDecoration: "none", color: "inherit" }}>Specialisti</a>
          </nav>
          <a href="/pubblica-annuncio" style={{ background: "#27ae60", color: "#fff", padding: "12px 20px", borderRadius: "8px", textDecoration: "none", fontWeight: "bold", fontSize: "14px" }}>
            Pubblica annuncio
          </a>
        </div>
      </header>

      {/* HERO SECTION CON RICERCA */}
      <section style={{ textAlign: "center", padding: "80px 20px", background: "linear-gradient(180deg, #fff 0%, #e9f7ef 100%)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "42px", fontWeight: "800", color: "#2c3e50", marginBottom: "15px" }}>Trova servizi sanitari a Roma</h1>
          <p style={{ fontSize: "19px", color: "#666", marginBottom: "40px" }}>Farmacie, dentisti e specialisti nel tuo quartiere</p>

          <div style={{ 
            display: "flex", background: "#fff", borderRadius: "100px", padding: "10px", 
            boxShadow: "0 15px 35px rgba(0,0,0,0.1)", border: "1px solid #eee", flexWrap: "wrap" 
          }}>
            <div style={{ flex: 1, textAlign: "left", padding: "0 20px", borderRight: "1px solid #eee" }}>
              <label style={{ fontSize: "10px", fontWeight: "bold", color: "#999", display: "block", textTransform: "uppercase" }}>Cosa cerchi?</label>
              <input type="text" placeholder="Es: Pulizia denti" style={{ border: "none", outline: "none", width: "100%", padding: "5px 0" }} />
            </div>
            <div style={{ flex: 1, textAlign: "left", padding: "0 20px", borderRight: "1px solid #eee" }}>
              <label style={{ fontSize: "10px", fontWeight: "bold", color: "#999", display: "block", textTransform: "uppercase" }}>Zona</label>
              <select style={{ border: "none", outline: "none", width: "100%", background: "transparent", padding: "5px 0" }}>
                <option>Tutta Roma</option>
                {zoneRoma.map(z => <option key={z}>{z}</option>)}
              </select>
            </div>
            <button style={{ background: "#27ae60", color: "#fff", border: "none", padding: "15px 40px", borderRadius: "100px", fontWeight: "bold", cursor: "pointer", marginLeft: "10px" }}>
              CERCA
            </button>
          </div>
        </div>
      </section>

      {/* ULTIMI ANNUNCI (STILE CARD MODERNO) */}
      <section style={{ maxWidth: "1200px", margin: "60px auto", padding: "0 20px" }}>
        <h2 style={{ color: "#2c3e50", marginBottom: "30px", fontSize: "28px" }}>Ultimi annunci pubblicati</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "25px" }}>
          {[
            { cat: 'FARMACIA', title: 'Farmacia Roma Centro', price: 'Sconto 20%', img: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde0f' },
            { cat: 'DIAGNOSTICA', title: 'Centro Salus Prati', price: 'da 40€', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef' },
            { cat: 'DENTISTA', title: 'Studio Eur Dent', price: 'Prev. Gratis', img: 'https://images.unsplash.com/photo-1606811841689-23db3c3298c0' },
            { cat: 'MEDICO', title: 'Cardiologo Parioli', price: '80€', img: 'https://images.unsplash.com/photo-1631217314830-4e6a9f0d3ccf' },
            { cat: 'DOMICILIO', title: 'Infermiere H24', price: 'Contattaci', img: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289' }
          ].map((ann, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", border: "1px solid #eee" }}>
              <div style={{ position: "relative" }}>
                <img src={ann.img} style={{ width: "100%", height: "160px", objectFit: "cover" }} />
                <span style={{ position: "absolute", top: "10px", left: "10px", background: "#27ae60", color: "#fff", padding: "4px 8px", borderRadius: "4px", fontSize: "10px", fontWeight: "bold" }}>{ann.cat}</span>
              </div>
              <div style={{ padding: "15px" }}>
                <h3 style={{ fontSize: "16px", margin: "0 0 5px 0", color: "#2c3e50" }}>{ann.title}</h3>
                <p style={{ color: "#27ae60", fontWeight: "bold", fontSize: "14px", marginBottom: "15px" }}>{ann.price}</p>
                <div style={{ display: "flex", gap: "8px" }}>
                  <a href="tel:06123456" style={{ flex: 1, textAlign: "center", background: "#f1f8f5", color: "#27ae60", padding: "8px", borderRadius: "6px", textDecoration: "none", fontSize: "12px", fontWeight: "bold" }}>Chiama</a>
                  <a href="#" style={{ background: "#25D366", color: "#fff", padding: "8px 12px", borderRadius: "6px", textDecoration: "none" }}><i className="fab fa-whatsapp"></i></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#2c3e50", color: "#fff", padding: "60px 20px", marginTop: "80px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px" }}>
          <div>
            <h3 style={{ color: "#27ae60", marginBottom: "20px" }}>ServiziSalute</h3>
            <p style={{ fontSize: "14px", color: "#bdc3c7", lineHeight: "1.6" }}>Il punto di riferimento per la sanità a Roma. Trova i migliori professionisti vicino a te.</p>
          </div>
          <div>
            <h4 style={{ marginBottom: "20px" }}>Link Rapidi</h4>
            <ul style={{ listStyle: "none", padding: 0, fontSize: "14px", color: "#bdc3c7", lineHeight: "2.5" }}>
              <li>Farmacie Roma</li>
              <li>Dentisti Roma</li>
              <li>Diagnostica</li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: "20px" }}>Contatti</h4>
            <p style={{ fontSize: "14px", color: "#bdc3c7" }}>Email: info@servizisalute.it<br/>Sede: Roma, Italia</p>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "60px", paddingTop: "20px", borderTop: "1px solid #34495e", fontSize: "12px", color: "#7f8c8d" }}>
          © 2026 ServiziSalute Roma - Portale di annunci informativi.
        </div>
      </footer>
    </div>
  );
}
