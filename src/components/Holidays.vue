<template>
  <div :class="$style.content">
    <div v-if="loading" :class="$style.row">
      loading
    </div>
    <div v-else :class="$style.content">
    <div :class="$style.row">
      <div :class="$style.item"/>
      <div
        v-for="(m, index) in Object.keys(months)"
        :key="index"
        :class="$style.item"
        :style="{ flex: months[m] }">
        {{ m }}
      </div>
    </div>   
    <div :class="$style.row">
      <div :class="$style.item"/>
      <div
        v-for="(d, index) in dates"
        :key="index"
        :class="[
          $style.item,
          [0, 6].includes(d.day()) && $style.weekend,
        ]">
        {{ d.format('dd') }}
        <br>
        {{ d.format('DD') }}
      </div>
    </div>    
    <div
      v-for="(mem, index) in members"
      :key="index"
      :class="$style.row">
      <div :class="$style.item">
        <img :src="mem.img" :class="$style.photo"/>
      </div>
      <div
        v-for="(d, index) in dates"
        :key="index"
        :class="[
          $style.item,
          $style.selectable,
          d.isSameOrBefore(moment(), 'day') && $style.today,
          [0, 6].includes(d.day()) && $style.weekend,
          validateDay(mem, d) && $style.freeDay]"
        @click="check(mem, d)">
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import { mapGetters } from 'vuex';
import beach from '@/assets/beach.png';

export default {
  name: 'Holidays',
  data() {
    return {
      loading: true,
      holidays: [],
      beach,
    };
  },
  computed: {
    ...mapGetters(['members']),
    dates() {
      const prevDays = 10;
      const totalDays = 50;
      return Array.from(Array(totalDays)).map((_, i) => moment().add(i - prevDays, 'd'));
    },
    months() {
      return this.dates.reduce((prev, curr) => {
        const m = curr.format('MMMM');
        if (prev[m]) {
          prev[m] = prev[m] + 1;
        } else {
          prev[m] = 1;
        }
        return prev;
      }, {});
    },
  },
  methods: {
    moment,
    check(member, date) {
      const payload = [
        ...this.holidays,
      ];
      if (!payload.find(x => x.id === member.id).days.includes(date.format('DD/MM'))) {
        payload.find(x => x.id === member.id).days.push(date.format('DD/MM'));
      } else {
        const index = payload.find(x => x.id === member.id).days.indexOf(date.format('DD/MM'));
        payload.find(x => x.id === member.id).days.splice(index, 1);
      }
      axios
        .post('https://users.dcc.uchile.cl/~sblasco/facalendar2/holidays.php', payload)
        .then(result => {
          this.loading = false;
          this.holidays = result.data;
        });
    },
    validateDay(member, date) {
      if (this.holidays.some(x => x.id === member.id)) {
        const { days } = this.holidays.find(x => x.id === member.id);
        return days.some(x => moment(x, 'DD/MM').isSame(date, 'day'))
      }
      return false;
    },
  },
  mounted() {
    axios
      .get('https://users.dcc.uchile.cl/~sblasco/facalendar2/holidays.php')
      .then(result => {
        this.loading = false;
        this.holidays = result.data;
      });
  },
};
</script>

<style module lang="scss">

.content {
  display: flex;
  flex-direction: column;
  padding: 2em;
}
.row {
  display: flex;
  flex-direction: row;
  flex: 1;
}
.selector {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.photo {
  width: 2em;
  // height: 2em;
}
.item {
  display: flex;
  // flex: 1;
  width: 2em;
  border: 1px solid var(--dark-primary-color-30);
  justify-content: center;
  align-items: center;
  font-size: 0.75em;
  background-color: var(--primary-color);
}
.today {
  background-color: var(--dark-primary-color-20);
}
.freeDay {
  background-color: var(--light-primary-color-30);
  background-repeat: no-repeat;
  background-size: cover;
}
.selectable {
  cursor: pointer;
  &:hover {
    background-color: var(--light-primary-color-20);;
  }
}
.weekend {
  filter: grayscale(1);
}
</style>