<template>
  <div :class="$style.content">
    <div :class="$style.mainContent">
      {{ headerText }}
      <toggle-button
        :value="true"
        :labels="toggle.labels"
        :color="toggle.color"
        :switch-color="toggle.switchColor"
        :font-size="toggle.fontSize"
        :width="toggle.width"
        :height="toggle.height"
        :class="$style.floatingToggle"
        @change="() => $emit('toggle')"
      />
    </div>
    <widgets/>
  </div>
</template>

<script>
import moment from 'moment';
import { ToggleButton } from 'vue-js-toggle-button';

import Widgets from '@/components/Widgets'

export default {
  name: 'DayHeader',
  components: {
    ToggleButton,
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
    toggle() {
      return {
        labels: { checked: 'Principal', unchecked: 'Cuprum' },
        color: { checked: '#78bbe8', unchecked: '#efbb61'  },
        switchColor: { checked: 'linear-gradient(to right, #78bbe8 20%, #ffffff)', unchecked: 'linear-gradient(to right, #ffffff 20%, #efbb61)' },
        fontSize: 22,
        width: 125,
        height: 30,
      };
    },
  },
  created() {
    moment.locale('es');
  },
};
</script>

<style module lang="scss">
@import '@/style.scss';

.content {
  display: flex;
  flex-direction: column;
  font-family: 'Dancing Script', cursive;
  position: relative;
}

.mainContent {
  box-shadow: 0 0.005em 0.05em silver;
  background: $primary-color;
  padding: 0.2em;
  text-align: center;
  font-size: 3em;
  font-weight: bold;
  text-shadow: 0 0 10px white;
  &:first-letter {
    text-transform: uppercase;
  }
}

.floatingToggle {
  float: right;
  font-family: 'Baloo Chettan 2', cursive;
  text-shadow: initial;
}
</style>