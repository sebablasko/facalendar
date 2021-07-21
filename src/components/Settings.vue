<template>
  <div :class="$style.content">
    <span :class="$style.headerText">Ceremonias por Equipo</span>
    <div
      v-for="t in teams"
      :key="t.id"
      :class="$style.team">
      <span :class="$style.teamTitle">{{ t.name }}</span>
      <CeremonySettings/>
      <div
        v-for="(c, ci) in t.ceremonies"
        :key="ci"
        :class="$style.ceremoniesRow">
          <div :class="$style.formInput">
            <input v-model="c.name"/>
          </div>
          <div :class="$style.formInput" style="flex: auto 1; flex-wrap: wrap;">
            <span v-for="(day, i) in days" :key="day">
              <input type="checkbox" :id="`${c.name}-${day}-${i}`" :value="i" v-model="c.periodicity_payload">
              <label :for="`${c.name}-${day}-${i}`">{{day}}</label>
            </span>
          </div>
          <div :class="$style.formInput" style="flex: 1 0 40%; justify-content: center; flex-wrap: wrap;">
            <img
              v-for="m in members"
              :key="m.id"
              :src="m.img"
              :class="[
                $style.memberImg,
                !c.participants.includes(m.id) && $style.memberImgInactive,
              ]"
              @click="toggeMember(t.id, c.name, m.id)">
          </div>
          <div :class="$style.formInput">
            <button @click="deleteCeremony(t.ceremonies, ci)">borrar</button>
          </div>
      </div>
      <button
        :class="$style.addButton"
        @click="t.ceremonies.push({ name: '', participants: [], periodicity: 'DAYS_AT_WEEK', periodicity_payload: [] })">Agregar nueva ceremonia</button>
    </div>
    <span :class="$style.headerText">Ceremonias Comunes</span>
    <div :class="$style.team">
      <div
        v-for="(c, ci) in commonCeremonies"
        :key="c.name"
        :class="$style.ceremoniesRow">
          <div :class="$style.formInput">
            <input v-model="c.name"/>
          </div>
          <div :class="$style.formInput" style="flex: auto 1; flex-wrap: wrap;">
            <span v-for="(day, i) in days" :key="day">
              <input type="checkbox" :id="day" :value="i" v-model="c.periodicity_payload">
              <label :for="day">{{day}}</label>
            </span>
          </div>
          <div :class="$style.formInput" style="flex: 1 0 40%; justify-content: center; flex-wrap: wrap;">
            <img
              v-for="m in members"
              :key="m.id"
              :src="m.img"
              :class="[
                $style.memberImg,
                !c.participants.includes(m.id) && $style.memberImgInactive,
              ]"
              @click="toggeMemberForCommonCeremonies(c.name, m.id)">
          </div>
          <div :class="$style.formInput">
            <button @click="deleteCeremony(commonCeremonies, ci)">borrar</button>
          </div>
      </div>
      <button
        :class="$style.addButton"
        @click="commonCeremonies.push({ name: '', participants: [], periodicity: 'DAYS_AT_WEEK', periodicity_payload: [] })">Agregar nueva ceremonia</button>
    </div>
    <div :class="$style.row">
      <div style="flex: 1;" />
      <div :class="$style.actions">
        <button @click="reset" :disabled="loading">Cancelar cambios</button>
        <button @click="save" :disabled="loading">Guardar</button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import settings from '@/utils/settings.js';
import store from '@/store.js'
import axios from 'axios';

import CeremonySettings from '@/components/CeremonySettings';

export default {
  name: 'Settings',
  components: {
    CeremonySettings,
  },
  data() {
    return {
      teams: [],
      commonCeremonies: [],
      loading: false,
    };
  },
  computed: {
    days() {
      return moment.weekdays(true).splice(0, 5);
    },
    members() {
      return settings.members;
    },
  },
  methods: {
    reset() {
      this.teams = JSON.parse(JSON.stringify(store.settings)).teams;
      this.commonCeremonies =  JSON.parse(JSON.stringify(store.settings)).globalCeremonies;
    },
    toggeMember(teamId, ceremonyName, memberId) {
      const participans = this.teams
        .find(x => x.id === teamId)
        .ceremonies
        .find(x => x.name === ceremonyName)
        .participants;
      if (participans.includes(memberId)) {
        participans.splice(participans.indexOf(memberId), 1);
      } else {
        participans.push(memberId);
      }
    },
    toggeMemberForCommonCeremonies(ceremonyName, memberId) {
      const participans = this.commonCeremonies
        .find(x => x.name === ceremonyName)
        .participants;
      if (participans.includes(memberId)) {
        participans.splice(participans.indexOf(memberId), 1);
      } else {
        participans.push(memberId);
      }
    },
    deleteCeremony(list, index) {
      if (confirm('¿Estás seguro?')) {
        list.splice(index, 1)
      }
    },
    save() {
      this.loading = true;
      const payload = {
        teams: JSON.parse(JSON.stringify(this.teams)),
        globalCeremonies: JSON.parse(JSON.stringify(this.commonCeremonies)),
      };
      axios.post('https://users.dcc.uchile.cl/~sblasco/facalendar/', payload)
        .then((x) => {
          store.settings = x.data;
          this.$emit('refresh');
        });
    },
  },
  created() {
    moment.locale('es');
    this.reset();
    this.loading = false;
  },
};
</script>

<style module lang="scss">
.content {
  display: flex;
  flex-direction: column;
  margin: 1em;
  flex: 1;
}
.headerText {
  font-weight: bold;
  font-size: 1.3em;
}

.row {
  display: flex;
  flex: 1;
  flex-direction: row;
}
.teamTitle {
  font-weight: bold;
  font-size: 1.15em;
}
.team {
  display: flex;
  flex-direction: column;
  margin: 1em 0;
  border-left: 0.3em var(--dark-primary-color-30) solid;
  background-color: var(--light-primary-color-70);
  padding: 0.5em 0.5em 0.8em;
}
.ceremoniesRow {
  display: flex;
  flex: 1;
  flex-direction: row;
  margin: 0.3em 0;
  align-items: center;
}
.formInput {
  display: flex;
  flex-wrap: wrap;
}
.memberImg {
  width: 1.75em;
  margin: 0 0.1em;
  cursor: pointer;
}
.memberImgInactive {
  opacity: 0.15;
}
.addButton {
  margin-top: 0.75em;
}
.actions {
  display: flex;
  padding: 0.5em;
  background-color: var(--light-primary-color-70);
  & > button {
    margin: 0 1em;
  }
}
</style>