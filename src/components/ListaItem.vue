<template>
  <div class="lista-itens" v-if="this.lista.length > 0">
    <ul>
      <li class="task" v-for="task in this.lista" :data-id="task.id">
        <div class="header pendente" v-if="task.status === this.pendente">
          <i class="btn-icon btn-editar pi pi pi-times-circle"></i>
          <span class="status-icon pendente"> Pendente </span>
        </div>
        <div class="header andamento" v-if="task.status === this.andamento">
          <i class="btn-icon btn-editar pi  pi-exclamation-circle"></i>
          <span class="status-icon andamento"> Em andamento </span>
        </div>
        <div class="header concluido" v-if="task.status === this.concluido">
          <i class="btn-icon btn-editar pi pi-check-circle"></i>
          <span class="status-icon concluido"> Concluído </span>
        </div>
        <div class="body">
          <p class="task-title">{{ task.titulo }}</p>
        </div>
        <div class="action">
          <span class="action-status">
            <i class="btn-icon btn-editar pi pi pi-times-circle" @click="clickDefineStatus(task.id, this.pendente)"
              v-if="task.status !== this.pendente"></i>
            <i class="btn-icon btn-editar pi pi-exclamation-circle" @click="clickDefineStatus(task.id, this.andamento)"
              v-if="task.status !== this.andamento"></i>
            <i class="btn-icon btn-editar pi pi-check-circle" @click="clickDefineStatus(task.id, this.concluido)"
              v-if="task.status !== this.concluido"></i>
          </span>
          <span class="action-item">
            <i class="btn-icon btn-editar pi pi-pencil" @click="clickEditar(task.id)"></i>
            <i class="btn-icon btn-excluir pi pi-trash" @click="clickExcluir(task.id)"></i>
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useTaskList } from '@/stores/task.js';
import { success, warn, error } from '@/services/ServiceToast';
import { confirm } from '@/services/ServiceConfirm';
import { dynamicDialog } from '@/services/ServiceDialog';
import EditarItem from './EditarItem.vue';

export default {
  name: "ListaItem",
  props: {
    lista: Array
  },
  computed: {
    ...mapState(useTaskList, ["concluido", "andamento", "pendente", "getTaskById"]),
  },
  methods: {
    ...mapActions(useTaskList, ['updateTaskStatus', 'deleteTask']),
    clickDefineStatus(id, status) {
      this.updateTaskStatus(id, status);
      switch (status) {
        case 0:
          error('Atenção!', `O status da tarefa foi atualizado para pendente.`);
          break;
        case 1:
          warn('Aviso!', `O status da tarefa foi atualizado para em andamento.`);
          break;
        case 2:
          success('Sucesso!', `O status da tarefa foi atualizado para concluÍdo.`);
          break;
      }
    },
    clickEditar(id) {
      dynamicDialog(EditarItem, 'Alterar informações', {
        data: {
          task: this.getTaskById(id)
        }
      });
    },
    clickExcluir(id) {
      const fnConfirma = () => {
        let task = this.getTaskById(id)
        this.deleteTask(id);
        success('Sucesso!', `A tarefa "${task.titulo}" foi removida da sua lista.`);
      };
      const fnRejeita = () => {
        error('Atenção!', 'A tarefa não foi excluída da lista.');
      };
      confirm('Excluir Tarefa?', 'Tem certeza que deseja excluir a tarefa da lista?', "pi pi-question-circle", fnConfirma, fnRejeita);
    },
  }
}
</script>
    
<style lang="scss">
.lista-itens {
  flex: 1;

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  li {
    overflow: hidden;
    border-radius: 0.4rem;
    background-color: rgb(151, 134, 134);
    list-style: none;

    .header {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 1.6rem;
      gap: .4rem;

      &.pendente {
        background-color: #d94f3a;
      }

      &.andamento {
        background-color: #ff922a;
      }

      &.concluido {
        background-color: #8BAE2C;
      }
    }

    .body {
      background-color: white;
      color: #7a7979;
      padding: .2rem .5rem;
      font-size: 1rem;
    }

    .action {
      display: flex;
      justify-content: space-between;
      background-color: #f1f1f1;
      color: #797878;
      padding: .3rem .5rem;
      border-top: thin solid #ededed;

      .action-status,
      .action-item {
        display: flex;
        align-items: center;
        gap: 0.4rem;

        i {
          cursor: pointer;
        }
      }
    }
  }
}
</style>