<template>
  <posts :articles="articles"></posts>
</template>
<script>
export default {
  name: 'Blog',
  async asyncData({ app, $content }) {
    const lang = app.i18n.locale
    const articles = await $content(lang, 'blog')
      .only([
        'title',
        'description',
        'img',
        'id',
        'thumbnail',
        'slug',
        'author'
      ])
      .sortBy('createdAt', 'desc')
      .fetch()
    return {
      articles
    }
  },
  head() {
    return {
      title: this.$t('posts.title'),
      meta: [
        {
          hid: 'viewport',
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          hid: 'theme-color',
          name: 'theme-color',
          content: 'black'
        },
        {
          hid: 'theme-color',
          name: 'theme-color',
          content: 'black'
        },
        {
          hid: 'apple-mobile-web-app-title',
          name: 'apple-mobile-web-app-title',
          content: this.title
        },
        {
          hid: 'description',
          name: 'description',
          content: this.$t('posts.description')
        },
        {
          hid: 'canonical',
          rel: 'canonical',
          href: process.env.BASE_URL + this.$route.path
        },
        { src: '/img/guillermo-card.png', alt: 'xyz' },
        { property: 'og:type', content: 'blog' },
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: this.$t('posts.title')
        },
        {
          property: 'og:description',
          content: this.$t('posts.description')
        },
        { property: 'og:image', content: '/img/guillermo-card.png' },
        {
          property: 'og:url',
          content: process.env.BASE_URL + this.$route.path
        },
        { property: 'og:site_name', content: this.$t('posts.title') },
        { name: 'twitter:title', content: this.$t('posts.title') },
        {
          name: 'twitter:description',
          content: this.$t('posts.description')
        },
        { name: 'twitter:image', content: '/img/guillermo-card.png' },
        {
          name: 'twitter:site',
          content: process.env.BASE_URL + this.$route.path
        },
        { name: 'twitter:creator', content: '@GuillermoDani25' }
      ]
    }
  }
}
</script>
