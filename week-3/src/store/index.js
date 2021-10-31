import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    title: 'patika',
    number: 0,
    apiURL: 'https://imdb8.p.rapidapi.com/',
    headers: {
      'x-rapidapi-host': 'imdb8.p.rapidapi.com',
      'x-rapidapi-key': '' //api kodu
    },
    searchResults: [],
    favMovies: [],
    movieDetails: [],
    actorDetails: [],
  },
  mutations: {
    SET_NUMBER(state,payload) {
      state.number = payload
    },
    SET_MOVIE_SEARCH_RESULT(state,payload) {
      state.searchResults = payload
    },
    SET_FAV(state,payload) {
      switch (payload.type) {
        case 'add': {
          let i = state.searchResults.findIndex(el => el.id === payload.movie.id)
          state.searchResults[i] = {...state.searchResults[i], fav: true}
          state.favMovies.push(payload.movie)
        }
          break;
        default: {
         let i = state.favMovies.findIndex(el => el.id === payload.movie.id)
          state.searchResults[i] = {...state.searchResults[i], fav: false}
          state.favMovies.splice(i, 1)
        }
      }
    },
    SET_MOVIE_DETAIL(state, payload) {
      if (payload.type === 'add') {
        state.movieDetails = payload.data
      } else if (payload.type === 'del') {
        state.movieDetails = []
      }
    },
    SET_ACTOR_DETAIL(state, payload) {
      if (payload.type === 'add') {
        state.actorDetails = payload
      } else if (payload.type === 'del') {
        state.actorDetails = []
      }
    },
  },
  actions: {
    getNumber({ commit },payload) {
      let number = 0
      for (let i = 0; i <= payload; i++) {
        number += i
      }
      console.log(number, typeof number)
      commit('SET_NUMBER', number)
    },
    searchFromMovieTitle({ state, commit }, payload) {
      commit("SET_MOVIE_SEARCH_RESULT", [])
      return axios.get(`${state.apiURL}/title/find`, {
        headers: { ...state.headers },
        params: { q: payload }
      })
          .then(res => {
            console.log(res.data.results);
            let data = []
            for (let i = 0; i < res.data.results.length; i++) {
              if (res.data.results[i].image) data.push(res.data.results[i])
            }
            commit("SET_MOVIE_SEARCH_RESULT", data)
          })
          .catch(err => console.log(err))
    },
    getMovieDetail({ state, commit }, payload) {
      return axios.get(`${state.apiURL}/title/get-details`, {
        headers: { ...state.headers },
        params: { tconst: payload }
      })
          .then(res => {
            console.log(res);
            commit('SET_MOVIE_DETAIL', {data: res.data, type: 'add'})
          })
          .catch(err => console.log(err))
    },
    getActorDetails({ state, commit }, payload) {
      return axios.get(`${state.apiURL}/actors/get-bio`, {
        headers: { ...state.headers },
        params: { nconst: payload }
      })
          .then(res => {
            console.log(res);
            commit('SET_ACTOR_DETAIL', {data: res.data, type: 'add'})
          })
          .catch(err => console.log(err))
    },
  },

  getters: {
    searchTypeMovie: (state) => {
      let res = 0;
      for (let i = 0; i < state.searchResults.length; i++) {
        if(state.searchResults[i].titleType === 'movie') res++
      }
      return res
    },
    favNumber: (state) => {
      return state.favMovies.length
    }
  },
  modules: {},
});
