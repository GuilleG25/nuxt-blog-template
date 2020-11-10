<template>
  <div>
    <div class="max-w-5xl mx-auto">
      <!-- header -->
      <nav-blog />
      <!-- header ends here -->

      <main class="mt-10">
        <div class="flex mt-16 mb-4 px-4 lg:px-0 items-center justify-between">
          <h2 class="font-bold text-3xl">{{ $t('posts.text1') }}</h2>
          <!-- <a
            class="bg-gray-200 hover:bg-green-200 text-gray-800 px-3 py-1 rounded cursor-pointer"
          >
            View all
          </a> -->
        </div>
        <div class="block space-x-0 grid gap-5 md:grid-cols-2 lg:grid-cols-2">
          <div
            v-for="(item, index) in articles"
            :key="index"
            class="w-full pt-4 px-6 lg:p-0 blog"
          >
            <nuxt-link
              :to="
                $i18n.locale === 'es'
                  ? `/blog/${item.slug}`
                  : `/en/blog/${item.slug}`
              "
            >
              <image-responsive
                v-if="item.thumbnail || false"
                :image-url="`blog/${item.id}/_thumbnail${
                  item.img ? item.img : '.jpg'
                }`"
                :alt="item.alt"
              />
              <div class="p-2 pl-0">
                <h2 class="font-bold text-2xl text-gray-800 blog__title">
                  {{ item.title }}
                </h2>
                <p class="text-gray-700 mt-2 pt-2 blog__description">
                  {{ item.description }}
                </p>
              </div>
            </nuxt-link>
          </div>
        </div>
      </main>
    </div>

    <pie />
  </div>
</template>
<script>
export default {
  props: {
    articles: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>
<style lang="css" scoped>
.blog:hover .blog__title {
  color: #6c5cff;
}
.blog__description {
  margin: 0;
  color: #767676;
}
</style>
