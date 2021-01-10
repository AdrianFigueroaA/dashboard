<template>
  <div>
    <a-button type="primary" @click="showModal">
      Agregar Usuario
    </a-button>
    <a-modal v-model="visible" title="Creacion de Usuario" on-ok="handleOk">
      <template slot="footer">
        <a-button key="back" @click="handleCancel">
          Cancelar
        </a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="loading"
         

          @click="AgregarUsuario"
        >
          Crear
        </a-button>
      </template>
      <a-input v-model="usuario.nombre" placeholder="Nombre" />
      <a-input v-model="usuario.edad" placeholder="Edad" />
      <a-input v-model="usuario.direccion" placeholder="Direccion" />
    </a-modal>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import firebase from "firebase";
export default {
    name:"AgregarUser",
  data() {
    return {

    usuario: {
          nombre:"",
          edad:"",
          direccion:""
    },

      loading: false,
      visible: false,
    };
  },
  methods: {


...mapActions(["addData"]),

    AgregarUsuario() {
      this.handleOk()
      this.addData(this.usuario);
      console.log("usuario agregado")
    },
    ClearData() {
      this.usuario.nombre = "";
      this.usuario.edad = "";
      this.usuario = "";
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

    
  }

</script>


