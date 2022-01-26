<template>
  <div :class="$style.content">
    <div
      :class="[$style.day, $style.control]"
      @click="$emit('month', -1)"><</div>
    <div
      v-for="(d, i) in dates" 
      :key="`${i}-d`"
      :class="[
        $style.day,
        d.date.isBefore(today, 'date') && $style.past,
        d.date.isSame(today, 'date') && $style.today,
        d.date.isSame(selectedDate, 'date') && $style.selected,
        feriados.some(f => d.date.isSame(f.fecha, 'day')) && !d.date.isBefore(today, 'date') && $style.feriado,
        [0, 6].includes(d.date.day()) && $style.weekend,
      ]"
      @click="selectEvent(d)">
      <div :class="$style.dayNumber">{{ d.date.format('D') }}</div>
      <div :class="$style.dayName">{{ d.date.format('dd').replace('.', '') }}</div>
    </div>
    <div
      :class="[$style.day, $style.control]"
      @click="$emit('month', 1)">></div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapState } from 'vuex';

import feriados from '@/utils/feriados.js';

export default {
  name: 'MonthLine',
  props: {
    dates: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapState(['selectedDate']),
    today() {
      return moment();
    },
  },
  methods: {
    selectEvent({date}) {
      this.$emit('select', date);
    },
  },
  data() {
    return {
      feriados: feriados,
    };
  },
  created() {
    moment.locale('es');
  },
};
</script>

<style module lang="scss">
.content {
  display: flex;
  flex-direction: row;
  flex: 1;
  // box-shadow: 1em 0 1em 1px black;
  box-shadow: 0 0.005em 0.05em silver;
}

.day {
  display: flex;
  position: relative;
  flex: 1;
  font-size: 0.65em;
  padding: 0.5em;
  flex-direction: column;
  background: var(--dark-primary-color-10);
  transition: background-color 0.5s linear;
  // box-shadow: 0 3px 0px 0px black;
  transform-origin: bottom left;
  cursor: pointer;
  &:hover {
    background: var(--light-primary-color-70);
    transform: translate(0px, 0px) scale(1.05);
    z-index: 5;
  }
}

.feriado {
  background: #ec6c6c;
  // &::after {
  //   content: 'feriado';
  //   position: absolute;
  //   bottom: -1.5em;
  //   left: 0;
  //   background: #ec6c6c;
  //   width: 100%;
  //   text-align: center;
  //   font-size: 0.9em;
  //   color: white;
  // }
}

.dayNumber {
  font-weight: bold;
  font-size: 2.25em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dayName {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  align-items: flex-end;
  padding-bottom: 3px;
}

.today {
}

.selected {
  animation: cresent 3s infinite;
}

.weekend {
  // background: silver;
}

.past {
  filter: grayscale(100%);
  &::after {
    position: absolute;
    top: 0;
    left: 30%;
    content:"/";
    font-size: 4.8em;
    font-family: 'Dancing Script', cursive;
    font-weight: bold;
    transform: rotate(5deg);
  }
}

.control {
  // border: 3px solid var(--dark-primary-color-30);
  font-size: 1.75em;
  padding: 0 0.1em;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes cresent{
  0%{
    // transform: translate(0px, 0px) scale(1);
    background: var(--light-primary-color-70);
  }
  25%{
    // transform: translate(0px, 0px) scale(1, 1.05);
    background-color: var(--primary-color);
  }
  50%{
    // transform: translate(0px, 0px) scale(1);
    background: var(--light-primary-color-70);
  }
  75%{
    // transform: translate(0px, 0px) scale(1, 1.05);
    background-color: var(--primary-color);
  }
  100%{
    // transform: translate(0px, 0px) scale(1);
    background: var(--light-primary-color-70);
  }
}

</style>