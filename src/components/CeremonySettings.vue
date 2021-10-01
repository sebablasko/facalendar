<template>
  <div :class="$style.content">
          <!-- <div :class="$style.formInput"> -->
            <!-- <input/> -->
          <!-- </div> -->
          <!-- <div :class="$style.days">
            <span v-for="(day, i) in days" :key="day">
              <input
                type="checkbox"
                :id="`${c.name}-${day}-${i}`"
                :value="i"
                v-model="periodicity_payload">
              <label :for="`${c.name}-${day}-${i}`">{{ day }}</label>
            </span>
          </div>
          <div :class="$style.members">
            <img
              v-for="m in members"
              :key="m.id"
              :src="m.img"
              :class="[
                $style.memberImg,
                !participants.includes(m.id) && $style.memberImgInactive,
              ]"
              @click="toggeMember(t.id, c.name, m.id)">
          </div>
          <div :class="$style.formInput">
            <button @click="deleteCeremony(t.ceremonies, ci)">borrar</button>
          </div> -->
  </div>
</template>

<script>

export default {
  name: 'CeremonySettings',
  data() {
    return {
      teams: [],
    };
  },
  methods: {
  },
  computed: {
    days() {
      return moment.weekdays(true).splice(0, 5);
    },
  }
};
</script>

<style module lang="scss">
.content {
  display: flex;
  flex: 1;
  flex-direction: row;
  margin: 0.3em 0;
  align-items: center;
}
.formInput {
  display: flex;
}
.days {
  display: flex;
  flex: auto 1;
  flex-wrap: wrap;
}
.members {
  display: flex;
  flex: 1 0 40%;
  justify-content: center;
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
</style>