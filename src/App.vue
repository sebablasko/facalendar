<template>
  <div :class="$style.app">
    <transition name="fade">
      <loading
        v-if="loadingData"
        :error="error" />
      <team-selector v-else-if="!selectedTeam"/>
    </transition>
    <day-header/>
    <month-line
      :dates="month"
      @select="selectDate"/>
    <div :class="$style.general">
      <div :class="$style.primary">
        <ceremonies/>
        <transition v-if="false" name="fade">
          <div :class="$style.row">
            <ceremony
              v-for="c in ceremonies"
              :key="`${c.name}-${c.participants.join('-')}`"
              :title="c.name"
              :selected-date="selectedDate"
              :participants="c.participants"
              :periodicity="c.periodicity"
              :periodicity-payload="c.periodicity_payload"
              />
          </div>
        </transition>
        <monthly-calendar
          :selected-date="selectedDate"
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
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';

import TeamSelector from '@/components/TeamSelector'
import Loading from '@/components/Loading'
import DayHeader from '@/components/DayHeader'
import MonthLine from '@/components/MonthLine'
import Birthdays from '@/components/Birthdays'
import Ceremonies from '@/components/Ceremonies'
import Ceremony from '@/components/Ceremony'
import Picker from '@/components/Picker'
import Widgets from '@/components/Widgets'
import News from '@/components/News'
import Releases from '@/components/Releases'
import MonthlyCalendar from '@/components/MonthlyCalendar'

export default {
  name: 'App',
  components: {
    TeamSelector,
    Loading,
    DayHeader,
    MonthLine,
    Birthdays,
    Ceremonies,
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
      // loadingData: true,
      error: false,
    };
  },
  computed: {
    ...mapState({
      loadingData: 'loading',
      selectedTeam: 'selectedTeam',
      selectedDate: 'selectedDate',
      remote: 'remote',
    }),
    ...mapGetters(['ceremonies', 'members', 'colors']),
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
      const firstDay = moment(this.selectedDate).set('date', 1);
      return [...Array(moment(this.selectedDate).daysInMonth())]
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
    ...mapActions(['retrieveData', 'setTheme']),
    ...mapMutations(['setCurrentDate', 'setCurrentTeam']),
    refresh() {
      this.$forceUpdate();
    },
    selectDate(date){
      this.setCurrentDate(moment(date));
    },
    startConfetti(teamId) {
      const particles = this.remote.teams
        .find(x => x.id !== teamId)
        .ceremonies[0]
        .participants
        .map(x => ({
            type: 'image',
            url: this.members.find(y => y.id === x).img,
            size: 15 + Math.floor(Math.random() * 10),
          }),
        );
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
  },
  mounted() {
    this.retrieveData();
   },
};
</script>

<style module lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Baloo+Chettan+2&display=swap');

// Dimensions
$dot-size: 2px;
$dot-space: 22px;

:root {
  --primary-color: #68caed;
  --light-primary-color-10: #81d3f0;
  --light-primary-color-20: #9adcf3;
  --light-primary-color-30: #dce3e6;
  --light-primary-color-70: #d6eaf8;
  --dark-primary-color-10: #4fc1ea;
  --dark-primary-color-20: #35b9e7;
  --dark-primary-color-30: #1cb0e4;
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