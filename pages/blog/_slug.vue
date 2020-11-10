<template>
  <post :article="article" :tags="tags" :prev="prev" :next="next"></post>
</template>

<script>
export default {
  name: 'Slug',
  async asyncData({ params, app, $content }) {
    const fileContent = await import(
      `~/content/${app.i18n.locale}/blog/${params.slug}.md`
    )
    try {
      const attr = await $content(app.i18n.locale, 'blog', params.slug).fetch()
      let tags = {}
      if (attr.tags) {
        const tagsList = await $content('tags')
          .only(['name', 'slug'])
          .where({ name: { $containsAny: attr.tags } })
          .fetch()
        tags = Object.assign({}, ...tagsList.map((s) => ({ [s.name]: s })))
      }
      const [prev, next] = await $content(app.i18n.locale, 'blog')
        .only(['title', 'slug'])
        .sortBy('createdAt', 'asc')
        .surround(params.slug)
        .fetch()
      const res = {
        ...attr,
        name: params.slug,
        title: attr.title,
        trans: attr.trans,
        year: attr.year,
        id: attr.id,
        img: attr.img || null,
        cardAlt: attr.cardAlt,
        tags: attr.tags || [],
        MainImage: attr.MainImage || null,
        description: attr.description,
        extraComponent: attr.extraComponent,
        renderFunc: `(${fileContent.vue.render})`,
        staticRenderFuncs: `[${fileContent.vue.staticRenderFns}]`,
        image: {
          main: attr.image && attr.image.main,
          og: attr.image && attr.image.og
        }
      }
      return {
        article: res,
        tags,
        prev,
        next
      }
    } catch (error) {}
  },
  nuxtI18n: {
    seo: false
  },
  computed: {
    ogImage() {
      return `${process.env.BASE_URL}/_nuxt/assets/images/blog/${
        this.article.id
      }/_thumbnail${this.article.img ? this.article.img : '.jpg'}`
    },
    pageTitle() {
      return `Blog - ${this.article.title}`
    },
    showLocales() {
      return this.$i18n.locales.filter(
        (locale) => locale.code !== this.$i18n.locale
      )
    },
    hreflang() {
      if (!this.trans) {
        return ''
      }
      return {
        hid: 'alternate-hreflang-' + this.showLocales[0].iso,
        rel: 'alternate',
        href: `${
          process.env.BASE_URL +
          (this.showLocales[0].code === 'es' ? '' : '/en')
        }/blog/${this.trans}`,
        hreflang: this.showLocales[0].code
      }
    }
  },
  head() {
    return {
      title: this.pageTitle,
      htmlAttrs: {
        lang: this.$i18n.locale
      },
      link: [this.hreflang],
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
          content: this.pageTitle
        },
        {
          hid: 'description',
          name: 'description',
          content: this.article.description
        },
        {
          hid: 'canonical',
          rel: 'canonical',
          href: process.env.BASE_URL + this.$route.path
        },
        { src: this.ogImage, alt: 'xyz' },
        { property: 'og:type', content: 'blog' },
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: this.pageTitle
        },
        { property: 'og:description', content: this.article.description },
        { property: 'og:image', content: this.ogImage },
        {
          property: 'og:url',
          content: process.env.BASE_URL + this.$route.path
        },
        { property: 'og:site_name', content: this.pageTitle },
        { name: 'twitter:title', content: this.pageTitle },
        { name: 'twitter:description', content: this.article.description },
        { name: 'twitter:image', content: this.ogImage },
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
