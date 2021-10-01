<template>
  <div :class="$style.content">
    <span v-if="error">Ooops... Nos caimos :(</span>
    <span v-else>Péreme...</span>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    error: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style module lang="scss">
.content {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 7em;
  background: var(--light-primary-color-30)
}
</style>