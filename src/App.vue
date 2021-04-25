<template>
  <div :class="$style.app">
    <day-header :selected="selected" @toggle="teamToggle"/>
    <birthdays :selected="selected"/>
    <transition name="fade">
      <div v-show="!changing" :class="$style.row">
        <ceremony
          v-for="c in ceremonies"
          :key="c.name"
          :title="c.name"
          :selected-date="selected"
          :participants="c.participants"
          :periodicity="c.periodicity"
          :periodicity-payload="c.periodicity_payload"
          />
      </div>
    </transition>
    <memos v-show="false" :selected="selected" style="display: flex; flex: 2;"/>
    <div style="padding-bottom: 7em;"></div>
    <div :class="$style.footer">
      <timeline
        :selected="selected"
        :dates="month"
        @select="selectDate"/>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

import DayHeader from '@/components/DayHeader'
import Timeline from '@/components/Timeline'
import Birthdays from '@/components/Birthdays'
import Ceremony from '@/components/Ceremony'
import Memos from '@/components/Memos'
import Picker from '@/components/Picker'

import settings from '@/utils/settings.js';

export default {
  name: 'App',
  components: {
    DayHeader,
    Timeline,
    Birthdays,
    Ceremony,
    Memos,
    Picker,
  },
  data() {
    return {
      selected: moment(),
      selectedTeam: settings.teams[0].id,
      changing: false,
    };
  },
  computed: {
    ceremonies() {
      const allCeremonies = [
        ...settings.teams.find(x => x.id === this.selectedTeam).ceremonies,
        ...settings.globalCeremonies,
      ];
      return allCeremonies
        .map(x => ({
          ...x,
          participants: settings.members.filter(y => x.participants.includes(y.id))
        }));
    },
    month() {
      const firstDay = moment().set('date', 1);
      return [...Array(moment().daysInMonth())]
        .map((x, i) => ({
          date: moment(firstDay).add(i, 'd'),
          items: [],
        }));
    },
  },
  methods: {
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
          '#78bbe8',
          '#fef79f',
        ],
        particles: [
          { type: 'heart', size: 50 },
          ...particles,
        ],
      });
    },
    teamToggle() {
      console.log('toggle');
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
  created() {
    moment.locale('es');
    this.selected = moment();
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
  --primary-color: #78bbe8;
  --light-primary-color-10: #85c1ea;
  --light-primary-color-20: #93c8ec;
  --light-primary-color-30: #a0cfee;
  --light-primary-color-70: #d6eaf8;
  --dark-primary-color-10: #59abe2;
  --dark-primary-color-20: #3b9cdd;
  --dark-primary-color-30: #238cd2;
}

[theme="cuprum"] {
  --primary-color: #fef79f;
  --light-primary-color-10: #fef7a8;
  --light-primary-color-20: #fef8b2;
  --light-primary-color-30: #fef9bb;
  --light-primary-color-70: #fefce2;
  --dark-primary-color-10: #fdf376;
  --dark-primary-color-20: #fdf04d;
  --dark-primary-color-30: #fcec24;
}

html {
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
  background:
		linear-gradient(90deg, var(--light-primary-color-70) ($dot-space - $dot-size), transparent 1%) center,
		linear-gradient(var(--light-primary-color-70) ($dot-space - $dot-size), transparent 1%) center,
		silver;
	background-size: $dot-space $dot-space;
  transition: background-color 0.5s linear;
}
.app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
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
}
.footer {
  display: flex;
  width: 100%;
  flex: 1;
  position: fixed;
  bottom: 0;
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