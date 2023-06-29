import { defineStore } from 'pinia'

export const useTaskList = defineStore('tasklist', {
  state: () => {
    return {
      counter_id: 0,
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
      this.list = this.list.sort(__dynamicMultiSort(['titulo', 'id']));
    },
    clearAllTasks() {
      this.counter_id = 0;
      this.list = [];
      __save('tasklist', this.list);
    },
    clearCompleteTasks() {
      this.clearAllTasks();
    },
    getTasklistStorage(){
      return __load('tasklist');
    }
  },

  getters: {
    getPendentes: (state) => {
      return state.list;
    },
  },
})
