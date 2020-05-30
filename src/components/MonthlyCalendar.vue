<template>
  <div :class="$style.container">
    <div :class="$style.row">
      calendar
    </div>
  </div>
</template>

<script>
export default {
  name: 'MonthlyCalendar',
  data() {
    return {
      rows: 5,
      cols: 7,
    };
  },
};
</script>

<style module lang="scss">
.container {
  background: red;
}
</style>
