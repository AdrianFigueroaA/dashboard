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
      await firebase
        .firestore()
        .collection("usuarios")
        .onSnapshot((snapshot) => {
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
        edad: payload.alimentacion,
        direccion: payload.tipo.toLowerCase(),
      
      };

      try {
         firebase
          .firestore()
          .collection("usuarios")
          .add(user);
      } catch (error) {
        console.error("Hay un error en la carga del usuario:", error);
      }
    },

    borrarUser({ commit }, id) {
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

    editUser({ commit }, dino) {
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
