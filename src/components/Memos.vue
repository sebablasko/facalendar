<template>
  <div :class="$style.content">
    <div :class="$style.title">Memos del Mes</div>
    <input placeholder="Escribe un nuevo memo" v-model="newAppointment"/>
    <button @click="newEvent" :disabled="newAppointment === ''">Agregar memo el {{selected.format('dddd D')}}</button>
    <hr>
    <div
      :class="$style.item"
      v-for="(m, i) in validAppointments"
      :key="`${i}-a`">
      <div :class="$style.checkbox"><input type="checkbox" :checked="m.done" disabled @change="toggle(m)"/></div>
      <div :class="[
        $style.info,
        ]">
        <div :class="$style.infoLine">
          <span :class="m.done && $style.outdated">{{ m.event }}</span>
          <a :class="$style.delete" @click="deleteEvent(i)">❌</a>
        </div>
        <div :class="$style.infoSmall">{{ m.date.format('dddd D') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

import { db } from '@/firebase/db';

export default {
  name: 'Memos',
  props: {
    selected: {
      type: Object,
      default: () => moment(),
    },
  },
  computed: {
    validAppointments() {
      return this.appointments
        .filter(x => moment(x.date, 'DD/MM/YYYY').isSame(this.selected, 'month'))
        .sort((a,b) => moment(a.date, 'DD/MM/YYYY').format('YYYYMMDD') - moment(b.date, 'DD/MM/YYYY').format('YYYYMMDD'))
        .map(x => ({
          ...x,
          event: x.event,
          date: moment(x.date, 'DD/MM/YYYY'),
          done: moment(x.date, 'DD/MM/YYYY').isBefore(this.selected, 'day')
        }));
    },
  },
  methods: {
    moment,
    deleteEvent(id) {
      const item = this.appointments
        .filter(x => moment(x.date, 'DD/MM/YYYY').isSame(this.selected, 'month'))
        .sort((a,b) => moment(a.date, 'DD/MM/YYYY').format('YYYYMMDD') - moment(b.date, 'DD/MM/YYYY').format('YYYYMMDD'))
        [id];
      if (confirm('¿Seguro?')) {
        db.collection('appointments').doc(item.id).delete().then(() => {
          // alert('done');
        });
      }
    },
    newEvent() {
      const payload = {
        event: this.newAppointment,
        date: this.selected.format('DD/MM/YYYY'),
      };
      this.newAppointment = '';
      db.collection('appointments').add(payload).then(() => {
        // this.newAppointment = '';
      });
    },
  },
  data() {
    return {
      appointments: [],
      newAppointment: '',
    };
  },
  firestore: {
    appointments: db.collection('appointments')
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
  box-shadow: 0 0.1em 0.1em silver;
  background: white;
  margin: 0 1em;
  padding: 0.5em 1em;
  overflow: scroll;
  max-height: 37em;
}
.title {
  display: flex;
  flex-direction: row;
  padding: 0.1em;
  font-size: 1.2em;
  justify-content: center;
}
.item {
  display: flex;
  flex-direction: row;
  padding: 0.1em;
}
.checkbox {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.info {
  display: flex;
  flex-direction: column;
  margin: 0 0.2em;
  flex: 1;
}
.infoLine {
  display: flex;
  font-size: 1.1em;
  font-style: italic;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
}
.delete {
  display: flex;
  font-style: normal;
  font-size: 0.6em;
  cursor: pointer;
}
.infoSmall {
  display: flex;
  flex-direction: column;
  font-size: 0.6em;
}
.outdated {
  text-decoration: line-through;
}
</style>