<template>
  <div>
    <InputText v-model="this.form.titulo" />
    <!-- <InputText v-model="form.descricao" /> -->
    <Button class="p-button-danger p-button-rounded p-button-sm p-button-text" label="Cancelar" @click="this.closeDialog" />
    <Button class="p-button-success p-button-rounded p-button-sm p-button-text" label="Salvar" @click="this.updateTitulo" />
  </div>
</template>

<script>
import { mapState } from 'pinia';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { useTaskList } from '../stores/task';
import { info, success, warn, error } from '@/services/ServiceToast';

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
    }
  },
  created() {
    this.form.titulo = this.task.titulo;
  }
}

</script>

<style lang="scss"></style>