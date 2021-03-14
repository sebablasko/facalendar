<template>
  <div :class="$style.content">
    <div :class="$style.mainContent">
      {{ headerText }}
    </div>
    <widgets/>
  </div>
</template>

<script>
import moment from 'moment';
import Widgets from '@/components/Widgets'

export default {
  name: 'DayHeader',
  components: {
    Widgets,
  },
  props: {
    selected: {
      type: Object,
      default: () => moment(),
    },
  },
  computed: {
    headerText() {
      return `${this.selected.format('dddd')} ${this.selected.format('D')} de ${this.selected.format('MMMM')} del ${this.selected.format('YYYY')}`;
    },
  },
  created() {
    moment.locale('es');
  },
};
</script>

<style module lang="scss">

.content {
  display: flex;
  flex-direction: column;
  font-family: 'Dancing Script', cursive;
}

.mainContent {
  box-shadow: 0 0.005em 0.05em silver;
  background: #fef79f;
  padding: 0.2em;
  text-align: center;
  font-size: 3em;
  font-weight: bold;
  text-shadow: 0 0 10px white;
  &:first-letter {
    text-transform: uppercase;
  }
}

</style>