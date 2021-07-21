<template>
  <card star>
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
          <img :class="[$style.photo, $style.winnerAnimation]" :src="winner.img"/>
          <div :class="[$style.winnerTitle, $style.shimmer]">¡Felicitaciones!</div>
        </div>
        <div
          v-else
          :class="$style.winnerOfToday">
          <img :class="$style.beachPhoto" :src="beach"/>
          <div :class="$style.winnerTitle">Not today</div>
        </div>
      </div>
    </template>
  </card>
</template>

<script>
import moment from 'moment';
import Card from '@/components/Card';
import beach from '@/assets/beach.png';

const WORKING_DAYS = [0, 1, 2, 3, 4]
const START_DATE = moment('2021-01-01', 'YYYY-MM-DD');

export default {
  name: 'Ceremony',
  components: {
    Card,
  },
  data() {
    return {
      beach,
    };
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
    periodicity: {
      type: String,
      default: 'DAYS_AT_WEEK',
    },
    periodicityPayload: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    isWorkingDay() {
      if (this.periodicity === 'DAYS_AT_WEEK') {
        return this.periodicityPayload.some(x => x === this.selectedDate.weekday());
      }
      return false;
    },
    totalBusinessDays() {
      let total = 0;
      const d1 = moment(START_DATE);
      while (d1.isBefore(this.selectedDate, 'date')) {
        // TODO: discount feriados
        if (this.periodicity === 'DAYS_AT_WEEK' && this.periodicityPayload.includes(d1.weekday())) {
          total += 1;
        }
        d1.add(1, 'd');
      }
      return total;
    },
    winner() {
      if (this.participants.length === 0) {
        return { name: undefined, img: undefined };
      }
      return this.participants[this.totalBusinessDays%this.participants.length];
    },
    next() {
      if (this.participants.length === 0) {
        return { name: undefined, img: undefined };
      }
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
  // flex: 1;
}
.winnerTitle {
  font-family: 'Dancing Script', cursive;
  font-weight: bold;
  font-size: 1.6em;
  display: flex;
  // justify-content: center;
  // flex-direction: row;
  // margin: 1em 0;
}
.shimmer {
  text-align: center;
  color: rgba(255,255,255,0.1);
  background: -webkit-gradient(linear, left top, right top, from(#222), to(#222), color-stop(0.5, #fff));
  background: -moz-gradient(linear, left top, right top, from(#222), to(#222), color-stop(0.5, #fff));
  background: gradient(linear, left top, right top, from(#222), to(#222), color-stop(0.5, #fff));
  -webkit-background-size: 1400px 100%;
  -moz-background-size: 1400px 100%;
  background-size: 1300% 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  -webkit-animation-name: shimmer;
  -moz-animation-name: shimmer;
  animation-name: shimmer;
  -webkit-animation-duration: 2s;
  -moz-animation-duration: 2s;
  animation-duration: 2s;
  -webkit-animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  background-repeat: no-repeat;
  background-position: 0 0;
  background-color: #222;
}
@-moz-keyframes shimmer {
  0% {
    background-position: top left;
  }
  100% {
    background-position: top right;
  }
}
@-webkit-keyframes shimmer {
  0% {
    background-position: top left;
  }
  100% {
    background-position: top right;
  }
}
@-o-keyframes shimmer {
  0% {
    background-position: top left;
  }
  100% {
    background-position: top right;
  }
}
@keyframes shimmer {
  0% {
    background-position: top left;
  }
  100% {
    background-position: top right;
  }
}
.winnerOfToday {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  min-height: 12em;
}
.photo {
  border-radius: 7px;
  width: 7em;
  box-shadow: 0 0 1em 8px var(--dark-primary-color-30);
}
.beachPhoto {
  border-radius: 10%;
  width: 7em;
  margin: 1em auto;
}
.winnerAnimation {
  background: #f6f7f8;
  background-image: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-repeat: no-repeat;
  background-size: 800px 104px; 
  animation:
    // clipa 5s linear;
    shine 0.75s infinite,
    twist 1s infinite;
}
@keyframes shine{
  0%{
    box-shadow: 0 0 30px 8px var(--light-primary-color-10);
  }
  50%{
    box-shadow: 0 0 10px 2px var(--light-primary-color-30);
  }
  100%{
    box-shadow: 0 0 30px 8px var(--light-primary-color-10);
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
  justify-content: flex-end;
}
.groupsItem {
  display: flex;
}
.groupsItemPhoto {
  width: 2em;
  opacity: 0.3;
}
.next {
  animation: blinkNext 1s infinite;
  &::before {
    font-size: 0.45em;
    position: absolute;
    font-weight: bold;
    top: 3.2em;
    left: 1em;
    content:"next";
  }
}
@keyframes blinkNext{
  0% {
    transform: translate(0,0);
  }
  25% {
    transform: scale(0.95);
  }
  50% {
    transform: translate(1px,0);
  }
  75% {
    transform: scale(0.95);
  }
  100% {
    transform: translate(0,0);
  }
}
@keyframes clipa {
  0%{clip-path: polygon(0% 0%, 0% 100%, 10% 100%, 5% 0%);}
  // 100%{clip-path: polygon(150% -50%, 200% 50%, -100% 150%, 50% -150%);}
  100%{clip-path: polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%);}
}
</style>