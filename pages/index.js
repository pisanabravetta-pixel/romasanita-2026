<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RomaSanità - Portale Annunci Sanitari</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        :root {
            --primary: #0066CC;
            --primary-dark: #004C99;
            --secondary: #00A86B;
            --dark: #111827;
            --dark-light: #1F2937;
            --gray-100: #F3F4F6;
            --gray-200: #E5E7EB;
            --white: #FFFFFF;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background: var(--gray-100); color: var(--dark); line-height: 1.6; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }

        /* --- TOP BAR & HEADER --- */
        .top-bar {
            background: var(--dark);
            color: var(--white);
            padding: 10px 0;
            font-size: 13px;
        }
        .top-bar .container { display: flex; justify-content: space-between; align-items: center; }
        
        .header-main {
            background: var(--white);
            padding: 20px 0;
            border-bottom: 1px solid var(--gray-200);
            position: sticky; top: 0; z-index: 1000;
        }
        .header-main .container { display: flex; align-items: center; gap: 30px; }
        
        .logo { font-size: 24px; font-weight: 800; color: var(--primary); text-decoration: none; display: flex; align-items: center; gap: 8px; }
        .logo span { color: var(--dark); }

        .search-container { flex: 1; position: relative; max-width: 600px; }
        .search-container input {
            width: 100%; padding: 12px 20px 12px 45px;
            border: 2px solid var(--gray-200); border-radius: 50px;
            font-size: 15px; transition: 0.3s;
        }
        .search-container i { position: absolute; left: 18px; top: 50%; transform: translateY(-50%); color: var(--gray-400); }

        /* --- HERO & STATS --- */
        .hero { background: var(--white); padding: 40px 0 20px; text-align: center; }
        .hero h1 { font-size: 42px; font-weight: 800; margin-bottom: 15px; }
        .hero h1 span { color: var(--primary); }
        
        .stats-strip { 
            background: var(--dark-light); color: white; padding: 20px 0; margin-top: 30px;
        }
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); text-align: center; }
        .stat-item h3 { font-size: 28px; color: var(--secondary); }
        .stat-item p { font-size: 14px; opacity: 0.8; }

        /* --- CATEGORIES (STILE SUBITO.IT) --- */
        .categories { padding: 60px 0; background: var(--white); }
        .cat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 20px; }
        .cat-card {
            background: var(--gray-100); border-radius: 12px; padding: 20px;
            text-align: center; text-decoration: none; color: var(--dark);
            transition: 0.3s; border: 1px solid transparent;
        }
        .cat-card:hover { transform: translateY(-5px); border-color: var(--primary); background: var(--white); box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
        .cat-circle {
            width: 60px; height: 60px; background: var(--white); border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            margin: 0 auto 15px; font-size: 24px; color: var(--primary);
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
        .cat-card h4 { font-weight: 600; font-size: 15px; }

        /* --- ANNUNCI (5 BOX) --- */
        .announcements { padding: 60px 0; }
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .grid-5 { display: grid; grid-template-columns: repeat(5, 1fr); gap: 15px; }
        .card { background: white; border-radius: 12px; overflow: hidden; border: 1px solid var(--gray-200); transition: 0.3s; }
        .card:hover { transform: scale(1.02); box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
        .card-img { height: 140px; background: #ddd; position: relative; }
        .card-img img { width: 100%; height: 100%; object-fit: cover; }
        .badge { position: absolute; top: 10px; left: 10px; background: var(--primary); color: white; padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; }
        .card-content { padding: 15px; }
        .card-price { color: var(--secondary); font-weight: 700; font-size: 18px; }
        .card-title { font-size: 14px; font-weight: 600; margin: 5px 0; height: 40px; overflow: hidden; }
        .card-loc { font-size: 12px; color: #666; }

        /* --- PERCHÉ SCEGLIERCI (DIFFERENZIATI) --- */
        .features { padding: 80px 0; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
        .feat-box { padding: 40px; border-radius: 20px; color: white; }
        .feat-blue { background: var(--primary); }
        .feat-green { background: var(--secondary); }
        .feat-box h2 { margin-bottom: 20px; }
        .feat-box ul { list-style: none; }
        .feat-box li { margin-bottom: 12px; display: flex; align-items: center; gap: 10px; }

        /* --- FOOTER --- */
        footer { background: var(--dark); color: white; padding: 60px 0 30px; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 50px; margin-bottom: 40px; }
        .footer-bottom { border-top: 1px solid #333; pt: 30px; text-align: center; font-size: 13px; opacity: 0.6; padding-top: 20px; }

        @media (max-width: 1024px) {
            .grid-5 { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
            .features { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>

    <div class="top-bar">
        <div class="container">
            <span><i class="fas fa-map-marker-alt"></i> Roma e Provincia</span>
            <span><i class="fas fa-phone"></i> Emergenze: 118</span>
        </div>
    </div>

    <header class="header-main">
        <div class="container">
            <a href="#" class="logo"><i class="fas fa-heartbeat"></i> Roma<span>Sanità</span></a>
            <div class="search-container">
                <i class="fas fa-search"></i>
                <input type="text" placeholder="Cerca farmacie, dentisti, medici...">
            </div>
            <div style="display: flex; gap: 15px;">
                <button class="btn" style="background: none; border: none; font-weight: 600; cursor:pointer;">Accedi</button>
                <button style="background: var(--primary); color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor:pointer;">Inserisci Annuncio</button>
            </div>
        </div>
    </header>

    <section class="hero">
        <div class="container">
            <h1>Cerca il tuo <span>Servizio Sanitario</span> a Roma</h1>
            <p>La salute a portata di click. Prenota visite ed esami nelle migliori strutture della capitale.</p>
        </div>
        <div class="stats-strip">
            <div class="container stats-grid">
                <div class="stat-item"><h3>+1.250</h3><p>Annunci Attivi</p></div>
                <div class="stat-item"><h3>+850</h3><p>Professionisti</p></div>
                <div class="stat-item"><h3>15k</h3><p>Visitatori / Mese</p></div>
            </div>
        </div>
    </section>

    <section class="categories">
        <div class="container">
            <div class="cat-grid">
                <a href="#" class="cat-card">
                    <div class="cat-circle"><i class="fas fa-pills"></i></div>
                    <h4>Farmacie</h4>
                </a>
                <a href="#" class="cat-card">
                    <div class="cat-circle"><i class="fas fa-tooth"></i></div>
                    <h4>Dentisti</h4>
                </a>
                <a href="#" class="cat-card">
                    <div class="cat-circle"><i class="fas fa-microscope"></i></div>
                    <h4>Diagnostica</h4>
                </a>
                <a href="#" class="cat-card">
                    <div class="cat-circle"><i class="fas fa-user-md"></i></div>
                    <h4>Specialisti</h4>
                </a>
                <a href="#" class="cat-card">
                    <div class="cat-circle"><i class="fas fa-ambulance"></i></div>
                    <h4>Emergenze</h4>
                </a>
            </div>
        </div>
    </section>

    <section class="announcements">
        <div class="container">
            <div class="section-header">
                <h2>Ultimi Annunci pubblicati</h2>
                <a href="#" style="color: var(--primary); font-weight: 600;">Vedi tutti</a>
            </div>
            <div class="grid-5">
                <div class="card">
                    <div class="card-img">
                        <span class="badge">PREMIUM</span>
                        <img src="https://images.unsplash.com/photo-1586773860418-d374a5514175?auto=format&fit=crop&w=300&q=80" alt="Farmacia">
                    </div>
                    <div class="card-content">
                        <div class="card-price">H24</div>
                        <div class="card-title">Farmacia Centro Storico - Turno Notturno</div>
                        <div class="card-loc">Roma Centro</div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-img"><img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=300&q=80" alt="Specialista"></div>
                    <div class="card-content">
                        <div class="card-price">€80</div>
                        <div class="card-title">Visita Cardiologica + ECG Immediato</div>
                        <div class="card-loc">Roma Nord</div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-img"><img src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=300&q=80" alt="Dentista"></div>
                    <div class="card-content">
                        <div class="card-price">€50</div>
                        <div class="card-title">Pulizia Denti e Sbiancamento Led</div>
                        <div class="card-loc">Eur</div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-img"><img src="https://images.unsplash.com/photo-1579154235884-332c397e32d2?auto=format&fit=crop&w=300&q=80" alt="Laboratorio"></div>
                    <div class="card-content">
                        <div class="card-price">€35</div>
                        <div class="card-title">Analisi del Sangue senza Prenotazione</div>
                        <div class="card-loc">Ostia</div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-img"><img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=300&q=80" alt="Farmacia"></div>
                    <div class="card-content">
                        <div class="card-price">Gratis</div>
                        <div class="card-title">Consegna Farmaci a Domicilio Anziani</div>
                        <div class="card-loc">Roma Est</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="container features">
        <div class="feat-box feat-blue">
            <h2>Perché scegliere noi</h2>
            <ul>
                <li><i class="fas fa-check-circle"></i> Oltre 1000 professionisti verificati</li>
                <li><i class="fas fa-check-circle"></i> Prenotazione diretta senza costi</li>
                <li><i class="fas fa-check-circle"></i> Recensioni reali certificate</li>
            </ul>
        </div>
        <div class="feat-box feat-green">
            <h2>Perché pubblicare qui</h2>
            <ul>
                <li><i class="fas fa-rocket"></i> Visibilità immediata su tutta Roma</li>
                <li><i class="fas fa-chart-line"></i> Pannello statistiche avanzato</li>
                <li><i class="fas fa-user-plus"></i> Nuovi pazienti ogni giorno</li>
            </ul>
        </div>
    </section>

    <footer>
        <div class="container">
            <div class="footer-grid">
                <div>
                    <h3>RomaSanità</h3>
                    <p style="opacity: 0.6; margin-top: 15px;">Il primo portale dedicato esclusivamente alla salute nella Capitale. Troviamo la soluzione medica più vicina a te.</p>
                </div>
                <div>
                    <h4>Link Utili</h4>
                    <p>Come funziona</p>
                    <p>Prezzi Premium</p>
                    <p>Contatti</p>
                </div>
                <div>
                    <h4>Contatti</h4>
                    <p>info@romasanita.it</p>
                    <p>Via del Corso, Roma</p>
                </div>
            </div>
            <div class="footer-bottom">
                &copy; 2024 RomaSanità - Tutti i diritti riservati.
            </div>
        </div>
    </footer>

</body>
</html>
