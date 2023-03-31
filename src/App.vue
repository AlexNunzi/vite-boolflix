<template>
  <TheHeader @searchFilm="getFilmFromApi"/>
  <main class="mt-3">
    <FilmList />
  </main>
</template>

<script>
import axios from 'axios';
import { storage } from './storage.js';

import TheHeader from './components/TheHeader.vue';
import FilmList from './components/FilmList.vue';
export default{
  data() {
    return {
      storage
    }
  },
  components: {
    TheHeader,
    FilmList,
  },
  methods: {
    getFilmFromApi() {
      // https://api.themoviedb.org/3/search/movie?api_key=cf09febcc95a3fe86961147afc012909&language=it-IT&query=prova
      let urlApi = 'https://api.themoviedb.org/3/search/movie?';
      let api_key = 'cf09febcc95a3fe86961147afc012909';
      let languageApi = 'it-IT';
      let queryApi = storage.searchInput;
      urlApi += `api_key=${api_key}&language=${languageApi}&query=${queryApi}`
      axios.get(urlApi)
      .then(response => {
        storage.filmList = response.data.results;
      }).catch(error => {
        console.log('errore');
      })
    }
  }
}
</script>

<style lang="scss">
@use "./styles/general.scss";
</style>
