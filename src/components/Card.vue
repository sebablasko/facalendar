<template>
  <div :class="$style.content">
    <div :class="$style.header">
      <div :class="$style.title">
        <slot name="title"/>
      </div>
      <div :class="$style.empty"/>
    </div>
    <div :class="$style.body">
      <slot name="body"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
};
</script>

<style module lang="scss">

.content {
  display: flex;
  flex-direction: column;
  margin: 1em;
  flex: 1;
}
.header {
  display: flex;
  flex-direction: row;
}
.title {
  display: flex;
  background-color: var(--primary-color);
  padding: 0 1em;
  box-shadow: 0 0.1em 0.1em silver;
  font-size: 1.2em;
  justify-content: center;
  font-weight: bold;
  transition: background-color 0.5s linear;
}
.empty {
  display: flex;
  flex: 1;
}
.body {
  display: flex;
  background-color: var(--primary-color);
  box-shadow: 0 0.1em 0.1em silver;
  transition: background-color 0.5s linear;
}
</style>