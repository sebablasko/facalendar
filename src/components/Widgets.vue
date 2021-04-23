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
    <div v-if="selected !== undefined" :class="$style.modal">
      <card>
        <template v-slot:title>
          {{ currentTitle }}
        </template>
        <template v-slot:body>
          <div
            :class="$style.exit"
            @click="select(undefined)"
            >
            X
          </div>
          <component :is="currentComponent"></component>
        </template>
      </card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card';
import Picker from '@/components/Picker'
import Covid from '@/components/Covid'
import Branches from '@/components/Branches'

const widgetsAvailable = [
  { name: 'Chuasi', component: Picker, new: false },
  // { name: 'Covid', component: Covid },
  { name: 'Branches', component: Branches, new: true },
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
    currentTitle() {
      if (this.selected !== undefined) {
        return widgetsAvailable[this.selected].name;
      }
    },
    currentComponent() {
      if (this.selected !== undefined) {
        return widgetsAvailable[this.selected].component;
      }
    },
  },
};
</script>

<style module lang="scss">
@import '@/style.scss';

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
  background: $primary-color;
  box-shadow: 0 0.3px 0.0001em gray;
  padding-right: 4em;
}
.link {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 1em;
  font-size: 1.1em;
  position: relative;
  &:hover {
    background-color: darken($primary-color, 10%);
  }
}
.new {
  &::after {
    content: 'new';
    position: absolute;
    font-size: 0.8em;
    bottom: 1.2em;
    right: 0.75em;
    background-color: darken($primary-color, 30%);
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
.exit {
  cursor: pointer;
  position: absolute;
  right: 1em;
  font-size: 3em;
  font-weight: bold;
}
</style>