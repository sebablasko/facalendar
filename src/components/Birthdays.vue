<template>
  <card>
    <template v-slot:title>
      Cumpleaños <cake-variant-outline-icon/>
    </template>
    <template v-slot:body>
      <div :class="$style.content">
        <div
          v-for="(mem, index) in members"
          :key="index"
          :class="[
            $style.item,
            moment(mem.birthday, 'DD/MM').isBefore(selectedDate, 'day') && $style.past,
            ]">
          <div :class="[
            $style.photoDiv,
            moment(mem.birthday, 'DD/MM').isSame(selectedDate, 'day') && $style.birthday,
            ]">
            <img :class="$style.photo" :src="mem.img" :alt="mem.id" :title="mem.name"/>
          </div>
          <div :class="$style.info">
            <div :class="$style.infoBig">
              {{
                moment(mem.birthday, 'DD/MM').isSame(selectedDate, 'day')
                ? '¡Es Hoy! :D'
                : moment(mem.birthday, 'DD/MM').add(1, 'd').from(selectedDate)
              }}
            </div>
            <div :class="$style.infoSmall">
              {{ moment(mem.birthday, 'DD/MM').format('dddd') }}
              <br/>
              {{ moment(mem.birthday, 'DD/MM').format('D MMM') }}
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

import CakeVariantOutlineIcon from 'vue-material-design-icons/CakeVariantOutline.vue';

import Card from '@/components/Card';

export default {
  name: 'Birthdays',
  components: {
    Card,
    CakeVariantOutlineIcon,
  },
  computed: {
    ...mapState(['selectedDate']),
    ...mapGetters(['members']),
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
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 0.3em 0.75em;
}
.item {
  display: flex;
  flex-direction: column;
  margin: 0.75em 0.25em 0;
  align-items: center;
  position: relative;
  flex-basis: 12%;
}
.photoDiv {
  margin: 0;
  padding: 0;
  width: 3.5em;
  height: 2.95em;
}
.past {
  opacity: 0.5;
  filter: grayscale(1);
  & .infoBig {
    display: none;
  }
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
    width: 3.5em;
    left: 0.3em;
    top: -1.9em;
    z-index: 1;
    animation: dance 1s infinite;
  }
}
.photo {
  border-radius: 50%;
  width: 3.5em;
  box-shadow: 0 0.1px 0.1em gray;
  border: 0.2em solid var(--light-primary-color-20);
  box-sizing: border-box;
}
.info {
  display: flex;
  flex-direction: column;
  color: black;
  background: var(--light-primary-color-30);
  transition: background-color 0.5s linear;
  text-align: center;
  font-style: italic;
  justify-content: center;
  box-shadow: 0 0.2px 0.001em gray;
}
.infoBig {
  font-size: 0.6em;
  line-height: 1em;
  padding: 0 0.25em;
}
.infoSmall {
  display: flex;
  font-size: 0.5em;
  font-style: italic;
  flex-direction: column;
  justify-content: center;
  line-height: 1em;
  background-color: var(--dark-primary-color-30);
  transition: background-color 0.5s linear;
  padding: 2px 7px;
}
@keyframes dance{
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