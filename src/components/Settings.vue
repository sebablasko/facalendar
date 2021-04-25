<template>
  <div :class="$style.content">
    <span :class="$style.headerText">Ceremonias por Equipo</span>
    <div
      v-for="t in teams"
      :key="t.id"
      :class="$style.team">
      <span :class="$style.teamTitle">{{ t.name }}</span>
      <div
        v-for="(c, ci) in t.ceremonies"
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
          <div :class="$style.formInput" style="flex: 1 0 45%; justify-content: center; flex-wrap: wrap;">
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
            <button @click="t.ceremonies.splice(ci, 1)">x</button>
          </div>
      </div>
      <button
        :class="$style.addButton"
        @click="t.ceremonies.push({ name: '', participants: [], periodicity: 'DAYS_AT_WEEK', periodicity_payload: [] })">Agregar nueva ceremonia</button>
    </div>
    <span :class="$style.separator"/>

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
          <div :class="$style.formInput" style="flex: 1 0 45%; justify-content: center; flex-wrap: wrap;">
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
            <button @click="commonCeremonies.splice(ci, 1)">x</button>
          </div>
      </div>
      <button
        :class="$style.addButton"
        @click="commonCeremonies.push({ name: '', participants: [], periodicity: 'DAYS_AT_WEEK', periodicity_payload: [] })">Agregar nueva ceremonia</button>
    </div>
    <div :class="$style.row">
      <div style="flex: 1;" />
      <div :class="$style.actions">
        <button @click="reset">Restablecer</button>
        <button @click="reset">Guardar</button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import settings from '@/utils/settings.js';

export default {
  name: 'Settings',
  data() {
    return {
      teams: [],
      commonCeremonies: [],
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
      this.teams = JSON.parse(JSON.stringify(settings)).teams;
      this.commonCeremonies =  JSON.parse(JSON.stringify(settings)).globalCeremonies;
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
  },
  created() {
    moment.locale('es');
    this.reset();
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
  margin: 0.5em;
  border-left: 0.3em var(--dark-primary-color-30) solid;
  background-color: var(--light-primary-color-70);
  padding: 0.5em 0.5em 0.8em;
}
.ceremoniesRow {
  display: flex;
  flex: 1;
  flex-direction: row;
  margin: 0.75em 0;
  align-items: flex-end;
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
  opacity: 0.2;
}
.addButton {
  margin-top: 0.75em;
}
.separator {
  border-bottom: 2px var(--dark-primary-color-30) solid;
  margin: 1em 0;
}
.actions {
  display: flex;
  padding: 0.5em;
  background-color: var(--light-primary-color-30);
  & > button {
    margin: 0 1em;
  }
}
</style>