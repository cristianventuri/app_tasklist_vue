<template>
  <div class="component-newtask">
    <span class="content-input p-input-icon-left">
      <font-awesome-icon :icon="['fas', 'list-check']" />
      <InputText type="text" v-model="newtask" placeholder="Informe uma tarefa..." @keypress="this.addNewTask" />
    </span>
    <div class="content-action">
      <Button label="Limpar Todas" icon="pi pi-times" rounded severity="danger" @click="clearAll()" />
      <Button label="Limpar Concluídas" icon="pi pi-check" rounded severity="success" @click="clearComplete()" />
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
    ...mapState(useTaskList, ['getTask', 'getName', 'getCount']),
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
      const fnConfirma = () => {
        success('Sucesso!', 'Seu novo "Nome de Usuário" foi salvo.');
      }; 
      const fnRejeita = () => {
        error('Erro!', 'Seu novo "Nome de Usuário" foi salvo.');
      };

      confirm('titulo', 'mensagem', fnConfirma, fnRejeita);
      // this.clearAllTasks();
    },
    clearComplete() {
      this.clearCompleteTasks();
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
  flex-direction: column;
  gap: 0.5rem;

  .content-input {
    input {
      width: 100%;
    }

    svg {
      z-index: 1;
      font-size: 1.2rem;
    }
  }

  .content-action {
    display: flex;
    gap: 0.5rem;

    button {
      flex: 1;
    }
  }
}
</style>