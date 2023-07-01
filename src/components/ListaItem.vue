<template>
  <ul class="lista-item">
    <li class="task" v-for="task in this.lista" :data-id="task.id">
      <span :class="getClassStatus(task.status)">
        <i :class="getClassIconStatus(task.status)"></i>
      </span>
      <span class="description">
        <p class="task-title">{{ task.titulo }}</p>
        <input class="task-title-input" type="text" v-model="task.titulo">
      </span>
      <span class="actions">
        <i class="btn-icon btn-editar pi pi-pencil" @click="clickEditar(task.id)"></i>
        <i class="btn-icon btn-excluir pi pi-trash" @click="clickExcluir(task.id)"></i>
      </span>
    </li>
  </ul>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useTaskList } from '@/stores/task.js';

export default {
  name: "ListaItem",
  props: {
    lista: Array
  },
  computed: {
    ...mapState(useTaskList, ["concluido", "andamento", "pendente"]),
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
    clickEditar() {
      debugger;
    },
    clickExcluir() {
      debugger;
    },
  }
}
</script>
    
<style lang="scss">
.lista-item {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;

  li {
    height: 4rem;
    border-radius: 0.4rem;
    background-color: white;
    overflow: hidden;
    list-style: none;
    display: grid;
    gap: 0.5rem;
    align-items: center;
    grid-template-columns: 2.5rem auto;

    .status-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;

      &.concluido {
        background-color: #8bae2c;
      }

      &.pendente {
        background-color: #d94f3a;
      }

      &.andamento {
        background-color: #ff922a;
      }

      i {
        font-size: 1.5rem;
      }
    }

    .description {
      p {
        height: 3rem;
        color: black;
        display: flex;
        align-items: center;
        display: none;
      }

      input {
        height: 3rem;
        width: 100%;
        border: 0;
      }
    }

    .actions {
      position: absolute;
      right: 0;
      color: grey;

      .btn-icon {
        font-size: 1rem;
      }
    }
  }
}
</style>