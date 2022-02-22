<template>
  <card star>
    <template v-slot:title>
      Hitos Semanales <pin-icon/>
    </template>
    <template v-slot:body>
      <div :class="$style.content">
        <div
          :class="$style.ceremony"
          v-for="c in ceremonies"
          :key="`${c.name}-${c.participants.join('-')}`">
          <div :class="$style.ceremonyTitle">{{ c.name }}</div>
          <div
            v-if="isWorkingDay(c)"
            :class="$style.winnerOfToday">
            <img :class="[$style.photo, $style.winnerAnimation]" :src="winner(c).img"/>
            <div :class="[$style.winnerTitle, $style.shimmer]">¡Felicitaciones!</div>
          </div>
          <div
            v-else
            :class="$style.winnerOfToday">
            <img :class="$style.beachPhoto" :src="beach"/>
            <div :class="$style.winnerTitle">Not today</div>
          </div>
          <div :class="$style.group">
            <div
              v-for="(mem, index) in c.participants"
              :key="index"
              :class="[
                $style.groupItem,
                winner(c, 1).name === mem.name && $style.next]">
              <img :class="$style.groupItemPhoto" :src="mem.img"/>
            </div>
          </div>
        </div>
      </div>
    </template>
  </card>
</template>

<script>
import moment from 'moment';
import { mapGetters, mapState } from 'vuex';
import PinIcon from 'vue-material-design-icons/Pin.vue';

import Card from '@/components/Card';
import beach from '@/assets/beach.png';

const START_DATE = moment('2021-01-01', 'YYYY-MM-DD');

export default {
  name: 'Ceremonies',
  components: {
    Card,
    PinIcon,
  },
  data() {
    return {
      beach,
    };
  },
  computed: {
    ...mapState(['selectedDate']),
    ...mapGetters(['ceremonies']),
  },
  methods: {
    totalBusinessDays(c) {
      let total = 0;
      const d1 = moment(START_DATE);
      while (d1.isBefore(this.selectedDate, 'date')) {
        // TODO: discount feriados
        if (c.periodicity === 'DAYS_AT_WEEK' && c.periodicity_payload.includes(d1.weekday())) {
          total += 1;
        }
        d1.add(1, 'd');
      }
      return total;
    },
    isWorkingDay(c) {
      if (c.periodicity === 'DAYS_AT_WEEK') {
        return c.periodicity_payload.some(x => x === this.selectedDate.weekday());
      }
      return false;
    },
    winner(c, offset = 0) {
      if (c.participants.length === 0) {
        return { name: undefined, img: undefined };
      }
      return c.participants[(this.totalBusinessDays(c) + offset)%c.participants.length];
    },
  },
};
</script>

<style module lang="scss">
.content {
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
}
.ceremony {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin-top: 0.5em;
  border-right: 1px solid var(--dark-primary-color-20);
  border-left: 1px solid var(--dark-primary-color-20);
  &:first-of-type {
    border-left: none;
  }
  &:last-of-type {
    border-right: none;
  }
}
.ceremonyTitle {
  font-weight: bold;
}
.winnerTitle {
  font-family: 'Dancing Script', cursive;
  font-weight: bold;
  font-size: 1.6em;
  display: flex;
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
  border-radius: 50%;
  width: 6em;
  box-shadow: 0 0 1em 8px var(--dark-primary-color-30);
  border: 0.2em solid var(--light-primary-color-20);
}
.beachPhoto {
  width: 7em;
  margin: 1em auto;
}
.winnerAnimation {
  background: #f6f7f8;
  background-image: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-repeat: no-repeat;
  animation:
    shine 0.75s infinite;
    // twist 1s infinite;
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
    transform: rotate(2deg) scale(1.05);
  }
  50%{
    transform: rotate(-2deg) scale(0.95);
  }
  100%{
    transform: rotate(2deg) scale(1.05);
  }
}
.group {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.groupItem {
  display: flex;
}
.groupItemPhoto {
  border-radius: 50%;
  width: 1.75em;
  opacity: 0.3;
}
// TODO
.next {
  animation: blinkNext 1s infinite;
  &::before {
    font-size: 0.6em;
    color: --light-primary-color-10;
    position: absolute;
    font-weight: bold;
    top: 0.8em;
    left: 0.5em;
    content:"next";
    transform: rotate(-25deg);
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
</style>