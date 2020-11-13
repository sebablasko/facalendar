<template>
  <div :class="[
    $style.day,
    day.currentDay.isBefore(today) && $style.softOpacity,
    day.currentDay.isSame(today, 'day') && $style.todayTotal]">
    <!-- HEADER -->
    <div :class="$style.headerDay">
      {{ day.currentDay.format('dd DD-MM') }}
    </div>
    <!-- BODY -->
    <div
      v-if="feriados.some(f => day.currentDay.isSame(f.date, 'day'))"
      :class="$style.feriado">
      feriado
      <div :class="$style.feriadoTitle">{{ feriados.find(f => day.currentDay.isSame(f.date, 'day')).title }}</div>
    </div>
    <div v-else>
      <div
        v-for="(appoinment, index) in day.schedule"
        :key="`${index}a`">
        <div :class="[
          $style.scheduleRow,
          day.currentDay.isSame(today, 'day') && $style.today]">
          <span :class="$style.appoinmentName">{{ appoinment.name }}</span>
          <img :class="$style.miniProfile" :src="appoinment.selectedCandidate.img"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import feriados from '@/utils/feriados.js';

export default {
  name: 'WeekDay',
  props: {
    day: {
      required: true,
    },
    today: {
      required: true,
    },
  },
  data() {
    return {
      feriados,
    }
  }
};
</script>

<style module lang="scss">
.day {
  display: flex;
  flex-direction: column;
  width: 13.8%;
  background: #ffffff00;
  border: 1px silver solid;
  min-height: 149px;
}
.softOpacity {
  background: #efefefbb !important;
}
.softOpacity > * {
  opacity: 0.4;
  filter: grayscale(1);
}
.headerDay {
  border: 1px silver solid;
  font-size: 0.9em;
  background: #fefebe;
}
.feriado {
  font-weight: bold;
  font-size: 1.3em;
  color: red;
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  align-items: center;
  @media only screen and (max-device-width : 640px) {
    font-size: 0.6em;
  }
}
.feriadoTitle {
  font-size: 0.5em;
}
.scheduleRow {
  font-size: 0.9em;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid silver;
  margin: auto 7px;
  @media only screen and (max-device-width : 640px) {
    flex-direction: column;
  }
}
.today {
  font-weight: bold;
}
$moon: #c7c18b;
$peak: #efedd8;
@keyframes cresent{
  0%{
    transform: translate(0px, 0px) scale(1);
    box-shadow: none;
  }
  33%{
    transform: translate(0px, 0px) scale(1.3);
    box-shadow: 0 0 10px lighten($moon, 30%), 0 0 80px 8px $moon;
    background-color: $peak;
    filter: brightness(105%);
  }
  66%{
    transform: translate(0px, 0px) scale(1.3);
    box-shadow: 0 0 10px lighten($moon, 30%), 0 0 80px 8px $moon;
    background-color: $peak;
    filter: brightness(105%);
  }
  100%{
    transform: translate(0px, 0px) scale(1);
    box-shadow: none;
  }
}
.todayTotal {
  animation: cresent 3s infinite;
  font-weight: bold;
}
.appoinmentName {
  font-size: 1.0em;
  display: flex;
  flex: 1;
  @media only screen and (max-device-width : 640px) {
    font-size: 0.8em;
  }
}
.miniProfile {
  width: 40px;
}
</style>
