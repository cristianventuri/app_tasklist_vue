<template>
  <div class="edit-item" @keypress="this.pressUpdateTitulo">
    <div class="formulario">
      <InputText v-model="this.form.titulo" />
      <!-- <InputText v-model="form.descricao" /> -->
    </div>
    <div class="action">
      <Button class="p-button-danger p-button-rounded p-button-sm p-button-text" label="Cancelar" icon="pi pi-times"
        @click="this.closeDialog" />
      <Button class="p-button-primary p-button-rounded p-button-sm p-button-text" label="Confirmar" icon="pi pi-check"
        @click="this.updateTitulo" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { useTaskList } from '../stores/task';
import { success, error } from '@/services/ServiceToast';

export default {
  name: "EditarItem",
  components: {
    InputText, Button
  },
  inject: ['dialogRef'],
  data() {
    return {
      ...this.dialogRef.data,
      form: {
        titulo: '',
      }
    }
  },
  computed: {
    ...mapState(useTaskList, ["updateTaskTitulo", "getTaskById"]),
  },
  methods: {
    closeDialog() {
      error('Atenção', 'A alteração dos dados foi cancelada.');
      this.dialogRef.close();
    },
    updateTitulo() {
      success('Sucesso', 'Os dados da tarefa foram atualizados.');
      this.updateTaskTitulo(this.task.id, this.form.titulo);
      this.dialogRef.close();
    },
    pressUpdateTitulo(event) {
      if ((event.keyCode === 13) && (this.form.titulo.trim() !== '')) {
        this.updateTitulo();
      }
    }
  },
  created() {
    this.form.titulo = this.task.titulo;
  }
}

</script>

<style lang="scss">
.p-dialog-content {
  padding: 0 1.5rem 1.5rem !important;

  .edit-item {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    min-width: 20rem;

    input {
      width: 100%;
    }

    .action {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>