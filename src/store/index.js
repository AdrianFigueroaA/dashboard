import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase";

Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    Usuarios: [],
    add: false,
  },
  getters: {
    datos(state) {
      return state.Usuarios;
    },
  },
  mutations: {
    setData(state, payload) {
      state.Usuarios = payload;
    },
    AddData(state, payload) {
      state.Usuarios.push(payload);
    },
    MostrarAdd(state) {
      state.add = !state.add;
    },
  },
  actions: {
    async getData({ commit }) {
      console.log("indexgetdata")
      await firebase
        .firestore()
        .collection("usuarios")
        .onSnapshot((snapshot) => {
          console.log(snapshot);
          let listadoUsuarios = [];

          snapshot.forEach((p) => {
            listadoUsuarios.push({
              id: p.id,
              nombre: p.data().nombre,
              edad: p.data().edad,
              direccion:p.data().direccion
            });
          });
          commit("setData", listadoUsuarios);
        });
        
    },
     addData({ commit }, payload) {
      const User = {
        
        nombre: payload.nombre.toLowerCase(),
        edad: payload.edad,
        direccion: payload.direccion.toLowerCase(),
        
      
      };

      try {
         firebase
          .firestore()
          .collection("usuarios")
          .add(User);
      } catch (error) {
        console.error("Hay un error en la carga del usuario:", error);
      }
    },

    borrarUsuario({ commit }, id) {
      try {
        firebase
          .firestore()
          .collection("usuario")
          .doc(id)
          .delete();
      } catch (error) {
        console.error("Hay un error en la eliminacion del Usuario:", error);
      }
    },

    editUser({ commit }, user) {
      try {
        firebase
          .firestore()
          .collection("usuario")
          .doc(user.id)
          .update(user.data);
      } catch (error) {
        console.error("hay un error en la edicion del usuario:", error);
      }
    },
  },
};
