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
      const range = [];
      for (let i = 0; i < 35; ++i) {
        const currentDay = moment(this.firstDayToShow).add(i, 'd');
        if (currentDay.weekday() < 5) {
          range.push({ currentDay, schedule: this.rolesForDate(currentDay) });
        } else {
          range.push({ currentDay });
        }
      }
      return range;
    },
    rolesForToday() {
      return this.rolesForDate(this.selectedDate);
    },
  },
  methods: {
    rolesForDate(d) {
      const scheduledAppointments = this.events.map((e) => {
        const startRuleDate = moment(e.startDate, 'DD-MM-YYYY', 'es');
        const totalDays = d.diff(startRuleDate, 'days') 
        const countedBussinesDays = this.getBusinessDays(startRuleDate, d);
        const isActiveForToday = (totalDays % e.periodicity) === 0 && d.weekday() < 5;
        if (isActiveForToday) {
          const candidates = this.members.filter(x => x.groups.indexOf(e.participants) > -1);
          const selectedCandidate = candidates[countedBussinesDays % candidates.length];
          return { ...e, today: isActiveForToday, selectedCandidate };
        }
        return { ...e, today: isActiveForToday };
      });
      return scheduledAppointments.filter(x => x.today);
    },
    getBusinessDays(d1, d2) {
      const totalDays = d2.diff(d1, 'days') + 1;
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
  margin-top: 60px;
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
