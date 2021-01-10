<template>
  <div class="Create_Users">
    <div class="nav">
      <h1>Portal de Administracion de Usuarios</h1>
      <div class="buttonLogout">
        <a-button @click="logOut" variant="danger">Cerrar Sesión</a-button>
      </div>
    </div>










  <a-table :columns="columns" :data-source="Usuarios">
    <!-- <a slot="name" >{{usuario.data.nombre}}</a> -->
    <!-- <a > <EditarUser /></a> -->
    <!-- <template
      v-for="col in ['nombre', 'edad', 'direccion']"
      :slot="col"
    >
      <div :key="col.data">
      col.data.nombre
       
      </div>
    </template> -->
    
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
          title:"nombre",
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
          key: "action",
          
          // scopedSlots: { customRender: "action" },
        },
      ],
    };
  },

  computed: {
    ...mapState(["Usuarios"]),
  
  
  },

 created() {


    console.log(this.Usuarios)
 },


update() {
this.Usuarios.map(x =>{

       this.newUsuarios.push(x.data)
     })

},
  methods: {
    ...mapActions(["borrarUser"], ["getData"]),

    borrar(id) {
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
