module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      // 1. Redirect vecchio dominio Vercel → www
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'servizisalute-roma.vercel.app' }],
        destination: 'https://www.servizisalute.com/:path*',
        permanent: true,
      },
      // 2. Redirect non-www → www (risolve il problema doppio dominio in Search Console)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'servizisalute.com' }],
        destination: 'https://www.servizisalute.com/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // Header di sicurezza + SEO su tutte le pagine
        source: '/(.*)',
        headers: [
          { key: 'X-Robots-Tag',          value: 'index, follow, max-image-preview:large' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options',        value: 'SAMEORIGIN' },
        ],
      },
      {
        // Cache lunga (1 anno) per immagini statiche — migliora Core Web Vitals
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Cache lunga per tutti gli asset statici Next.js (_next/static)
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Cache media per favicon e file pubblici vari
        source: '/:file(.*\\.(?:ico|svg|png|webp|jpg|jpeg|woff2|woff))',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
    ];
  },
};
