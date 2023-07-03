<template>
  <RouterView />
  <ConfirmDialog />
  <DynamicDialog />
  <ComponenteToast />
</template>

<script>
import ConfirmDialog from 'primevue/confirmdialog';
import DynamicDialog from 'primevue/dynamicdialog';
import ComponenteToast from './components/ComponenteToast.vue';
import Toast from 'primevue/toast';

export default {
  name: "App",
  components: {
    ComponenteToast,
    ConfirmDialog,
    DynamicDialog,
    Toast,
  },
}
</script>

<style lang="scss">
@import "./assets/style/scss/App.scss";
</style>