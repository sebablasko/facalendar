<template>
  <card>
    <template v-slot:title>
      Algunas nius de hoy <newspaper-icon/>
    </template>
    <template v-slot:body>
      <div :class="$style.content">
        <div
          v-for="(item, index) in news"
          :key="index"
          :style="randomStyle()"
          :class="$style.item">
          {{ item.title }}
          <a v-if="item.url" :href="item.url" target="_blank">ver</a>
        </div>
      </div>
    </template>
  </card>
</template>

<script>
import axios from 'axios';
import NewspaperIcon from 'vue-material-design-icons/Newspaper.vue';

import Card from '@/components/Card';

export default {
  name: 'News',
  components: {
    Card,
    NewspaperIcon,
  },
  methods: {
    randomStyle() {
      const highlight = Math.random();
      return {
        fontWeight: highlight > 0.7 ? 'bold': 'normal',
      };
    },
  },
  data() {
    return {
      news : [
        { title: 'No me presiones hago lo que puedo :(' }, 
      ],
    };
  },
  created() {
    if (process.env.NODE_ENV === 'production') {
      axios.get(
        'https://users.dcc.uchile.cl/~sblasco/facalendar/news.php')
        .then((x) => {
          this.news = x.data;
        });
    }
  },
};
</script>

<style module lang="scss">
.content {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  flex: 1;
}
.item {
  display: flex;
  margin: 0.3em 1em;
  padding: 0 0.3em;
  position: relative;
  border-bottom: 2px dashed var(--dark-primary-color-30);
  line-height: 1em;
  & a {
    display: flex;
    font-weight: normal;
    align-items: center;
  }
}

</style>