<template>
  <div :class="$style.content">
    <embed :class="$style.frame" src="https://timetoherd.com/country/CHL"/>
  </div>
</template>

<script>
export default {
  name: 'Covid',
};
</script>

<style module lang="scss">
.content {
  display: flex;
  flex-direction: column;
  margin: 1em;
  flex: 1;
}
.frame {
  min-height: 30em;
}
</style>