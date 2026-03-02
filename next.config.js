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
    ];
  },
};
