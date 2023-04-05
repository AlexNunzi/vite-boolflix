<template>
  <TheHeader @searchFilm="search"/>
  <main class="my-3 container m-auto">

    <!-- 
      SE NON HAI TROVATO NESSUN FILM/SERIE TV E SE LE LISTE NON SONO IN STATO DI 
      CARICAMENTO MOSTRA IL MESSAGGIO ALTRIMENTI MOSTRA GLI ELENCHI DI FILM E SERIE 
    -->
    <h2 v-if="foundNothing() && !(storage.loadings['loadingFilm'] || storage.loadings['loadingTvShow'])" class="text-center py-5">{{ this.storage.uiMessage }}</h2>

<!-- FILM/TV SHOW SECTION -->
    <div v-else>

      <!-- FILM -->
      <SectionComp 
      :sectionTitle=" 'Film' "
      :loadingContent="storage.loadings['loadingFilm']"
      :contentList="storage.lists['filmList']"
       />

    <!-- TV SHOW -->
    <SectionComp 
      :sectionTitle=" 'Serie TV' "
      :loadingContent="storage.loadings['loadingTvShow']"
      :contentList="storage.lists['seriesList']"
       />
      </div>

    <!-- TRENDING FILM OF WEEK -->
    <SectionComp 
      :sectionTitle=" 'Film' "
      :sectionSubTitle=" 'consigliati' "
      :loadingContent="storage.loadings['loadingRecommFilmList']"
      :contentList="storage.lists['recommendedFilmList']"
       />

    <!-- TRENDING TV SHOW OF WEEK -->
    <SectionComp 
      :sectionTitle=" 'Serie TV' "
      :sectionSubTitle=" 'consigliate' "
      :loadingContent="storage.loadings['loadingRecommSeriesList']"
      :contentList="storage.lists['recommendedSeriesList']"
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
    // SE LA INPUT DI CONTIENE DEI CARATTERI SALVALI IN 'lastSearch', SVUOTA IL
    // CAMPO DI INPUT ED EFFETTUA DUE CHIAMATE API PER FARTI MANDARE DAL SERVER
    // LA LISTA DI FILM E SERIE TV CHE ABBIANO TITOLO SIMILE ALLA STRINGA SALVATA
    search() {
      if(this.storage.searchInput.trim() != ''){
        this.storage.lastSearch = this.storage.searchInput;
        this.storage.searchInput = '';
        this.storage.uiMessage = 'Non è stato trovato nessun risultato, prova a cercare un altro titolo';
        this.getListFromApi('filmList', 'loadingFilm', '/search/movie', {
          api_key: this.storage.api_key, 
          language: 'it-IT',
          query: this.storage.lastSearch
        })
        this.getListFromApi('seriesList', 'loadingTvShow', '/search/tv', {
          api_key: this.storage.api_key, 
          language: 'it-IT',
          query: this.storage.lastSearch
        })
      } else {
        alert('Scrivi qualcosa nel campo di input per poter effettuare una ricerca!');
      }
    },
    //  EFFETTUA UNA CHIAMATA DI TIPO GET CON I PARAMETRI RICEVUTI IN INGRESSO E 
    //  SALVA I DATI RICEVUTI NELL'OGGETTO PREDISPOSTO IN STORAGE ALLA KEY PRESA
    //  ANCH'ESSA COME ARGOMENTO DELLA FUNZIONE
    //  UNA VOLTA RICEVUTA LA LISTA CHIAMA PER OGNI FILM PRESENTE IN ESSA UN A 
    //  FUNZIONE CHE TRAMITE UN'ALTRA CHIAMATA GET AGGIUNGE ALL'OGGETTO DI OGNI FILM
    //  LA KEY "castInfo" CONTENENTE LE INFORMAZIONI RELATIVE AL CAST DEL FILM/SERIE TV
    getListFromApi(storageKey, loadingKey, stringType, par) {
      const parameters = {...par};
      this.storage.lists[storageKey] = [];
      this.storage.loadings[loadingKey] = true;
      axios.get(this.storage.base_url + stringType, {
        params: parameters
      })
      .then(response => {
        this.storage.lists[storageKey] = response.data.results;
        this.storage.loadings[loadingKey] = false;
        this.storage.lists[storageKey].forEach((el, index) => {
          this.getCastFromApi(storageKey, `/${stringType.split('/')[2]}/${el.id}/credits`, index, {api_key: this.storage.api_key})
        });
        
      }).catch(error => {
        console.log(error);
      })
    },
    //  EFFETTUA UNA CHIAMATA GET CHE CHIEDE AL SERVER LE INFORMAZIONI RELATIVE AL CAST
    //  DEL FILM/SERIE TV CORRISPONDENTE ALL'ID RICEVUTO COME ARGOMENTO E LE AGGIUNGE 
    //  ALL'OGGETTO PRESENTE NELLA LISTA "lists[storageKey][index]" CREANDO UNA KEY "castInfo"
    getCastFromApi(storageKey, stringType, index, par) {
      const parameters = {...par};
      axios.get(this.storage.base_url + stringType, {
        params: parameters
      })
      .then (response => {
        let credits = response.data;
        if(credits.cast.length > 5){
          credits.cast = credits.cast.slice(0, 5);
        }
        this.storage.lists[storageKey][index].castInfo = credits;
      }).catch(error => {
        console.log(error);
      })
    },
    //  EFFETTUA UNA CHIAMATA GET CHE CHIEDE AL SERVER LA LISTA DEI GENERI DI FILM
    //  E SERIE TV ESISTENTI NEL LORO DATABASE E LA SALVA IN "genresList"
    getGenresList(stringType, par) {
      const parameters = {...par}
      axios.get(this.storage.base_url + stringType, {
        params: parameters
      })
      .then (response => {
        response.data.genres.forEach(genre => {
          if(!this.storage.genresList.find(element => element.id == genre.id)){
            this.storage.genresList.push(genre);
          }
        });
      }).catch(error => {
        console.log(error);
      })
    },
    //  RESTITUISCE TRUE SE LE ALMENO UNA DELLE LISTE DI FILM O SERIE TV
    //  CONTIENE QUALCOSA ALL'INTERNO
    foundNothing(){
      return (this.storage.lists.seriesList.length == 0 || this.storage.lists.filmList.length == 0);
    }
  },
  mounted() {
    //  CHIAMATE GET PER LA LISTA DEI GENERI
    this.getGenresList('/genre/movie/list', {
      api_key: this.storage.api_key,
      language: 'it-IT'
    });
    this.getGenresList('/genre/tv/list', {
      api_key: this.storage.api_key,
      language: 'it-IT'
    });
    //CHIAMATE GET PER LE LISTE DI FILM E SERIE TV MIGLIORI DELLA SETTIMANA
    this.getListFromApi('recommendedFilmList', 'loadingRecommFilmList', '/trending/movie/week', {
          api_key: this.storage.api_key, 
        })
    this.getListFromApi('recommendedSeriesList', 'loadingRecommSeriesList', '/trending/tv/week', {
          api_key: this.storage.api_key, 
        })
  }
}
</script>

<style lang="scss">
@use "./styles/general.scss";
</style>
