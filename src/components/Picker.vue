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
import members from '@/utils/members.js';

export default {
  name: 'Picker',
  props: {
    selected: {
      type: Object,
      default: () => moment(),
    },
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
  data() {
    return {
      members,
      selectedMembers: [],
      winner: undefined,
      processing: false,
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
  flex-direction: column;
  padding: 2em;
}
.photoDiv {
  display: flex;
  flex-direction: row;
  padding: 0.5em;
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
  border: 0.5em white solid;
  opacity: 0.2;
  margin: 0.1em;
  cursor: pointer;
  transition: transform 3s infinte;
}
.selected {
  opacity: 1;
}
.procesing {
  animation: spin 14s;
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
  border: 0.5em #fef79f solid;
  animation: blink 1s infinite;
}
@keyframes blink{
  0%{
    transform: scale(1.1);
    box-shadow: 0 0 10px lighten(lightblue, 30%), 0 0 80px 8px lightblue;
  }
  50%{
    transform: scale(0.9);
    box-shadow: 0 0 10px lighten(lightblue, 30%), 0 0 60px 2px lightblue;
  }
  100%{
    transform: scale(1.1);
    box-shadow: 0 0 10px lighten(lightblue, 30%), 0 0 70px 2px lightblue;
  }
}
.controls {
  display: flex;
  justify-content: center;
}
</style>