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
section{
  &.main{
    width: 100%;
  }
}
</style>