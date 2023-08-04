// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: 'FLOW-VISU',
      meta: [
        { charset: 'utf-8' },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.png'
        },
        {
          rel: 'stylesheet',
          href: '/Heebo.ttf'
        }
      ]
    }
  },
  plugins: [
    {
      src: '@/plugins/QrReader.ts',
      mode: 'client'
    }
  ]
})
