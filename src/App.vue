<template>
  <TheHeader @searchFilm="search"/>
  <main class="my-3 container m-auto">

    <h2 v-if="foundSomething() && !(storage.loadingFilm || storage.loadingTvShow)" class="text-center py-5">{{ this.storage.uiMessage }}</h2>

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

    <!-- TRENDING FILM OF WEEK -->
    <SectionComp 
      :sectionTitle=" 'Film' "
      :sectionSubTitle=" 'consigliati' "
      :loadingContent="storage.loadingRecommFilmList"
      :contentList="storage.recommendedFilmList"
       />

    <!-- TRENDING TV SHOW OF WEEK -->
    <SectionComp 
      :sectionTitle=" 'Serie TV' "
      :sectionSubTitle=" 'consigliate' "
      :loadingContent="storage.loadingRecommSeriesList"
      :contentList="storage.recommendedSeriesList"
       />

       
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
      if(this.storage.searchInput.trim() != ''){
        this.storage.lastSearch = this.storage.searchInput;
        this.storage.searchInput = '';
        this.storage.uiMessage = 'Non è stato trovato nessun risultato, prova a cercare un altro titolo';
        this.getFilmFromApi();
        this.getSeriesFromApi();
      } else {
        alert('Scrivi qualcosa nel campo di input per poter effettuare una ricerca!');
      }
    },
    getFilmFromApi() {
      this.storage.filmList = [];
      this.storage.loadingFilm = true;
      // https://api.themoviedb.org/3/search/movie?api_key=cf09febcc95a3fe86961147afc012909&language=it-IT&query=prova
      axios.get(this.urlApi('/search/movie', 'language=it-IT', `query=${this.storage.lastSearch}`))
      .then(response => {
        this.storage.filmList = response.data.results;
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
        this.storage.seriesList.forEach((el, index) => this.getCastFromApi(`/tv/${el.id}/credits`, index, 'search'));
        this.storage.loadingTvShow = false;
      }).catch(error => {
        storage.seriesList = [];
        this.storage.loadingTvShow = false;
      })
    },
    getRecommFilmFromApi() {
      this.storage.recommendedFilmList = [];
      this.storage.loadingRecommFilmList = true;
      axios.get(this.urlApi('/trending/movie/week', 'language=it-IT'))
      .then(response => {
        this.storage.recommendedFilmList = response.data.results;
        console.log(this.storage.recommendedFilmList);
        this.storage.recommendedFilmList.forEach((el, index) => this.getCastFromApi(`/movie/${el.id}/credits`, index, 'init'));
        this.storage.loadingRecommFilmList = false;
      }).catch(error => {
        storage.recommendedFilmList = [];
        this.storage.loadingRecommFilmList = false;
      })
    },
    getRecommSeriesFromApi() {
      this.storage.recommendedSeriesList = [];
      this.storage.loadingRecommSeriesList = true;
      axios.get(this.urlApi('/trending/tv/week', 'language=it-IT'))
      .then(response => {
        this.storage.recommendedSeriesList = response.data.results;
        console.log(this.storage.recommendedSeriesList);
        this.storage.recommendedSeriesList.forEach((el, index) => this.getCastFromApi(`/tv/${el.id}/credits`, index, 'init'));
        this.storage.loadingRecommSeriesList = false;
      }).catch(error => {
        storage.recommendedSeriesList = [];
        this.storage.loadingRecommSeriesList = false;
      })
    },
    getCastFromApi(typeId, index, searchOrInit) {
      axios.get(this.urlApi(typeId))
      .then (response => {
        let credits = response.data;
        if(credits.cast.length > 5){
          credits.cast = credits.cast.slice(0, 5);
        }
        if(searchOrInit == 'init'){

          if(typeId.split('/')[1] == 'movie'){
            this.storage.recommendedFilmList[index].castInfo = credits;
          } else {
            this.storage.recommendedSeriesList[index].castInfo = credits;
          }

        } else if(searchOrInit == 'search'){

          if(typeId.split('/')[1] == 'movie'){
            this.storage.filmList[index].castInfo = credits;
          } else {
            this.storage.seriesList[index].castInfo = credits;
          }

        }
      }).catch(error => {
        console.log('Errore');
      })
    },
    getGenresList(type) {
      axios.get(this.urlApi(`/genre/${type}/list`, 'language=it-IT'))
      .then (response => {
        response.data.genres.forEach(genre => {
          if(!this.storage.genresList.find(element => element.id == genre.id)){
            this.storage.genresList.push(genre);
          }
        });
      }).catch(error => {
        console.log('Errore');
      })
    },
    foundSomething(){
      return (this.storage.filmList.length == 0 && this.storage.seriesList.length == 0);
    }
  },
  mounted() {
    this.getGenresList('movie');
    this.getGenresList('tv');
    this.getRecommSeriesFromApi();
    this.getRecommFilmFromApi();
  }
}
</script>

<style lang="scss">
@use "./styles/general.scss";
</style>
