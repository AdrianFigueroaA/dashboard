import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase";

Vue.use(Vuex)

export default new Vuex.Store({
  
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
    SET_DATA(state, payload) {
      let newList = [];
      payload.forEach((user) => {
        user.data['id'] = user.id
        newList.push(
          user.data
        );
        // console.log(newList)
      });
      state.Usuarios = newList;
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
          console.log(snapshot);
          let listadoUsuarios = [];
          snapshot.forEach((p) => {
            listadoUsuarios.push({
              id: p.id,
              data: p.data(),
            });
          });
          commit("SET_DATA", listadoUsuarios);
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
});
