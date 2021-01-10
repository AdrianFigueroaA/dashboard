<template>
  <div class="home">
    <div class="buttonLogin">
      <h1>Dashboard</h1>
      <a-button type="primary" @click="showModal">
        Login
      </a-button>
    </div>

    <a-modal v-model="visible" title="Ingresa tus Datos">
      <template slot="footer">
        <a-button
          key="register"
          v-if="!showSuccessMessage"
          @click="createUser()"
        >
          Registrar
        </a-button>
        <a-button key="submit" type="primary" @click="login">
          Ingresar
        </a-button>
      </template>
      <div class="login">

        <a-input placeholder="Correo" v-model="email" />
        <a-input-password placeholder="Contraseña" v-model="password" />

        <a-alert
          v-if="showSuccessMessage"
          message="Cuenta Creada Presione Ingresar"
          type="info"
        />
      </div>
    </a-modal>

    <div class="container">
      <div class="cards">
        <a-row :gutter="10" type="flex" justify="center" >
          <a-col :span="8" v-for="(dum, i) in dataDum" :key="i">
            <a-card hoverable style="width: 240px">
              <img
                class="a-img"
                slot="cover"
                alt="example"
                :src="dum.image"
                size="small"
              />
              <a-card-meta :title="dum.text">
                <template slot="description">
                  <p>Fecha publicacion {{ dum.publishDate }}</p>
                  <p>likes {{ dum.likes }}</p>


                </template>
              </a-card-meta>
            </a-card>
          </a-col>
        </a-row>
      </div>
      <div class="graficos">
        <div id="piechart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import firebase from "firebase";
export default {
  name: "Home",

  data() {
    return {
      dataDum: [],
      originalData:[],
      visible: false,
      showSuccessMessage: false,
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            this.$router.push("AdminCrud");
          },
          (error) => console.error(error)
        );
    },

    createUser() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          this.showSuccessMessage = true;
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
        });
    },

    async getDataDogs() {
      const APP_ID = "5ff76c95952b26f8147db9f6";
      const baseUrl = "https://dummyapi.io/data/api";

      await axios
        .get(`${baseUrl}/post?limit=10`, { headers: { "app-id": APP_ID } })
        .then((response) => {
          this.dataDum = response.data.data.splice(7);
          this.originalData = response.data.data;
        })
        .catch(function(error) {
          console.log(error);
        })
    },

    showModal() {
      this.visible = true;
      this.showSuccessMessage = false;
    },

  },

  created() {
    this.getDataDogs();
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      var data = google.visualization.arrayToDataTable([
        ["Task", "Hours per Day"],
        ["likes", 11],
        ["raza", 2],

      ]);

      var options = {
        title: "Resumen Canino",
        width: 500,
        height: 350,
      };

      var chart = new google.visualization.PieChart(
        document.getElementById("piechart")
      );

      chart.draw(data, options);
    }
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap");

.container {
  display: flex;
}

.buttonLogin {
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 15px;
  background: #34495e;
  border-bottom: 2px solid black;
}
h1 {
  margin-left: 20px;
  font-family: "Roboto", sans-serif;
}
.graficos {
  margin-top: 20px;
  width: 490px;
  padding: 10px;
}

.a-img {
  height: 200px;
}

.ant-modal-header {
  text-align: center;
}

h1,
h3 {
  text-align: center;
}

.cards {
  width: 800px;
  border-radius: 25px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #3498db;
  margin: 20px 0 0 10px;
  padding: 20px 0;
  
}

.ant-input {
   margin: 10px 0 !important;
}
</style>
