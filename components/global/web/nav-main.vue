<template>
  <header class="bg-white shadow border-t-4 border-indigo-600">
    <div class="mx-auto px-6 py-4">
      <div class="flex flex-wrap items-center justify-between">
        <div class="flex w-full lg:w-1/4 xl:w-1/4 justify-center mb-3">
          <a
            class="flex items-center text-gray-800 hover:text-indigo-600"
            href="/"
          >
            <Logo
              :config="{
                class: 'h-6 w-6 sm:h-6 sm:w-6',
                width: '300',
                height: '300'
              }"
            />
            <span class="mx-3 font-medium text-sm md:text-base"
              >Guillermo Daniel</span
            >
          </a>
        </div>
        <icon-link />
      </div>
    </div>
  </header>
</template>
<style>
.cls-1,
.cls-2 {
  font-size: 3958.333px;
  font-family: 'Bahnschrift', sans-serif;
  font-weight: 300;
}

.cls-1 {
  fill: #162e55;
}

.cls-2 {
  fill: #4882dd;
}
</style>
