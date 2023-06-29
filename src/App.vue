<template>
  <RouterView />
  <ConfirmDialog />
  <ComponenteToast />
</template>

<script>
import ConfirmDialog from 'primevue/confirmdialog';
import ComponenteToast from './components/ComponenteToast.vue';
import Toast from 'primevue/toast';

export default {
  name: "App",
  components: {
    ComponenteToast,
    ConfirmDialog,
    Toast,
  },
}
</script>

<style lang="scss">
@import "./assets/style/scss/App.scss";
</style>