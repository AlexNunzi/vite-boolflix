<template>
  <TheHeader @searchFilm="search"/>
  <main class="my-3 container m-auto">
    <h2 v-if="foundSomething()" class="text-center">{{ this.storage.uiMessage }}</h2>

<!-- FILM/TV SHOW SECTION -->
    <div v-else>

    <!-- FILM -->
      <section>
        <h2 class="my-3">Lista dei film:</h2>
        <ul v-if="storage.filmList.length > 0" class="list-style-none d-flex flex-wrap m-auto">
          <CardFilmSerie class="card-container" v-for="film in storage.filmList"
          :filmOrTv="film"
          />
        </ul>
        <h3 v-else>Non sono stati trovati film che contengano "{{ storage.searchInput }}" nel proprio titolo</h3>
      </section>
        
    <!-- TV SHOW -->
      <section>
        <h2 class="my-3">Lista delle serie tv:</h2>
        <ul v-if="storage.seriesList.length > 0" class="list-style-none d-flex flex-wrap m-auto">
            <CardFilmSerie class="card-container" v-for="serie in storage.seriesList"
              :filmOrTv="serie"
            />
        </ul>
        <h3 v-else>Non sono state trovate serie TV che contengano "{{ storage.searchInput }}" nel proprio titolo</h3>
      </section>

    </div>
  </main>
</template>

<script>
import axios from 'axios';
import { storage } from './storage.js';

import TheHeader from './components/TheHeader.vue';
import CardFilmSerie from './components/CardFilmSerie.vue';
export default{
  data() {
    return {
      storage
    }
  },
  components: {
    TheHeader,
    CardFilmSerie
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
