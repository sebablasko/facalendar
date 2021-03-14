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
            {{ moment(mem.birthday, 'DD/MM').add(1, 'd').from(selected) }}
            <div :class="$style.infoSmall">{{ moment(mem.birthday, 'DD/MM').format('dddd D MMMM') }} </div>
          </div>
        </div>
      </div>
    </template>
  </card>
</template>

<script>
import moment from 'moment';
import Card from '@/components/Card';
import members from '@/utils/members.js';

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
      members: members.sort((a,b) => moment(a.birthday, 'DD/MM').format('YYYYMMDD') - moment(b.birthday, 'DD/MM').format('YYYYMMDD')),
    };
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
  margin-bottom: 0.3em;
  flex: 1;
}
.item {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0.01em;
  margin: 0;
  align-items: center;
  position: relative;
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
    height: 4.5em;
    width: 4.5em;
    left: 0.3em;
    top: -2.9em;
    z-index: 1;
    animation: blink 1s infinite;
  }
}
.photo {
  border-radius: 10%;
  width: 4.5em;
  box-shadow: 0 0.1px 0.1em gray;
}
.info {
  min-width: 85%;
  display: flex;
  color: black;
  background: rgba(255, 238, 0, 0.9);
  text-align: center;
  position: absolute;
  font-size: 0.75em;
  font-style: italic;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 3px;
  top: 4.75em;
  box-shadow: 0 0.1px 0.1em gray;
}
.infoSmall {
  display: flex;
  font-size: 0.5em;
  font-style: italic;
  flex-direction: column;
  margin: 0 0.2em;
  justify-content: center;
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