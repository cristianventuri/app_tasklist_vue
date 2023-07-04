<template>
  <section class="main">
    <NovaTarefa />
    <ListaTarefa />
  </section>
</template>

<script>
import NovaTarefa from '../components/NovaTarefa.vue';
import ListaTarefa from '../components/ListaTarefa.vue';
export default {
  name: "Main",
  components: { NovaTarefa, ListaTarefa },
}
</script>
  
<style lang="scss">
section {
  &.main {
    background: rgb(0 0 0 / 30%);
    border-radius: .5rem;
    padding: .5rem;
    width: 100%;
  }
}
</style>