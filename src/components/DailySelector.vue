<template>
  <card>
    <template v-slot:title>
      {{ title }}
    </template>
    <template v-slot:body>
      <div :class="$style.content">
        <div
          :class="$style.groups">
          <div
            v-for="(mem, index) in participants"
            :key="index"
            :class="[
              $style.groupsItem,
              next.name === mem.name && $style.next]">
            <img :class="$style.groupsItemPhoto" :src="mem.img"/>
          </div>
        </div>
        <div
          v-if="isWorkingDay"
          :class="$style.winnerOfToday">
          <img :class="$style.photo" :src="winner.img"/>
          <div :class="$style.winnerTitle">¡Felicitaciones!</div>
        </div>
        <div
          v-else
          :class="$style.winnerOfToday">
          <div :class="$style.winnerTitle">Not today</div>
        </div>
      </div>
    </template>
  </card>
</template>

<script>
import moment from 'moment';
import Card from '@/components/Card';

const START_DATE = moment('2021-01-01', 'YYYY-MM-DD');

export default {
  name: 'DailySelector',
  components: {
    Card,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    selectedDate: {
      type: Object,
      default: () => moment(),
    },
    participants: {
      type: Array,
      default: () => [],
    },
    weekly: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isWorkingDay() {
      if (this.weekly) {
        return this.selectedDate.weekday() === 1;
      }
      return !(this.selectedDate.weekday() === 5 || this.selectedDate.weekday() === 6);
    },
    totalBusinessDays() {
      let total = 0;
      const d1 = moment(START_DATE);
      while (d1.isBefore(this.selectedDate, 'date')) {
        total += 1;
        // TODO: discount feriados
        if (this.weekly) {
          if (d1.weekday() !== 1) {
            total -= 1;
          }
        } else {
          if (d1.weekday() === 5) {
            total -= 1;
          }
          if (d1.weekday() === 6) {
            total -= 1;
          }
        }
        d1.add(1, 'd');
      }
      return total;
    },
    winner() {
      return this.participants[this.totalBusinessDays%this.participants.length];
    },
    next() {
      return this.participants[(this.totalBusinessDays+1)%this.participants.length];
    },
  },
  methods: {
    moment,
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
.winnerTitle {
  font-family: 'Dancing Script', cursive;
  font-weight: bold;
  font-size: 1.6em;
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding: 1em 0;
}
.winnerOfToday {
  padding: 2em 0;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
}
.photo {
  border-radius: 10%;
  animation:
    // clipa 3s linear infinite,
    shine 0.75s infinite,
    twist 1s infinite;
  width: 10em;
  margin: 0 auto;
}
@keyframes shine{
  0%{
    box-shadow: 0 0 30px 8px rgba(255, 238, 0, 0.9);
  }
  50%{
    box-shadow: 0 0 10px 2px rgba(255, 238, 0, 0.9);
  }
  100%{
    box-shadow: 0 0 30px 8px rgba(255, 238, 0, 0.9);
  }
}
@keyframes twist{
  0%{
    transform: rotate(5deg) scale(1.11);
  }
  50%{
    transform: rotate(-5deg) scale(0.95);
  }
  100%{
    transform: rotate(5deg) scale(1.11);
  }
}
.groups {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.groupsItemPhoto {
  width: 2em;
  opacity: 0.3;
}
.next {
  animation: blinkNext 0.5s infinite;
  &::before {
    font-size: 0.45em;
    position: absolute;
    top: 3.8em;
    left: 0em;
    content:"Preparate...";
  }
}
@keyframes blinkNext{
  0%{
    transform: rotate(2deg);
  }
  25%{
    transform: rotate(-2deg);
  }
  50%{
    transform: rotate(2deg);
  }
  75%{
    transform: rotate(-2deg);
  }
  100%{
    transform: rotate(2deg);
  }
}
@keyframes clipa{
  0%{clip-path: polygon(0% 0%, 0% 100%, 10% 100%, 5% 0%);}
  // 100%{clip-path: polygon(150% -50%, 200% 50%, -100% 150%, 50% -150%);}
  100%{clip-path: polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%);}
}
</style>