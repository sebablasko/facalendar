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
          </div>
          <div
            v-for="r in rcs"
            :key="r.name"
            :class="$style.item">
            <div :class="$style.repoName">
              <b>{{ r.name }}</b> <i>pasa a v{{ getVersion(r) }}</i>
            </div>
            <div :class="$style.details">
              <span :class="$style.started">Iniciado {{ r.started.from(selectedDate) }}</span>
              <div :class="$style.links">
                <a target="_blank" :href="TPLink(r)">{{ r.branch.split('/')[1] }}</a>
                <a target="_blank" v-if="r.isFront" :href="demoLink(r)">Link QA</a>
              </div>
            </div>
          </div>
          <div :class="$style.branches">
             <a href="#" @click="show = true">Ver todas las feature branches</a>
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
import moment from 'moment';
import FerryIcon from 'vue-material-design-icons/Ferry.vue';
import { mapState } from 'vuex';

import Card from '@/components/Card';
import Branches from '@/components/Branches'
import beach from '@/assets/beach.png';

export default {
  name: 'Releases',
  components: {
    Card,
    Branches,
    FerryIcon,
  },
  data() {
    return {
      show: false,
      beach,
    };
  },
  methods: {
    getVersion(rc) {
      return rc.branch.split('/')[2];
    },
    TPLink(rc) {
      const tpId = rc.branch.split('/')[1].split('-')[1];
      return `https://principaldx.tpondemand.com/entity/${tpId}`;
      
    },
    demoLink(rc) {
      const { name } = rc;
      const version = this.getVersion(rc);
      return `http://static.qa.cloud.principal.cl/${name}/${version}/index.html`;
    },
  },
  computed: {
    ...mapState(['prs', 'selectedDate']),
    rcs() {
      return Object
        .keys(this.prs)
        .filter(x => this.prs[x].some(y => y.branch.name.includes('rc/') && !y.branch.name.includes('urc')))
        .filter(x => this.prs[x] && this.prs[x].length > 0)
        .map(x => ({
          name: x,
          // isFront: this.prs[x].isFront, TODO: FIX
          started: moment(this.prs[x].find(y => y.branch.name.includes('rc') && !y.branch.name.includes('urc')).created_on),
          branch: this.prs[x].find(y => y.branch.name.includes('rc') && !y.branch.name.includes('urc')).branch.name,
        }));
    },
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
.repoName {
  & *:last-child {
    font-size: 0.8em;
  }
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
.branches {
  display: flex;
  flex-direction: row;
  justify-content: center;
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