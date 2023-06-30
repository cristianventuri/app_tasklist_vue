<template>
  <div class="component-takslist">
    <ul class="list">
      <li class="task" v-for="task in this.getPendentes" :data-id="task.id">
        <span class="status-icon">
          <i class="pi pi-exclamation-circle"></i>
          <i class="pi pi-times-circle"></i>
          <i class="pi pi-check-circle"></i>
        </span>

        <span class="actions">
          <i class="btn-icon btn-editar pi pi-pencil"></i>
          <i class="btn-icon btn-excluir pi pi-trash"></i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import Button from 'primevue/button';
import { useTaskList } from '@/stores/task.js'
import { mapActions, mapState } from 'pinia';

export default {
  name: "ListaTarefa",
  computed: {
    ...mapState(useTaskList, ["getPendentes"]),
  },
  methods: {
    ...mapActions(useTaskList, ["increment"]),

    clickEditar() {
      debugger;
    },
    clickExcluir() {
      debugger;
    },
  },
  data() {
    return {};
  },
  components: { Button }
}
</script>
    
<style lang="scss">
.component-takslist {

  ul {
    margin: 0;
    padding: 0;

    li {
      list-style: none;

      .btn-icon {
        font-size: 1rem;
      }
    }
  }
}
</style>