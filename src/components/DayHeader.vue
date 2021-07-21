<template>
  <div :class="$style.content">
    <div :class="$style.floating">
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
    <div :class="$style.mainContent">
      {{ headerText }}
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { ToggleButton } from 'vue-js-toggle-button';

export default {
  name: 'DayHeader',
  components: {
    ToggleButton,
  },
  props: {
    selected: {
      type: Object,
      default: () => moment(),
    },
    primaryTeam: {
      type: String,
      default: 'principal',
    },
  },
  computed: {
    headerText() {
      return `${this.selected.format('dddd')} ${this.selected.format('D')} de ${this.selected.format('MMMM')} del ${this.selected.format('YYYY')}`;
    },
    toggle() {
      return {
        labels: {
          checked: this.primaryTeam === 'principal' ? 'Principal' : 'Cuprum',
          unchecked: this.primaryTeam !== 'principal' ? 'Cuprum' : 'Principal'
        },
        color: {
          checked: this.primaryTeam === 'principal' ? '#1cb0e4' : '#f6b12a',
          unchecked: this.primaryTeam !== 'principal' ? '#f6b12a' : '#1cb0e4',
        },
        switchColor: {
          checked: this.primaryTeam === 'principal' ? 'linear-gradient(to right, #1cb0e4 20%, #ffffff)' : 'linear-gradient(to right, #ffffff 20%, #f6b12a)',
          unchecked: this.primaryTeam !== 'principal' ? 'linear-gradient(to right, #ffffff 20%, #f6b12a)' : 'linear-gradient(to right, #1cb0e4 20%, #ffffff)',
        },
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
  flex: 1;
  flex-direction: column;
  font-family: 'Dancing Script', cursive;
  position: relative;
  padding: 0.3em 0;
  text-align: center;
  font-size: 3.5em;
  font-weight: bold;
  text-shadow: 0 0 10px white;
  transition: background-color 0.5s linear;
  background: linear-gradient(180deg ,var(--light-primary-color-10),var(--dark-primary-color-10));
}

.mainContent {
  &:first-letter {
    text-transform: uppercase;
  }
}

.floating {
  position: absolute;
  right: 50px;
  top: 0.25em;
}

.floatingToggle {
  font-family: 'Baloo Chettan 2', cursive;
  text-shadow: initial;
}
</style>