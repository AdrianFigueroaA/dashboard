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
        <a-input   v-model="usuarioEditado.nombre"  placeholder="Nombre" />
        <a-input placeholder="Edad" />
        <a-input placeholder="Direccion" />
     
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

usuarioEditado: {
        nombre:"",
        edad:"",
        direccion:"",

},

      loading: false,
      visible: false,
    };
  },

 computed: {
    ...mapState(["Usuarios"]),
  
  },

  methods: {

      ...mapActions(["editUser"], ["getData"]),

      EditarUsuario() {
      this.editUser(this.Usuarios);
      console.log("editando",this.Usuario);
    },


   editar() {
      this.usuarioEditado.id = especie.id;
      this.usuarioEditado.data.tipo = especie.tipo;
      this.usuarioEditado.data.nombre = nuevo.nombre;
    
    },


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