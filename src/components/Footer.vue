<template>
      <div class="footer">
          <a href="https://github.com/AdrianFigueroaA">
            Desarrollado  por <span>Adrian Figueroa.</span></a>
      </div>
</template>

<script>
export default {
    name: "Footer",

}
</script>

<style lang="scss">

.footer {
    height: 100px;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 20px;
      a {
          color:white ;
          span {    

            color: #099745;
          }
      } 

    
}

</style>