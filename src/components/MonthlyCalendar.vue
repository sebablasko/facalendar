<template>
  <card>
    <template v-slot:title>
      Hitos Mensuales <calendar-icon/>
    </template>
    <template v-slot:body>
      <div :class="$style.content">
        <div
          v-for="(d, i) in weekdays" 
          :key="`${i}-pre-d`"
          :class="[
            $style.dayName,
          ]">
          {{ d }}
        </div>
        <div
          v-for="(d, i) in preOffset" 
          :key="`${i}-curr-d`"
          :class="[
            $style.day,
            $style.cross,
            [0, 6].includes(d.day()) && $style.weekend,
          ]">
        </div>
        <div
          v-for="(d, i) in dates" 
          :key="`${i}-post-d`"
          :class="[
            $style.day,
            feriados.some(f => d.date.isSame(f.fecha, 'day')) && $style.feriado,
            d.date.isBefore(today, 'date') && $style.cross,
            d.date.isSame(selectedDate, 'date') && $style.circle,
            [0, 6].includes(d.date.day()) && $style.weekend,
          ]">
          <div :class="$style.dayNumber">{{ d.date.format('D') }}</div>
          <div
            v-for="event in d.items"
            :key="event.name"
            :class="[
            $style.event,
          ]">
            {{ event.name }}
          </div>
        </div>
        <div
          v-for="(d, i) in postOffset" 
          :key="`${i}o-d`"
          :class="[
            $style.day,
            [0, 6].includes(d.day()) && $style.weekend,
          ]">
        </div>
      </div>
    </template>
  </card>
</template>

<script>
import moment from 'moment';
import CalendarIcon from 'vue-material-design-icons/CalendarMonth.vue';

import Card from '@/components/Card';
import feriados from '@/utils/feriados.js';

export default {
  name: 'MonthlyCalendar',
  components: {
    Card,
    CalendarIcon
  },
  props: {
    selectedDate: {
      type: Object,
      default: () => moment(),
    },
    dates: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    weekdays() {
      return [...Array(7)].map((x, i) => moment('2020-01-06').add(i, 'days').format('ddd'));
    },
    today() {
      return moment();
    },
    preOffset() {
      let daysToAdd = this.dates[0].date.day() - 1;
      if (daysToAdd < 0) {
        daysToAdd = 6;
      }
      return [...Array(daysToAdd)].map((x, i) => moment(this.dates[0].date).add(-i, 'days'));
    },
    postOffset() {
      let daysToAdd = 7 - this.dates[this.dates.length - 1].date.day();
      if (daysToAdd === 7) {
        daysToAdd = 0;
      }
      return [...Array(daysToAdd)].map((x, i) => moment(this.dates[0].date).add(1, 'months').add(i, 'days'));
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
@import url('https://fonts.googleapis.com/css2?family=Caveat&display=swap');
.content {
  display: flex;
  padding: 0.5em 0;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  flex: 1;
  position: relative;
}
.dayName {
  display: flex;
  margin: 0;
  padding: 0;
  flex-direction: column;
  align-items: center;
  width: 13%;
  border-left: 1px solid var(--dark-primary-color-20);
  border-right: 1px solid var(--dark-primary-color-20);
  background: var(--primary-color);
  transition: background-color 0.5s linear;
}
.day {
  display: flex;
  margin: 0;
  flex-direction: column;
  padding: 0;
  width: 13%;
  border: 1px solid var(--dark-primary-color-20);
  background: var(--light-primary-color-70);
  transition: background-color 0.5s linear;
  height: 4.5em;
  position: relative;
}
.dayNumber {
  display: flex;
  font-weight: bold;
  width: 1.15em;
  justify-content: center;
  font-size: 1.5em;
  background: var(--dark-primary-color-20);
  line-height: 1em;
  transition: background-color 0.5s linear;
}
.event {
  display: flex;
  flex-direction: column;
  font-size: 0.85em;
  margin: 0 10px;
  text-align: center;
  background: var(--light-primary-color-30);
  transform: rotate(.5deg) skewx(-8deg);
  box-shadow: 0 2px 1px 1px var(--dark-primary-color-20);
}
.circle {
  transform: scale(1.3) translateY(5%);
  box-shadow: 0 0 0.5em 0.1em gray;
  z-index: 1;
  &::after {
    position: absolute;
    font-size: 11.3em;
    font-family: 'Caveat', cursive;
    top: -135%;
    left: 10%;
    opacity: 0.65;
    font-weight: bold;
    filter: unset;
    transform: rotate(45deg);
    font-weight: 100;
    color: var(--dark-primary-color-30);
  }
}
.cross {
  &::after {
    position: absolute;
    content: 'x';
    font-size: 9em;
    font-family: 'Caveat', cursive;
    top: -100%;
    left: 20%;
    opacity: 0.65;
    font-weight: bold;
    filter: unset;
    transform: rotate(-5deg);
    font-weight: 100;
    color: var(--dark-primary-color-30);
  }
}
.weekend {
  // filter: opacity(0.6);
}
@keyframes jump {
  33% {
    text-shadow: 0 5px #f37121, 0 10px #f2aaaa;
  }
  50% {
    transform: translate(0, 0) rotate(-20deg);
    text-shadow: 0 0px #8fc0a9, 0 0px #84a9ac;
  }
  66.67% {
    text-shadow: 0 -5px #d54062, 0 -10px #8fc0a9;
  }
}
</style>