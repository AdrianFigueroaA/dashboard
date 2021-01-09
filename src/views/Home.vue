<template>
  <div class="home">
  
  
<div class="buttonLogin" >

  <h1>Dashboard</h1>
  <a-button type="primary" @click="showModal">
      Login
    </a-button>
</div>
  
    <a-modal v-model="visible" title="Login Administrador" on-ok="handleOk">
      <template slot="footer">
        <a-button key="register"  v-if="!showSuccessMessage"  @click="createUser() ">
          Registrar 
        </a-button>
        <a-button key="submit" type="primary"  @click="login">
          Ingresar
        </a-button>
      </template>
      <div class="login">
     <h3 class="mx-auto"  >Ingresa tus Datos</h3>
    <a-input placeholder="Correo" v-model="email" />
     <a-input-password placeholder="Contraseña" v-model="password" />
     
  <a-alert  v-if="showSuccessMessage" message="Cuenta Creada Presione Ingresar" type="info" />


 
    </div>
     
    </a-modal>

   <div class="container">
      <div class="cards" >

          <a-row type="flex" justify="center" gutter={16} >
                      <a-col :span="6" v-for="(dum, i) in dataDum" :key="i">
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
                            
                              <p>likes {{dum.likes}}</p>
                              </template>
                            </a-card-meta>
                          </a-card>
                      </a-col>
                </a-row>
     </div>
<div class="graficos" >

<div id="piechart"  >





</div>

</div>
      </div>
      
  </div>
</template>

<script>
import axios from 'axios'
import firebase from "firebase";
export default {
  name: 'Home',

  data() {
  
    return {
        dataDum :[],
        visible: false,
        showSuccessMessage: false,
        email: "",
        password: "",
    }

    
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
          
          this.showSuccessMessage = true
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
        });
    },


    async  getDataDogs() {

      const APP_ID = '5ff76c95952b26f8147db9f6';
      const baseUrl = "https://dummyapi.io/data/api"
      // Make a request for a user with a given ID
      await axios.get(`${baseUrl}/post?limit=10`, { headers: { 'app-id': APP_ID } })
        .then((response) => {
          // handle success
          this.dataDum = response.data.data.splice(7);
 
        })
        .catch(function (error) {
         
          console.log(error);
        })
        .then(function () {
        });
 
    } ,

showModal() {
      this.visible = true;
      this.showSuccessMessage = false
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
      
    },
    handleCancel(e) {
      this.visible = false;
      
    },

    
    
  },

  created() {
            this.getDataDogs();
            google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Work',     11],
          ['Eat',      2],
          ['Commute',  2],
          ['Watch TV', 2],
          ['Sleep',    7]
        ]);

        var options = {
          title: 'Resumen Canino',
          'width':500,
          'height':350,
          'border-radius':25,
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
      }
      },

}
</script>


<style lang="scss">

.container {

  display: flex;
}

.buttonLogin {
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 15px;
}
h1 {

        margin-left: 20px;
      }
.graficos {
  margin-top: 20px;
  height: 340px;
  width: 490px;
  background: red;
  border: 0.5px red;;
  border-radius: 25px;
}

.a-img {

  height: 200px;
}
.login {

    width: 400px;
    margin: auto;

}

.home {

background:#2ecc71 ;

}

.ant-modal-header {

  text-align: center;
}

h1, h3 {

  text-align: center;
}

.cards {

  border: 0.5px  #3498db solid;
  width: 700px;
  border-radius: 25px;
  height: 350px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #3498db;
  margin: 20px;
}

.ant-input {

margin-bottom: 10px !important;
margin-top: 10px !important;

}
</style>