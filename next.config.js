module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'servizisalute-roma.vercel.app',
          },
        ],
        destination: 'https://www.servizisalute.com/:path*',
        permanent: true,
      },
    ]
  },
}
