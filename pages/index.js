import Head from 'next/head';

export default function Home() {
  const categorie = [
    { nome: 'FARMACIE', icona: 'fa-pills', colore: 'bg-blue-100', text: 'text-blue-600' },
    { nome: 'DENTISTI', icona: 'fa-tooth', colore: 'bg-green-100', text: 'text-green-600' },
    { nome: 'VISITE', icona: 'fa-user-md', colore: 'bg-red-100', text: 'text-red-600' },
    { nome: 'ESAMI', icona: 'fa-microscope', colore: 'bg-purple-100', text: 'text-purple-600' },
    { nome: 'FISIO', icona: 'fa-hands-helping', colore: 'bg-orange-100', text: 'text-orange-600' },
  ];

  const annunci = [
    { id: 1, titolo: "Farmacia Aperta H24 - Zona Prati", prezzo: "Turno", location: "Roma (Prati)", img: "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?w=400", cat: "FARMACIE" },
    { id: 2, titolo: "Pulizia Denti + Sbiancamento", prezzo: "59 €", location: "Roma (Eur)", img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400", cat: "DENTISTI" },
    { id: 3, titolo: "Visita Cardiologica Urgente", prezzo: "120 €", location: "Roma (Trastevere)", img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400", cat: "VISITE" },
    { id: 4, titolo: "Ecografia Addome Completo", prezzo: "85 €", location: "Roma (Appia)", img: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400", cat: "ESAMI" },
    { id: 5, titolo: "Fisioterapia Riabilitativa", prezzo: "45 €", location: "Roma (Ostiense)", img: "https://images.unsplash.com/photo-1576091160550-2173dad99901?w=400", cat: "FISIO" },
    { id: 6, titolo: "Test Intolleranze Alimentari", prezzo: "70 €", location: "Roma (Centro)", img: "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=400", cat: "ESAMI" },
  ];

  return (
    <div className="min-h-screen bg-[#F2F4F5] text-slate-900 font-sans">
      <Head>
        <title>RomaSanità | Annunci Sanitari Roma</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      {/* HEADER STILE SUBITO */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-2xl font-black text-[#ff5a00] italic">Roma<span className="text-[#004C99]">Sanità</span></div>
          <div className="flex gap-4">
            <button className="hidden md:block font-bold text-gray-600">I miei annunci</button>
            <button className="bg-[#ff5a00] text-white px-4 py-2 rounded font-bold hover:bg-[#e65100] transition">Inserisci</button>
          </div>
        </div>
      </header>

      {/* SEARCH BAR FOCUS */}
      <section className="bg-[#004C99] py-8 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-2">
          <input type="text" placeholder="Cosa cerchi? (es. Dentista)" className="flex-1 p-4 rounded-md focus:outline-none" />
          <input type="text" placeholder="In quale zona di Roma?" className="md:w-1/3 p-4 rounded-md focus:outline-none" />
          <button className="bg-[#ff5a00] text-white px-8 py-4 rounded-md font-bold uppercase tracking-wider"><i className="fas fa-search"></i></button>
        </div>
      </section>

      {/* CATEGORIE ORIZZONTALI */}
      <div className="max-w-7xl mx-auto px-4 py-6 overflow-x-auto">
        <div className="flex gap-4">
          {categorie.map((c, i) => (
            <button key={i} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-300 whitespace-nowrap hover:border-[#ff5a00] transition group">
              <i className={`fas ${c.icona} ${c.text}`}></i>
              <span className="text-sm font-bold text-gray-600 group-hover:text-[#ff5a00]">{c.nome}</span>
            </button>
          ))}
        </div>
      </div>

      {/* GRIGLIA ANNUNCI */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6 uppercase tracking-tight">Annunci in evidenza a Roma</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {annunci.map((a) => (
            <div key={a.id} className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition cursor-pointer group">
              <div className="relative h-48 overflow-hidden">
                <img src={a.img} alt={a.titolo} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                <div className="absolute top-2 left-2 bg-black/50 text-white text-[10px] font-bold px-2 py-1 rounded uppercase">{a.cat}</div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-[#004C99] leading-snug h-12 overflow-hidden mb-2">{a.titolo}</h3>
                <div className="text-[#ff5a00] text-xl font-black mb-2">{a.prezzo}</div>
                <div className="flex justify-between items-center text-gray-400 text-xs font-medium">
                  <span>{a.location}</span>
                  <span>Oggi, 14:30</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 mt-20 text-center">
        <p className="text-gray-400 text-sm font-bold">ROMA SANITÀ - IL MERCATO DELLA SALUTE NELLA CAPITALE</p>
      </footer>
    </div>
  );
}
