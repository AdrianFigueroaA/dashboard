<template>
  <div>
    <a-button type="primary" @click="showModal">
      Editar Usuario
    </a-button>
    <a-modal v-model="visible" title="Editar Informacion" on-ok="handleOk">
      <template slot="footer">
        <a-button key="back" @click="handleCancel">
          Cancelar
        </a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
          Modificar
        </a-button>
      </template>
        <a-input placeholder="Nombre" />
        <a-input placeholder="Edad" />
        <a-input placeholder="Direccion" />
     
    </a-modal>
  </div>
</template>
<script>
export default {

    name:"EditarUser",
  data() {
    return {
      loading: false,
      visible: false,
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.loading = true;
      setTimeout(() => {
        this.visible = false;
        this.loading = false;
      }, 3000);
    },
    handleCancel(e) {
      this.visible = false;
    },
  },
};
</script>