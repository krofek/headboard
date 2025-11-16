// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui'
  ],
  imports: {
    dirs: [
      '~/composables/**'
    ]
  },
  devtools: {
    enabled: true
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      apiUrl: 'http://localhost:8080/api/v1',
      apikey: 'zXLvgMA.x4MoC-MTxLIcZa2wf0Ely3L62ULkPo1M'
    }
  },
  routeRules: {
    '/': { prerender: true }
  },
  compatibilityDate: '2025-01-15',
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
