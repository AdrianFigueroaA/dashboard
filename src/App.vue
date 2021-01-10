<template>
  <div id="app">
    <router-view />
   
  </div>
</template>

<style lang="scss"></style>

<script>
import { mapActions } from "vuex";
import firebase from "firebase";
export default {
  
  name: "app",
  components: {
  
  },

  methods: {
    ...mapActions(["getData"]),

  },

  created(){

    this.getData();
  }

};
</script>
