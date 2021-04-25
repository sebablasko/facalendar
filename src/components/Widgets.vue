<template>
  <div :class="$style.content">
    <div :class="$style.empty"/>
    <div :class="$style.links">
      <span
        v-for="(w, index) in widgetsAvailable"
        :key="index"
        :class="[
          $style.link,
          w.new && $style.new,
        ]"
        @click="select(index)">{{ w.name }}</span>
    </div>
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
import Card from '@/components/Card';
import Picker from '@/components/Picker'
import Branches from '@/components/Branches'
import Settings from '@/components/Settings'

const widgetsAvailable = [
  { name: 'Chuasi', component: Picker, new: false, scrolleable: false },
  { name: 'Branches', component: Branches, new: false, scrolleable: true },
  { name: 'Settings', component: Settings, new: true, scrolleable: true },
];

export default {
  name: 'Widgets',
  components: {
    Card,
    Picker,
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
  flex-direction: row;
  flex: 1;
  font-family: 'Baloo Chettan 2', cursive;
  position: absolute;
  bottom: -1.5em;
  right: 0;
}
.empty {
  display: flex;
  flex: 1;
}
.links {
  display: flex;
  flex-direction: row;
  background-color: var(--primary-color);
  box-shadow: 0 0.3px 0.0001em gray;
  padding-right: 4em;
  transition: background-color 0.5s linear;
}
.link {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 1em;
  font-size: 1.1em;
  position: relative;
  &:hover {
    background-color: var(--dark-primary-color-10);
  }
}
.new {
  &::after {
    content: 'new';
    position: absolute;
    font-size: 0.8em;
    bottom: 1.2em;
    right: 0.75em;
    background-color: var(--dark-primary-color-20);
    line-height: 1em;
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
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>