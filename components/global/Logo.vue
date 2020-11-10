<template>
  <img
    :class="config.class"
    :width="config.width"
    :height="config.height"
    src="/img/logo.svg"
    alt=""
  />
</template>
<script>
export default {
  props: {
    config: {
      type: Object,
      required: true,
      default: () => {}
    }
  }
}
</script>
