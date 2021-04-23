<template>
  <div :class="$style.content">
    <div :class="$style.selector">
      <div
        v-for="(mem, index) in members"
        :key="index"
        :class="$style.photoDiv">
        <img :class="[
          $style.photo,
          selectedMembers.includes(mem.name) && $style.selected,
          selectedMembers.includes(mem.name) && processing && $style.procesing,
          winner === mem.name && $style.winner,
          ]"
          :src="mem.img"
          @click="toggle(mem.name)"/>
      </div>
    </div>
    <div :class="$style.controls">
      <button
        :disabled="processing || selectedMembers.length === 0"
        @click="shuffle()">
        Go!
      </button>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import settings from '@/utils/settings.js';

export default {
  name: 'Picker',
  props: {
    selected: {
      type: Object,
      default: () => moment(),
    },
  },
  data() {
    return {
      members: settings.members,
      selectedMembers: [],
      winner: undefined,
      processing: false,
    };
  },
  methods: {
    moment,
    toggle(name) {
      this.winner = undefined;
      if (this.selectedMembers.includes(name)) {
        this.selectedMembers = this.selectedMembers.filter(x => x !== name);
      } else {
        this.selectedMembers = [...this.selectedMembers, name];
      }
    },
    shuffle() {
      this.loading = true;
      this.winner = undefined;
      if (this.selectedMembers.length > 0) {
        this.processing = true;
        setTimeout(
          () => {
            const randomIndex = Math.floor(Math.random() * this.selectedMembers.length);
            this.winner = this.selectedMembers[randomIndex];
            this.processing = false;
          },
          7000,
        );
      }
    },
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
  flex-direction: column;
  padding: 2em;
}
.photoDiv {
  display: flex;
  flex-direction: row;
  padding: 0.5em;
  transform-style: preserve-3d;
  perspective: 2000px;
}
.selector {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.photo {
  border-radius: 7%;
  width: 7.5em;
  height: 7.5em;
  border: 0.5em $primary-color solid;
  opacity: 0.15;
  margin: 0.1em;
  cursor: pointer;
  transition: transform 3s infinte;
}
.selected {
  opacity: 1;
  border: 0.5em lighten($primary-color, 10%) solid;
}
.procesing {
  // animation: spin 14s;
  animation: square 7s linear infinite alternate;
}
@keyframes spin {
  0% {
    filter: sepia(0) saturate(2);
  }
  50% {
    transform: rotate(7200deg);
  }
  100% {
    filter: sepia(1) saturate(3);
    transform: scale(1.1) rotate(7200deg);
  }
}
.winner {
  width: 7em;
  height: 7em;
  border: 0.5em darken($primary-color, 30%) solid;
  animation: blink 1s infinite;
}
@keyframes blink{
  0%{
    transform: scale(1.1);
    box-shadow: 0 0 10px lighten($primary-color, 30%), 0 0 80px 8px $primary-color;
  }
  50%{
    transform: scale(0.9);
    box-shadow: 0 0 10px lighten($primary-color, 30%), 0 0 60px 2px $primary-color;
  }
  100%{
    transform: scale(1.1);
    box-shadow: 0 0 10px lighten($primary-color, 30%), 0 0 70px 2px $primary-color;
  }
}
.controls {
  display: flex;
  justify-content: center;
}

@keyframes square {
  0%{
    opacity: 1;
  }
  @for $i from 1 through 9 {
    #{($i * 10%)} {
      transform: translate3d( (random($i) * 1em) , (random($i) * 1em), (random($i) * 1em) ) scale($i) rotate(($i * 360deg));
    }
  }
  98%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}

// @for $i from 1 through 9 {
//   .procesing:nth-child(#{$i}){
//     animation-delay: ($i * -.15s);
//     transform: translateZ($i * 20px);
//   }
// }
</style>