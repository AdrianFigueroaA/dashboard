<template>
  <div >
 <div class="login">
     <h5 class="mx-auto">Ingresa tus Datos</h5>
    <a-input placeholder="Usuario" v-model="usuario" />
    <a-input placeholder="Contraseña" v-model="contrasena" />
    <a-button  @click="login" type="primary" >Ingresar</a-button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "login",
  data() {
    return {
      usuario: "",
      contrasena: "",
    };
  },

  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.usuario, this.contrasena)
        .then(
          (user) => {
            this.$router.push("Admin");
          },
          (error) => console.error(error)
        );
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



<style  lang="scss">

.login {

    width: 400px;
    margin: auto;

}

</style>