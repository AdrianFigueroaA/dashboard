<template>
  <div class="Create_Users">
    <div class="nav">
      <h1>Portal de Administracion de Usuarios</h1>
      <div class="buttonLogout">
        <a-button @click="logOut" variant="danger">Cerrar Sesión</a-button>
      </div>
    </div>

  <a-table :columns="columns" :data-source="Usuarios">
  
    <a ></a>
    <div slot="action" slot-scope="text, user" > 
       <EditarUser :user="user" />
       <a-button  v-on:click.stop.prevent="borrar(user.id)"  >Borrar</a-button>
       

       
    </div>
    
  </a-table>


    <div class="Agregar">
      <AgregarUser />
      
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import AgregarUser from "../components/AgregarUser.vue";
import EditarUser from "../components/EditarUser.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "AdminCrud",
  components: {
    AgregarUser,
    EditarUser,
  },
  data() {
    return {
      data: [

      ],
  newUsuarios: [],
      columns: [
        {
          title:"Nombre",
          dataIndex: "nombre",
          key: "nombre",
          slots: { title: "nombre" },
          scopedSlots: { customRender: "nombre" },
        },
        {
          title: "Edad",
          dataIndex: "edad",
          key: "edad",
        },
        {
          title: "Direccion",
          dataIndex: "direccion",
          key: "direccion",
        },
        {
          title: "Acciones",
          dataIndex: "id",
          key: "id",
          
          scopedSlots: { customRender: "action" },
        },
      ],
    };
  },

  computed: {
    ...mapState(["Usuarios"]),
  
  },


update() {
this.Usuarios.map(x =>{

       this.newUsuarios.push(x.data)
     })

},
  methods: {
    ...mapActions(["borrarUsuario"], ["getData"]),

    borrar: function(id) {

      this.borrarUsuario(id);
      
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
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap");

.Agregar {
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav {
  background: #34495e;
}
h1 {
  font-family: "Roboto", sans-serif;
  color: white;
  padding-top: 20px;
}
.buttonLogout {
  height: 45px;
  display: flex;
  justify-content: end;
  align-items: center;
  padding-right: 15px;
  background: #34495e;
  border-bottom: 2px solid black;
}
</style>
