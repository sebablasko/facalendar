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
      selectedTeam: 'principal',
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
    teamToggle() {
      this.changing = true;
      const particles = settings.teams
        .find(x => x.id !== this.selectedTeam)
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
        ],
        particles: [
          { type: 'heart', size: 50 },
          ...particles,
        ],
      });
      setTimeout(() => {
        this.$confetti.stop();
      }, 2000);
      setTimeout(() => {
        this.changing = false;
        this.selectedTeam = (this.selectedTeam === 'cuprum')
          ? 'principal'
          : 'cuprum';
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
@import '@/style.scss';

// Dimensions
$dot-size: 2px;
$dot-space: 22px;

html {
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
  // background: linear-gradient(to bottom right, #fffbcc, rgba(#fffbcc, 0.9));
  // min-height: 100%;
  // background-size: cover;
  background:
		linear-gradient(90deg, $bg-color ($dot-space - $dot-size), transparent 1%) center,
		linear-gradient($bg-color ($dot-space - $dot-size), transparent 1%) center,
		$dot-color;
	background-size: $dot-space $dot-space;
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
  flex: 1;
  flex-direction: row;
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