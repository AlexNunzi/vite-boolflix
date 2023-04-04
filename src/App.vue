<template>
  <TheHeader @searchFilm="search"/>
  <main class="my-3 container m-auto">

    <h2 v-if="foundSomething() && !(storage.loadingFilm || storage.loadingTvShow)" class="text-center">{{ this.storage.uiMessage }}</h2>

<!-- FILM/TV SHOW SECTION -->
    <div v-else>

      <!-- FILM -->
      <SectionComp 
      :sectionTitle=" 'Film' "
      :loadingContent="storage.loadingFilm"
      :contentList="storage.filmList"
       />

    <!-- TV SHOW -->
    <SectionComp 
      :sectionTitle=" 'Serie TV' "
      :loadingContent="storage.loadingTvShow"
      :contentList="storage.seriesList"
       />

    </div>
  </main>
</template>

<script>
import axios from 'axios';
import { storage } from './storage.js';

import TheHeader from './components/TheHeader.vue';
import CardFilmSerie from './components/CardFilmSerie.vue';
import LoadingComp from './components/LoadingComp.vue';
import SectionComp from './components/SectionComp.vue';
export default{
  data() {
    return {
      storage
    }
  },
  components: {
    TheHeader,
    CardFilmSerie,
    LoadingComp,
    SectionComp
  },
  methods: {
    urlApi(type, ...parameters) {
        let urlApi = 'https://api.themoviedb.org/3';
        let api_key = 'cf09febcc95a3fe86961147afc012909';
        let par = '';
        if(parameters.length > 0){
          parameters.forEach(param => par+=`&${param}`);
        }
        return `${urlApi}${type}?api_key=${api_key}${par}`;
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
      axios.get(this.urlApi('/search/movie', 'language=it-IT', `query=${this.storage.lastSearch}`))
      .then(response => {
        this.storage.filmList = response.data.results;
        this.storage.castFilm = [];
        this.storage.filmList.forEach((el, index) => this.getCastFromApi(`/movie/${el.id}/credits`,index));
        this.storage.loadingFilm = false;
      }).catch(error => {
        this.storage.filmList = [];
        this.storage.loadingFilm = false;
      })
    },
    getSeriesFromApi() {
      this.storage.seriesList = [];
      this.storage.loadingTvShow = true;
      // https://api.themoviedb.org/3/search/tv?api_key=cf09febcc95a3fe86961147afc012909&language=it-IT&query=prova
      axios.get(this.urlApi('/search/tv', 'language=it-IT', `query=${this.storage.lastSearch}`))
      .then(response => {
        this.storage.seriesList = response.data.results;
        this.storage.castSeries = [];
        this.storage.seriesList.forEach((el, index) => this.getCastFromApi(`/tv/${el.id}/credits`, index));
        this.storage.loadingTvShow = false;
      }).catch(error => {
        storage.seriesList = [];
        this.storage.loadingTvShow = false;
      })
    },
    getCastFromApi(typeId, index) {
      axios.get(this.urlApi(typeId))
      .then (response => {
        let credits = response.data;
        if(credits.cast.length > 5){
          credits.cast = credits.cast.slice(0, 5);
        }
        if(typeId.split('/')[1] == 'movie'){
          this.storage.filmList[index].castInfo = credits;
        } else {
          this.storage.seriesList[index].castInfo = credits;
        }
      }).catch(error => {
        console.log('Errore')
        return [];
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
