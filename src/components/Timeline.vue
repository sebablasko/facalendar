<template>
  <div :class="$style.content">
    <div
      v-for="(d, i) in dates" 
      :key="`${i}-d`"
      :class="[
        $style.day,
        feriados.some(f => d.date.isSame(f.fecha, 'day')) && $style.feriado,
        d.date.isBefore(today, 'date') && $style.past,
        d.date.isSame(today, 'date') && $style.today,
        d.date.isSame(selected, 'date') && $style.selected,
        [0, 6].includes(d.date.day()) && $style.weekend,
      ]"
      @click="selectEvent(d)">
      <div
        v-if="feriados.some(f => d.date.isSame(f.fecha, 'day'))"
        :class="$style.feriadoLabel"/>
      <div :class="$style.dayNumber">{{ d.date.format('D') }}</div>
      <div :class="$style.dayName">{{ d.date.format('ddd').replace('.', '') }}</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import feriados from '@/utils/feriados.js';

export default {
  name: 'Timeline',
  props: {
    selected: {
      type: Object,
      default: () => moment(),
    },
    dates: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
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
      feriados: [],
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
}

.day {
  display: flex;
  flex: 1;
  font-size: 0.65em;
  flex-direction: column;
  background: var(--dark-primary-color-10);
  box-shadow: 0 0.7em 1em 1px black;
  transform-origin: bottom left;
  cursor: pointer;
  &:hover {
    background: var(--light-primary-color-70);
    transform: translate(0px, 0px) scale(1.05);
  }
}

.feriado {
  background: tomato !important;
}

.feriadoLabel {
  background-color: peru;;
  position: absolute;
  top: -1.5em;
}

.dayNumber {
  text-orientation: unset;
  writing-mode: unset;
  font-weight: bold;
  font-size: 1.4em;
  margin: 0.2em;
}

.dayName {
  display: flex;
  flex: 1;
  text-orientation: upright;
  writing-mode: vertical-rl;
  align-items: flex-end;
}

.today {
  background: var(--light-primary-color-30);
  &::before {
    position: absolute;
    top: -1.5em;
    content:"Hoy!";
  }
}

.selected {
  animation: cresent 3s infinite;
}

.weekend {
  background: silver;
}

.past {
  filter: grayscale(100%);
}

@keyframes cresent{
  0%{
    transform: translate(0px, 0px) scale(1);
    background: var(--light-primary-color-70);
  }
  25%{
    transform: translate(0px, 0px) scale(1, 1.1);
    background-color: var(--light-primary-color-30);
  }
  50%{
    transform: translate(0px, 0px) scale(1);
    background: var(--light-primary-color-70);
  }
  75%{
    transform: translate(0px, 0px) scale(1, 1.1);
    background-color: var(--light-primary-color-30);
  }
  100%{
    transform: translate(0px, 0px) scale(1);
    background: var(--light-primary-color-70);
  }
}

</style>