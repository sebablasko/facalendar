<template>
  <div :class="$style.app">
    <h1>Calendario de ceremonias Financial Rangers</h1>
    <h3> {{ currentDate }} </h3>
    <!-- CARROUSEL -->
    <div :class="$style.carrousel">
      <img
        v-for="(mem, index) in members"
        :key="index"
        :class="[
          $style.softOpacity,
          !rolesForToday.reduce((p,c) => p || c.selectedCandidate === mem, false) || $style.winner,
          rolesForToday.reduce((p,c) => p || c.selectedCandidate === mem, false) || $style.loser,
        ]"
        :src="mem.img" />
    </div>
    <!-- CALENDAR -->
    <div :class="$style.calendar">
      <week-day
        v-for="(d, index) in rangeDates"
        :key="`${index}c`"
        :day="d"
        :today="selectedDate"/>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

import WeekDay from '@/components/WeekDay';

import events from '@/utils/events.js';
import members from '@/utils/members.js';

export default {
  name: 'App',
  components: {
    WeekDay,
  },
  computed: {
    currentDate() {
      return `${this.selectedDate.format('dddd')} ${this.selectedDate.format('DD')} de ${this.selectedDate.format('MMMM')}, ${this.selectedDate.format('YYYY')}`;
    },
    firstDayToShow() {
      return moment(undefined, undefined, 'es').date(1).day(1);
    },
    rangeDates() {
      return Array.from(Array(35).keys())
        .map(i => ({
          currentDay: moment(this.firstDayToShow).add(i, 'd'),
          schedule: this.rolesForDate(moment(this.firstDayToShow).add(i, 'd')),
        }));
    },
    rolesForToday() {
      return this.rolesForDate(this.selectedDate);
    },
  },
  methods: {
    rolesForDate(d) {
      return events
        .filter(x => x.occurrence.days.indexOf(d.weekday()) !== -1)
        .map((e) => {
          const candidates = members.filter(x => x.groups.indexOf(e.participants) > -1);
          const countedBussinesDays = this.getBusinessDays(moment(e.startDate, 'DD-MM-YYYY', 'es'), d);
          const workedDays = Math.floor(countedBussinesDays / 5) * e.occurrence.days.length + (countedBussinesDays % 5);
          const selectedCandidate = candidates[workedDays % candidates.length];
          return { ...e, selectedCandidate };
        });
    },
    getBusinessDays(d1, d2) {
      const totalDays = d2.diff(d1, 'days');
      let total = 0;
      for (let i = 0; i < totalDays; ++i) {
        if (d1.weekday() < 5) {
          total += 1;
        }
        d1.add(1, 'd');
      }
      return total;
    },
  },
  data() {
    return {
      selectedDate: moment(undefined, undefined, 'es'),
      events,
      members,
    };
  },
};
</script>

<style module lang="scss">
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.softOpacity {
  background: #efefef !important;
}
.softOpacity > * {
  opacity: 0.4;
  filter: grayscale(1);
}
.calendar {
  max-width: 1366px;
  margin: 20px auto;
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-wrap: wrap;
  justify-content: center;
  background: linear-gradient(rgba(255,255,255,.75), rgba(255,255,255,.75)), url('assets/nicobig.jpeg');
  background-repeat: no-repeat;
  background-position-y: center;
  background-size: cover;
}

.loser {
  filter: grayscale(1);
  opacity: 0.4;
  animation-name: example;
  animation-duration: 4s;
}

$moon: #C7938B;
$peak: #efdbd8;

// keyframes
@keyframes cresent{
  0%{
    transform: translate(0px, 0px) scale(1);
    box-shadow: none;
  }
  50%{
    transform: translate(0px, 0px) scale(1.02);
    box-shadow: 0 0 10px lighten($moon, 30%), 0 0 80px 8px $moon;
    background-color: $peak;
  }
  100%{
    transform: translate(0px, 0px) scale(1);
    box-shadow: none;
  }
}
.winner {
  animation: cresent 1s infinite;
}
</style>
