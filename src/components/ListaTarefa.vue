<template>
  <div class="component-takslist">
    <ul class="list">
      <li class="task" v-for="task in this.getPendentes">{{ task.titulo }}</li>
    </ul>
  </div>
</template>
    
<script>
import { useTaskList } from '@/stores/task.js'
import { mapActions, mapState } from 'pinia';

export default {
  name: "ListaTarefa",
  computed: {
    ...mapState(useTaskList, ["getPendentes"]),
  },
  methods: {
    ...mapActions(useTaskList, ["increment"]),
  },
  data() {
    return {}
  },

}
</script>
    
<style lang="scss">
.component-takslist {

  ul {
    margin: 0;
    padding: 0;

    li {
      list-style: none;
    }
  }
}
</style>