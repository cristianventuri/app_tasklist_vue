<template>
  <div class="component-takslist">
    <ul class="list" v-if="this.possuiTarefas()">
      <li class="task" v-for="task in this.list" :data-id="task.id">
        <span class="status-icon">
          <i :class="getClassIconStatus(task.status)"></i>
        </span>
        <span>
          <p class="task-title">{{ task.titulo }}</p>
          <input class="task-title-input" type="text" v-model="task.titulo">
        </span>
        <span class="actions">
          <i class="btn-icon btn-editar pi pi-pencil" @click="clickEditar(task.id)"></i>
          <i class="btn-icon btn-excluir pi pi-trash" @click="clickExcluir(task.id)"></i>
        </span>
      </li>
    </ul>
    <div class="sem-registros" v-else>
      <i class="pi pi-thumbs-up-fill"></i>
      <h4>Você não possui tarefas cadastradas!</h4>
      <p>Adicione novas tarefas no campo acima...</p>
    </div>
  </div>
</template>

<script>
import Button from 'primevue/button';
import { useTaskList } from '@/stores/task.js'
import { mapActions, mapState } from 'pinia';

export default {
  name: "ListaTarefa",
  computed: {
    ...mapState(useTaskList, ["concluido", "andamento", "pendente", "list"]),
  },
  methods: {
    ...mapActions(useTaskList, ["possuiTarefas"]),
    getClassIconStatus(status) {
      switch (status) {
        case this.pendente:
          return "pi pi-times-circle";
        case this.andamento:
          return "pi pi-exclamation-circle";
        case this.concluido:
          return "pi pi-check-circle";
      }
    },
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
      display: flex;
      align-items: center;

      .btn-icon {
        font-size: 1rem;
      }
    }
  }

  .sem-registros {
    display: flex;
    align-items: center;
    flex-direction: column;
    background: rgb(0 0 0 / 35%);
    border-radius: 0.4rem;
    margin-top: 2rem;
    padding: 2rem;
    gap: 0.5rem;

    i {
      font-size: 2rem;
    }

    h4 {
      font-size: 1rem;
    }
  }
}
</style>