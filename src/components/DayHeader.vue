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
    <widgets @refresh="$emit('refresh')"/>
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
        color: { checked: '#1cb0e4', unchecked: '#f6b12a'  },
        switchColor: { checked: 'linear-gradient(to right, #1cb0e4 20%, #ffffff)', unchecked: 'linear-gradient(to right, #ffffff 20%, #f6b12a)' },
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

.content {
  display: flex;
  flex-direction: column;
  font-family: 'Dancing Script', cursive;
  position: relative;
}

.mainContent {
  box-shadow: 0 0.005em 0.05em silver;
  background: var(--primary-color);
  padding: 0.2em;
  text-align: center;
  font-size: 3em;
  font-weight: bold;
  text-shadow: 0 0 10px white;
  transition: background-color 0.5s linear;
  &:first-letter {
    text-transform: uppercase;
  }
}

.floatingToggle {
  float: right;
  font-family: 'Baloo Chettan 2', cursive;
  text-shadow: initial;
  &:label {
     color: red;
  }
}
</style>