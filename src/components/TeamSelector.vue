<template>
  <div :class="$style.content">
    <div
      v-for="team in remote.teams"
      :key="team.id"
      :class="$style.item"
      :style="{ backgroundColor: team.color }"
      @click="setTeam(team.id)">
      {{ team.name }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'TeamSelector',
  computed: {
    ...mapState(['remote']),
  },
  methods: {
    ...mapActions(['setTeam']),
  }
};
</script>

<style module lang="scss">
// Dimensions
$dot-size: 2px;
$dot-space: 22px;

.content {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 5em;
  background:
		linear-gradient(90deg, var(--dark-primary-color-30) ($dot-space - $dot-size), transparent 85%) center,
		linear-gradient(-90deg, var(--dark-primary-color-30) ($dot-space - $dot-size), transparent 85%) center;
}
.item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
  opacity: 0.75;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
}
</style>