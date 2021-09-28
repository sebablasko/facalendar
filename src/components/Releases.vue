<template>
  <div :class="$style.content">
    <card>
      <template v-slot:title>RC's en curso <ferry-icon/></template>
      <template v-slot:body>
        <div :class="$style.body">
          <div
            v-if="rcs.length === 0"
            :class="$style.noItem">
            <img :class="$style.beachPhoto" :src="beach"/>
            <span>¡Ningún RC's! Qué vergüenza...</span>
            <a href="#" @click="show = true">Ver feature branches</a>
          </div>
          <div
            v-for="r in rcs"
            :key="r.name"
            :class="$style.item">
            <b>{{ r.name }}</b>
            <div :class="$style.details">
              <span :class="$style.started">Iniciado {{ r.started }}</span>
              <div :class="$style.links">
                <a href="#">TP-52356</a>
                <a href="#">Link QA</a>
              </div>
            </div>
          </div>
        </div>
      </template>
    </card>
    <transition name="fade">
      <div v-if="show" :class="$style.modal">
        <div :class="[
          $style.modalContent,
          $style.modalScroll,
          ]">
          <card>
            <template v-slot:title>
              Feature Branches
            </template>
            <template v-slot:body>
              <div :class="$style.exit" @click="show = false"> X </div>
              <branches/>
            </template>
          </card>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import FerryIcon from 'vue-material-design-icons/Ferry.vue';

import Card from '@/components/Card';
import Branches from '@/components/Branches'
import beach from '@/assets/beach.png';

export default {
  name: 'Widgets',
  components: {
    Card,
    Branches,
    FerryIcon,
  },
  data() {
    return {
      show: false,
      beach,
      rcs: [
        // { name: 'investment-advice-widget', started: 'hoy' },
      ],
    };
  },
  methods: {
  },
  computed: {
  },
};
</script>

<style module lang="scss">

.content {
  display: flex;
  flex-direction: column;
}
.body {
  display: flex;
  flex-direction: column;
  padding: 0 1em;
}
.noItem {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.beachPhoto {
  width: 5em;
  padding: 1em 0;
  justify-content: center;
  align-items: center;
}
.item {
  display: flex;
  flex-direction: column;
  border-left: 0.3em var(--dark-primary-color-30) solid;
  margin-bottom: 0.3em;
  padding-left: 0.3em;
}
.details {
  display: flex;
  flex-direction: row;
}
.started {
  display: flex;
  flex-direction: row;
  flex: 1;
}
.links {
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-around;
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