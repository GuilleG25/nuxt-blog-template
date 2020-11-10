<template>
  <!-- footer -->
  <footer class="bg-white w-full py-6 px-4">
    <!-- marging just for display-->
    <div class="px-4 pt-3 pb-4 border-b -mx-4 border-gray-400">
      <div class="max-w-xl mx-auto">
        <h2 class="text-xl text-left inline-block font-semibold text-gray-800">
          {{ this.$t('footer.newsletter.title') }}
        </h2>
        <p class="text-gray-700 text-xs pl-px">
          {{ this.$t('footer.newsletter.subtitle') }}
        </p>
        <form action="#" class="mt-2">
          <div class="flex items-center">
            <input
              type="email"
              class="w-full px-2 py-4 mr-2 bg-gray-100 shadow-inner rounded-md border border-gray-400 focus:outline-none"
              required
            />
            <button
              class="bg-blue-600 text-gray-200 px-5 py-2 rounded shadow"
              style="margin-left: -7.8rem"
            >
              {{ this.$t('footer.newsletter.button') }}
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="max-w-5xl mx-auto pt-4">
      <div class="flex flex-wrap justify-between">
        <div class="w-full lg:w-3/4 xl:w-3/4 md:text-center lg:text-left">
          <div class="text-gray-600">
            © {{ $moment().year() }} — {{ this.$t('footer.credits') }}.
          </div>
        </div>
        <icon-link />
      </div>
    </div>
  </footer>
</template>
<script>
export default {}
</script>
