const builtAt = new Date().toISOString()
const path = require('path')
const { I18N } = require('./locales/i18n-nuxt-config')
import fs from 'fs'
import Mode from 'frontmatter-markdown-loader/mode'
import MarkdownIt from 'markdown-it'
import mip from 'markdown-it-prism'

function getPaths(lang, type) {
  let initial = lang
  if (lang === 'es') {
    initial = ''
  }
  return fs
    .readdirSync(path.resolve(__dirname, 'content', `${lang}/${type}`))
    .filter((filename) => path.extname(filename) === '.md')
    .map((filename) => `${initial}/${type}/${path.parse(filename).name}`)
}

const md = new MarkdownIt({
  html: true,
  typographer: true
})
md.use(mip)

const productionUrl = {
  en: '/en',
  es: '/es'
}

module.exports = {
  head: {
    title: 'Web - Guillermo Daniel',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
      },
      { name: 'msapplication-TileColor', content: '#ffffff' },
      {
        name: 'msapplication-TileImage',
        content: '/img/logo.svg'
      },
      { name: 'theme-color', content: '#c1c1c1' },
      { name: 'robots', content: 'index, follow' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@guillermodani25' },
      { property: 'og:type', content: 'profile' },
      { property: 'og:updated_time', content: builtAt }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'icon',
        type: 'image/ico',
        href: '/favicon.ico',
        sizes: '32x32'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#5a46ff',
    height: '3px'
  },
  /*
   ** Build configuration
   */
  css: ['~/assets/css/main.scss', '~/assets/css/prism-material-light.css'],

  build: {
    extend(config) {
      const rule = config.module.rules.find(
        (r) => r.test.toString() === '/\\.(png|jpe?g|gif|svg|webp)$/i'
      )
      config.module.rules.splice(config.module.rules.indexOf(rule), 1)

      config.module.rules.push(
        {
          test: /\.md$/,
          loader: 'frontmatter-markdown-loader',
          include: path.resolve(__dirname, 'content'),
          options: {
            mode: [Mode.VUE_RENDER_FUNCTIONS, Mode.VUE_COMPONENT],
            vue: {
              root: 'dynamicMarkdown'
            },
            markdown(body) {
              return md.render(body)
            }
          }
        },
        // {
        //   test: /\.(jpe?g|png)$/i,
        //   loader: 'responsive-loader',
        //   options: {
        //     placeholder: true,
        //     quality: 60,
        //     size: 1400,
        //     adapter: require('responsive-loader/sharp')
        //   }
        // },
        {
          test: /\.(gif|svg)$/,
          loader: 'url-loader',
          query: {
            limit: 1000,
            name: 'img/[name].[hash:7].[ext]'
          }
        }
      )
    }
  },
  plugins: [
    '~/plugins/globalComponents',
    '~/plugins/lazyload',
    { src: '~plugins/ga.js', ssr: false }
  ],

  components: true,
  modules: [
    ['nuxt-i18n', I18N],
    '@nuxtjs/style-resources',
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dotenv',
    '@nuxtjs/moment',
    // Doc: https://github.com/nuxt/content
    '@nuxt/content',
    //Doc https://www.npmjs.com/package/@nuxtjs/sitemap
    '@nuxtjs/sitemap'
  ],
  sitemap: {
    hostname: 'http://localhost:3000',
    gzip: true
  },

  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {
    markdown: {
      remarkPlugins: [['remark-emoji', { emoticon: true }]]
    },
    nestedProperties: ['author.name']
  },
  styleResources: {
    scss: [
      '@/assets/css/utilities/_variables.scss',
      '@/assets/css/base/_grid.scss'
    ]
  },
  generate: {
    routes: ['/en', '404']
      .concat(getPaths('es', 'blog'))
      .concat(getPaths('en', 'blog'))
  }
}
