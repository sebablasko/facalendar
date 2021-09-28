<template>
  <div :class="$style.app">
    <!-- <CalendarIcon/> -->
    <day-header
      :primary-team="selectedTeam"
      :selected="selected"
      @toggle="teamToggle"
      @refresh="refresh"/>
    <month-line
      :selected="selected"
      :dates="month"
      @select="selectDate"/>
    <div :class="$style.general">
      <div :class="$style.primary">
        <transition name="fade">
          <div v-show="!changing" :class="$style.row">
            <ceremony
              v-for="c in ceremonies"
              :key="`${c.name}-${c.participants.join('-')}`"
              :title="c.name"
              :selected-date="selected"
              :participants="c.participants"
              :periodicity="c.periodicity"
              :periodicity-payload="c.periodicity_payload"
              />
          </div>
        </transition>
        <monthly-calendar
          :selected-date="selected"
          :dates="month"/>
      </div>
      <div :class="$style.secondary">
        <widgets @refresh="refresh"/>
        <releases/>
        <birthdays :selected="selected"/>
        <news/>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';

import CalendarIcon from 'vue-material-design-icons/Calendar.vue';

import DayHeader from '@/components/DayHeader'
import MonthLine from '@/components/MonthLine'
import Birthdays from '@/components/Birthdays'
import Ceremony from '@/components/Ceremony'
import Picker from '@/components/Picker'
import Widgets from '@/components/Widgets'
import News from '@/components/News'
import Releases from '@/components/Releases'
import MonthlyCalendar from '@/components/MonthlyCalendar'

import settings from '@/utils/settings.js';
import store from '@/store.js'

export default {
  name: 'App',
  components: {
    CalendarIcon,
    DayHeader,
    MonthLine,
    Birthdays,
    Ceremony,
    Picker,
    Widgets,
    News,
    Releases,
    MonthlyCalendar,
  },
  data() {
    return {
      selected: moment(),
      selectedTeam: settings.teams[0].id,
      changing: true,
    };
  },
  computed: {
    ceremonies: {
      cache: false,
      get: function() {
        const allCeremonies = [
          // ...settings.teams.find(x => x.id === this.selectedTeam).ceremonies,
          // ...settings.globalCeremonies,
          ...store.settings.teams.find(x => x.id === this.selectedTeam).ceremonies,
          ...store.settings.globalCeremonies,
        ]
        .filter(x => x.periodicity === 'DAYS_AT_WEEK' && x.periodicity_payload.includes(this.selected.weekday()));
        return allCeremonies
          .map(x => ({
            ...x,
            participants: settings.members.filter(y => x.participants.includes(y.id))
          }));
      },
    },
    month() {
      const monthEvents = [
        // { day: 5, week: 'SECOND', name: 'Retro' },
        { day: 4, week: 'THIRD', name: '1 a 1' },
        { day: 4, week: 'LAST', name: 'Expectativa vs Realidad' },
      ];
      const validateOccurrency = (event, checkingDate) => {
        let firstWeek = moment(checkingDate).set('date', 1);
        while (firstWeek.day() != event.day) {
          firstWeek.add(1, 'd');
        }
        firstWeek = firstWeek.week();
        let lastWeek = moment(checkingDate).add(1, 'months').set('date', 1).add(-1, 'd');
        while (lastWeek.day() != event.day) {
          lastWeek.add(-1, 'd');
        }
        lastWeek = lastWeek.week();

        const currentWeek = moment(checkingDate).week();
        switch (event.week) {
          case 'FIRST':
            return firstWeek === currentWeek && moment(checkingDate).day() === event.day;
          case 'SECOND':
            return firstWeek + 1 === currentWeek && moment(checkingDate).day() === event.day;
          case 'THIRD':
            return firstWeek + 2 === currentWeek && moment(checkingDate).day() === event.day;
          case 'PRELAST':
            return lastWeek - 1 === currentWeek && moment(checkingDate).day() === event.day;
          case 'LAST':
            return lastWeek === currentWeek && moment(checkingDate).day() === event.day;
        }
        return false;
      };
      const firstDay = moment(this.selected).set('date', 1);
      return [...Array(moment(this.selected).daysInMonth())]
        .map((x, i) => ({
          date: moment(firstDay).add(i, 'd'),
          items: [
            ...(
                monthEvents.some(x => validateOccurrency(x, moment(firstDay).add(i, 'd')))
                ? [monthEvents.find(x => validateOccurrency(x, moment(firstDay).add(i, 'd')))]
                : []
                ),
          ],
        }));
    },
  },
  methods: {
    refresh() {
      this.$forceUpdate();
    },
    selectDate(date){
      this.selected = moment(date);
    },
    startConfetti(teamId) {
      const particles = settings.teams
        .find(x => x.id !== teamId)
        .ceremonies[0]
        .participants
        .map(x => ({
          type: 'image',
          url: settings.members.find(y => y.id === x).img,
          size: 15 + Math.floor(Math.random() * 10),
          }),
        )
      this.$confetti.start({
        particlesPerFrame: 0.75,
        windSpeedMax: 2,
        defaultDropRate: 10,
        defaultColors: [
          '#35b9e7',
          '#f7b941',
        ],
        particles: [
          { type: 'heart', size: 50 },
          ...particles,
        ],
      });
    },
    teamToggle() {
      this.changing = true;
      const teams = settings.teams.map(x => x.id)
      const newTeam = teams[(1 + teams.indexOf(this.selectedTeam))%teams.length]
      this.startConfetti(newTeam);
      document.documentElement.setAttribute('theme', newTeam);
      this.selectedTeam = newTeam;
      setTimeout(() => {
        this.$confetti.stop();
      }, 2000);
      setTimeout(() => {
        this.changing = false;
      }, 500);
    }
  },
  mounted() {
    if (window.location.search.substring(1) === 'cuprum') {
      this.teamToggle();
    }
   },
  created() {
    moment.locale('es');
    axios.get(
      'https://users.dcc.uchile.cl/~sblasco/facalendar/')
      .then((x) => {
        store.settings = x.data;
        this.changing = false;
        this.refresh();
      });
    this.changing = false;
    this.selected = moment().add(0, 'months');
  },
};
</script>

<style module lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Baloo+Chettan+2&display=swap');

// Dimensions
$dot-size: 2px;
$dot-space: 22px;

:root, [theme="principal"] {
  --primary-color: #68caed;
  --light-primary-color-10: #81d3f0;
  --light-primary-color-20: #9adcf3;
  --light-primary-color-30: #b3e5f6;
  --light-primary-color-70: #d6eaf8;
  --dark-primary-color-10: #4fc1ea;
  --dark-primary-color-20: #35b9e7;
  --dark-primary-color-30: #1cb0e4;
}

[theme="cuprum"] {
  --primary-color: #f9cb71;
  --light-primary-color-10: #fad489;
  --light-primary-color-20: #f7b941;
  --light-primary-color-30: #fbdca0;
  --light-primary-color-70: #fefce2;
  --dark-primary-color-10: #f8c259;
  --dark-primary-color-20: #f7b941;
  --dark-primary-color-30: #f6b12a;
}

html {
  height: 100%;
}
body {
  margin: auto;
  padding: 0;
  background:
		linear-gradient(90deg, var(--light-primary-color-70) ($dot-space - $dot-size), transparent 1%) center,
		linear-gradient(var(--light-primary-color-70) ($dot-space - $dot-size), transparent 1%) center,
		silver;
	background-size: $dot-space $dot-space;
  transition: background-color 0.5s linear;
  max-width: 1300px;
}
.app {
  font-family: 'Baloo Chettan 2', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  color: #2c3e50;
}
.mainContent {
  display: none;
  flex-direction: column;
}
.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  & > * {
    flex-basis: 48%;
    margin: 0 0.5em;
  }
}

.general {
  display: flex;
  flex-direction: row;
  flex: 1;
}
.primary {
  display: flex;
  flex-direction: column;
  flex: 2;
  margin-right: 0.5em;
  & > * {
    margin: 1em 0;
  }
}
.secondary {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 0.5em;
  & > * {
    margin: 1em 0;
  }
}
</style>
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>