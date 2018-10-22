const pkg = require('./package')

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/vue2-filters.js',
    '~/plugins/moment.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    'nuxt-buefy',
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  /*
  ** Auth module configuration
  */
  auth: {
    strategies: {
      local: {
        tokenType: 'Token',
        endpoints: {
          login: { url: '/auth/login/', propertyName: 'key' },
          user: { url: '/auth/user/', propertyName: false },
          logout: { url: 'auth/logout/', method: 'post' }
        }
      }
    },
    cookie: {
      options: {
        expires: 30
      }
    },
    redirect: {
      logout: '/login',
    }
  },
  router: {
    middleware: ['auth']
  },
  /*
  ** Axios module configuration
  */

  axios: {
    baseURL: process.env.AXIOS_BASE_URL || 'http://localhost:8000',
    retry: { retries: 3 }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  }
}
