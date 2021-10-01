<template>
  <div :class="$style.content">
    <div :class="$style.mainContent">
      {{ headerText }}
    </div>
    <div :class="$style.floating">
      <swap-horizontal-icon
        :class="$style.item"
        :size="26"
        @click="setCurrentTeam(undefined)"/>
      <cog-icon
        v-if="false"
        :class="$style.item"
        :size="26"
        @click="setCurrentTeam(undefined)"/>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapState, mapMutations } from 'vuex';

import SwapHorizontalIcon from 'vue-material-design-icons/SwapHorizontal.vue';
import CogIcon from 'vue-material-design-icons/Cog.vue';

export default {
  name: 'DayHeader',
  components: {
    SwapHorizontalIcon,
    CogIcon,
  },
  computed: {
    ...mapState(['selectedDate', 'selectedTeam']),
    headerText() {
      return `${this.selectedDate.format('dddd')} ${this.selectedDate.format('D')} de ${this.selectedDate.format('MMMM')} del ${this.selectedDate.format('YYYY')}`;
    },
  },
  methods: {
    ...mapMutations(['setCurrentTeam']),
  },
  created() {
    moment.locale('es');
  },
};
</script>

<style module lang="scss">

.content {
  display: flex;
  position: relative;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: 'Dancing Script', cursive;
  padding: 0.3em 0;
  text-align: center;
  font-size: 3.5em;
  font-weight: bold;
  text-shadow: 0 0 10px white;
  transition: background-color 0.5s linear;
  background: linear-gradient(180deg ,var(--light-primary-color-10),var(--dark-primary-color-10));
}

.mainContent {
  flex: 1;
  &:first-letter {
    text-transform: uppercase;
  }
}

.floating {
  position: absolute;
  right: 0;
  display: flex;
  padding: 0 1em;
  flex-direction: column;
}
.item {
  display: flex;
  padding: 0.1em 0;
  cursor: pointer;
  opacity: 0.75;
  &:hover {
    opacity: 1;
  }
}
</style>