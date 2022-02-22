<template>
  <div :class="$style.content">
    <div
      v-for="link in dataset"
      :key="link.url"
      :class="$style.link">
      <a :href="link.url" target="_blank">{{ link.title }}</a>
      <span :class="$style.description">{{ link.description }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Links',
  data() {
    return {
      dataset: [
        {
          url: 'https://expert.cloud.adpsoluciones.com/Expert/inicio/ini/Login.aspx?ReturnUrl=%2fExpert/',
          title: 'ADP',
          description: 'Liquidaciones de sueldo y vacaciones. Ingresar con Juego de datos: PFG, Dominio: ADPCL, Usuario: Rut (con dv)',
        },
        {
          url: 'https://principalpersonas.cl/',
          title: 'Principal Personas',
          description: 'Portal beneficios, días administrativos y permisos para ir a la oficina',
        },
        {
          url: 'https://design.principal.com/',
          title: 'Principal Design System',
          description: 'Sitio de diseños del PDS de USA',
        },
        {
          url: 'https://static.qa.cloud.principal.cl/vue-pds/unreleased/index.html',
          title: 'Principal Design System - Demo',
          description: 'Storybook de componentes PDS desarrollados en VUE',
        },
        {
          url: 'https://static.qa.cloud.cuprum.cl/components-design-system/unreleased/docs/index.html',
          title: 'Components Design System - Demo',
          description: 'Storybook de componentes CDS desarrollados en VUE',
        },
        {
          url: 'https://portal.securecodewarrior.com/#/login',
          title: 'Secure Code Warrior',
          description: 'Sitio de capacitaciones y pruebas para devs',
        },
        {
          url: 'https://app.pluralsight.com/id',
          title: 'Pluralsight',
          description: 'Sitio de capacitaciones para devs',
        },
        {
          url: 'https://portal.azure.com/#home',
          title: 'Azure',
          description: 'Portal de Azure para servicios cloud',
        },
        {
          url: 'https://wdx55240.live.dynatrace.com/#dashboard;id=3b92e39e-5082-4bbd-9908-420eb56a320e;gf=all;gtf=-2h',
          title: 'Dynatrace',
          description: 'Dashboards de análisis de servicios backend',
        },
        {
          url: 'https://sonarqube.prod.cloud.principal.cl/projects',
          title: 'Sonarqube',
          description: 'Plataforma de análisis estático de código',
        },
        {
          url: 'https://vcs.cloud.principal.cl/users/sign_in',
          title: 'VCS DevOps',
          description: 'Repositorio de administracion de despliegues de piezas backend',
        },
      ],
    };
  },
  computed: {
  },
  methods: {
  },
};
</script>

<style module lang="scss">

.content {
  display: flex;
  flex-direction: column;
  padding: 2em;
}
.link {
  display: flex;
  flex-direction: column;
  border-left: 0.3em solid var(--light-primary-color-20);
  background: var(--light-primary-color-10);
  padding: 0 0.3em;
  margin: 0.15em 0;
}
</style>