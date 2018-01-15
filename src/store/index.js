import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rasgada: {
      nome: '',
      comentario: '',
      cidade: '',
      referencia: '',
      votosPositivos: 0,
      votosNegativos: 0,
      horario: '',
      id: ''
    },
    listaRasgadas: [{
      "nome": "Kelvin Campelo",
      "cidade": "Teresina",
      "referencia": "venal ninja labs",
      "comentario": "Muito loco\n",
      "id": 6238
    }],
    paginaLista: 1,
    proximaPagina: '',
    totalPagina: '',
    fimDaLista: false,
    inicializado: false
  },
  getters: {
    getLista(state) {
      return state.listaRasgadas;
    },
    getFimDaLista(state) {
      return state.fimDaLista;
    }
  },
  mutations: {
    cadastrarRasgada(state, rasgada) {
      //rasgada.id = getRandomInt(1, 10000);
      //state.rasgada = rasgada;
      return new Promise((resolve, reject) => {
        try {
          state.listaRasgadas.unshift(rasgada);
          resolve()
        } catch (error) {
          reject(error);
        }
      })
    },
    carregaLista(state, data) {
      return new Promise((resolve, reject) => {
        try {
          if (!state.inicializado) {
            state.proximaPagina = data.nextPage;
            state.listaRasgadas = data.rasgadas;
            state.inicializado = true;
          }
          resolve(state.listaRasgadas)
        } catch (error) {
          reject(error);
        }
      })
    },
    adicionarFimDaLista(state, data) {
      return new Promise((resolve, reject) => {

        state.proximaPagina = data.nextPage;

        data.rasgadas.forEach(rasgada => {
          state.listaRasgadas.push(rasgada);
        })

        if (state.proximaPagina === state.paginaLista) {
          state.fimDaLista = true;
        }
      })
    },
    adicionaVotoPositivo(state, id) {
      const indexRasgada = state.listaRasgadas.findIndex(rasgada => rasgada.id === id);
      if (state.listaRasgadas[indexRasgada].votosPositivos)
        state.listaRasgadas[indexRasgada].votosPositivos += 1;
      else
        state.listaRasgadas[indexRasgada].votosPositivos = 1;
    },
    adicionaVotoNegativo(state, id) {
      const indexRasgada = state.listaRasgadas.findIndex(rasgada => rasgada.id === id);
      if (state.listaRasgadas[indexRasgada].votosNegativos)
        state.listaRasgadas[indexRasgada].votosNegativos += 1;
      else
        state.listaRasgadas[indexRasgada].votosNegativos = 1;
    },
  },
  actions: {
    salvar({
      commit
    }, rasgada) {
      return Vue.resource('rasgadas').save(rasgada).then(res =>
        commit('cadastrarRasgada', res.body)
      );
    },
    votarPositivo({
      commit,
      dispatch
    }, id) {
      return Vue.resource('rasgadas{/id}/up').update({
        id
      }, {
        id
      }).then(res => {
        commit('adicionaVotoPositivo', id)
        return dispatch('listar')
      });
    },
    votarNegativo({
      commit,
      dispatch
    }, id) {
      return Vue.resource('rasgadas{/id}/down').update({
        id
      }, {
        id
      }).then(res => {
        commit('adicionaVotoNegativo', id)
        return dispatch('listar');
      });
    },
    listar({
      commit
    }) {
      return Vue.resource('rasgadas').get().then(res => commit('carregaLista', res.body))
    },
    listarAntigas({
      commit,
      state
    }) {
      if (state.proximaPagina == state.paginaLista) {
        state.fimDaLista = true;
        return new Promise((resolve, reject) => resolve({
          fimDaLista: true
        }))
      } else {
        return Vue.resource('rasgadas').get({
          p: state.proximaPagina
        }).then(res => {
          state.paginaLista = state.proximaPagina;
          commit('adicionarFimDaLista', res.body)
        })
      }
    }
  }
})

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
