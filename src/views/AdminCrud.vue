<template>
  <div class="Create_Users">
<h1>
        Portal de Administracion de Usuarios
      </h1>
<div class="buttonLogout">
  
<a-button  @click="logOut" variant="danger" >Cerrar Sesión</a-button>
</div>



 <a-table :columns="columns" :data-source="data">
    <a slot="name" slot-scope="text">{{ text }}</a>
    <span slot="customTitle"><a-icon  /> Nombre</span>
    <span slot="personal" slot-scope="personal">
      <a-tag v-for="per in personal" :key="per">
        {{ per.nombre }}
      </a-tag>
    </span>
    <span slot="action">
      <a-button>Borrar</a-button>
      <a-divider type="vertical" />
      <EditarUser />
    </span>
  </a-table>
  
        <div class="Agregar">
        <AgregarUser />
        </div>

        <div class="link-id">
                <a href="https://github.com/AdrianFigueroaA">
                  Desarrollado  por <span>Adrian Figueroa.</span></a>
              </div>
    
  </div>
</template>

<script>

import firebase from "firebase";
import AgregarUser from '../components/AgregarUser.vue';
import EditarUser from '../components/EditarUser.vue';
import { mapActions, mapState } from "vuex";
export default {
  name:"AdminCrud",
  components: { 
    AgregarUser ,
    EditarUser
  },
   data() {
    return {
      data:[
{
          nombre: "adrian",
          direccion: "sdwegh",
          edad:"31",
      },

      ] ,
      columns: [
          {
            dataIndex: 'nombre',
            key: 'nombre',
            slots: { title: 'customTitle' },
            scopedSlots: { customRender: 'name' },
          },
          {
            title: 'Edad',
            dataIndex: 'edad',
            key: 'edad',
          },
          {
            title: 'Direccion',
            dataIndex: 'direccion',
            key: 'direccion',
          },
          
          {
            title: 'Acciones',
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
        ]
    };
  },

  computed: {
    ...mapState(["Usuarios"]),
  },
 
  methods : {
 ...mapActions(["borrarUser"]),

    borrar(id) {
      this.borrarDino(id);
    },


  logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/");
        })
        .catch((e) => {
          console.error("Sign Out Error", e);
        });
    },

  }
};
</script>

<style lang="scss">

.Agregar {
  display: flex;
  justify-content: center;
  align-items: center;
}
.buttonLogout {
 
  height: 45px;
  display: flex;
  justify-content: end;
  align-items: center;
  margin-right: 15px;

 
}

.link-id {
    display: flex;
    justify-content: center;
    font-weight: bold;
    font-size: 20px;
      a {
          color: black ;
          span {    

            color: #099745;
          }
      } 

    
}


</style>