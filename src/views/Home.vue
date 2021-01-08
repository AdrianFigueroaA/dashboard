<template>
  <div class="home">
   <a-collapse >
      <a-collapse-panel  header="Dashboard">
        <a-button type="primary" @click="showModal">
      Login
    </a-button>
      </a-collapse-panel>
    </a-collapse>
  

    



    <a-modal v-model="visible" title="Login Administrador" on-ok="handleOk">
      <template slot="footer">
        <a-button key="back" @click="handleCancel">
          Cancelar
        </a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="login">
          Ingresar
        </a-button>
      </template>
      <div class="login">
     <h3 class="mx-auto"  >Ingresa tus Datos</h3>
    <a-input placeholder="Usuario" v-model="usuario" />
    <a-input placeholder="Contraseña" v-model="contrasena" />
 
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
        usuario: "",
      contrasena: "",
    }

    
  },
  methods: {

login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.usuario, this.contrasena)
        .then(
          (user) => {
            this.$router.push("AdminCrud");
          },
          (error) => console.error(error)
        );
    },

    async  getData() {

      const APP_ID = '5ff76c95952b26f8147db9f6';
      const baseUrl = "https://dummyapi.io/data/api"
      // Make a request for a user with a given ID
      await axios.get(`${baseUrl}/post?limit=10`, { headers: { 'app-id': APP_ID } })
        .then((response) => {
          // handle success
          this.dataDum = response.data.data.splice(7);
        
         console.log(response.data.data)
 
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
 
    } ,

showModal() {
      this.visible = true;
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
            this.getData();
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