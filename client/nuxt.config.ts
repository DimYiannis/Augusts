// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  app: {
    head: {
        link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
        title: "August's"
    }
},
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
