<template>
  <TheHeader @searchFilm="search"/>
  <main class="my-3">
    <h2 v-if="foundSomething()" class="text-center">{{ this.storage.uiMessage }}</h2>
    <div v-else>
      <FilmList />
      <SeriesList />
    </div>
  </main>
</template>

<script>
import axios from 'axios';
import { storage } from './storage.js';

import TheHeader from './components/TheHeader.vue';
import FilmList from './components/FilmList.vue';
import SeriesList from './components/SeriesList.vue';
export default{
  data() {
    return {
      storage
    }
  },
  components: {
    TheHeader,
    FilmList,
    SeriesList
  },
  methods: {
    urlApi(type, ...parameters){
      let urlApi = 'https://api.themoviedb.org/3/search';
      let api_key = 'cf09febcc95a3fe86961147afc012909';
      let par = '';
      if(parameters.length > 0){
        parameters.forEach(param => par+=`&${param}`);
      }
      return `${urlApi}/${type}?api_key=${api_key}${par}`
    },
    search() {
      this.uiMessage = 'Non è stato trovato nessun risultato, prova a cercare un altro titolo'
      this.getFilmFromApi();
      this.getSeriesFromApi();
    },
    getFilmFromApi() {
      // https://api.themoviedb.org/3/search/movie?api_key=cf09febcc95a3fe86961147afc012909&language=it-IT&query=prova
      axios.get(this.urlApi('movie', 'language=it-IT', `query=${this.storage.searchInput}`))
      .then(response => {
        storage.filmList = response.data.results;
      }).catch(error => {
        console.log('Non è stato possibile completare la tua ricerca, prova di nuovo');
        storage.filmList = [];
      })
    },
    getSeriesFromApi() {
      console.log(this.storage.seriesList)
      // https://api.themoviedb.org/3//search/tv?api_key=cf09febcc95a3fe86961147afc012909&language=it-IT&query=prova
      axios.get(this.urlApi('tv', 'language=it-IT', `query=${this.storage.searchInput}`))
      .then(response => {
        storage.seriesList = response.data.results;
      }).catch(error => {
        console.log('Non è stato possibile completare la tua ricerca, prova di nuovo');
        storage.seriesList = [];
      })
    },
    foundSomething(){
      return (storage.filmList.length == 0 && storage.seriesList.length == 0);
    }
  }
}
</script>

<style lang="scss">
@use "./styles/general.scss";
</style>
