<template>
  <card>
    <template v-slot:title>
      Cumpleaños 🎉
    </template>
    <template v-slot:body>
      <div :class="$style.content">
        <div
          v-for="(mem, index) in members"
          :key="index"
          :class="[
            $style.item,
            moment(mem.birthday, 'DD/MM').isBefore(selected, 'day') && $style.past,
            ]">
          <div :class="[
            $style.photoDiv,
            moment(mem.birthday, 'DD/MM').isSame(selected, 'day') && $style.birthday,
            ]">
            <img :class="$style.photo" :src="mem.img"/>
          </div>
          <div :class="$style.info">
            <div :class="$style.infoBig">{{ moment(mem.birthday, 'DD/MM').add(1, 'd').from(selected) }}</div>
            <div :class="$style.infoSmall">{{ moment(mem.birthday, 'DD/MM').format('dddd D MMMM') }}</div>
          </div>
        </div>
      </div>
    </template>
  </card>
</template>

<script>
import moment from 'moment';
import Card from '@/components/Card';
import settings from '@/utils/settings.js';

export default {
  name: 'Birthdays',
  components: {
    Card,
  },
  props: {
    selected: {
      type: Object,
      default: () => moment(),
    },
  },
  computed: {
  },
  methods: {
    moment,
  },
  data() {
    return {
      members: [...settings.members]
        .sort((a,b) => moment(a.birthday, 'DD/MM').format('YYYYMMDD') - moment(b.birthday, 'DD/MM').format('YYYYMMDD')),
    };
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
  margin: 0.75em 0.5em 1em;
  justify-content: center;
  flex-wrap: wrap;
  flex: 1;
}
.item {
  display: flex;
  flex-direction: column;
  margin: 0.7em 0;
  align-items: center;
  position: relative;
  flex-basis: 12%;
}
.photoDiv {
  margin: 0;
  padding: 0;
}
.past {
  opacity: 0.5;
  filter: grayscale(1);
}
.birthday {
  position: relative;
  &::after{
    background: url("../assets/hat.webp") no-repeat scroll 0 0 transparent;
    background-size: cover;
    content: " ";
    display: block;
    position: absolute;
    height: 3em;
    width: 3em;
    left: 0.3em;
    top: -1.9em;
    z-index: 1;
    animation: blink 1s infinite;
  }
}
.photo {
  border-radius: 10%;
  width: 3.5em;
  box-shadow: 0 0.1px 0.1em gray;
}
.info {
  min-width: 65%;
  display: flex;
  flex-direction: column;
  color: black;
  background: lighten($primary-color, 25%);
  text-align: center;
  position: absolute;
  font-style: italic;
  justify-content: center;
  top: 3em;
  box-shadow: 0 0.2px 0.001em gray;
}
.infoBig {
  font-size: 0.85em;
  line-height: 1.2em;
}
.infoSmall {
  display: flex;
  font-size: 0.5em;
  font-style: italic;
  flex-direction: column;
  justify-content: center;
  line-height: 1em;
  background-color: darken($primary-color, 10%);
}
@keyframes blink{
  0%{
    transform: scale(1.05) rotate(10deg);
  }
  50%{
    transform: scale(0.995) rotate(0deg);
  }
  100%{
    transform: scale(1.05) rotate(10deg);
  }
}
</style>