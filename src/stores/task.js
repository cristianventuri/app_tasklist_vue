import { defineStore } from 'pinia'

export const useTaskList = defineStore('tasklist', {
  state: () => {
    return {
      counter_id: __loadLastId(),
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
    updateTaskStatus(id, newstatus) {
      let index = this.list.findIndex(task => task.id === id);
      if (index >= 0) {
        this.list[index].status = newstatus;
        __save('tasklist', this.list);
      }
    },
    updateTaskTitulo(id, newtitle) {
      let index = this.list.findIndex(task => task.id === id);
      if (index >= 0) {
        this.list[index].titulo = newtitle;
        __save('tasklist', this.list);
      }
    },
    deleteTask(id) {
      this.list = this.list.filter(task => task.id !== id);
      __save('tasklist', this.list);
    }
  },

  getters: {
    getTaskById: (state) => (id) => {
      return state.list.find(task => task.id === id);
    },
    getPendentes: (state) => {
      return state.list.filter(task => task.status === state.pendente);
    },
    getEmAndamento: (state) => {
      return state.list.filter(task => task.status === state.andamento);
    },
    getConcluidas: (state) => {
      return state.list.filter(task => task.status === state.concluido);
    },
    possuiTarefas(state) {
      return state.list.length > 0;
    },
    possuiTarefasConcluidas(state) {
      return state.list.filter(task => task.status === state.concluido).length > 0;
    },
    possuiTarefasEmAndamento(state) {
      return state.list.filter(task => task.status === state.andamento).length > 0;
    },
    possuiTarefasPendentes(state) {
      return state.list.filter(task => task.status === state.pendente).length > 0;
    },
    getTasklistStorage() {
      return __load('tasklist');
    }
  },
})
