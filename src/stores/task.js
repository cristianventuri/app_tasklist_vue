import { defineStore } from 'pinia'

export const useTaskList = defineStore('tasklist', {
  state: () => {
    return {
      counter_id: 0,
      pendente: 0,
      andamento: 1,
      concluido: 2,
      list: __load('tasklist') ?? [],
    }
  },

  actions: {
    nextTaskId() {
      return this.counter_id = this.counter_id + 1;
    },
    addTask(newtask) {
      let task = {};
      task.id = this.nextTaskId();
      task.status = 0;
      task.titulo = newtask;
      this.list.unshift(task);
      this.orderTasklist();
      __save('tasklist', this.list);
    },
    orderTasklist() {
      this.list = this.list.sort(__dynamicMultiSort(['status', 'titulo', 'id']));
    },
    clearAllTasks() {
      this.counter_id = 0;
      this.list = [];
      __save('tasklist', this.list);
    },
    clearCompleteTasks() {
      let newlist = this.list.filter(tasklist => tasklist.status !== this.concluido);
      newlist = (typeof newlist === 'object') ? newlist : [];
      this.list = newlist;
      __save('tasklist', this.list);
    },
    possuiTarefas() {
      return this.list.length > 0;
    },
    possuiTarefasConcluidas() {
      return this.list.filter(task => task.status === this.concluido).length > 0;
    },
    possuiTarefasEmAndamento() {
      return this.list.filter(task => task.status === this.andamento).length > 0;
    },
    possuiTarefasPendentes() {
      return this.list.filter(task => task.status === this.pendente).length > 0;
    },
    getTasklistStorage() {
      return __load('tasklist');
    }
  },

  getters: {
    getPendentes: (state) => {
      return state.list.filter(task => task.status === state.pendente);
    },
    getEmAndamento: (state) => {
      return state.list.filter(task => task.status === state.andamento);
    },
    getConcluidas: (state) => {
      return state.list.filter(task => task.status === state.concluido);
    },
  },
})
