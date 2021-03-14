<template>
  <div :class="$style.app">
    <day-header :selected="selected"/>
    <birthdays :selected="selected"/>
    <div :class="$style.row">
      <daily-selector
        title="Principal Advice"
        :selected-date="selected"
        :participants="principalTeam"
        />
      <daily-selector
        title="Cuprum Advice"
        :selected-date="selected"
        :participants="cuprumTeam"
        />
      <daily-selector
        title="Engineering Chapter"
        weekly
        :selected-date="selected"
        :participants="engineeringTeam"
        />
    </div>
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
import DailySelector from '@/components/DailySelector'
import Memos from '@/components/Memos'
import Picker from '@/components/Picker'

import members from '@/utils/members.js';

export default {
  name: 'App',
  components: {
    DayHeader,
    Timeline,
    Birthdays,
    DailySelector,
    Memos,
    Picker,
  },
  computed: {
    principalTeam() {
      return members
        .filter(x => x.groups.includes('daily'))
        .filter(x => x.groups.includes('principal'));
    },
    cuprumTeam() {
      return members
        .filter(x => x.groups.includes('daily'))
        .filter(x => x.groups.includes('cuprum'));
    },
    engineeringTeam() {
      return members
        .filter(x => x.groups.includes('dev'));
    },
    dataset() {
      const firstDay = moment().set('date', 1);
      return [...Array(5 * 7).keys()].map(x => ({
        date: moment(firstDay).add(x, 'd'),
        items: [],
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
  },
  data() {
    return {
      selected: moment(),
    };
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

$dot-color: silver;
$bg-color: #fffbcc;

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