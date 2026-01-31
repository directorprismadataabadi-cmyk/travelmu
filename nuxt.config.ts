// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    'nuxt-security',
  ],

  ssr: false,

  nitro: {
    preset: 'static',
    rollupConfig: {
      onwarn(warning, warn) {
        if (warning.code === 'UNRESOLVED_IMPORT' && warning.exporter?.includes('cache-driver')) {
          return;
        }
        if (warning.code === 'CIRCULAR_DEPENDENCY' && warning.ids?.some(id => id.includes('node_modules'))) {
          return;
        }
        warn(warning);
      },
    },
  },

  compatibilityDate: '2025-07-15',

  css: [
    '@fortawesome/fontawesome-free/css/all.min.css',
    '~/assets/css/main.css',
  ],

  vite: {
    build: {
      sourcemap: false,
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          manualChunks: (id: string) => {
            if (id.includes('node_modules')) {
              if (id.includes('fortawesome')) {
                return 'vendor-icons';
              }
            }
          },
        },
      },
    },
    plugins: [tailwindcss()],
  },

  pinia: {
    storesDirs: ['./store/**'],
  },

  i18n: {
    langDir: './locales',
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'id', name: 'Indonesian', file: 'id.json' },
    ],
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
  },

  security: {
    headers: {
      crossOriginResourcePolicy: 'cross-origin',
      crossOriginOpenerPolicy: 'same-origin',
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        'base-uri': ["'none'"],
        'font-src': ["'self'", 'https:', 'data:'],
        'form-action': ["'self'"],
        'frame-ancestors': ["'self'"],
        'img-src': ["'self'", 'data:', 'https:'],
        'object-src': ["'none'"],
        'script-src-attr': ["'none'"],
        'style-src': ["'self'", "'unsafe-inline'", 'https:'],
        'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        'connect-src': ["'self'", 'http://localhost:8888', 'https:'],
        'upgrade-insecure-requests': false,
      },
      xContentTypeOptions: 'nosniff',
      xFrameOptions: 'SAMEORIGIN',
      referrerPolicy: 'strict-origin-when-cross-origin',
    },
    rateLimiter: false,
    xssValidator: false,
  },

  runtimeConfig: {
    appName: process.env.APP_NAME,
    public: {
      appName: process.env.APP_NAME,
      companyId: process.env.COMPANY_ID,
      apiBase: process.env.PUBLIC_API_URL || 'http://localhost:8888',
      apiToken: process.env.PUBLIC_API_TOKEN || '',
      mode: process.env.MODE || 'development',
    },
  },

  app: {
    head: {
      title: process.env.APP_NAME || 'TravelMu',
      meta: [
        { name: 'description', content: 'Book flights, hotels, and experiences with TravelMu - Your trusted travel platform.' },
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap' },
      ],
    },
  },

  components: [
    { path: '~/components', extensions: ['vue'], pathPrefix: false },
  ],

  devtools: { enabled: true },
});
