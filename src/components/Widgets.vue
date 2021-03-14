<template>
  <div :class="$style.content">
    <div :class="$style.empty"/>
    <div :class="$style.links">
      <span
        v-for="(w, index) in widgetsAvailable"
        :key="index"
        :class="$style.link"
        @click="select(index)">{{ w.name }}</span>
    </div>
    <div v-if="selected !== undefined" :class="$style.modal">
      <card>
        <template v-slot:title>
          Chuasi
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

const widgetsAvailable = [
  { name: 'Chuasi', component: Picker },
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
        return widgetsAvailable[this.selected].component;
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
}
.empty {
  display: flex;
  flex: 1;
}
.links {
  display: flex;
  flex-direction: row;
  background: #fef79f;
  box-shadow: 0 0.005em 0.05em gray;
  padding-right: 4em;
  border-left: 0.3em #d6cf71 solid;
}
.link {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 1em;
  font-size: 1.1em;
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