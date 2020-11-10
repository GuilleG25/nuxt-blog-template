<template>
  <div>
    <div class="max-w-5xl mx-auto">
      <!-- header -->
      <nav-blog />
      <!-- header ends here -->

      <main class="mt-10">
        <div
          class="mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative"
          style="height: 24em"
        >
          <div
            class="absolute left-0 bottom-0 w-full h-full z-10"
            style="
              background-image: linear-gradient(
                180deg,
                transparent,
                rgba(0, 0, 0, 0.7)
              );
            "
          ></div>
          <!-- <img
            :src="`/img/blog/${article.id}/_thumbnail${
              article.img ? article.img : '.jpg'
            }`"
            :alt="article.alt"
            class="absolute left-0 top-0 w-full h-full z-0 object-cover"
          /> -->
          <image-responsive
            v-if="article.MainImage"
            :image-url="`blog/${article.id}/_main${
              article.img ? article.img : '.jpg'
            }`"
            width="100%"
            class="absolute left-0 top-0 w-full h-full z-0 object-cover"
            :alt="article.alt"
          />
          <component
            :is="extraComponentLoader"
            v-else
            class="absolute left-0 top-0 w-full h-full z-0 object-cover elevate-cover__img"
          />
          <div class="p-4 absolute bottom-0 left-0 z-20">
            <nuxt-link
              v-for="(tag, id) in article.tags"
              :key="id"
              :v-if="article.slug"
              :to="
                $i18n.locale === 'es'
                  ? `/blog/${article.slug}`
                  : `/en/blog/${article.slug}`
              "
              class="px-4 bg-black text-gray-200 inline-flex items-center justify-center mb-2 mr-1"
            >
              {{ tags[tag].name }}
            </nuxt-link>
            <h2 class="text-4xl font-semibold text-black-100 leading-tight">
              {{ article.title }}
            </h2>
            <div class="flex mt-3">
              <!-- <img
                src="https://randomuser.me/api/portraits/men/97.jpg"
                class="h-10 w-10 rounded-full mr-2 object-cover"
              /> -->
              <div>
                <!-- <p class="font-semibold text-gray-200 text-sm">Mike Sullivan</p> -->
                <p class="font-semibold text-black text-xs">
                  {{ formatDate(article.updatedAt) }}
                </p>
                <p
                  v-if="article.trans"
                  class="cursor-pointer font-semibold text-xs px-4 bg-gray-900 text-gray-200 inline-flex items-center justify-center"
                  @click="redirectBlog"
                >
                  {{ $t('post.text1') }}
                </p>
                <!-- </nuxt-link> -->
              </div>
            </div>
          </div>
        </div>

        <div
          class="px-4 lg:px-0 mt-12 text-gray-700 max-w-2xl mx-auto text-lg leading-relaxed"
        >
          <!-- content from markdown -->
          <client-only>
            <DynamicMarkdown
              :render-func="article.renderFunc"
              :static-render-funcs="article.staticRenderFuncs"
              :extra-component="article.extraComponent"
            />
            <!-- <nuxt-content :document="article" /> -->
          </client-only>
          <!-- prevNext component -->
          <PrevNext :prev="prev" :next="next" class="mt-8" />
        </div>
      </main>
      <!-- main ends here -->

      <!-- footer -->
    </div>

    <pie />
  </div>
</template>
<script>
export default {
  transition: {
    name: 'slide-fade'
  },
  props: {
    article: {
      type: Object,
      required: true,
      default: () => {}
    },
    tags: {
      type: Object,
      required: true,
      default: () => {}
    },
    prev: {
      type: Object,
      default: () => null
    },
    next: {
      type: Object,
      default: () => null
    }
  },
  computed: {
    extraComponentLoader() {
      if (!this.article.extraComponent) {
        return null
      }
      return () =>
        import(`~/components/extras/${this.article.extraComponent}.vue`)
    }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString(this.$i18n.locale, options)
    },
    redirectBlog() {
      if (this.$i18n.locale === 'es') {
        this.$store.commit('data/SET_LANG', 'en')
        this.$router.push({
          path: `/en/blog/${this.article.trans}`
        })
      } else {
        this.$store.commit('data/SET_LANG', 'es')
        this.$router.push({
          path: `/blog/${this.article.trans}`
        })
      }
    }
  }
}
</script>
<style lang="scss">
.icon.icon-link {
  background-image: url('~assets/svg/icon-hashtag.svg');
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: 20px 20px;
}
.overflowhidden {
  overflow: hidden;
}
.blogSelected-horizontalImage {
  height: 56rem;
  background-size: contain;
  transition: all ease 0.35s;
  opacity: 0;

  &[lazy='loading'] {
    filter: blur(15px);
    background-repeat: no-repeat !important;
    background-size: contain !important;
  }
  &[lazy='loaded'] {
    opacity: 1;
    background-repeat: no-repeat !important;
    background-size: contain !important;
  }
  .intro {
    display: flex;
  }
}
.elevate-cover {
  display: flex;
  flex-direction: column;
  min-height: 459px;

  @media (min-width: $screen-md) {
    flex-direction: row;
  }

  &__img,
  &__textOffset {
    width: 100%;
  }

  &__left {
    max-width: 500px;
    width: 100%;
    padding: 2.4rem;
    margin-bottom: auto;

    @media (min-width: $screen-md) {
      margin-left: auto;
      padding: 2.4rem 4rem 2.4rem 2.4rem;
    }
  }

  &__textOffset {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    font-size: 3rem;
    font-family: 'Tiempos Headline', Arial, sans-serif;
    color: $secondary;

    @media (min-width: $screen-sm) {
      font-size: 4rem;
    }
  }

  &__description {
    margin: 0;
    opacity: 0;
    animation: fadeinmove 0.5s ease;
    animation-delay: 0.5s;
    animation-fill-mode: forwards;
  }
}
.dynamicMarkdown {
  padding: 1.2rem 0;
  font-size: 16px;
  line-height: 1.7;
  color: $secondary;

  > *:not(.datagrid):not(.image-placeholder) {
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    display: block;
  }

  @media (min-width: $screen-sm) {
    // padding: 7.2rem 0;
    font-size: 19px;
  }

  h2 {
    // padding-bottom: 3.2rem;
    // padding-bottom: 2rem;

    @media (max-width: $screen-sm) {
      font-size: 2rem;
    }
  }

  h3 {
    font-size: 2.2rem;
    // padding-bottom: 2rem;
  }

  li {
    list-style-type: initial;
  }

  pre {
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
    padding: 2.4rem;
    border-radius: 4px;
    background-color: #f6f8fa;
    overflow-x: scroll;
    display: block;
    margin-bottom: 5rem;

    code {
      background-color: #f6f8fa;
    }
  }

  code {
    background: #f3f4f4;
    border-radius: 4px;
    display: inline;
    color: $secondary;
    font-size: 14px;
    padding: 0.2em 0.4em;

    @media (min-width: $screen-sm) {
      font-size: 16px;
    }
  }
}
</style>
