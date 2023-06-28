import { defineStore } from 'pinia'

export const useTaskList = defineStore('tasklist', {
  state: () => {
    return {
      counter_id: 0,
      pendente: [],
      andamento: [],
      concluido: [],
    }
  },

  actions: {
    addTask(newtask) {
      let task = {};
      task.id = this.nextTaskId();
      task.status = 0;
      task.titulo = newtask;
      this.pendente.unshift(task);
      this.orderTasklist();
    },
    nextTaskId() {
      return this.counter_id = this.counter_id + 1;
    },
    orderTasklist() {
      this.pendente  = this.pendente.sort(__dynamicMultiSort(['titulo', 'id']));
      this.andamento = this.andamento.sort(__dynamicMultiSort(['titulo', 'id']));
      this.concluido = this.concluido.sort(__dynamicMultiSort(['titulo', 'id']));
    },
    clearAllTasks() {
      this.counter_id = 0;
      this.pendente  = [];
      this.andamento = [];
      this.concluido = [];
    },
    clearCompleteTasks() {
      this.counter_id = 0;
      this.pendente  = [];
      this.andamento = [];
      this.concluido = [];
    }
  },

  getters: {
    getPendentes: (state) => {
      return state.pendente;
    },
    getEmAndamento: (state) => {
      return state.andamento;
    },
    getConcluidos: (state) => {
      return state.concluido;
    },
  },
})
