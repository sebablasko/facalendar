<template>
  <div :class="$style.content">
    <div
      v-for="(d, i) in dates" 
      :key="`${i}-d`"
      :class="[
        $style.day,
        d.date.isBefore(today, 'date') && $style.past,
        d.date.isSame(today, 'date') && $style.today,
        d.date.isSame(selected, 'date') && $style.selected,
        [0, 6].includes(d.date.day()) && $style.weekend,
      ]"
      @click="selectEvent(d)">
      <div :class="$style.dayNumber">{{ d.date.format('D') }}</div>
      <div :class="$style.dayName">{{ d.date.format('ddd').replace('.', '') }}</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

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
  background: yellow;
  box-shadow: 0 0.7em 1em 1px black;
  transform-origin: bottom left;
  cursor: pointer;
  &:hover {
    background: lightcyan;
    transform: translate(0px, 0px) scale(1.05);
  }
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
  background: gold;
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
    background: lightblue;
  }
  25%{
    transform: translate(0px, 0px) scale(1, 1.1);
    background-color: lightcyan;
  }
  50%{
    transform: translate(0px, 0px) scale(1);
    background: lightblue;
  }
  75%{
    transform: translate(0px, 0px) scale(1, 1.1);
    background-color: lightcyan;
  }
  100%{
    transform: translate(0px, 0px) scale(1);
    background: lightblue;
  }
}

</style>