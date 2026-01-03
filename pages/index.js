* { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
body { background-color: #f8f9fa; color: #333; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
.top-bar { background: #0070f3; color: white; text-align: center; padding: 8px; font-size: 12px; font-weight: bold; }
.hero { background: white; padding: 60px 0; text-align: center; border-bottom: 1px solid #eee; }
.search-box-container { 
  display: flex; background: white; border-radius: 50px; padding: 10px 20px; 
  box-shadow: 0 10px 30px rgba(0,0,0,0.1); max-width: 800px; margin: 30px auto; border: 1px solid #ddd;
}
.search-input-group { flex: 1; display: flex; flex-direction: column; align-items: flex-start; padding: 0 20px; }
.search-input-group label { font-size: 10px; color: #888; font-weight: bold; }
.btn-search { background: #ff5a5f; color: white; border: none; padding: 12px 30px; border-radius: 30px; font-weight: bold; cursor: pointer; }

/* ICONE CATEGORIE */
.cat-item-bordered {
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  padding: 15px; border: 1px solid #eee; border-radius: 12px; background: white;
  min-width: 110px; cursor: pointer; transition: all 0.2s; text-decoration: none; color: inherit;
}
.cat-item-bordered:hover { border-color: #0070f3; box-shadow: 0 5px 15px rgba(0,0,0,0.05); }
.icon-circle { 
  width: 50px; height: 50px; border-radius: 50%; border: 2px solid; 
  display: flex; align-items: center; justify-content: center; font-size: 20px; 
}

/* ANNUNCI */
.announcements-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 15px; margin-top: 20px; }
.ann-card { background: white; border-radius: 8px; border: 1px solid #eee; overflow: hidden; }
.ann-img { width: 100%; height: 130px; object-fit: cover; }
.ann-info { padding: 12px; }
.ann-info small { color: #0070f3; font-weight: bold; font-size: 10px; }
