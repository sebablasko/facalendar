<template>
  <div :class="$style.content">
    <div v-if="loading" :class="$style.loading">
      <div :class="$style.loadingDraw">
        Calma, estoy buscando...
      </div>
    </div>
    <div v-for="branch in branches" :key="branch.title" :class="$style.branch">
      <div :class="$style.title">{{ branch.title }}</div>
      <div v-if="branch.links.length > 0" :class="$style.links">
        <div
          v-for="link in branch.links"
          :key="link"
          :class="[
            $style.link,
            isQa(link) && $style.qa,
            !isQa(link) && $style.dev,
          ]"
        >
          <a target="_blank" :href="createLink(branch.title, link)">{{
            link
          }}</a>
        </div>
      </div>
      <div v-else :class="$style.beach">
        <div :class="$style.beachText">Modo playa</div>
        <img :class="$style.beachPhoto" :src="beach"/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import beach from '@/assets/beach.png';

export default {
  name: 'branches',
  data() {
    return {
      branches: [],
      beach,
      loading: true,
    };
  },
  methods: {
    isQa(branch) {
      return branch.includes('rc/') && !branch.includes('urc/') ;
    },
    createLink(repo, branch) {
      if (this.isQa(branch)) {
        const branchSplitted = branch.split('/');
        const version = branchSplitted[branchSplitted.length - 1];
        return `http://static.qa.cloud.principal.cl/${repo}/${version}/index.html`;
      }
      return `http://static.dev.cloud.principal.cl/${repo}/${branch}/index.html`;
    },
  },
  mounted() {
    this.loading = true;
    axios
      .get('https://users.dcc.uchile.cl/~sblasco/bt/index.php')
      .then(result => {
        this.loading = false;
        this.branches = Object.keys(result.data).map(r => ({
          title: r,
          links: result.data[r].filter((x) => !['released', 'unreleased'].includes(x)),
        }));
      });
  },
};
</script>

<style module lang="scss">

.content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
  margin: 1em;
  justify-content: space-around;
}
.branch {
  display: flex;
  margin: 0.2em 0;
  padding: 0 0.2em 0.3em;
  flex-direction: column;
  border-left: 0.3em var(--dark-primary-color-30) solid;
  background-color: var(--light-primary-color-70);
  flex-basis: 48%;
  box-shadow: 0 0.1em 0.1em silver;
}
.title {
  display: flex;
  flex-direction: column;
  font-weight: bold;
  margin: 0 0.3em;
}
.links {
  display: flex;
  flex-direction: column;
}
.link {
  margin: 0.1em 0;
  border-top-left-radius: 1em;
  border-bottom-left-radius: 1em;
  padding-left: 0.2em;
  a { color:#0529c9; }
  a:visited { color:#0529c9; }
  a:hover { color:#4158be; }
  a:active { color:#0529c9; }
}
.dev {
  border-left: 1em var(--primary-color) solid;
}
@keyframes dots {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.qa {
  border-left: 1em var(--dark-primary-color-30) solid;
  ::after {
    content: "✨ Ad portas!! ✨";
    position: absolute;
    font-size: 0.7em;
    animation: dots 1s steps(5, end) infinite;
    color: var(--dark-primary-color-30);
    font-style: italic;
  }
}
.beach {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
}
.beachText {
  font-size: 1.5em;
  margin: 0 1em;
  font-family: 'Dancing Script', cursive;
}
.beachPhoto {
  width: 4.5em;
  justify-content: center;
  align-items: center;
}
.loading {
  display: flex;
  flex: 1;
}
.loadingDraw {
  display: flex;
  flex: 1;
  & > * {
    flex: 1;
  }
}
</style>
