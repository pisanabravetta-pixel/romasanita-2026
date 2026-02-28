import React from "react";
import Head from "next/head";
import { prezziIndicativi } from "../lib/prezziIndicativi";

// Funzione per generare lo schema JSON-LD
function buildJsonLD({ categoria, zona }) {
  const prices = prezziIndicativi[categoria?.toLowerCase()];
  if (!prices) return "";

  const itemListElements = prices.map((item, i) => ({
    "@type": "Offer",
    "itemOffered": {
      "@type": "Service",
      "name": item.servizio,
      "areaServed": `Roma${zona ? " - " + zona : ""}`,
    },
    "priceCurrency": "EUR",
    "lowPrice": item.min,
    "highPrice": item.max,
  }));

  return {
    "@context": "https://schema.org",
    "@type": "ProductCollection",
    "name": `Prestazioni ${categoria} a Roma${zona ? " - " + zona : ""}`,
    "description": `Prezzi indicativi aggiornati dei principali servizi sanitari categoria ${categoria} a Roma${zona ? " - " + zona : ""}`,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `Servizi ${categoria}`,
      "itemListElement": itemListElements,
    },
  };
}


export default function ListaPrezzi({ categoria, zona }) {
  const dati = prezziIndicativi[categoria?.toLowerCase()];
  if (!dati) return null;

  const jsonLdObj = buildJsonLD({ categoria, zona });
  const jsonLd = JSON.stringify(jsonLdObj);

  return (
    <>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      </Head>
      <section
        style={{
          background: "#fefbe7",
          borderRadius: 14,
          border: "1px solid #fde68a",
          padding: "18px 20px",
          marginBottom: 30,
          marginTop: 20,
        }}
      >
        <h2
          style={{
            fontSize: "21px",
            fontWeight: 900,
            color: "#c08401",
            marginBottom: 14,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Prezzi indicativi {categoria && `per ${categoria}`} {zona && `a ${zona}`}
        </h2>
        <ul style={{ paddingLeft: 20, fontSize: "16px", color: "#92400e", fontWeight: 600 }}>
          {dati.map((item, i) => (
            <li key={i}>
              <span style={{ fontWeight: "700" }}>{item.servizio}:</span>{" "}
              {item.min === item.max
                ? `€${item.min}`
                : `da €${item.min} a €${item.max}`}
            </li>
          ))}
        </ul>
        <p style={{ fontSize: "13px", color: "#b45309", marginTop: 12, fontWeight: 400 }}>
          *I prezzi sono orientativi e raccolti da fonti e strutture pubbliche e private aggiornate. Per una quotazione precisa, contatta sempre la struttura selezionata.
        </p>
      </section>
    </>
  );
}
