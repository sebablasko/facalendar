<template>
  <div :class="$style.content">
    settings
  </div>
</template>

<script>
export default {
  name: 'Settings',
};
</script>

<style module lang="scss">
.content {
  display: flex;
  flex-direction: column;
  margin: 1em;
  flex: 1;
}
</style>