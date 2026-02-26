import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function Mappa({ lista }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!lista || lista.length === 0) return;
    if (!mapRef.current) return;

    const map = L.map(mapRef.current, { scrollWheelZoom: false }).setView([41.9028, 12.4964], 13);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
    }).addTo(map);

    const group = new L.featureGroup();

    lista.forEach(item => {
      if (item.lat && item.lng) {
        const marker = L.marker([parseFloat(item.lat), parseFloat(item.lng)])
          .addTo(map)
          .bindPopup(`<b>${item.nome}</b>`);
        group.addLayer(marker);
      }
    });

    if (group.getLayers().length > 0) map.fitBounds(group.getBounds().pad(0.1));

    return () => map.remove();
  }, [lista]);

  return <div ref={mapRef} style={{ height: '350px', width: '100%' }} />;
}
