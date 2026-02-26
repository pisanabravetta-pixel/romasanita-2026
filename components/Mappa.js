import React, { useEffect, useRef } from 'react';
import Script from 'next/script';

export default function Mappa({ lista }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!lista || lista.length === 0) return;
    if (typeof window === 'undefined') return;

    // Controlla se Leaflet è caricato
    if (!window.L) return;

    // Rimuove eventuali mappe precedenti
    if (mapRef.current) {
      mapRef.current.remove();
    }

    const map = window.L.map('map', { scrollWheelZoom: false }).setView([41.9028, 12.4964], 13);
    mapRef.current = map;

    window.L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      { attribution: '© OSM' }
    ).addTo(map);

    const group = window.L.featureGroup();
    lista.forEach((s) => {
      if (s.lat && s.lng) {
        const marker = window.L.marker([parseFloat(s.lat), parseFloat(s.lng)])
          .addTo(map)
          .bindPopup(`<b>${s.nome}</b>`);
        group.addLayer(marker);
      }
    });

    if (group.getLayers().length > 0) {
      map.fitBounds(group.getBounds().pad(0.1));
    }

  }, [lista]);

  return (
    <>
      {/* Carica Leaflet solo nel client */}
      <Script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossOrigin=""
        strategy="afterInteractive"
      />
      <div id="map" style={{ width: '100%', height: '400px', borderRadius: '12px', marginBottom: '20px' }} />
    </>
  );
}
