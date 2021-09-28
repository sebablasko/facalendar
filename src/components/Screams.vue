<template>
  <div :class="$style.content">
    <div :class="$style.selector">
      <div
        v-for="(mem, index) in screams"
        :key="index"
        :class="[
          $style.scream,
          selected.includes(mem) && $style.selected,
          selected.includes(mem) && processing && $style.procesing,
          winner === mem && $style.winner,
        ]"
        @click="toggle(mem)">
        {{ mem }}
      </div>
    </div>
    <div :class="$style.controls">
      <button
        :disabled="processing || selected.length === 0"
        @click="shuffle()">
        Go!
      </button>
      <button
        :disabled="showExtras"
        @click="showExtras = true">
        Editar
      </button>
      <div
        v-if="showExtras"
        :class="$style.extras">
        <div>
          <input v-model="newVal"> <button :disabled="!newVal" @click="add">Agregar</button>
        </div>
        <div
          v-for="(mem, index) in screams"
          :key="index">
          {{ mem }} <button @click="remove(index)">borrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import settings from '@/utils/settings.js';

export default {
  name: 'Picker',
  data() {
    return {
      showExtras: undefined,
      newVal: undefined,
      screams: [
        'ula ula, ula ula',
        'el farol',
      ],
      selected: [],
      winner: undefined,
      processing: false,
    };
  },
  methods: {
    moment,
    add() {
      this.screams.push(this.newVal);
      this.newVal = undefined;
    },
    remove(index) {
      this.screams.splice(index, 1);
    },
    toggle(name) {
      this.winner = undefined;
      if (this.selected.includes(name)) {
        this.selected = this.selected.filter(x => x !== name);
      } else {
        this.selected = [...this.selected, name];
      }
    },
    shuffle() {
      this.loading = true;
      this.winner = undefined;
      if (this.selected.length > 0) {
        this.processing = true;
        setTimeout(
          () => {
            const randomIndex = Math.floor(Math.random() * this.selected.length);
            this.winner = this.selected[randomIndex];
            this.processing = false;
          },
          7000,
        );
      }
    },
  },
};
</script>

<style module lang="scss">

.content {
  display: flex;
  flex-direction: column;
  padding: 2em;
  min-height: 20em;
  min-width: 70em;
}
.scream {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5em;
  margin: 0.5em;
  // border: 0.5em var(--primary-color) solid;
  cursor: pointer;
  transition: transform 3s infinte;
  font-family: 'Dancing Script', cursive;
  opacity: 0.15;
  font-size: 2em;
}
.selector {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.selected {
  opacity: 1;
  // border: 0.5em var(--light-primary-color-30) solid;
  text-decoration: underline;
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
  border: 0.5em var(--dark-primary-color-30) solid;
  background: var(--dark-primary-color-30);
  text-transform: uppercase;
  font-size: 2.4em;
  font-weight: bold;
  animation: blink 1s infinite;
}
@keyframes blink{
  0%{
    transform: scale(1.1);
    box-shadow: 0 0 10px var(--light-primary-color-20), 0 0 80px 8px var(--primary-color);
  }
  50%{
    transform: scale(0.9);
    box-shadow: 0 0 10px var(--light-primary-color-10), 0 0 60px 2px var(--primary-color);
  }
  100%{
    transform: scale(1.1);
    box-shadow: 0 0 10px var(--light-primary-color-30), 0 0 70px 2px var(--primary-color);
  }
}
.controls {
  display: flex;
  flex-direction: column;
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

.extras {
  margin-top: 1em;
}
</style>