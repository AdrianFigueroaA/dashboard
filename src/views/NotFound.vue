<template>
  <div class="not">
    
      <h1>Estás en el lugar equivocado!</h1>

      <a-button  href="Home" variant="success"
        >Volver a Inicio</a-button
      >

      <div class="dinofound"></div>
   
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.not {
  text-align: center;
  padding-top: 80px;
  font-family: "Open Sans", sans-serif;
}

h1 {
  padding: 20px;
}
.dinofound {
  background-image: url("https://firebasestorage.googleapis.com/v0/b/dinosaurios-de-chile.appspot.com/o/capturas%20readme%2Fimagen_notfound.jpg?alt=media&token=883835b9-1345-4ac4-a69b-34714010b26a");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: 400px;
  margin: 30px;
}
</style>
