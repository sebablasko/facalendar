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
          <img :class="[$style.photo, $style.winnerAnimation]" :src="winner.img"/>
          <div :class="$style.winnerTitle">¡Felicitaciones!</div>
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
@import '@/style.scss';

.content {
  display: flex;
  flex-direction: row;
  flex: 1;
  min-height: 18em;
}
.winnerTitle {
  font-family: 'Dancing Script', cursive;
  font-weight: bold;
  font-size: 1.6em;
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin: 1em 0;
}
.winnerOfToday {
  margin-top: 1em;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
}
.photo {
  border-radius: 10%;
  width: 8em;
  margin: 0 auto;
}
.beachPhoto {
  border-radius: 10%;
  width: 10em;
  margin: 1.5em auto;
}
.winnerAnimation {
  animation:
    // clipa 5s linear,
    shine 0.75s infinite,
    twist 1s infinite;
}
@keyframes shine{
  0%{
    box-shadow: 0 0 30px 8px lighten($primary-color, 2%)
  }
  50%{
    box-shadow: 0 0 10px 2px lighten($primary-color, 30%)
  }
  100%{
    box-shadow: 0 0 30px 8px lighten($primary-color, 2%)
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
  0%{
    // transform: rotate(2deg);
    transform: translate(0,0);
  }
  25%{
    // transform: rotate(-2deg);
    transform: scale(0.95);
  }
  50%{
    // transform: rotate(2deg);
    transform: translate(1px,0);
  }
  75%{
    // transform: rotate(-2deg);
    transform: scale(0.95);
  }
  100%{
    // transform: rotate(2deg);
    transform: translate(0,0);
  }
}
@keyframes clipa{
  0%{clip-path: polygon(0% 0%, 0% 100%, 10% 100%, 5% 0%);}
  // 100%{clip-path: polygon(150% -50%, 200% 50%, -100% 150%, 50% -150%);}
  100%{clip-path: polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%);}
}
@keyframes clipc {
  0% {
    clip-path: path('
      M60.85 2.56C108.17 -44.93 154.57 -45.66 200.06 0.35L58.64 -141.07C11.93 -93.85 12.67 -45.97 60.85 2.56Z
      M139.87 340.05C187.44 293.16 188.33 246.91 142.54 201.29C95.79 247.78 48.02 247.15 -0.77 199.41L139.87 340.05Z
      M201.68 61.75C247.35 107.07 246.46 153.32 199.01 200.5L340.89 59.54C295.65 13.07 249.25 13.81 201.68 61.75Z
      M-140.61 141.25C-92.08 189.78 -44.21 190.51 3.02 143.46C-45.69 94.92 -46.43 47.05 0.81 -0.17L-140.61 141.25Z
    ');
  }
  100% {
    clip-path: path('
      M103.13 100C103 32.96 135.29 -0.37 200 0L0 0C0.35 66.42 34.73 99.75 103.13 100Z
      M199.35 200C199.83 133.21 167.75 99.88 103.13 100C102.94 165.93 68.72 199.26 0.46 200L199.35 200Z
      M103.13 100C167.46 99.75 199.54 133.09 199.35 200L200 0C135.15 -0.86 102.86 32.47 103.13 100Z
      M0 200C68.63 200 103 166.67 103.13 100C34.36 100.12 -0.02 66.79 0 0L0 200Z
    ');
  }
}
</style>