<template>
  <div :class="$style.content">
    <card>
      <template v-slot:title>Widgets <widgets-icon/></template>
      <template v-slot:body>
        <div :class="$style.links">
          <span
            v-for="(w, index) in widgetsAvailable"
            :key="index"
            :class="[
              $style.link,
              w.new && $style.new,
              w.disabled && $style.disabled,
            ]"
            @click="!w.disabled && select(index)">{{ w.name }}</span>
        </div>
      </template>
    </card>
    <transition name="fade">
      <div v-if="selected !== undefined" :class="$style.modal">
        <div :class="[
          $style.modalContent,
          currentComponent.scrolleable && $style.modalScroll,
          ]">
          <card>
            <template v-slot:title>
              {{ currentComponent.name }}
            </template>
            <template v-slot:body>
              <div :class="$style.exit" @click="select(undefined)"> X </div>
              <component :is="currentComponent.component" @refresh="() => { select(undefined); $emit('refresh'); }"></component>
            </template>
          </card>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import WidgetsIcon from 'vue-material-design-icons/WidgetsOutline.vue';

import Card from '@/components/Card';
import Picker from '@/components/Picker'
import Screams from '@/components/Screams'
// import Settings from '@/components/Settings'
import Memoriam from '@/components/Memoriam'

const widgetsAvailable = [
  { name: 'Chuasi', component: Picker, new: false, scrolleable: false, disabled: false },
  { name: 'Gritos', component: Screams, new: true, scrolleable: true, disabled: false },
  // { name: 'Settings', component: Settings, new: false, scrolleable: true, disabled: false },
  { name: 'In Memoriam', component: Memoriam, new: false, scrolleable: false, disabled: false },
];

export default {
  name: 'Widgets',
  components: {
    Card,
    Picker,
    WidgetsIcon,
  },
  data() {
    return {
      widgetsAvailable,
      selected: undefined,
    };
  },
  methods: {
    select(index) {
      this.selected = index;
    },
  },
  computed: {
    currentComponent() {
      if (this.selected !== undefined) {
        return widgetsAvailable[this.selected];
      }
    },
  },
};
</script>

<style module lang="scss">

.content {
  display: flex;
  flex-direction: column;
}
.links {
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  transition: all 0.5s linear;
  background-color: var(--primary-color);
  box-shadow: 0 0.3px 0.0001em gray;
}
.link {
  cursor: pointer;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 7px;
  padding: 0.3em;
  font-size: 1.1em;
  position: relative;
  border: 2px solid var(--dark-primary-color-30);
  &:hover {
    background-color: var(--dark-primary-color-30);
  }
}
.new {
  &::after {
    content: 'new';
    position: absolute;
    font-size: 0.8em;
    top: -0.3em;
    right: 0.1em;
    padding: 0 3px;
    background-color: var(--dark-primary-color-30);
    line-height: 1em;
  }
}
.disabled {
  cursor: not-allowed;
  &::after {
    content: 'ta roto :(';
    position: absolute;
    font-size: 0.8em;
    top: 0.1em;
    right: 0.1em;
    padding: 0 3px;
    background-color: var(--light-primary-color-20);
    line-height: 1em;
  }
  &:hover {
    background-color: var(--primary-color);
  }
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: #4e4d42d8;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modalScroll {
  overflow-y: overlay;
  max-height: 100%;
}
.modalContent {
  display: flex;
  margin: 0 1em;
  flex: 1;
  justify-content: center;
}
.exit {
  cursor: pointer;
  position: absolute;
  right: 0.3em;
  top: -0.2em;
  font-size: 3em;
  font-weight: bold;
}
</style>
<style>
.fade-enter-active, .fade-leave-active {
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>