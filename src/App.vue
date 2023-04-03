<template>
  <TheHeader @searchFilm="search"/>
  <main class="my-3 container m-auto">

    <h2 v-if="foundSomething() && !(storage.loadingFilm || storage.loadingTvShow)" class="text-center">{{ this.storage.uiMessage }}</h2>

<!-- FILM/TV SHOW SECTION -->
    <div v-else>

    <!-- FILM -->
      <section>
        <h2 class="my-3">Lista dei film:</h2>
        <loadingComp v-if="storage.loadingFilm" />
        <div v-else>
          <ul v-if="storage.filmList.length > 0" class="list-style-none d-flex flex-wrap m-auto">
            <CardFilmSerie class="card-container" v-for="film in storage.filmList"
            :filmOrTv="film"
            :load="storage.loadingFilm"
            />
          </ul>
          <h3 v-else>Non sono stati trovati film che contengano "{{ storage.lastSearch }}" nel proprio titolo</h3>
        </div>
      </section>
        
    <!-- TV SHOW -->
      <section>
        <h2 class="my-3">Lista delle serie tv:</h2>
        <loadingComp v-if="storage.loadingTvShow" />
        <div v-else>
          <ul v-if="storage.seriesList.length > 0" class="list-style-none d-flex flex-wrap m-auto">
              <CardFilmSerie class="card-container" v-for="serie in storage.seriesList"
                :filmOrTv="serie"
                :load="storage.loadingTvShow"
              />
          </ul>
          <h3 v-else>Non sono state trovate serie TV che contengano "{{ storage.lastSearch }}" nel proprio titolo</h3>
        </div>
      </section>

    </div>
  </main>
</template>

<script>
import axios from 'axios';
import { storage } from './storage.js';

import TheHeader from './components/TheHeader.vue';
import CardFilmSerie from './components/CardFilmSerie.vue';
import loadingComp from './components/loadingComp.vue';
export default{
  data() {
    return {
      storage
    }
  },
  components: {
    TheHeader,
    CardFilmSerie,
    loadingComp
  },
  methods: {
    urlApi(type, ...parameters){
      let urlApi = 'https://api.themoviedb.org/3/search';
      let api_key = 'cf09febcc95a3fe86961147afc012909';
      let par = '';
      if(parameters.length > 0){
        parameters.forEach(param => par+=`&${param}`);
      }
      return `${urlApi}/${type}?api_key=${api_key}${par}`;
    },
    search() {
      this.storage.lastSearch = this.storage.searchInput;
      this.storage.searchInput = '';
      this.storage.uiMessage = 'Non è stato trovato nessun risultato, prova a cercare un altro titolo';
      this.getFilmFromApi();
      this.getSeriesFromApi();
    },
    getFilmFromApi() {
      this.storage.filmList = [];
      this.storage.loadingFilm = true;
      // https://api.themoviedb.org/3/search/movie?api_key=cf09febcc95a3fe86961147afc012909&language=it-IT&query=prova
      axios.get(this.urlApi('movie', 'language=it-IT', `query=${this.storage.lastSearch}`))
      .then(response => {
        this.storage.filmList = response.data.results;
        this.storage.loadingFilm = false;
      }).catch(error => {
        this.storage.filmList = [];
        this.storage.loadingFilm = false;
      })
    },
    getSeriesFromApi() {
      this.storage.filmList = [];
      this.storage.loadingTvShow = true;
      // https://api.themoviedb.org/3//search/tv?api_key=cf09febcc95a3fe86961147afc012909&language=it-IT&query=prova
      axios.get(this.urlApi('tv', 'language=it-IT', `query=${this.storage.lastSearch}`))
      .then(response => {
        this.storage.seriesList = response.data.results;
        this.storage.loadingTvShow = false;
      }).catch(error => {
        storage.seriesList = [];
        this.storage.loadingTvShow = false;
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
