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
        <a-button key="submit" type="primary" :loading="loading" @click="EditarUsuario(user)">
          Modificar 
        </a-button>
      </template>
        <a-input  v-model="user.nombre"  placeholder="Nombre" />
        <a-input  v-model="user.edad" placeholder="Edad" />
        <a-input  v-model="user.direccion" placeholder="Direccion" />
     
    </a-modal>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import firebase from "firebase";
export default {

    name:"EditarUser",
  data() {
    return {
      loading: false,
      visible: false,
    };
  },

 props: {
    user: Object,
  },

 computed: {
    ...mapState(["Usuarios"]),
  },

  methods: {

      ...mapActions(["editUser"], ["getData"]),

      EditarUsuario(user) {
        this.handleOk()
        this.editUser(user);
      
      
    },

    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.loading = true;
      setTimeout(() => {
        this.visible = false;
        this.loading = false;
      }, 2000);
    },
    handleCancel(e) {
      this.visible = false;
    },
  },
};
</script>