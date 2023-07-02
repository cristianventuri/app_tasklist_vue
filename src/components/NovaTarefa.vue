<template>
  <div class="component-newtask">
    <span class="content-input p-input-icon-left">
      <i class="pi pi-inbox"></i>
      <InputText type="text" v-model="newtask" placeholder="Informe uma tarefa..." @keypress="this.addNewTask" />
    </span>
    <div class="content-action">
      <Button label="Limpar Todas" icon="pi pi-trash" severity="danger" @click="clearAll()" />
      <Button label="Limpar Concluídas" icon="pi pi-trash" severity="warning" @click="clearComplete()" />
    </div>
  </div>
</template>
    
<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useTaskList } from '@/stores/task.js'
import { mapActions, mapState } from 'pinia';
import { info, success, warn, error } from '@/services/ServiceToast';
import { confirm } from '@/services/ServiceConfirm';

export default {
  name: "NovaTarefa",
  components: {
    InputText,
    Button
  },

  computed: {
    ...mapState(useTaskList, ['possuiTarefasPendentes', 'possuiTarefasEmAndamento', 'possuiTarefasConcluidas', 'possuiTarefas']),
  },

  methods: {
    ...mapActions(useTaskList, ['addTask', 'clearAllTasks', 'clearCompleteTasks']),
    addNewTask(event) {
      if ((event.keyCode === 13) && (this.newtask.trim() !== '')) {
        this.addTask(this.newtask);
        this.newtask = '';
      }
    },
    clearAll() {
      if (this.possuiTarefas) {
        const fnConfirma = () => {
          this.clearAllTasks();
          success('Sucesso!', 'Suas tarefas foram limpas com sucesso.');
        };
        const fnRejeita = () => {
          error('Atenção!', 'A limpeza da lista foi cancelada.');
        };
        confirm('Limpar Todas?', 'Tem certeza que deseja limpar as tarefas da sua lista?', "pi pi-question-circle", fnConfirma, fnRejeita);
      } else {
        warn('Aviso!', 'Não há tarefas à serem limpas.');
      }
    },
    clearComplete() {
      if (this.possuiTarefasConcluidas) {
        const fnConfirma = () => {
          this.clearCompleteTasks();
          success('Sucesso!', 'Suas tarefas concluídas foram limpas com sucesso.');
        };
        const fnRejeita = () => {
          error('Atenção!', 'A limpeza da lista foi cancelada.');
        };
        confirm('Limpar Concluídas?', 'Tem certeza que deseja limpar as tarefas concluídas da sua lista?', "pi pi-question-circle", fnConfirma, fnRejeita);
      } else {
        warn('Aviso!', 'Não há tarefas concluídas à serem limpas.');
      }
    },
  },
  data() {
    return {
      newtask: ''
    }
  },
}
</script>
    
<style lang="scss">
.component-newtask {
  display: flex;
  gap: 0.5rem;

  .content-input {
    flex: 1;

    input {
      width: 100%;
      height: 3rem;
    }

    i {
      z-index: 1;
      font-size: 1.1rem;
    }
  }

  .content-action {
    display: flex;
    gap: 0.5rem;

    button {
      width: 15rem;
      height: 3rem;
    }
  }
}
</style>