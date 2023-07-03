<template>
  <div class="component-takslist">
    <div class="container-listas" v-if="this.possuiTarefas">
      <ListaItem :lista="this.getPendentes"/>
      <ListaItem :lista="this.getEmAndamento"/>
      <ListaItem :lista="this.getConcluidas"/>
    </div>
    <div class="sem-registros" v-else>
      <i class="pi pi-thumbs-up-fill"></i>
      <h4>Você não possui tarefas cadastradas!</h4>
      <p>Adicione novas tarefas no campo acima...</p>
    </div>
  </div>
</template>

<script>
import Button from 'primevue/button';
import ListaItem from './ListaItem.vue';
import { useTaskList } from '@/stores/task.js'
import { mapState } from 'pinia';

export default {
  name: "ListaTarefa",
  components: { Button, ListaItem },
  computed: {
    ...mapState(useTaskList, ["concluido", "andamento", "pendente", "list", "getConcluidas", "getEmAndamento", "getPendentes", "possuiTarefas"]),
  },
  methods: {
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
    getClassStatus(status) {
      switch (status) {
        case this.pendente:
          return "status-icon pendente";
        case this.andamento:
          return "status-icon andamento";
        case this.concluido:
          return "status-icon concluido";
      }
    },
  },
}
</script>
    
<style lang="scss">
.component-takslist {
  padding: 1rem 0;

  .container-listas {
    display: flex;
    gap: 1rem;
  }

  .sem-registros {
    display: flex;
    align-items: center;
    flex-direction: column;
    background: rgb(0 0 0 / 35%);
    border-radius: 0.4rem;
    margin-top: 2rem;
    padding: 10rem 0;
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